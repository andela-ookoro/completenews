module.exports = {
	"extends": "airbnb",
  "plugins": ["react","jsx-a11y","import"],
	"globals": {
    "window": true,
		"localStorage": true,
		"$": true,
		"console": true
  },
	"rules": {
		"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
	}
};