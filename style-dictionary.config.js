const StyleDictionary = require('style-dictionary');

// Custom transforms
StyleDictionary.registerTransform({
  name: 'shadow/css',
  type: 'value',
  matcher: function(token) {
    return token.type === 'shadow';
  },
  transformer: function(token) {
    const shadow = token.value;
    if (typeof shadow === 'object' && shadow.color) {
      const inset = shadow.inset ? 'inset ' : '';
      return `${inset}${shadow.offsetX} ${shadow.offsetY} ${shadow.blur} ${shadow.spread || '0'} ${shadow.color}`;
    }
    return token.value;
  }
});

StyleDictionary.registerTransform({
  name: 'typography/css',
  type: 'value',
  matcher: function(token) {
    return token.type === 'typography';
  },
  transformer: function(token) {
    const typography = token.value;
    if (typeof typography === 'object') {
      return {
        fontFamily: typography.fontFamily,
        fontSize: typography.fontSize,
        fontWeight: typography.fontWeight,
        lineHeight: typography.lineHeight
      };
    }
    return token.value;
  }
});

// Custom format for CSS variables
StyleDictionary.registerFormat({
  name: 'css/variables',
  formatter: function(dictionary) {
    return `:root {\n${dictionary.allTokens.map(token => 
      `  --${token.name}: ${token.value};`
    ).join('\n')}\n}`;
  }
});

// Custom format for TypeScript constants
StyleDictionary.registerFormat({
  name: 'typescript/constants',
  formatter: function(dictionary) {
    const buildTokens = (tokens, prefix = '') => {
      let output = '';
      for (const [key, value] of Object.entries(tokens)) {
        const tokenName = prefix ? `${prefix}_${key}` : key;
        if (value.value !== undefined) {
          output += `export const ${tokenName.toUpperCase().replace(/[^A-Z0-9]/g, '_')} = '${value.value}';\n`;
        } else if (typeof value === 'object') {
          output += buildTokens(value, tokenName);
        }
      }
      return output;
    };
    
    return `// Design Tokens - Generated file, do not edit directly
/* eslint-disable */

${buildTokens(dictionary.tokens)}
`;
  }
});

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['attribute/cti', 'name/cti/kebab', 'shadow/css', 'typography/css'],
      buildPath: 'dist/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
        options: {
          outputReferences: true
        }
      }]
    },
    typescript: {
      transformGroup: 'js',
      transforms: ['attribute/cti', 'name/cti/constant'],  
      buildPath: 'dist/',
      files: [{
        destination: 'tokens.ts',
        format: 'typescript/constants'
      }]
    },
    json: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [{
        destination: 'tokens.json',
        format: 'json/nested'
      }]
    }
  }
};