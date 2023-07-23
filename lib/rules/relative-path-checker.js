"use strict";
const path = require('path')
const { getNormalizedPath, shouldBeRelative } = require('../helpers');

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

			if(!shouldBeRelative(normalizedPath, importFrom)) return;
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
   };
  },
};



