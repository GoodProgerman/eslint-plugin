/**
 * @fileoverview Imports from other layers should be only with Public API
 * @author Idris
 */
"use strict";

const { isPathRelative } = require('../helpers');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Imports from other layers should be only with Public API",
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
				}
			}
		}
	],
	messages: {
		publicApiImports: "Абсолютный импорт возможен лишь только через Public API"
	}
  },

  create(context) {
	let alias;
	if(context.options[0]) {
		alias = context.options[0].alias || ''
	} else {
		alias = ''
	}
	
   return {
      ImportDeclaration(node) {
			const value = node.source.value;
			const importFrom = alias ? value.replace(`${alias}/`, '') : value

			if(isPathRelative(importFrom)) {
				return false
			}

			const segments = importFrom.split('/')
			const layer = segments[0]
			
			if(!checkingLayers[layer]) {
				return false
			}

			const importIsNotFromPublicApi = segments.length > 2
			
			if(importIsNotFromPublicApi){
				context.report({node: node, messageId: "publicApiImports"})
			}
		}
   };
  },
};

const checkingLayers = {
	'entities': 'entities',
	'features': 'features',
	'widgets': 'widgets',
	'pages': 'pages',
	'app': 'app',
}