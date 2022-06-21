module.exports = {
    env: {
        browser: true,
        es6: true,
        node: false,
    },
    rules: {
        "eqeqeq": "error",
        "no-dupe-args": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-duplicate-imports": "error",
        "no-empty": "error",
        "no-self-compare": "error",
        "no-unreachable": "error",

        "quotes": ["error", "double", {
            "allowTemplateLiterals": true,
        }],

        "react/display-name": "error",
        "react/prop-types": "off",

        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-empty-interface": "off",
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    plugins: [
        "@typescript-eslint",
    ],
    ignorePatterns: [
        "**/node_modules/**",
        "**/build/**",
        "craco.config.js",
        "build.js",
    ],
}