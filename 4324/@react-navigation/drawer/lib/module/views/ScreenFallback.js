function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { ResourceSavingView } from '@react-navigation/elements';
import * as React from 'react';
import { View } from 'react-native';
let Screens;

try {
  Screens = require('react-native-screens');
} catch (e) {// Ignore
}

export const MaybeScreenContainer = _ref => {
  var _Screens, _Screens$screensEnabl;

  let {
    enabled,
    ...rest
  } = _ref;

  if ((_Screens = Screens) !== null && _Screens !== void 0 && (_Screens$screensEnabl = _Screens.screensEnabled) !== null && _Screens$screensEnabl !== void 0 && _Screens$screensEnabl.call(_Screens)) {
    return /*#__PURE__*/React.createElement(Screens.ScreenContainer, _extends({
      enabled: enabled
    }, rest));
  }

  return /*#__PURE__*/React.createElement(View, rest);
};
export function MaybeScreen(_ref2) {
  var _Screens2, _Screens2$screensEnab;

  let {
    visible,
    children,
    ...rest
  } = _ref2;

  if ((_Screens2 = Screens) !== null && _Screens2 !== void 0 && (_Screens2$screensEnab = _Screens2.screensEnabled) !== null && _Screens2$screensEnab !== void 0 && _Screens2$screensEnab.call(_Screens2)) {
    return /*#__PURE__*/React.createElement(Screens.Screen, _extends({
      activityState: visible ? 2 : 0
    }, rest), children);
  }

  return /*#__PURE__*/React.createElement(ResourceSavingView, _extends({
    visible: visible
  }, rest), children);
}
//# sourceMappingURL=ScreenFallback.js.map