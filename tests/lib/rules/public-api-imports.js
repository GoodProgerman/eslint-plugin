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
         // Путь относительный
        filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\entities\\Article/ArticleDetails.tsx',
         code: "import { AddNewComment } from '../../AddNewComment/components/AddNewComment'",
         errors: [],
      },
      {
         // should be relative
        filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\entities\\Article/ArticleDetails.tsx',
         code: "import { AddNewComment } from '@/entities/Article'",
         errors: [],
         options: options
      },
      {
         // Верхний слой импортрует нижний через Public API
        filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\features\\Article/ArticleDetails.tsx',
         code: "import { AddNewComment } from '@/entities/Article'",
         errors: [],
         options: options
      },
      // ===
      {
         // should be relative
         filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\entities\\Article/ArticleDetails.test.tsx',
         code: "import { AddNewComment } from '@/entities/Article/testing'",
         errors: [],
         options: options
      },
      {
         filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\features\\Article/ArticleDetails.test.tsx',
         code: "import { AddNewComment } from '@/entities/Article/testing'",
         errors: [],
         options: options
      },
     ],
   

     
     invalid: [
      {
        filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\features\\Article/ArticleDetails.tsx',
        code: "import { AddNewComment } from 'entities/Article/AddNewComment/components/AddNewComment'",
        errors: [{ messageId: "necessaryPublicApiImport"}],
        output: "import { AddNewComment } from 'entities/Article'"
      },
      {
        filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\features\\Article/ArticleDetails.tsx',
        code: "import { AddNewComment } from '@/entities/Article/AddNewComment/components/AddNewComment'",
        errors: [{ messageId: "necessaryPublicApiImport"}],
        options: options,
        output: "import { AddNewComment } from '@/entities/Article'"
      },
      // ====================
      {
        filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\features\\Article/ArticleDetails.tsx',
        code: "import { AddNewComment } from '@/entities/Article/testing'",
        errors: [{ messageId: "forbiddenToImportFromTestingPublicApi"}],
        options: options,
        output: null
      },
      {
        filename: 'C:\\Users\\user\\Desktop\\javascript\\eslint-plugin\\src\\features\\Article/ArticleDetails.test.tsx',
        code: "import { AddNewComment } from '@/entities/Article'",
        errors: [{ messageId: "necessaryImportFromTestingPublicApi"}],
        options: options,
        output: null
      },
     ],
});
