/**
 * @fileoverview Some layers can only use underlying layers
 * @author Idris
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/hierarchy-imports-between-layers"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const options = [
   {
      alias: '@',
      ignoreImportPatterns: ['**/StoreProvider','**/testing',]
   }
]

const ruleTester = new RuleTester({
   parserOptions: { ecmaVersion: 6, sourceType: 'module' }
});
ruleTester.run("hierarchy-imports-between-layers", rule, {
  valid: [
	{
      filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\entities\\Article/ArticleDetails.tsx',
      code: "import { AddNewComment } from '@/shared/Article'",
      errors: [],
      options: options
   },
	{
      filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\entities\\Article/ArticleDetails.tsx',
      code: "import { AddNewComment } from '@/entities/Article'",
      errors: [],
      options: options
   },
	{
      filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\features\\Article/ArticleDetails.tsx',
      code: "import { AddNewComment } from '@/entities/Article'",
      errors: [],
      options: options
   },
	{
      filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\widgets\\Article/ArticleDetails.tsx',
      code: "import { AddNewComment } from '@/features/Article'",
      errors: [],
      options: options
   },
	{
      filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\pages\\Article/ArticleDetails.tsx',
      code: "import { AddNewComment } from '@/widgets/Article'",
      errors: [],
      options: options
   },
	{
      filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\app\\Article/ArticleDetails.tsx',
      code: "import { AddNewComment } from '@/pages/Article'",
      errors: [],
      options: options
   },
	{
      filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\app\\Article/ArticleDetails.tsx',
      code: "import { useLocation } from 'react-router-dom'",
      errors: [],
      options: options
   },
	{
      filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\index.tsx',
      code: "import { AddNewComment } from '@/app/Article'",
      errors: [],
      options: options
   },
	{
      filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\entities\\Article/ArticleDetails.tsx',
      code: "import { StateSchema } from '@/app/providers/StoreProvider'",
      errors: [],
      options: options
   },
  ],

  invalid: [
   {
      filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\entities\\Article/ArticleDetails.tsx',
      code: "import { AddNewComment } from '@/features/Article'",
      errors: [{ messageId: "importNotFromAllowedLayer"}],
      options: options
   },
  ],
});
