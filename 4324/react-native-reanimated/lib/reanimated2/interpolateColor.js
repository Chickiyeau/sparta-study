import { hsvToColor, RGBtoHSV, rgbaColor, processColor, red, green, blue, opacity, } from './Colors';
import { makeMutable } from './core';
import { interpolate } from './interpolation';
// @ts-ignore JS file
import { Extrapolate } from '../reanimated1/derived';
import { useSharedValue } from './hook/useSharedValue';
const interpolateColorsHSV = (value, inputRange, colors) => {
    'worklet';
    const h = interpolate(value, inputRange, colors.h, Extrapolate.CLAMP);
    const s = interpolate(value, inputRange, colors.s, Extrapolate.CLAMP);
    const v = interpolate(value, inputRange, colors.v, Extrapolate.CLAMP);
    return hsvToColor(h, s, v);
};
const interpolateColorsRGB = (value, inputRange, colors) => {
    'worklet';
    const r = interpolate(value, inputRange, colors.r, Extrapolate.CLAMP);
    const g = interpolate(value, inputRange, colors.g, Extrapolate.CLAMP);
    const b = interpolate(value, inputRange, colors.b, Extrapolate.CLAMP);
    const a = interpolate(value, inputRange, colors.a, Extrapolate.CLAMP);
    return rgbaColor(r, g, b, a);
};
const getInterpolateRGB = (colors) => {
    'worklet';
    const r = [];
    const g = [];
    const b = [];
    const a = [];
    for (let i = 0; i < colors.length; ++i) {
        const color = colors[i];
        const processedColor = processColor(color);
        // explicit check in case if processedColor is 0
        if (processedColor !== null && processedColor !== undefined) {
            r.push(red(processedColor));
            g.push(green(processedColor));
            b.push(blue(processedColor));
            a.push(opacity(processedColor));
        }
    }
    return { r, g, b, a };
};
const getInterpolateHSV = (colors) => {
    'worklet';
    const h = [];
    const s = [];
    const v = [];
    for (let i = 0; i < colors.length; ++i) {
        const color = colors[i];
        const processedColor = RGBtoHSV(processColor(color));
        if (processedColor) {
            h.push(processedColor.h);
            s.push(processedColor.s);
            v.push(processedColor.v);
        }
    }
    return { h, s, v };
};
export const interpolateColor = (value, inputRange, outputRange, colorSpace = 'RGB') => {
    'worklet';
    if (colorSpace === 'HSV') {
        return interpolateColorsHSV(value, inputRange, getInterpolateHSV(outputRange));
    }
    else if (colorSpace === 'RGB') {
        return interpolateColorsRGB(value, inputRange, getInterpolateRGB(outputRange));
    }
    throw new Error(`Invalid color space provided: ${colorSpace}. Supported values are: ['RGB', 'HSV']`);
};
export var ColorSpace;
(function (ColorSpace) {
    ColorSpace[ColorSpace["RGB"] = 0] = "RGB";
    ColorSpace[ColorSpace["HSV"] = 1] = "HSV";
})(ColorSpace || (ColorSpace = {}));
export function useInterpolateConfig(inputRange, outputRange, colorSpace = ColorSpace.RGB) {
    return useSharedValue({
        inputRange,
        outputRange,
        colorSpace,
        cache: makeMutable(null),
    });
}
export const interpolateSharableColor = (value, interpolateConfig) => {
    'worklet';
    let colors = interpolateConfig.value.cache.value;
    if (interpolateConfig.value.colorSpace === ColorSpace.RGB) {
        if (!colors) {
            colors = getInterpolateRGB(interpolateConfig.value.outputRange);
            interpolateConfig.value.cache.value = colors;
        }
        return interpolateColorsRGB(value, interpolateConfig.value.inputRange, colors);
    }
    else if (interpolateConfig.value.colorSpace === ColorSpace.HSV) {
        if (!colors) {
            colors = getInterpolateHSV(interpolateConfig.value.outputRange);
            interpolateConfig.value.cache.value = colors;
        }
        return interpolateColorsHSV(value, interpolateConfig.value.inputRange, colors);
    }
    throw new Error(`Invalid color space provided: ${interpolateConfig.value.colorSpace}. Supported values are: ['RGB', 'HSV']`);
};
