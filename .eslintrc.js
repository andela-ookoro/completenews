module.exports = {
	"extends": "airbnb",
  "plugins": ["react","jsx-a11y","import"],
	"globals": {
    "window": true,
		"localStorage": true,
		"$": true,
		"console": true,
		"document": true
  },
	"rules": {
		"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
		"react/jsx-boolean-value": "off",
		"react/no-array-index-key": "off",
		"jsx-a11y/img-redundant-alt": "off",
		"no-prototype-builtins": "off",
		"quote-props": "off",
		"jsx-a11y/no-static-element-interactions": "off",
		"one-var": 0,
        "jsx-a11y/href-no-hash": 0,
        "one-var-declaration-per-line": 0,
        "new-cap": 0,
        "consistent-return": 0,
        "no-param-reassign": 0,
        "comma-dangle": 0,
        "no-nested-ternary": 0,
        "curly": ["error", "multi-line"],
        "no-shadow": ["error", { "allow": ["req", "res", "err"] }],
        "valid-jsdoc": ["error", {
        "requireReturn": true,
        "requireReturnType": true,
        "requireParamDescription": false,
        "requireReturnDescription": true
        }],
        "require-jsdoc": ["error", {
            "require": {
                "FunctionDeclaration": true,
                "MethodDefinition": true,
                "ClassDeclaration": true
            }
        }]
	},
	"env": {
    "jest": true
	},
	"consistent-return": ["error", { "treatUndefinedAsUnspecified": true }],
	"arrow-body-style": ["error", "as-needed"],
	
};