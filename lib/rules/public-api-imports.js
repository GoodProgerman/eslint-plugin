"use strict";

const { isPathRelative, checkingLayers } = require('../helpers');
const micromatch = require('micromatch');

module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Imports from other layers should be only with Public API",
      recommended: false,
      url: null,
    },
    fixable: 'code',
    schema: [
		{
			type: 'object',
			properties: {
				alias: {
					type: 'string'
				},
				testFilesPatterns: {
					type: 'array',

				}
			}
		}
	],
	messages: {
		publicApiImports: "Абсолютный импорт возможен лишь только через Public API",
		testingPublicApiImports: "Тестовые данные необходимо импортировать из Testing Public API"
	}
  },

  create(context) {
	const { alias = '', testFilesPatterns = []} = context.options[0] ?? {}
	
   return {
      ImportDeclaration(node) {
			const value = node.source.value;
			const importFrom = alias ? value.replace(`${alias}/`, '') : value

			if(isPathRelative(importFrom)) return;

			const segments = importFrom.split('/')
			const layer = segments[0]
			const slice = segments[1]
			
			if(!checkingLayers[layer]) return;

			const importIsNotFromPublicApi = segments.length > 2

			const isTestingPublicApi = segments[2] === 'testing' && segments.length <= 3

			
			if(importIsNotFromPublicApi && !isTestingPublicApi){
				context.report({
					node: node, 
					messageId: "publicApiImports",
					fix: (fixer) => {
						return fixer.replaceText(node.source, `'${alias ? `${alias}/` : ''}${layer}/${slice}'`)
					}
				},)
			}

			if(isTestingPublicApi) {
				const filePath = context.filename
				const isTestFile = testFilesPatterns.some(pattern => micromatch.isMatch(filePath, pattern))
				
				if(!isTestFile) {
					// Если импорт из тестинг И файл не тестовый
					context.report({node, messageId: 'testingPublicApiImports'})
				}
			}
		}
   };
  },
};