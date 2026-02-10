/** @type {import("stylelint").Config} */
export default {
  "customSyntax" : "postcss-styled-syntax",
  "extends": ["stylelint-config-standard"],
  "rules": {
    "unit-allowed-list": [
      "px",
      "em",
      "rem"
    ],
    "block-no-empty": true,
    "declaration-property-value-keyword-no-deprecated": true,
    "comment-no-empty": true,
    "comment-empty-line-before": null,
    "selector-not-notation": null
  }
};
