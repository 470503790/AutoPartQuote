const fs = require('fs-extra');
const path = require('path');

// Function to convert kebab-case to SCREAMING_SNAKE_CASE
function toConstantCase(str) {
  return str
    .replace(/[A-Z]/g, match => '_' + match.toLowerCase())
    .replace(/[-\s]+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '')
    .toUpperCase()
    .replace(/^_+|_+$/g, '')
    .replace(/_+/g, '_');
}

// Function to flatten tokens for TypeScript constants
function flattenTokensForTS(obj, prefix = '', result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}_${key}` : key;
    
    if (value && typeof value === 'object' && value.value !== undefined) {
      // This is a token with a value
      const constantName = toConstantCase(newKey);
      result[constantName] = value.value;
    } else if (value && typeof value === 'object') {
      // This is a nested group, continue flattening
      flattenTokensForTS(value, newKey, result);
    }
  }
  return result;
}

// Function to resolve token references
function resolveReferences(value, allTokens) {
  if (typeof value !== 'string') {
    return value;
  }
  
  const referenceRegex = /\{([^}]+)\}/g;
  return value.replace(referenceRegex, (match, path) => {
    const keys = path.split('.');
    let current = allTokens;
    
    for (const key of keys) {
      if (current && current[key]) {
        current = current[key];
      } else {
        console.warn(`Warning: Could not resolve reference ${path}`);
        return match;
      }
    }
    
    return current.value || current || match;
  });
}

// Function to format value for TypeScript
function formatValue(value) {
  if (Array.isArray(value)) {
    return `[${value.map(v => `'${v}'`).join(', ')}]`;
  } else if (typeof value === 'string') {
    return `'${value.replace(/'/g, "\\'")}'`;
  } else if (typeof value === 'number') {
    return value.toString();
  } else if (typeof value === 'object' && value !== null) {
    // Handle shadow objects
    if (value.offsetX !== undefined) {
      const shadow = value;
      const inset = shadow.inset ? 'inset ' : '';
      return `'${inset}${shadow.offsetX} ${shadow.offsetY} ${shadow.blur} ${shadow.spread || '0'} ${shadow.color}'`;
    }
    return `'${JSON.stringify(value)}'`;
  }
  return `'${value}'`;
}

async function buildTypeScript() {
  try {
    console.log('Building TypeScript tokens...');
    
    // Read the Style Dictionary tokens
    const tokensPath = path.join(__dirname, '../tokens.sd.json');
    
    if (!await fs.pathExists(tokensPath)) {
      console.log('Style Dictionary tokens not found, building them first...');
      const { buildTokens } = require('./build-tokens');
      await buildTokens();
    }
    
    const tokens = await fs.readJson(tokensPath);
    
    // Flatten tokens
    const flattened = flattenTokensForTS(tokens);
    
    // Resolve references
    const resolved = {};
    for (const [key, value] of Object.entries(flattened)) {
      resolved[key] = resolveReferences(value, tokens);
    }
    
    // Generate TypeScript constants
    let tsContent = `/* AutoPartQuote Design Tokens */
/* Generated file - do not edit directly */
/* eslint-disable */

// =============================================================================
// BASE TOKENS
// =============================================================================

`;
    
    // Group constants by category
    const categories = {};
    for (const [key, value] of Object.entries(resolved)) {
      const category = key.split('_')[0];
      if (!categories[category]) {
        categories[category] = {};
      }
      categories[category][key] = value;
    }
    
    // Sort and output by category
    const sortedCategories = Object.keys(categories).sort();
    
    for (const category of sortedCategories) {
      tsContent += `// ${category.toUpperCase()} TOKENS\n`;
      
      const sortedConstants = Object.keys(categories[category]).sort();
      for (const constantName of sortedConstants) {
        const value = categories[category][constantName];
        tsContent += `export const ${constantName} = ${formatValue(value)};\n`;
      }
      tsContent += '\n';
    }
    
    // Add typed objects for better developer experience
    tsContent += `
// =============================================================================
// TYPED TOKEN OBJECTS
// =============================================================================

export const tokens = {
  color: {
    base: {`;
    
    // Add color tokens in a structured way
    if (tokens.color && tokens.color.base) {
      for (const [colorName, colorShades] of Object.entries(tokens.color.base)) {
        if (typeof colorShades === 'object' && colorShades.value) {
          tsContent += `
      ${colorName}: ${formatValue(colorShades.value)},`;
        } else if (typeof colorShades === 'object') {
          tsContent += `
      ${colorName}: {`;
          for (const [shade, shadeValue] of Object.entries(colorShades)) {
            if (shadeValue && shadeValue.value) {
              tsContent += `
        '${shade}': ${formatValue(shadeValue.value)},`;
            }
          }
          tsContent += `
      },`;
        }
      }
    }
    
    tsContent += `
    }
  },
  spacing: {`;
    
    // Add spacing tokens
    if (tokens.spacing) {
      for (const [key, value] of Object.entries(tokens.spacing)) {
        if (value && value.value) {
          tsContent += `
    '${key}': ${formatValue(value.value)},`;
        }
      }
    }
    
    tsContent += `
  },
  font: {
    size: {`;
    
    // Add font size tokens
    if (tokens.font && tokens.font.size) {
      for (const [key, value] of Object.entries(tokens.font.size)) {
        if (value && value.value) {
          tsContent += `
      ${key}: ${formatValue(value.value)},`;
        }
      }
    }
    
    tsContent += `
    }
  }
} as const;

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type ColorToken = keyof typeof tokens.color.base;
export type SpacingToken = keyof typeof tokens.spacing;
export type FontSizeToken = keyof typeof tokens.font.size;

export type DesignToken = {
  value: string | number | string[];
  type: string;
  description?: string;
};

export interface TokenTheme {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  typography: Record<string, string>;
}
`;
    
    await fs.ensureDir('dist');
    await fs.writeFile('dist/tokens.ts', tsContent);
    
    // Also create a .d.ts file for better TypeScript support
    const dtsContent = `/* AutoPartQuote Design Tokens Type Definitions */
declare module '@autopartquote/design-tokens' {
  export * from './tokens';
}
`;
    
    await fs.writeFile('dist/tokens.d.ts', dtsContent);
    
    console.log('✅ TypeScript tokens built successfully!');
    console.log('  - dist/tokens.ts');
    console.log('  - dist/tokens.d.ts');
    
  } catch (error) {
    console.error('❌ Error building TypeScript tokens:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  buildTypeScript();
}

module.exports = { buildTypeScript };