const fs = require('fs-extra');
const path = require('path');

// Function to validate W3C token format
function validateW3CToken(token, path = '') {
  const errors = [];
  
  if (!token.$type) {
    errors.push(`Missing $type at ${path}`);
  }
  
  if (token.$value === undefined) {
    errors.push(`Missing $value at ${path}`);
  }
  
  // Validate specific token types
  if (token.$type === 'color' && token.$value) {
    const colorRegex = /^(#[0-9a-fA-F]{3,8}|rgb\(|rgba\(|hsl\(|hsla\()/;
    if (!colorRegex.test(token.$value) && !token.$value.startsWith('{')) {
      errors.push(`Invalid color value "${token.$value}" at ${path}`);
    }
  }
  
  if (token.$type === 'dimension' && token.$value) {
    const dimensionRegex = /^(\d+(\.\d+)?(px|rem|em|%)|0)$/;
    if (!dimensionRegex.test(token.$value) && !token.$value.startsWith('{')) {
      errors.push(`Invalid dimension value "${token.$value}" at ${path}`);
    }
  }
  
  return errors;
}

// Function to recursively validate token structure
function validateTokenStructure(obj, basePath = '') {
  const errors = [];
  
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = basePath ? `${basePath}.${key}` : key;
    
    // Skip meta properties
    if (key.startsWith('$')) {
      continue;
    }
    
    if (value && typeof value === 'object') {
      if (value.$type && value.$value !== undefined) {
        // This is a token
        const tokenErrors = validateW3CToken(value, currentPath);
        errors.push(...tokenErrors);
      } else {
        // This is a group, continue validation
        const groupErrors = validateTokenStructure(value, currentPath);
        errors.push(...groupErrors);
      }
    }
  }
  
  return errors;
}

// Function to validate token references
function validateReferences(obj, allTokens, basePath = '') {
  const errors = [];
  
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = basePath ? `${basePath}.${key}` : key;
    
    if (key.startsWith('$')) {
      continue;
    }
    
    if (value && typeof value === 'object') {
      if (value.$value && typeof value.$value === 'string' && value.$value.includes('{')) {
        // Check if reference is valid
        const referenceRegex = /\{([^}]+)\}/g;
        let match;
        
        while ((match = referenceRegex.exec(value.$value)) !== null) {
          const referencePath = match[1];
          const referenceKeys = referencePath.split('.');
          
          let current = allTokens;
          let found = true;
          
          for (const refKey of referenceKeys) {
            if (current && current[refKey]) {
              current = current[refKey];
            } else {
              found = false;
              break;
            }
          }
          
          if (!found || !current.$value) {
            errors.push(`Invalid reference "{${referencePath}}" at ${currentPath}`);
          }
        }
      } else if (!value.$type) {
        // Continue validating nested structure
        const nestedErrors = validateReferences(value, allTokens, currentPath);
        errors.push(...nestedErrors);
      }
    }
  }
  
  return errors;
}

// Function to check for naming conventions
function validateNamingConventions(obj, basePath = '') {
  const errors = [];
  const validNameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
  
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) {
      continue;
    }
    
    const currentPath = basePath ? `${basePath}.${key}` : key;
    
    // Allow numeric keys for color scales
    if (!validNameRegex.test(key) && !/^\d+$/.test(key)) {
      errors.push(`Invalid token name "${key}" at ${currentPath}. Use camelCase or numbers only.`);
    }
    
    if (value && typeof value === 'object' && !value.$type) {
      const nestedErrors = validateNamingConventions(value, currentPath);
      errors.push(...nestedErrors);
    }
  }
  
  return errors;
}

// Function to validate completeness of semantic tokens
function validateCompleteness(tokens) {
  const errors = [];
  const requiredStructure = {
    'color.text.primary': 'Primary text color is required',
    'color.text.secondary': 'Secondary text color is required',
    'color.background.primary': 'Primary background color is required',
    'color.brand.primary': 'Primary brand color is required',
    'spacing.4': 'Base spacing (4) is required',
    'font.size.base': 'Base font size is required',
    'font.family.base': 'Base font family is required'
  };
  
  for (const [path, message] of Object.entries(requiredStructure)) {
    const keys = path.split('.');
    let current = tokens;
    
    for (const key of keys) {
      if (current && current[key]) {
        current = current[key];
      } else {
        current = null;
        break;
      }
    }
    
    if (!current || !current.$value) {
      errors.push(`Missing required token: ${message} (${path})`);
    }
  }
  
  return errors;
}

async function validateTokens() {
  console.log('🔍 Validating Design Tokens...\n');
  
  let totalErrors = 0;
  
  try {
    // Validate W3C format
    console.log('📋 Validating W3C format (tokens.raw.json)...');
    if (await fs.pathExists('tokens.raw.json')) {
      const w3cTokens = await fs.readJson('tokens.raw.json');
      
      // Check schema
      if (!w3cTokens.$schema) {
        console.log('⚠️  Missing $schema property');
        totalErrors++;
      }
      
      // Validate structure
      const structureErrors = validateTokenStructure(w3cTokens);
      if (structureErrors.length > 0) {
        console.log('❌ Structure validation errors:');
        structureErrors.forEach(error => console.log(`   - ${error}`));
        totalErrors += structureErrors.length;
      }
      
      // Validate references
      const referenceErrors = validateReferences(w3cTokens, w3cTokens);
      if (referenceErrors.length > 0) {
        console.log('❌ Reference validation errors:');
        referenceErrors.forEach(error => console.log(`   - ${error}`));
        totalErrors += referenceErrors.length;
      }
      
      // Validate naming conventions
      const namingErrors = validateNamingConventions(w3cTokens);
      if (namingErrors.length > 0) {
        console.log('❌ Naming convention errors:');
        namingErrors.forEach(error => console.log(`   - ${error}`));
        totalErrors += namingErrors.length;
      }
      
      // Validate completeness
      const completenessErrors = validateCompleteness(w3cTokens);
      if (completenessErrors.length > 0) {
        console.log('❌ Completeness validation errors:');
        completenessErrors.forEach(error => console.log(`   - ${error}`));
        totalErrors += completenessErrors.length;
      }
      
      if (totalErrors === 0) {
        console.log('✅ W3C format validation passed');
      }
    } else {
      console.log('❌ tokens.raw.json not found');
      totalErrors++;
    }
    
    console.log('\n📋 Validating Style Dictionary format (tokens.sd.json)...');
    if (await fs.pathExists('tokens.sd.json')) {
      const sdTokens = await fs.readJson('tokens.sd.json');
      
      // Basic structure validation for Style Dictionary format
      function validateSDStructure(obj, path = '') {
        const errors = [];
        for (const [key, value] of Object.entries(obj)) {
          const currentPath = path ? `${path}.${key}` : key;
          if (value && typeof value === 'object') {
            if (value.value !== undefined && !value.type) {
              errors.push(`Missing type property at ${currentPath}`);
            } else if (!value.value && value.type) {
              // Continue validation for nested objects
              const nestedErrors = validateSDStructure(value, currentPath);
              errors.push(...nestedErrors);
            }
          }
        }
        return errors;
      }
      
      const sdErrors = validateSDStructure(sdTokens);
      if (sdErrors.length > 0) {
        console.log('❌ Style Dictionary format errors:');
        sdErrors.forEach(error => console.log(`   - ${error}`));
        totalErrors += sdErrors.length;
      } else {
        console.log('✅ Style Dictionary format validation passed');
      }
    } else {
      console.log('❌ tokens.sd.json not found');
      totalErrors++;
    }
    
    // Validate generated files
    console.log('\n📋 Validating generated files...');
    const requiredFiles = [
      'dist/tokens.css',
      'dist/tokens.ts',
      'dist/tokens.d.ts'
    ];
    
    for (const file of requiredFiles) {
      if (await fs.pathExists(file)) {
        console.log(`✅ ${file} exists`);
      } else {
        console.log(`❌ ${file} missing`);
        totalErrors++;
      }
    }
    
    // Final results
    console.log('\n' + '='.repeat(50));
    if (totalErrors === 0) {
      console.log('🎉 All validations passed! Design tokens are ready to use.');
    } else {
      console.log(`❌ Found ${totalErrors} error(s). Please fix them before proceeding.`);
    }
    console.log('='.repeat(50));
    
    if (totalErrors > 0) {
      process.exit(1);
    }
    
  } catch (error) {
    console.error('💥 Validation failed with error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  validateTokens();
}

module.exports = { validateTokens };