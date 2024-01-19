/**
 * @fileoverview Запрещает делать относительные импорты к паблик апи текущего слайса.
 * @author Idris
 */
"use strict";

const { isPathRelative } = require("../helpers");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Запрещает делать относительные импорты к паблик апи текущего слайса.",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      noRelativeImportToPublicApi: "Нельзя использовать относительные импорты к Public Api текущего слайса.",
   }
  },

  create(context) {
   if(!context.filename.includes('src')) return;

	// Судя по всему, из одного файла получить доступ к другому файлу не получится.
	// А потому и сделать автофикс не получится.
	// context.cwd

    return {
      ImportDeclaration(node) {
        const value = node.source.value;
        if(isPathRelative(value)) {
         if(value.endsWith('/testing') || value.endsWith('/index') || value.endsWith('.') || value.endsWith('/')) {
            context.report({
               node: node, 
               messageId: "noRelativeImportToPublicApi",
					// fix: (fixer) => {
					// 	// context.
					// 	return fixer.replaceText()
					// }
            })
         }
        }
      }
    };
  },
};

// testing.ts