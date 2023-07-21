
"use strict";
const path = require('path')
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
	let alias;
	if(context.options[0]) {
		alias = context.options[0].alias || ''
	} else {
		alias = ''
	}
	// const alias = context.options[0]?.alias || ''
	
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

const layers = {
	'shared': 'shared',
	'entities': 'entities',
	'features': 'features',
	'widgets': 'widgets',
	'pages': 'pages',
	'app': 'app',
}

// function normalizePath(execPath) {
// 	let splitter = (OS.type() === "Windows_NT") ? "\\" : "/";
// 	const normalizedPath = path.normalize(execPath)
// 	let nameSpacedPath = normalizedPath.split(splitter);
// 	return (nameSpacedPath.join('/'));
// }

function isPathRelative(path) {
	return path === '.' || path.startsWith('./') ||path.startsWith('../')
}

function shouldBeRelative(filePath, importFrom ) {
	if(isPathRelative(importFrom)) {
		return false
	}

	const importFromArray = importFrom.split('/')
	const importFromLayer = importFromArray[0]
	const importFromSlice = importFromArray[1]

	if(!importFromLayer || !importFromSlice || !layers[importFromLayer]) {
		return false
	}

	const normalizedPath = path.toNamespacedPath(filePath)
	const filePathInSrc = normalizedPath.split('src')[1]
	const filePathArray = filePathInSrc.split(/\\|\//)
	// const filePathArray = filePathInSrc.split('\\')

	const filePathLayer = filePathArray[1];
	const filePathSlice = filePathArray[2];

	if(!filePathLayer || !filePathSlice || !layers[filePathLayer]) {
		return false
	}

	return filePathSlice === importFromSlice && filePathLayer === importFromLayer
}
