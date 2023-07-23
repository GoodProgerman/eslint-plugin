"use strict";
const path = require('path');
const { isPathRelative } = require('../helpers');
// const OS = require('os');

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
   type: 'problem', // `problem`, `suggestion`, or `layout`
   docs: {
     description: "Checks if the path must be relative",
     recommended: false,
     url: null, // URL to the documentation page for this rule
   },
   fixable: null, // Or `code` or `whitespace`
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
			const filePath = context.filename

			if(shouldBeRelative(filePath, importFrom)){
				context.report({node: node, messageId: "pathInSameSlice"})
			}
		}
   };
  },
};

function shouldBeRelative(filePath, importFrom ) {
	if(isPathRelative(importFrom)) return;

	const importFromArray = importFrom.split('/')
	const importFromLayer = importFromArray[0]
	const importFromSlice = importFromArray[1]

	if(!importFromLayer || !importFromSlice || !layers[importFromLayer]) return;

	const normalizedPath = path.toNamespacedPath(filePath)
	const filePathInSrc = normalizedPath.split('src')[1]
	const filePathArray = filePathInSrc.split(/\\|\//)
	// const filePathArray = filePathInSrc.split('\\')

	const filePathLayer = filePathArray[1];
	const filePathSlice = filePathArray[2];

	if(!filePathLayer || !filePathSlice || !layers[filePathLayer]) return;

	return filePathSlice === importFromSlice && filePathLayer === importFromLayer
}

const layers = {
	'shared': 'shared',
	'entities': 'entities',
	'features': 'features',
	'widgets': 'widgets',
	'pages': 'pages',
	'app': 'app',
}
