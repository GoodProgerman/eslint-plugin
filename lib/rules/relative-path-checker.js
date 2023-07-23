"use strict";
const path = require('path')
const { isPathRelative, checkingLayers, getNormalizedPath } = require('../helpers');

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
		pathInSameSlice: "В рамках одного слайса пути должны быть относительными!"
	}
  },

  create(context) {
	const alias = context.options[0]?.alias || ''
	
   return {
      ImportDeclaration(node) {
			const value = node.source.value;
			const importFrom = alias ? value.replace(`${alias}/`, '') : value
			const normalizedPath = getNormalizedPath(context.filename)

			if(shouldBeRelative(normalizedPath, importFrom)){
				context.report({
					node: node, 
					messageId: "pathInSameSlice",
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
		}
   };
  },
};

function shouldBeRelative(normalizedPath, importFrom ) {
	if(isPathRelative(importFrom)) return;

	const importFromArray = importFrom.split('/')
	const importFromLayer = importFromArray[0]
	const importFromSlice = importFromArray[1]

	if(!importFromLayer || !importFromSlice || !checkingLayers[importFromLayer]) return;

	const filePathArray = normalizedPath.split('/')
	// Если у нас путь не нормализован 
	// const filePathArray = filePathInSrc.split(/\\|\//) 

	const filePathLayer = filePathArray[0];
	const filePathSlice = filePathArray[1];

	if(!filePathLayer || !filePathSlice || !checkingLayers[filePathLayer]) return;

	return filePathSlice === importFromSlice && filePathLayer === importFromLayer
}


