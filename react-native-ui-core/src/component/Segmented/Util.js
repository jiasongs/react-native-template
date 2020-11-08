export function isEqualToLayout(aLayout, bLayout) {
  if (!aLayout || !bLayout) {
    return false;
  }
  if (
    Math.round(aLayout.width) !== Math.round(bLayout.width) ||
    Math.round(aLayout.height) !== Math.round(bLayout.height) ||
    Math.round(aLayout.x) !== Math.round(bLayout.x) ||
    Math.round(aLayout.y) !== Math.round(bLayout.y)
  ) {
    return false;
  }
  return true;
}

export function mergeProps(aProps, bProps) {
  const itemProps = aProps ? aProps : {};
  const newItemProps = { ...itemProps };
  let key;
  for (key in bProps) {
    if (key.indexOf('item') !== -1 && !itemProps[key]) {
      newItemProps[key] = bProps[key];
    }
  }
  for (key in newItemProps) {
    let newKey = key.slice();
    const value = newItemProps[key];
    if (key.indexOf('item') !== -1) {
      newKey = key.slice(4);
      const firstChar = newKey.charAt(0);
      newKey = newKey.replace(firstChar, firstChar.toLowerCase());
      delete newItemProps[key];
    }
    newItemProps[newKey] = value;
  }
  return newItemProps;
}
