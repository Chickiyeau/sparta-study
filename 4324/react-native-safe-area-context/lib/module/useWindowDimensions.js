import { Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
// Copied from https://github.com/facebook/react-native/blob/8d57691a/Libraries/Utilities/useWindowDimensions.js
// for compatibility with React Native < 0.61.
export default function useWindowDimensions() {
  const [dimensions, setDimensions] = useState(() => Dimensions.get('window'));
  useEffect(() => {
    function handleChange(_ref) {
      let {
        window
      } = _ref;

      if (dimensions.width !== window.width || dimensions.height !== window.height || dimensions.scale !== window.scale || dimensions.fontScale !== window.fontScale) {
        setDimensions(window);
      }
    }

    Dimensions.addEventListener('change', handleChange); // We might have missed an update between calling `get` in render and
    // `addEventListener` in this handler, so we set it here. If there was
    // no change, React will filter out this update as a no-op.

    handleChange({
      window: Dimensions.get('window')
    });
    return () => {
      Dimensions.removeEventListener('change', handleChange);
    };
  }, [dimensions]);
  return dimensions;
}
//# sourceMappingURL=useWindowDimensions.js.map