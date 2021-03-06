"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useTransitionProgress;

var React = _interopRequireWildcard(require("react"));

var _TransitionProgressContext = _interopRequireDefault(require("./TransitionProgressContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function useTransitionProgress() {
  const progress = React.useContext(_TransitionProgressContext.default);

  if (progress === undefined) {
    throw new Error("Couldn't find values for transition progress. Are you inside a screen in Native Stack?");
  }

  return progress;
}
//# sourceMappingURL=useTransitionProgress.js.map