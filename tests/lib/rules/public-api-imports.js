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

const aliasOptions = [
	{
		alias: '@'
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
			options: aliasOptions
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
        options: aliasOptions
      },
     ],
});
