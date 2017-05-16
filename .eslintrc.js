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
		"jsx-a11y/no-static-element-interactions": "off"
	},
	"env": {
    "jest": true
	},
	"consistent-return": ["error", { "treatUndefinedAsUnspecified": true }],
	"arrow-body-style": ["error", "as-needed"],
	
};