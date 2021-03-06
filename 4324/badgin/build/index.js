'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

let warnedBefore = false;
const warn = () => {
    if (warnedBefore) {
        return;
    }
    // We will only warn the user if the Badging API is not available at all
    if ('ExperimentalBadge' in window || 'setExperimentalAppBadge' in navigator) {
        return;
    }
    console.warn('Badging API must be enabled. Please check here how you can enable it: https://developers.google.com/web/updates/2018/12/badging-api#use');
    warnedBefore = true;
};
const current = {
    mediaQuery: null,
    value: 0,
};
function isVersion1Available() {
    return 'ExperimentalBadge' in window && !!window.ExperimentalBadge;
}
function isVersion2Available() {
    return ('setExperimentalAppBadge' in navigator &&
        !!navigator.setExperimentalAppBadge &&
        'clearExperimentalAppBadge' in navigator &&
        !!navigator.clearExperimentalAppBadge);
}
function isAvailable() {
    if (!current.mediaQuery) {
        current.mediaQuery = window.matchMedia('(display-mode: standalone)');
        // Get notified once app is installed
        current.mediaQuery.onchange = event => {
            set(current.value);
        };
    }
    return (current.mediaQuery.matches &&
        (isVersion1Available() || isVersion2Available()));
}
function set(value) {
    current.value = value;
    if (!isAvailable()) {
        warn();
        return false;
    }
    // Sets the badge to contents (an integer), or to "flag" if contents is omitted. If contents is 0, clears the badge for the matching app(s).
    // See details here: https://github.com/WICG/badging/blob/master/explainer.md#the-api
    if (isVersion1Available()) {
        window.ExperimentalBadge.set(value);
        return true;
    }
    else if (isVersion2Available()) {
        navigator.setExperimentalAppBadge(value);
        return true;
    }
    return false;
}
function clear() {
    if (!isAvailable()) {
        return;
    }
    if (isVersion1Available()) {
        window.ExperimentalBadge.clear();
    }
    else if (isVersion2Available()) {
        navigator.clearExperimentalAppBadge();
    }
}

function deepMerge(target, source) {
    // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object)
            Object.assign(source[key], deepMerge(target[key], source[key]));
    }
    // Join `target` and modified `source`
    Object.assign(target || {}, source);
    return target;
}

function isPositiveNumber(value) {
    return (typeof value !== 'undefined' && Number.isInteger(value) && value >= 0);
}

const DefaultValue = 0;
const DefaultOptions = {
    backgroundColor: '#424242',
    color: '#ffffff',
    indicator: '!',
    radius: 3,
    size: 7,
    horizontalMargin: 0,
    verticalMargin: 0,
    horizontalPadding: 1,
    verticalPadding: 1,
};
const isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
// Get all favicons of the page
const getFavicons = () => {
    const links = document.head.getElementsByTagName('link');
    const favicons = [];
    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const href = link.getAttribute('href');
        const rel = link.getAttribute('rel');
        if (!href) {
            continue;
        }
        if (!rel) {
            continue;
        }
        if (rel.split(' ').indexOf('icon') === -1) {
            continue;
        }
        favicons.push(link);
    }
    return favicons;
};
// Get the favicon with the best quality of the document
const getBestFavicon = () => {
    const favicons = getFavicons();
    let bestFavicon = null;
    let bestSize = 0;
    for (let i = 0; i < favicons.length; i++) {
        const favicon = favicons[i];
        const href = favicon.getAttribute('href');
        const sizes = favicon.getAttribute('sizes');
        // If the href looks like it's an SVG, it's the best we can get
        if (href === null || href === void 0 ? void 0 : href.endsWith('.svg')) {
            return favicon;
        }
        // If the link does not have a "sizes" attribute, we use it only if we haven't found anything else yet
        if (!sizes) {
            if (!bestFavicon) {
                bestFavicon = favicon;
                bestSize = 0;
            }
            continue;
        }
        // If we find an icon with sizes "any", it's the best we can get
        if (sizes === 'any') {
            return favicon;
        }
        // Otherwise we will try to find the maximum size
        const size = parseInt(sizes.split('x')[0], 10);
        if (Number.isNaN(size)) {
            if (!bestFavicon) {
                bestFavicon = favicon;
                bestSize = 0;
            }
            continue;
        }
        if (size > bestSize) {
            bestFavicon = favicon;
            bestSize = size;
            continue;
        }
    }
    return bestFavicon;
};
// References to the favicons that we need to track in order to reset and update the counters
const current$1 = {
    favicons: null,
    bestFavicon: null,
    bestFaviconImage: null,
    value: DefaultValue,
    options: DefaultOptions,
};
// Get size depending on screen density
const devicePixelRatioListener = window.matchMedia('screen and (min-resolution: 2dppx)');
const getRatio = () => {
    return Math.ceil(window.devicePixelRatio) || 1;
};
const handleRatioChange = () => {
    set$1(current$1.value, current$1.options);
};
const getIconSize = () => {
    return 16 * getRatio();
};
// Update favicon
const setFavicon = (url) => {
    if (!url) {
        return;
    }
    // Remove previous favicons
    for (const favicon of getFavicons()) {
        if (favicon.parentNode) {
            favicon.parentNode.removeChild(favicon);
        }
    }
    // Create new favicon
    const newFavicon = document.createElement('link');
    newFavicon.id = 'badgin';
    newFavicon.type = 'image/x-icon';
    newFavicon.rel = 'icon favicon';
    newFavicon.href = url;
    document.getElementsByTagName('head')[0].appendChild(newFavicon);
};
// Draw the favicon
const drawFavicon = (image, value, options) => {
    const iconSize = getIconSize();
    const canvas = document.createElement('canvas');
    canvas.width = iconSize;
    canvas.height = iconSize;
    const context = canvas.getContext('2d');
    if (!context) {
        return;
    }
    // Draw new image
    image.width = iconSize;
    image.height = iconSize;
    context.drawImage(image, 0, 0, image.width, image.height);
    // Draw bubble on the top
    drawBubble(context, value, options);
    // Refresh tag in page
    setFavicon(canvas.toDataURL());
};
// Draws the bubble on the canvas
const drawBubble = (context, value, options) => {
    const ratio = getRatio();
    const iconSize = getIconSize();
    // Do we need to render the bubble at all?
    let finalValue = '';
    if (isPositiveNumber(value)) {
        if (value === 0) {
            finalValue = '';
        }
        else if (value < 100) {
            finalValue = String(value);
        }
        else {
            finalValue = '99+';
        }
    }
    else {
        finalValue = options.indicator;
    }
    // Return early
    if (!finalValue) {
        return;
    }
    // Calculate text width initially
    const textHeight = options.size - 2;
    const font = `${options.size * ratio}px Arial`;
    context.font = font;
    const { width: textWidth } = context.measureText(finalValue);
    context.restore();
    // Calculate position etc.
    const width = textWidth + 2 * options.horizontalPadding;
    const height = textHeight * ratio + 2 * options.verticalPadding;
    const top = iconSize - height - options.verticalMargin;
    const left = iconSize - width - options.horizontalMargin;
    const bottom = 16 * ratio - options.verticalMargin;
    const right = 16 * ratio - options.horizontalMargin;
    const radius = options.radius;
    // Bubble
    context.globalAlpha = 1;
    context.fillStyle = options.backgroundColor;
    context.strokeStyle = options.backgroundColor;
    context.lineWidth = 0;
    context.beginPath();
    context.moveTo(left + radius, top);
    context.quadraticCurveTo(left, top, left, top + radius);
    context.lineTo(left, bottom - radius);
    context.quadraticCurveTo(left, bottom, left + radius, bottom);
    context.lineTo(right - radius, bottom);
    context.quadraticCurveTo(right, bottom, right, bottom - radius);
    context.lineTo(right, top + radius);
    context.quadraticCurveTo(right, top, right - radius, top);
    context.closePath();
    context.fill();
    context.save();
    // Value
    context.font = font;
    context.fillStyle = options.color;
    context.textAlign = 'center';
    context.textBaseline = 'hanging';
    context.fillText(finalValue, left + width / 2, top + options.verticalPadding + (isFirefox ? 1 : 0));
    context.save();
    /*
    // Helper line
    context.restore()
    context.strokeStyle = '#ff0000'
    context.moveTo(0, top + height / 2)
    context.lineTo(iconSize, top + height / 2)
    context.stroke()
    context.save()
    */
};
function isAvailable$1() {
    return !!getBestFavicon();
}
function set$1(value, options) {
    // Remember options
    current$1.value = value;
    deepMerge(current$1.options, options || {});
    if (!isAvailable$1()) {
        return false;
    }
    // Remember favicons
    if (!current$1.bestFavicon) {
        const bestFavicon = getBestFavicon();
        if (bestFavicon) {
            const bestFaviconImage = document.createElement('img');
            // Allow cross origin resource requests if the image is not a data:uri
            if (!bestFavicon.href.match(/^data/)) {
                bestFaviconImage.crossOrigin = 'anonymous';
            }
            // Load image
            bestFaviconImage.src = bestFavicon.href;
            // Store for next time
            current$1.bestFavicon = bestFavicon;
            current$1.bestFaviconImage = bestFaviconImage;
        }
        // Once the device pixel ratio changes we set the value again
        devicePixelRatioListener.addEventListener('change', handleRatioChange);
    }
    if (!current$1.favicons) {
        current$1.favicons = getFavicons();
    }
    // The image is required for setting the badge
    if (!current$1.bestFaviconImage) {
        return false;
    }
    // If we have the image, we can draw immediately
    if (current$1.bestFaviconImage.complete) {
        drawFavicon(current$1.bestFaviconImage, current$1.value, current$1.options);
        return true;
    }
    // Otherwise we will wait for the load event
    current$1.bestFaviconImage.addEventListener('load', function () {
        drawFavicon(this, current$1.value, current$1.options);
    });
    return true;
}
function clear$1() {
    if (!isAvailable$1()) {
        return;
    }
    // Reset value and options
    current$1.value = DefaultValue;
    current$1.options = DefaultOptions;
    // Remove old listener
    devicePixelRatioListener.removeEventListener('change', handleRatioChange);
    if (current$1.favicons) {
        // Remove current favicons
        for (const favicon of getFavicons()) {
            if (favicon.parentNode) {
                favicon.parentNode.removeChild(favicon);
            }
        }
        // Recreate old favicons
        for (const favicon of current$1.favicons) {
            document.head.appendChild(favicon);
        }
        current$1.favicons = null;
        current$1.bestFavicon = null;
        current$1.bestFaviconImage = null;
    }
}

const defaultOptions = {
    indicator: '!',
};
const current$2 = {
    title: null,
    value: 0,
    options: defaultOptions,
};
function changeTitle(title, value, options) {
    let newTitle = title;
    if (isPositiveNumber(value)) {
        if (value === 0) {
            newTitle = title;
        }
        else {
            newTitle = `(${value}) ${title}`;
        }
    }
    else {
        newTitle = `(${options.indicator}) ${title}`;
    }
    const element = document.querySelector('title');
    if (element) {
        element.childNodes[0].nodeValue = newTitle;
    }
}
function set$2(value, options) {
    if (current$2.title === null) {
        current$2.title = document.title;
        // Watch changes of title
        Object.defineProperty(document, 'title', {
            get: () => {
                return current$2.title;
            },
            set: title => {
                current$2.title = title;
                changeTitle(current$2.title, current$2.value, current$2.options);
            },
        });
    }
    // Remember value and options
    current$2.value = value;
    deepMerge(current$2.options, options || {});
    // Trigger change
    document.title = document.title;
    return true;
}
function clear$2() {
    current$2.value = 0;
    // Trigger change
    document.title = document.title;
}

/**
 * Sets badge
 */
function set$3(value, options = {}) {
    switch (options.method) {
        case undefined:
        case 'Badging': {
            if (set(value)) {
                // Break only if method is explicitly requested
                if (options.method === 'Badging') {
                    break;
                }
            }
        }
        case 'Favicon': {
            if (set$1(value, options.favicon)) {
                break;
            }
        }
        default: {
            set$2(value, options.title);
        }
    }
}
/**
 * Clears badge
 */
function clear$3() {
    clear();
    clear$1();
    clear$2();
}

exports.clear = clear$3;
exports.set = set$3;
