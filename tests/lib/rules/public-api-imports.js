/**
 * @fileoverview Imports from other layers should be only with Public API
 * @author Idris
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/public-api-imports"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const options = [
   {
      alias: '@',
      testFilesPatterns: ['**/*.test.*', '**/*.StoreDecorator.ts', '**/*.stories.ts',]
   }
]

const ruleTester = new RuleTester({
   parserOptions: { ecmaVersion: 6, sourceType: 'module' }
});
ruleTester.run("public-api-imports", rule, {
   valid: [
      {
         code: "import { AddNewComment } from '../../AddNewComment/components/AddNewComment'",
         errors: [],
      },
      {
         code: "import { AddNewComment } from '@/entities/Article'",
         errors: [],
         options: options
      },
		// ===
		{
			filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\entities\\Article/ArticleDetails.test.tsx',
			code: "import { AddNewComment } from '@/entities/Article/testing'",
			errors: [],
			options: options
		},
     ],
   
     invalid: [
      {
        code: "import { AddNewComment } from 'entities/Article/AddNewComment/components/AddNewComment'",
        errors: [{ message: "Абсолютный импорт возможен лишь только через Public API"}],
      },
      {
        code: "import { AddNewComment } from '@/entities/Article/AddNewComment/components/AddNewComment'",
        errors: [{ message: "Абсолютный импорт возможен лишь только через Public API"}],
        options: options
      },
		// ====
      {
        filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\entities\\Article/ArticleDetails.tsx',
        code: "import { AddNewComment } from '@/entities/Article/testing'",
        errors: [{ message: "Тестовые данные необходимо импортировать из Testing Public API"}],
        options: options
      },
     ],
});
