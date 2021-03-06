"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ANDROID_RES_PATH = void 0;
exports.configureAdaptiveIconAsync = configureAdaptiveIconAsync;
exports.dpiValues = exports.createAdaptiveIconXmlString = void 0;
exports.getAdaptiveIcon = getAdaptiveIcon;
exports.getIcon = getIcon;
exports.setIconAsync = setIconAsync;
exports.withAndroidIcons = void 0;

function _configPlugins() {
  const data = require("@expo/config-plugins");

  _configPlugins = function () {
    return data;
  };

  return data;
}

function _imageUtils() {
  const data = require("@expo/image-utils");

  _imageUtils = function () {
    return data;
  };

  return data;
}

function _fsExtra() {
  const data = _interopRequireDefault(require("fs-extra"));

  _fsExtra = function () {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _withAndroidManifestIcons() {
  const data = require("./withAndroidManifestIcons");

  _withAndroidManifestIcons = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Colors
} = _configPlugins().AndroidConfig;

const dpiValues = {
  mdpi: {
    folderName: 'mipmap-mdpi',
    scale: 1
  },
  hdpi: {
    folderName: 'mipmap-hdpi',
    scale: 1.5
  },
  xhdpi: {
    folderName: 'mipmap-xhdpi',
    scale: 2
  },
  xxhdpi: {
    folderName: 'mipmap-xxhdpi',
    scale: 3
  },
  xxxhdpi: {
    folderName: 'mipmap-xxxhdpi',
    scale: 4
  }
};
exports.dpiValues = dpiValues;
const BASELINE_PIXEL_SIZE = 48;
const ANDROID_RES_PATH = 'android/app/src/main/res/';
exports.ANDROID_RES_PATH = ANDROID_RES_PATH;
const MIPMAP_ANYDPI_V26 = 'mipmap-anydpi-v26';
const ICON_BACKGROUND = 'iconBackground';
const IC_LAUNCHER_PNG = 'ic_launcher.png';
const IC_LAUNCHER_ROUND_PNG = 'ic_launcher_round.png';
const IC_LAUNCHER_BACKGROUND_PNG = 'ic_launcher_background.png';
const IC_LAUNCHER_FOREGROUND_PNG = 'ic_launcher_foreground.png';
const IC_LAUNCHER_XML = 'ic_launcher.xml';
const IC_LAUNCHER_ROUND_XML = 'ic_launcher_round.xml';

const withAndroidIcons = config => {
  const {
    foregroundImage,
    backgroundColor,
    backgroundImage
  } = getAdaptiveIcon(config);
  const icon = foregroundImage !== null && foregroundImage !== void 0 ? foregroundImage : getIcon(config);

  if (!icon) {
    return config;
  }

  config = (0, _withAndroidManifestIcons().withAndroidManifestIcons)(config); // Apply colors.xml changes

  config = withAndroidAdaptiveIconColors(config, backgroundColor);
  return (0, _configPlugins().withDangerousMod)(config, ['android', async config => {
    var _config$android;

    await setIconAsync(config.modRequest.projectRoot, {
      icon,
      backgroundColor,
      backgroundImage,
      isAdaptive: !!((_config$android = config.android) !== null && _config$android !== void 0 && _config$android.adaptiveIcon)
    });
    return config;
  }]);
};

exports.withAndroidIcons = withAndroidIcons;

const withAndroidAdaptiveIconColors = (config, backgroundColor) => {
  return (0, _configPlugins().withAndroidColors)(config, config => {
    config.modResults = setBackgroundColor(backgroundColor !== null && backgroundColor !== void 0 ? backgroundColor : '#FFFFFF', config.modResults);
    return config;
  });
};

function getIcon(config) {
  var _config$android2;

  return ((_config$android2 = config.android) === null || _config$android2 === void 0 ? void 0 : _config$android2.icon) || config.icon || null;
}

function getAdaptiveIcon(config) {
  var _config$android$adapt, _config$android3, _config$android3$adap, _config$android$adapt2, _config$android4, _config$android4$adap, _config$android$adapt3, _config$android5, _config$android5$adap;

  return {
    foregroundImage: (_config$android$adapt = (_config$android3 = config.android) === null || _config$android3 === void 0 ? void 0 : (_config$android3$adap = _config$android3.adaptiveIcon) === null || _config$android3$adap === void 0 ? void 0 : _config$android3$adap.foregroundImage) !== null && _config$android$adapt !== void 0 ? _config$android$adapt : null,
    backgroundColor: (_config$android$adapt2 = (_config$android4 = config.android) === null || _config$android4 === void 0 ? void 0 : (_config$android4$adap = _config$android4.adaptiveIcon) === null || _config$android4$adap === void 0 ? void 0 : _config$android4$adap.backgroundColor) !== null && _config$android$adapt2 !== void 0 ? _config$android$adapt2 : null,
    backgroundImage: (_config$android$adapt3 = (_config$android5 = config.android) === null || _config$android5 === void 0 ? void 0 : (_config$android5$adap = _config$android5.adaptiveIcon) === null || _config$android5$adap === void 0 ? void 0 : _config$android5$adap.backgroundImage) !== null && _config$android$adapt3 !== void 0 ? _config$android$adapt3 : null
  };
}
/**
 * Resizes the user-provided icon to create a set of legacy icon files in
 * their respective "mipmap" directories for <= Android 7, and creates a set of adaptive
 * icon files for > Android 7 from the adaptive icon files (if provided).
 */


async function setIconAsync(projectRoot, {
  icon,
  backgroundColor,
  backgroundImage,
  isAdaptive
}) {
  if (!icon) {
    return null;
  }

  await configureLegacyIconAsync(projectRoot, icon, backgroundImage, backgroundColor);
  await configureAdaptiveIconAsync(projectRoot, icon, backgroundImage, isAdaptive);
  return true;
}
/**
 * Configures legacy icon files to be used on Android 7 and earlier. If adaptive icon configuration
 * was provided, we create a pseudo-adaptive icon by layering the provided files (or background
 * color if no backgroundImage is provided. If no backgroundImage and no backgroundColor are provided,
 * the background is set to transparent.)
 */


async function configureLegacyIconAsync(projectRoot, icon, backgroundImage, backgroundColor) {
  await Promise.all(Object.values(dpiValues).map(async ({
    folderName,
    scale
  }) => {
    var _backgroundColor;

    const dpiFolderPath = _path().default.resolve(projectRoot, ANDROID_RES_PATH, folderName);

    const iconSizePx = BASELINE_PIXEL_SIZE * scale; // backgroundImage overrides backgroundColor

    backgroundColor = backgroundImage ? 'transparent' : (_backgroundColor = backgroundColor) !== null && _backgroundColor !== void 0 ? _backgroundColor : 'transparent';
    let squareIconImage = (await (0, _imageUtils().generateImageAsync)({
      projectRoot,
      cacheType: 'android-standard-square'
    }, {
      src: icon,
      width: iconSizePx,
      height: iconSizePx,
      resizeMode: 'cover',
      backgroundColor
    })).source;
    let roundIconImage = (await (0, _imageUtils().generateImageAsync)({
      projectRoot,
      cacheType: 'android-standard-circle'
    }, {
      src: icon,
      width: iconSizePx,
      height: iconSizePx,
      resizeMode: 'cover',
      backgroundColor,
      borderRadius: iconSizePx / 2
    })).source;

    if (backgroundImage) {
      // Layer the buffers we just created on top of the background image that's provided
      const squareBackgroundLayer = (await (0, _imageUtils().generateImageAsync)({
        projectRoot,
        cacheType: 'android-standard-square-background'
      }, {
        src: backgroundImage,
        width: iconSizePx,
        height: iconSizePx,
        resizeMode: 'cover',
        backgroundColor: 'transparent'
      })).source;
      const roundBackgroundLayer = (await (0, _imageUtils().generateImageAsync)({
        projectRoot,
        cacheType: 'android-standard-round-background'
      }, {
        src: backgroundImage,
        width: iconSizePx,
        height: iconSizePx,
        resizeMode: 'cover',
        backgroundColor: 'transparent',
        borderRadius: iconSizePx / 2
      })).source;
      squareIconImage = await (0, _imageUtils().compositeImagesAsync)({
        foreground: squareIconImage,
        background: squareBackgroundLayer
      });
      roundIconImage = await (0, _imageUtils().compositeImagesAsync)({
        foreground: roundIconImage,
        background: roundBackgroundLayer
      });
    }

    await _fsExtra().default.ensureDir(dpiFolderPath);
    await _fsExtra().default.writeFile(_path().default.resolve(dpiFolderPath, IC_LAUNCHER_PNG), squareIconImage);
    await _fsExtra().default.writeFile(_path().default.resolve(dpiFolderPath, IC_LAUNCHER_ROUND_PNG), roundIconImage);
  }));
}
/**
 * Configures adaptive icon files to be used on Android 8 and up. A foreground image must be provided,
 * and will have a transparent background unless:
 * - A backgroundImage is provided, or
 * - A backgroundColor was specified
 */


async function configureAdaptiveIconAsync(projectRoot, foregroundImage, backgroundImage, isAdaptive) {
  await Promise.all(Object.values(dpiValues).map(async ({
    folderName,
    scale
  }) => {
    const dpiFolderPath = _path().default.resolve(projectRoot, ANDROID_RES_PATH, folderName);

    const iconSizePx = BASELINE_PIXEL_SIZE * scale;

    try {
      const adpativeIconForeground = (await (0, _imageUtils().generateImageAsync)({
        projectRoot,
        cacheType: 'android-adaptive-foreground'
      }, {
        src: foregroundImage,
        width: iconSizePx,
        height: iconSizePx,
        resizeMode: 'cover',
        backgroundColor: 'transparent'
      })).source;
      await _fsExtra().default.writeFile(_path().default.resolve(dpiFolderPath, IC_LAUNCHER_FOREGROUND_PNG), adpativeIconForeground);

      if (backgroundImage) {
        const adpativeIconBackground = (await (0, _imageUtils().generateImageAsync)({
          projectRoot,
          cacheType: 'android-adaptive-background'
        }, {
          src: backgroundImage,
          width: iconSizePx,
          height: iconSizePx,
          resizeMode: 'cover',
          backgroundColor: 'transparent'
        })).source;
        await _fsExtra().default.writeFile(_path().default.resolve(dpiFolderPath, IC_LAUNCHER_BACKGROUND_PNG), adpativeIconBackground);
      } else {
        // Remove any instances of ic_launcher_background.png that are there from previous icons
        await removeBackgroundImageFilesAsync(projectRoot);
      }
    } catch (e) {
      throw new Error('Encountered an issue resizing adaptive app icon: ' + e);
    }
  })); // create ic_launcher.xml and ic_launcher_round.xml

  const icLauncherXmlString = createAdaptiveIconXmlString(backgroundImage);
  await createAdaptiveIconXmlFiles(projectRoot, icLauncherXmlString, // If the user only defined icon and not android.adaptiveIcon, then skip enabling the layering system
  // this will scale the image down and present it uncropped.
  isAdaptive);
}

function setBackgroundColor(backgroundColor, colors) {
  return Colors.assignColorValue(colors, {
    value: backgroundColor,
    name: ICON_BACKGROUND
  });
}

const createAdaptiveIconXmlString = backgroundImage => {
  let background = `<background android:drawable="@color/iconBackground"/>`;

  if (backgroundImage) {
    background = `<background android:drawable="@mipmap/ic_launcher_background"/>`;
  }

  return `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    ${background}
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>`;
};

exports.createAdaptiveIconXmlString = createAdaptiveIconXmlString;

async function createAdaptiveIconXmlFiles(projectRoot, icLauncherXmlString, add) {
  const anyDpiV26Directory = _path().default.resolve(projectRoot, ANDROID_RES_PATH, MIPMAP_ANYDPI_V26);

  await _fsExtra().default.ensureDir(anyDpiV26Directory);

  const launcherPath = _path().default.resolve(anyDpiV26Directory, IC_LAUNCHER_XML);

  const launcherRoundPath = _path().default.resolve(anyDpiV26Directory, IC_LAUNCHER_ROUND_XML);

  if (add) {
    await _fsExtra().default.writeFile(launcherPath, icLauncherXmlString);
    await _fsExtra().default.writeFile(launcherRoundPath, icLauncherXmlString);
  } else {
    // Remove the xml if the icon switches from adaptive to standard.
    await Promise.all([launcherPath, launcherRoundPath].map(async path => {
      if (_fsExtra().default.existsSync(path)) {
        return await _fsExtra().default.remove(path);
      }
    }));
  }
}

async function removeBackgroundImageFilesAsync(projectRoot) {
  return await Promise.all(Object.values(dpiValues).map(async ({
    folderName
  }) => {
    const dpiFolderPath = _path().default.resolve(projectRoot, ANDROID_RES_PATH, folderName);

    await _fsExtra().default.remove(_path().default.resolve(dpiFolderPath, IC_LAUNCHER_BACKGROUND_PNG));
  }));
}
//# sourceMappingURL=withAndroidIcons.js.map