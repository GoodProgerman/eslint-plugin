/**
 * @fileoverview Checks if the path must be relative
 * @author Idris
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/relative-path-checker"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
	parserOptions: { ecmaVersion: 6, sourceType: 'module' }
});
ruleTester.run("relative-path-checker", rule, {
  valid: [
	{
		filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\entities\\Article',
      code: "import { AddNewComment } from '../../AddNewComment/components/AddNewComment'",
      errors: [],
    },
  ],

  invalid: [
    {
		filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\entities\\Article',
      code: "import { AddNewComment } from 'entities/Article/AddNewComment/components/AddNewComment'",
      errors: [{ messageId: "pathInSameSlice"}],
    },
    {
		filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\entities\\Article',
      code: "import { AddNewComment } from '@/entities/Article/AddNewComment/components/AddNewComment'",
      errors: [{ messageId: "pathInSameSlice"}],
		options: [
			{
				alias: '@'
			}
		]
    },
  ],
});
