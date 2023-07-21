# eslint-plugin-fsd-paths-guard

Eslint pligin for control imports&#39; paths according to architectural methodology &#34;Feature-sliced-design&#34;. 

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
        "fsd-paths-guard/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


