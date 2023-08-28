export const mapPropType = (props, propName, componentName) => {
  if (!(props[propName] instanceof Map)) {
    return new Error(
      `Invalid prop ${propName} supplied to ${componentName}. Expected a Map.`
    );
  }
};