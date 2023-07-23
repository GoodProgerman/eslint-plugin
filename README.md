# eslint-plugin-fsd-paths-guard

Eslint pligin for control imports paths according to architectural methodology Feature-sliced-design. 

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-fsd-paths-guard`:

```sh
npm install eslint-plugin-fsd-paths-guard --save-dev
```

## Usage

Add `fsd-paths-guard` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "fsd-paths-guard"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
   "rules": {
      "fsd-paths-guard/relative-path-checker": ["error", { alias: "@" }],
      "fsd-paths-guard/public-api-imports": [
         "error",
         {
            // Если вы используете алиасы
            "alias": "@",
            // Массив регулярных выражений. 
            // Тестовые файлы, в которые данные будут импортроваться из Testing Public API.
            "testFilesPatterns": ["**/*.test.*", "**/*.StoreDecorator.ts", "**/*.stories.ts"],
         },
      ],
      "fsd-paths-guard/hierarchy-imports-between-layers": [
         "error",
         {
            "alias": "@",
            // Массив регулярных выражений. 
            // Если импорт содержит одну из этих выражений, то правило игнорирует такой импорт.
            "ignoreImportPatterns": ["**/StoreProvider", "**/testing"],
         },
      ],     
   }
}
```

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
Github - /
<!-- end auto-generated rules list -->


