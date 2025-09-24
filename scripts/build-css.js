const fs = require('fs-extra');
const path = require('path');

// Function to flatten tokens with proper CSS variable names
function flattenTokens(obj, prefix = '', result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}-${key}` : key;
    
    if (value && typeof value === 'object' && value.value !== undefined) {
      // This is a token with a value
      result[newKey] = value.value;
    } else if (value && typeof value === 'object') {
      // This is a nested group, continue flattening
      flattenTokens(value, newKey, result);
    }
  }
  return result;
}

// Function to resolve token references like {color.base.blue.500}
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

// Function to generate CSS custom properties
function generateCSS(tokens, theme = 'light') {
  const flattened = flattenTokens(tokens);
  const resolved = {};
  
  // First pass: collect all values
  for (const [key, value] of Object.entries(flattened)) {
    resolved[key] = value;
  }
  
  // Second pass: resolve references
  for (const [key, value] of Object.entries(resolved)) {
    resolved[key] = resolveReferences(value, tokens);
  }
  
  let css = `:root {\n`;
  
  // Sort tokens for better organization
  const sortedKeys = Object.keys(resolved).sort();
  
  for (const key of sortedKeys) {
    const value = resolved[key];
    const cssVar = `--${key.replace(/[A-Z]/g, match => '-' + match.toLowerCase())}`;
    
    if (Array.isArray(value)) {
      // Handle font families and other arrays
      css += `  ${cssVar}: ${value.map(v => (typeof v === 'string' && v.includes(' ')) ? `"${v}"` : v).join(', ')};\n`;
    } else if (typeof value === 'object' && value !== null && value.offsetX !== undefined) {
      // Handle shadow objects
      const shadow = value;
      const inset = shadow.inset ? 'inset ' : '';
      css += `  ${cssVar}: ${inset}${shadow.offsetX} ${shadow.offsetY} ${shadow.blur} ${shadow.spread || '0'} ${shadow.color};\n`;
    } else {
      css += `  ${cssVar}: ${value};\n`;
    }
  }
  
  css += `}\n`;
  
  return css;
}

async function buildCSS() {
  try {
    console.log('Building CSS tokens...');
    
    // Read the Style Dictionary tokens
    const tokensPath = path.join(__dirname, '../tokens.sd.json');
    
    if (!await fs.pathExists(tokensPath)) {
      console.log('Style Dictionary tokens not found, building them first...');
      const { buildTokens } = require('./build-tokens');
      await buildTokens();
    }
    
    const tokens = await fs.readJson(tokensPath);
    
    // Generate CSS for light theme
    const lightCSS = generateCSS(tokens, 'light');
    
    // Generate dark theme CSS
    let darkCSS = `
/* Dark theme overrides */
[data-theme="dark"] {
  /* Surface colors */
  --color-surface-primary: #171717;
  --color-surface-secondary: #262626;
  --color-surface-tertiary: #404040;
  
  /* Content colors */
  --color-content-primary: #ffffff;
  --color-content-secondary: #d4d4d4;
  --color-content-tertiary: #a3a3a3;
  
  /* Border colors */
  --color-border-primary: #404040;
  --color-border-secondary: #525252;
  
  /* Text colors */
  --color-text-primary: #ffffff;
  --color-text-secondary: #d4d4d4;
  --color-text-tertiary: #a3a3a3;
  --color-text-disabled: #737373;
  
  /* Background colors */
  --color-background-primary: #171717;
  --color-background-secondary: #262626;
  --color-background-tertiary: #404040;
  --color-background-inverse: #ffffff;
}
`;
    
    const fullCSS = `/* AutoPartQuote Design Tokens */
/* Generated file - do not edit directly */

${lightCSS}
${darkCSS}

/* Utility classes */
.theme-light {
  color-scheme: light;
}

.theme-dark {
  color-scheme: dark;
}

/* Auto theme based on system preference */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* Apply dark theme variables automatically */
    --color-surface-primary: #171717;
    --color-surface-secondary: #262626;
    --color-surface-tertiary: #404040;
    --color-content-primary: #ffffff;
    --color-content-secondary: #d4d4d4;
    --color-content-tertiary: #a3a3a3;
    --color-border-primary: #404040;
    --color-border-secondary: #525252;
    --color-text-primary: #ffffff;
    --color-text-secondary: #d4d4d4;
    --color-text-tertiary: #a3a3a3;
    --color-text-disabled: #737373;
    --color-background-primary: #171717;
    --color-background-secondary: #262626;
    --color-background-tertiary: #404040;
    --color-background-inverse: #ffffff;
  }
}
`;
    
    await fs.ensureDir('dist');
    await fs.writeFile('dist/tokens.css', fullCSS);
    
    console.log('✅ CSS tokens built successfully!');
    console.log('  - dist/tokens.css');
    
  } catch (error) {
    console.error('❌ Error building CSS tokens:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  buildCSS();
}

module.exports = { buildCSS };