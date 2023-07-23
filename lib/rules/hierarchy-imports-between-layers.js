/**
 * @fileoverview Some layers can only use underlying layers
 * @author Idris
 */
"use strict";

const { getFileLayer, getImportFromLayer, isPathRelative } = require('../helpers');
const micromatch = require('micromatch');
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
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
       importNotFromAllowedLayer: "Одни слои могут использовать внутри себя только нижележащие слои",
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
       const importLayer = getImportFromLayer(importFrom)

       if(isPathRelative(importFrom)) return;

       if(!layers[importLayer] || !layers[fileLayer]) return;

       const isIgnored = ignoreImportPatterns.some(pattern => micromatch.isMatch(importFrom, pattern))
       if(isIgnored) return;

       if(!layersSubordinates[fileLayer]?.includes(importLayer)) {
        context.report({node, messageId: 'importNotFromAllowedLayer'})
       }
      }
    };
   },
 };
 
 const layersSubordinates = {
    'app': ['pages', 'widgets', 'features', 'entities', 'shared', ],
    'pages': ['widgets', 'features', 'entities', 'shared', ],
    'widgets': ['features', 'entities', 'shared', ],
    'features': ['entities', 'shared', ],
    'entities': ['entities', 'shared', ],
    'shared': ['shared', ],
 }
 
 const layers = {
    'shared': 'shared',
    'entities': 'entities',
    'features': 'features',
    'widgets': 'widgets',
    'pages': 'pages',
    'app': 'app',
 }