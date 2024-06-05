module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb',
        'airbnb-typescript'
    ],
    settings: {
        "react": {
            "version": "detect"
        },
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        },
    },
    parserOptions: {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module",
        "createDefaultProgram": true,
        "project": "./tsconfig.json",
    },
    settings: { react: { version: '18.2' } },
    plugins: [
        '@typescript-eslint',
        "react",
        "react-hooks",
        "import",
    ],
    ignorePatterns: ['dist', '.eslintrc.js', 'postcss.config.js'],
    rules: {
        "no-continue": "off",
        "jsx-a11y/no-noninteractive-element-interactions": "off",
        "react/jsx-no-useless-fragment": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "react/jsx-props-no-spreading": "off",
        "class-methods-use-this": "off",
        "jsx-a11y/no-static-element-interactions": "off",
        "no-restricted-exports": "off",
        "react/require-default-props": "off",
        "react/function-component-definition": "off",
        "no-param-reassign": "off",
        "consistent-return": "off",
        "import/prefer-default-export": "off",
        "no-nested-ternary": "off",
        'no-unused-vars': 'off',
        'no-undef': 'off',
        "array-bracket-newline": [
            "error",
            "consistent"
        ],
        "no-console": ["warn", { allow: ["warn"] }],
        "array-bracket-spacing": [
            "error",
            "never"
        ],
        "@typescript-eslint/padding-line-between-statements": [
            "error",
            {
                "blankLine": "always",
                "prev": "*",
                "next": "export"
            },
            {
                "blankLine": "always",
                "prev": "*",
                "next": "return"
            },
            {
                "blankLine": "always",
                "prev": ["interface", "type"],
                "next": "*"
            }
        ],
        "array-element-newline": [
            "error",
            "consistent"
        ],
        "arrow-parens": "error",
        "no-shadow": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-shadow": "off",
        "@typescript-eslint/no-explicit-any": "warn",
        "arrow-body-style": "warn",
        "brace-style": [
            "error",
            "1tbs",
            {
                "allowSingleLine": false
            },
        ],
        "computed-property-spacing": [
            "error",
            "never"
        ],
        "key-spacing": [
            "error", {
                "afterColon": true
            }
        ],
        "lines-between-class-members": ["off"],
        "max-len": ["error", {
            "code": 120,
            "tabWidth": 2,
            "ignoreComments": true,
            "ignoreTrailingComments": true,
            "ignoreUrls": true,
            "ignoreRegExpLiterals": true,
            "ignoreStrings": true,
            "ignoreTemplateLiterals": true
        }],
        "no-trailing-spaces": "error",
        "no-multiple-empty-lines": ["error", {
            "max": 1,
            "maxEOF": 0,
            "maxBOF": 0
        }],
        "default-case": "error",
        "jsx-quotes": ["error", "prefer-double"],
        "no-whitespace-before-property": "error",
        "indent": "off",
        "no-tabs": "error",
        "eol-last": ["error", "always"],
        "@typescript-eslint/member-delimiter-style": [
            "warn",
            {
                "multiline": {
                    "delimiter": "semi",
                    "requireLast": true
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                }
            }
        ],
    }
}