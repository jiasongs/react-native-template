import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ThemeContext } from '../Provider';

function isClassComponent(Component) {
  return Boolean(Component.prototype && Component.prototype.isReactComponent);
}

const withTheme = (WrappedComponent, key) => {
  class ThemedComponent extends React.PureComponent {
    getThemeValue = (context) => {
      if (key && context) {
        if (Array.isArray(key)) {
          const newThemeValue = {};
          key.forEach((itemKey) => {
            newThemeValue[itemKey] = context[itemKey];
          });
          return newThemeValue;
        }
        return context[key];
      } else {
        return context;
      }
    };

    render() {
      const { forwardedRef, ...others } = this.props;
      return (
        <ThemeContext.Consumer>
          {(context) => {
            if (isClassComponent(WrappedComponent)) {
              return (
                <WrappedComponent
                  ref={forwardedRef}
                  themeValue={this.getThemeValue(context)}
                  {...others}
                />
              );
            }
            return null;
          }}
        </ThemeContext.Consumer>
      );
    }
  }
  if (isClassComponent(WrappedComponent)) {
    const ForwardComponent = React.forwardRef((props, ref) => (
      <ThemedComponent {...props} forwardedRef={ref} />
    ));
    return hoistNonReactStatics(ForwardComponent, WrappedComponent);
  }
  return null;
};

export default withTheme;
