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
		filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\entities\\Article/components/AddNewComment/AddNewComment.tsx',
      code: "import { articleSlice } from 'entities/Article/model/slice/articleSlice'",
      errors: [{ messageId: "pathInSameSlice"}],
		output: "import { articleSlice } from '../../model/slice/articleSlice'"
    },
    {
		filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\entities\\Article/components/AddNewComment/AddNewComment.tsx',
      code: "import { articleSlice } from '@/entities/Article/model/slice/articleSlice'",
      errors: [{ messageId: "pathInSameSlice"}],
		output: "import { articleSlice } from '../../model/slice/articleSlice'",
		options: [
			{
				alias: '@'
			}
		],
    },
    {
		filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\entities\\Article/components/AddNewComment/AddNewComment.tsx',
      code: "import { articleSlice } from '../../shared/Modal/Modal'",
      errors: [{ messageId: "relativePathBetweenLayers"}],
		output: null,
		options: [
			{
				alias: '@'
			}
		],
    },
  ],
});
