"use strict";
const path = require('path')
const { getNormalizedPath, shouldBeRelative, isPathRelative} = require('../helpers');

module.exports = {
  meta: {
   type: 'problem', // `problem`, `suggestion`, or `layout`
   docs: {
     description: "Checks if the path must be relative",
     recommended: false,
     url: null, // URL to the documentation page for this rule
   },
   fixable: 'code', // Or `code` or `whitespace`
   schema: [
		{
			type: 'object',
			properties: {
				alias: {
					type: 'string'
				}
			}
		}
	], // Add a schema if the rule has options
	messages: {
		necessaryRelativePathInSameSlice: "В рамках одного слайса пути должны быть относительными.",
		forbiddenRelativePathBetweenLayers: "Относительные импорты между слоями невозможны."
	}
  },

  create(context) {
	if(!context.filename.includes('src')) return;
	const alias = context.options[0]?.alias || ''
	
   return {
      ImportDeclaration(node) {
			const value = node.source.value;
			const importFrom = alias ? value.replace(`${alias}/`, '') : value
			const normalizedPath = getNormalizedPath(context.filename)

			if(shouldBeRelative(normalizedPath, importFrom)){
				context.report({
					node: node, 
					messageId: "necessaryRelativePathInSameSlice",
					fix: (fixer) => {
						const pathWithoutEnd = normalizedPath.split('/').slice(0, -1).join('/');

						let relativePath = path.relative(pathWithoutEnd, importFrom).replace(/[\\]+/g, "/");
						if(!relativePath.startsWith('.')) {
							relativePath = './' + relativePath
						}

						return fixer.replaceText(node.source, `'${relativePath}'`)
					}
				})
			}

			if(isPathRelative(importFrom) && contains(importFrom, layersArray)) {
				context.report({
					node: node, 
					messageId: "forbiddenRelativePathBetweenLayers",
				})
			}
		}
   };
  },
};

const layersArray = ['app', 'pages', 'widgets', 'features', 'entities', 'shared']
function contains(str, arrayOfStrings) {
	return arrayOfStrings.some(item => str.includes(item));
 }


