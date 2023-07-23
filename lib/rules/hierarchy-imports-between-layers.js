"use strict";

const { getFileLayer, getImportFromLayer, isPathRelative, layersSubordinates, layers } = require('../helpers');
const micromatch = require('micromatch');

module.exports = {
   meta: {
     type: 'problem', // `problem`, `suggestion`, or `layout`
     docs: {
       description: "Some layers can only use underlying layers",
       recommended: false,
       url: null,
     },
     fixable: null,
     schema: [
       {
          type: 'object',
          properties: {
             alias: {
                type: 'string'
             },
             ignoreImportPatterns: {
                type: 'array',
             }
          }
       }
    ],
    messages: {
       necessaryImportFromAllowedLayer: "Одни слои могут использовать внутри себя только нижележащие слои.",
    }
   },
 
   create(context) {
   const { alias = '', ignoreImportPatterns = []} = context.options[0] ?? {}

    const filePath = context.filename
    const fileLayer = getFileLayer(filePath)
    
    return {
     ImportDeclaration(node) {
       const value = node.source.value;
       const importFrom = alias ? value.replace(`${alias}/`, '') : value

       if(isPathRelative(importFrom)) return;
       
       const importLayer = getImportFromLayer(importFrom)

       if(!layers[importLayer] || !layers[fileLayer]) return;

       const isIgnored = ignoreImportPatterns.some(pattern => micromatch.isMatch(importFrom, pattern))
       if(isIgnored) return;

       if(!layersSubordinates[fileLayer]?.includes(importLayer)) {
        context.report({node, messageId: 'necessaryImportFromAllowedLayer'})
       }
      }
    };
   },
 };