const fs = require('fs-extra');
const path = require('path');

// Function to merge JSON files recursively
function mergeTokens(baseTokens, additionalTokens) {
  const result = { ...baseTokens };
  
  for (const [key, value] of Object.entries(additionalTokens)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value) && !value.$value) {
      result[key] = mergeTokens(result[key] || {}, value);
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

// Function to convert W3C format to Style Dictionary format
function convertToStyleDictionary(tokens) {
  const result = {};
  
  function processToken(obj, path = []) {
    for (const [key, value] of Object.entries(obj)) {
      if (value.$type && value.$value !== undefined) {
        // This is a token
        const tokenPath = [...path, key];
        let current = result;
        
        // Create nested structure
        for (let i = 0; i < tokenPath.length - 1; i++) {
          if (!current[tokenPath[i]]) {
            current[tokenPath[i]] = {};
          }
          current = current[tokenPath[i]];
        }
        
        // Set the token value with metadata
        current[tokenPath[tokenPath.length - 1]] = {
          value: value.$value,
          type: value.$type,
          description: value.$description || ''
        };
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // This is a group, continue processing
        processToken(value, [...path, key]);
      }
    }
  }
  
  processToken(tokens);
  return result;
}

async function buildTokens() {
  try {
    console.log('Building tokens...');
    
    // Read all token files
    const tokensDir = path.join(__dirname, '../tokens');
    const baseTokens = {};
    
    // Load base tokens
    const baseDir = path.join(tokensDir, 'base');
    const baseFiles = await fs.readdir(baseDir);
    
    for (const file of baseFiles) {
      if (file.endsWith('.json')) {
        const filePath = path.join(baseDir, file);
        const tokens = await fs.readJson(filePath);
        Object.assign(baseTokens, tokens);
      }
    }
    
    // Load semantic tokens
    const semanticDir = path.join(tokensDir, 'semantic');
    const semanticFiles = await fs.readdir(semanticDir);
    
    for (const file of semanticFiles) {
      if (file.endsWith('.json')) {
        const filePath = path.join(semanticDir, file);
        const tokens = await fs.readJson(filePath);
        mergeTokens(baseTokens, tokens);
      }
    }
    
    // Create W3C compliant format
    const w3cTokens = {
      $schema: "https://design-tokens.github.io/community-group/format/",
      $description: "AutoPartQuote Design Tokens - W3C compliant format",
      $extensions: {
        "com.figma": {
          hiddenFromPublishing: false,
          scopes: ["ALL_SCOPES"],
          codeSyntax: {}
        }
      },
      ...baseTokens
    };
    
    // Write W3C format
    await fs.ensureDir('dist');
    await fs.writeJson('tokens.raw.json', w3cTokens, { spaces: 2 });
    
    // Convert to Style Dictionary format
    const styleDict = convertToStyleDictionary(baseTokens);
    await fs.writeJson('tokens.sd.json', styleDict, { spaces: 2 });
    
    console.log('✅ Tokens built successfully!');
    console.log('  - tokens.raw.json (W3C format)');
    console.log('  - tokens.sd.json (Style Dictionary format)');
    
  } catch (error) {
    console.error('❌ Error building tokens:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  buildTokens();
}

module.exports = { buildTokens };