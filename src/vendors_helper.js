export let prefixFlexProp = function(style, grow, shrink, basis) {
  style.WebkitBoxFlex = grow;
  style.WebkitFlexGrow = grow;
  style.msFlexPositive = grow;
  style.flexGrow = grow;

  style.WebkitFlexShrink = shrink;
  style.msFlexNegative = shrink;
  style.flexShrink = shrink;

  style.WebkitFlexBasis = basis;
  style.msFlexPreferredSize = basis;
  style.flexBasis = basis;

  return style;
};
