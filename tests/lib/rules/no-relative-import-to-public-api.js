/**
 * @fileoverview Запрещает делать относительные импорты к паблик апи текущего слайса.
 * @author Idris
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-relative-import-to-public-api"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
	parserOptions: { ecmaVersion: 6, sourceType: 'module' }
});

ruleTester.run("no-relative-import-to-public-api", rule, {
  valid: [
	{
		filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\entities\\Article\\components\\ArticleDetails\\ArticleDetails.tsx',
      code: "import { AddNewComment } from '../ArticleList/ArticleList'",
      errors: [],
    },
  ],
  
  invalid: [
	{
		filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\entities\\Article\\components\\ArticleDetails\\ArticleDetails.tsx',
      code: "import { AddNewComment } from '../..'",
      errors: [{ messageId: "noRelativeImportToPublicApi"}],
    },
	{
		filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\entities\\Article\\components\\ArticleDetails\\ArticleDetails.tsx',
      code: "import { AddNewComment } from '../../'",
      errors: [{ messageId: "noRelativeImportToPublicApi"}],
    },
	{
		filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\entities\\Article\\components\\ArticleDetails\\ArticleDetails.tsx',
      code: "import { AddNewComment } from '../../index'",
      errors: [{ messageId: "noRelativeImportToPublicApi"}],
    },
	{
		filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\entities\\Article\\components\\ArticleDetails\\ArticleDetails.tsx',
      code: "import { AddNewComment } from '../../testing'",
      errors: [{ messageId: "noRelativeImportToPublicApi"}],
    },
  ],
});
