"use strict";

const { isPathRelative, checkingLayers, shouldBeRelative, getNormalizedPath } = require('../helpers');
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
		necessaryPublicApiImport: "Абсолютный импорт возможен лишь только через Public API.",
		forbiddenToImportFromTestingPublicApi: "Тестовые данные нельзя импортировать в Production код.",
		necessaryImportFromTestingPublicApi: "Тестовые данные необходимо импортировать из Testing Public API."
	}
  },

  create(context) {
	if(!context.filename.includes('src')) return {};
	const { alias = '', testFilesPatterns = []} = context.options[0] ?? {}
	const normalizedPath = getNormalizedPath(context.filename)
	
   return {
      ImportDeclaration(node) {
			const value = node.source.value;
			const importFrom = alias ? value.replace(`${alias}/`, '') : value

			if(isPathRelative(importFrom)) return;
			if(shouldBeRelative(normalizedPath, importFrom)) return;

			const segments = importFrom.split('/')
			const layer = segments[0]
			const slice = segments[1]
			
			if(!checkingLayers[layer]) return;

			const pathDeep = layer === 'app' ? 3 : 2

			// Импорт сделан НЕ из Обычного PublicApi ?
			const importIsNotFromPublicApi = segments.length > pathDeep

			// Импорт сделан из TestingPublicApi ?
			const isTestingPublicApi = segments[pathDeep] === 'testing' && segments.length <= pathDeep + 1
			// Мы находимся в тестовом файле ?
			const isTestFile = testFilesPatterns.some(pattern => micromatch.isMatch(normalizedPath, pattern))

			if(importIsNotFromPublicApi && !isTestingPublicApi && !isTestFile){
				context.report({
					node: node, 
					messageId: "necessaryPublicApiImport",
					fix: (fixer) => {
						return fixer.replaceText(node.source, `'${alias ? `${alias}/` : ''}${layer}/${slice}'`)
					}
				},)
			}


			if(!isTestingPublicApi && isTestFile) {
				context.report({
					node, 
					messageId: 'necessaryImportFromTestingPublicApi',
					fix: (fixer) => {
						return fixer.replaceText(node.source, `'${alias ? `${alias}/` : ''}${layer}/${slice}/testing'`)
					}
			})
			}

			if(isTestingPublicApi && !isTestFile) {
				context.report({
					node, 
					messageId: 'forbiddenToImportFromTestingPublicApi',
					fix: (fixer) => {
						return fixer.replaceText(node.source, `'${alias ? `${alias}/` : ''}${layer}/${slice}'`)
					}
				})
			}
		}
   };
  },
};