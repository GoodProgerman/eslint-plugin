# eslint-plugin-fsd-paths-guard

Плагин для Eslint, который заставляет следовать архитектурной методологии _Feature-sliced-design_. 
Если нарушить правила данного плагина, то `eslint`, будет выдавать ошибку с объянением того, что нарушено.
Есть автоисправление.
Перед тем, как идти дальше, следует хорошо ознакомиться с методологией - [Feature-sliced-design](https://feature-sliced.design/)

## Installation

Для начала вам естественно нужно установить [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Затем нужно установить этот плагин - `eslint-plugin-fsd-paths-guard`:

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
            // Если вы используете алиас
            "alias": "@",
            // Массив паттернов. 
            // Тестовые файлы, в которые данные будут импортироваться из Testing Public API.
            "testFilesPatterns": ["**/*.test.*", "**/*.StoreDecorator.ts", "**/*.stories.ts"],
         },
      ],
      "fsd-paths-guard/hierarchy-imports-between-layers": [
         "error",
         {
            "alias": "@",
            // Массив паттернов. 
            // Если импорт соответствует одному из этих паттернов, то правило игнорирует такой импорт.
            "ignoreImportPatterns": ["**/StoreProvider", "**/testing"],
         },
      ],     
   }
}
```

---

## Правила

### Правило relative-path-checker

Это правило гласит:

- В рамках одного слайса пути должны быть относительными.
- Относительные импорты между слоями запрещены.


Если при абсолютных импортах вы используете алиас, то вы должны его передать аргументом в данное правило, как это сделано выше.

---

_Перед тем как идти дальше следует отметить, что под тестовым Public API(Testing Public API) подразумевается файл,
который лежит рядом с обычным Public API(`index.ts`) и имеет название - `testing.ts`.
Этот файл используется для того, чтобы экпортировать из слайса данные, которые нам не нужно будет импортировать
в production-код, но понадобятся в тестах._

---

### Правило public-api-imports

Это правило гласит:

- Абсолютный импорт в production-код возможен лишь только через Public API.
- Тестовые данные нельзя импортировать в production-код.
- Абсолютный импорт в тестовый файл возможен лишь только через Testing Public API.


Если при абсолютных импортах вы используете алиас, то вы должны его передать аргументом в данное правило, как это сделано выше.


Также вы можете передать в параметры данного правила, в поле `testFilesPatterns`, массив паттернов.
При помощи этих паттернов мы описываем, файлы с какими названиями у нас будут тестовыми, 
то есть, в какие файлы можно будет делать импорт из Testing Public API. Пример был показан выше.

---

### Правило hierarchy-imports-between-layers

Это правило гласит:

- Одни слои могут использовать внутри себя только нижележащие слои.

Благодаря этому правилу невозможно, например, в слайс из слоя entities импортировать данные 
слайса из слоя features, ведь слой features выше слоя entities, а согласно нашей архитектурной методологии, 
вышестоящие слои могут импортировать внутрь себя только нижележащие слои. Также один слайс из одного слоя 
не может импортировать в себя другой слайс из этого же слоя. Это правило не касается shared-слоя.

Исключение составляет и частично entities: 
Один слайс из слоя entities может импортировать в себя данные из других слайсов слоя entities.




Если при абсолютных импортах вы используете алиас, то вы должны его передать аргументом в данное правило, как это сделано выше.


Также вы можете передать в параметры данного правила, в поле `ignoreImportPatterns`, массив паттернов.
При помощи этих паттернов мы описываем, в файлы с какими названиями можно будет 
делать импорты из любых слоёв. То есть, это исключения для данного правила. 
К сожалению, соответствовать данной архитектурной методологии на все 100% наврядли получится.