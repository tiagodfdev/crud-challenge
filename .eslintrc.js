module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb",
        "plugin:import/typescript"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "import/extensions": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx",".tsx"] }],
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error"]
    },
    "settings": {
        "import/resolver": {
          "node": {
            "extensions": [".js", ".jsx", ".ts", ".tsx"],
            "moduleDirectory": ['node_modules', 'src/'],
          }
        }
      },
};
