// Song & dance
import Hammer from 'hammerjs';
import dicomParser from 'dicom-parser';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from 'cornerstone-math';
import { import as csTools, store } from 'cornerstone-tools';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as cornerstoneTools from 'cornerstone-tools';
import appState from './appState.js';
import getUrlForImageId from './lib/getUrlForImageId.js';
// import mprMetaDataProvider from './lib/mprMetadata/mprMetaDataProvider.js';
// import mprImageLoader from './mprImageLoader.js'
// import MprTool from './MprTool.js';
import MprMouseWheelTool from './MprMouseWheelTool.js';

export default function(curImageNum) {
  _setPeerDependencies();
  _initWadoImageLoader();
  _initCornerstoneTools();
  // cornerstone.registerImageLoader('mpr', mprImageLoader);
  // cornerstone.metaData.addProvider(mprMetaDataProvider);

  // Enable Elements
  const originalSeriesElement = document.getElementById('cornerstone-target');

  store.state.enabledElements = [];
  cornerstone.enable(originalSeriesElement, {
    renderer: 'webgl',
  });

  _setOriginalSeriesStackState(curImageNum, originalSeriesElement);
  // Element Specific Tools
  cornerstoneTools.setToolActiveForElement(
    originalSeriesElement,
    'StackScrollMouseWheel',
    {}
  );
}

function _setPeerDependencies() {
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
  cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
  cornerstoneTools.external.cornerstone = cornerstone;
  cornerstoneTools.external.Hammer = Hammer;
}

function _initWadoImageLoader() {
  if (window.is_initWadoImageLoader == undefined) {
    window.is_initWadoImageLoader = false;
  } else if (window.is_initWadoImageLoader == false) {
    window.is_initWadoImageLoader = true;
  }

  if (window.is_initWadoImageLoader == false) {
    const config = {
      webWorkerPath:
        '/cornerstone/assets/cornerstoneWADOImageLoaderWebWorker.js',
      taskConfiguration: {
        decodeTask: {
          codecsPath: '/cornerstone/assets/cornerstoneWADOImageLoaderCodecs.js',
        },
      },
    };

    cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
  }
}

function _initCornerstoneTools() {
  cornerstoneTools.init({
    globalToolSyncEnabled: true,
  });

  //Set Tool Color
  cornerstoneTools.toolColors.setToolColor('red');
  cornerstoneTools.toolColors.setActiveColor('rgb(0, 255, 0)');
  //Set Tool Color

  // Grab Tool Classes
  const LengthTool = cornerstoneTools.LengthTool;
  const ArrowAnnotateTool = cornerstoneTools.ArrowAnnotateTool;
  const TextMarkerTool = cornerstoneTools.TextMarkerTool;
  const StackScrollTool = cornerstoneTools.StackScrollTool;
  const ZoomTool = cornerstoneTools.ZoomTool;
  const PanTool = cornerstoneTools.PanTool;
  const WwwcTool = cornerstoneTools.WwwcTool;
  const StackScrollMouseWheelTool = cornerstoneTools.StackScrollMouseWheelTool;
  //Grab Tool Classes

  //Else Grab
  const PanMultiTouchTool = cornerstoneTools.PanMultiTouchTool;
  const ZoomTouchPinchTool = cornerstoneTools.ZoomTouchPinchTool;
  const ZoomMouseWheelTool = cornerstoneTools.ZoomMouseWheelTool;
  const RotateTool = cornerstoneTools.RotateTool;
  //Else Grab

  //Add Grab
  cornerstoneTools.addTool(LengthTool);
  cornerstoneTools.addTool(ArrowAnnotateTool);
  const configuration = {
    markers: ['Please enter text'],
    current: 'Please enter text',
    ascending: true,
    loop: true,
  };
  cornerstoneTools.addTool(TextMarkerTool, { configuration });
  cornerstoneTools.addTool(StackScrollTool);
  cornerstoneTools.addTool(ZoomTool, {
    configuration: {
      invert: false,
      preventZoomOutsideImage: false,
      minScale: 0.5,
      maxScale: 15.0,
    },
  });
  cornerstoneTools.addTool(PanTool);
  cornerstoneTools.addTool(WwwcTool);
  cornerstoneTools.addTool(StackScrollMouseWheelTool);
  //Add Grab

  //Else Add Grab
  cornerstoneTools.addTool(PanMultiTouchTool);
  cornerstoneTools.addTool(ZoomTouchPinchTool);
  cornerstoneTools.addTool(ZoomMouseWheelTool);
  cornerstoneTools.addTool(RotateTool);
  cornerstoneTools.addTool(MprMouseWheelTool);
  // cornerstoneTools.addTool(MprTool);
  //Else Add Grab

  // Set Tool Mode
  cornerstoneTools.setToolActive('Length', {});
  cornerstoneTools.setToolActive('ArrowAnnotate', {});
  cornerstoneTools.setToolActive('TextMarker', {});
  cornerstoneTools.setToolActive('StackScroll', {});
  cornerstoneTools.setToolActive('Zoom', {});
  cornerstoneTools.setToolActive('Pan', {});
  cornerstoneTools.setToolActive('Wwwc', {});
  //Set Tool Mode

  //Else Set Tool Mode
  cornerstoneTools.setToolActive('PanMultiTouch', {});
  cornerstoneTools.setToolActive('ZoomTouchPinch', {});
  cornerstoneTools.setToolActive('Rotate', {});
  // cornerstoneTools.setToolActive("StackScrollMouseWheel", {});
  //Else Set Tool Mode
}

function _setOriginalSeriesStackState(curImageNum, originalSeriesElement) {
  // const seriesImageIds = appState.series[curImageNum];
  const seriesImageIds = Array.from(Array(curImageNum).keys());
  cornerstoneTools.addStackStateManager(originalSeriesElement, ['stack']);
  const allImageIds = seriesImageIds.map(id => getUrlForImageId(id));
  allImageIds.forEach(image => cornerstone.loadAndCacheImage(image));

  const canvasStack = {
    currentImageIdIndex: 0,
    imageIds: allImageIds,
  };

  cornerstoneTools.clearToolState(originalSeriesElement, 'stack');
  cornerstoneTools.addToolState(originalSeriesElement, 'stack', canvasStack);
}
