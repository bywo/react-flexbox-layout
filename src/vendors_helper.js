// Get the browser specific flex prefix and cache it for use in flex layouts
let cachedDisplayFlex;
export let prefixDisplayFlex = function() {
  if (!cachedDisplayFlex && typeof document !== "undefined") {
    // the one that "sticks" is the one that works in this browser
    let div = document.createElement('div');
    div.style.display = '-webkit-box';
    div.style.display = '-webkit-flex';
    div.style.display = '-ms-flexbox';
    div.style.display = 'flex';
    cachedDisplayFlex = div.style.display;
  }

  return cachedDisplayFlex || 'flex';
};

export let cssValueToOldFlexSyntax = function(value) {
  if (value === 'flex-start') return 'start';
  if (value === 'flex-end') return 'end';

  return value;
};

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
