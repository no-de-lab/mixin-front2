module.exports = {
  extends: ['stylelint-config-recommended'],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
    'block-no-empty': null,
    'scss/at-rule-no-unknown': true,
    'order/properties-alphabetical-order': true,
    'no-empty-source': null,
    'rule-empty-line-before': null,
    'selector-list-comma-newline-after': null,
    'no-descending-specificity': null,
  },
};
