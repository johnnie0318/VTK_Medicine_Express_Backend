import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import EVENTS from './events';
import GL_STORE from '../../../global';
import View2D from './VTKViewport/View2D';
import getImageData from './lib/getImageData';
import loadImageData from './lib/loadImageData';
import vtkSVGRotatableCrosshairsWidget from './VTKViewport/vtkSVGRotatableCrosshairsWidget';
import vtkInteractorStyleRotatableMPRCrosshairs from './VTKViewport/vtkInteractorStyleRotatableMPRCrosshairs';
import vtkInteractorStyleMPRWindowLevel from './VTKViewport/vtkInteractorStyleMPRWindowLevel';
import { api as dicomwebClientApi } from 'dicomweb-client';
import vtkVolume from 'vtk.js/Sources/Rendering/Core/Volume';
import vtkVolumeMapper from 'vtk.js/Sources/Rendering/Core/VolumeMapper';
import cornerstone from 'cornerstone-core';
import setupCornerstone from './VTKViewport/initCornerstone.js';

import appState from './../../../cornerstone-lib/appState.js';
import getUrlForImageId from './../../../cornerstone-lib/lib/getUrlForImageId.js';

function loadDataset(imageIds, displaySetInstanceUid) {
  const imageDataObject = getImageData(imageIds, displaySetInstanceUid);

  loadImageData(imageDataObject);
  return imageDataObject;
}

class VTKRotatableCrosshairsExample extends Component {
  state = {
    volumes: [],
    // crosshairsTool: true,
    // slabOwn: '1',
    dataDetails: {
      studyDate: GL_STORE.SERIES_INFO.series_datetime,
      studyTime: '',
      studyDescription: GL_STORE.STUDY_INFO.study_desc,
      patientName: GL_STORE.STUDY_INFO.pat_name,
      patientId: GL_STORE.STUDY_INFO.pat_id,
      seriesNumber: GL_STORE.SERIES_ID.toString(),
      seriesDescription: GL_STORE.SERIES_INFO.series_desc,
    },
  };

  static propTypes = {
    slabShowing: PropTypes.number,
    userMode: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    setupCornerstone();
    console.log('componetDidMounted');
    this.apis = [];

    let onAllPixelDataInsertedCallbackIsPassed = false;
    let imageIds = [];

    const curImageNum = GL_STORE.IMAGE_NUM;
    const seriesNumber = 0;
    const seriesImageIds = appState.series[seriesNumber];
    for (let i = 0; i < curImageNum; i++) {
      imageIds[i] = getUrlForImageId(i);
    }

    const promises = imageIds.map(imageId => {
      return cornerstone.loadImage(imageId);
    });
    console.log('loadAndCachePassed');
    Promise.all(promises).then(() => {
      const ctImageDataObject = loadDataset(imageIds, 'ctDisplaySet');
      console.log('loadDataSetPassed');

      const onAllPixelDataInsertedCallback = () => {
        console.log('onAllPixelStarted');
        const ctImageData = ctImageDataObject.vtkImageData;

        const range = ctImageData
          .getPointData()
          .getScalars()
          .getRange();

        const mapper = vtkVolumeMapper.newInstance();
        const ctVol = vtkVolume.newInstance();
        const rgbTransferFunction = ctVol
          .getProperty()
          .getRGBTransferFunction(0);

        mapper.setInputData(ctImageData);
        mapper.setMaximumSamplesPerRay(2000);
        rgbTransferFunction.setRange(range[0], range[1]);
        ctVol.setMapper(mapper);

        this.setState({
          volumes: [ctVol],
        });
        console.log('onAllPixelEnded');
        onAllPixelDataInsertedCallbackIsPassed = true;
      };

      ctImageDataObject.onAllPixelDataInserted(onAllPixelDataInsertedCallback);
      // if (onAllPixelDataInsertedCallbackIsPassed)
        onAllPixelDataInsertedCallback();
      console.log('onAllPixelDataInsertedPasssed');
    });
    // this.handleSlabThicknessChange(this.props.slab);
  }

  async componentDidUpdate() {
    console.log('componentDidUpdated');
    this.handleSlabThicknessChange(this.props.slabShowing);
    this.handleUserModeChange(this.props.userMode);
  }

  storeApi = viewportIndex => {
    return api => {
      this.apis[viewportIndex] = api;

      window.apis = this.apis;

      const apis = this.apis;
      const renderWindow = api.genericRenderWindow.getRenderWindow();

      // Add rotatable svg widget
      api.addSVGWidget(
        vtkSVGRotatableCrosshairsWidget.newInstance(),
        'rotatableCrosshairsWidget'
      );

      const istyle = vtkInteractorStyleRotatableMPRCrosshairs.newInstance();

      // add istyle
      api.setInteractorStyle({
        istyle,
        configuration: {
          apis,
          apiIndex: viewportIndex,
        },
      });

      // set blend mode to MIP.
      const mapper = api.volumes[0].getMapper();
      if (mapper.setBlendModeToMaximumIntensity) {
        mapper.setBlendModeToMaximumIntensity();
      }

      api.setSlabThickness(0.1);

      renderWindow.render();

      // Its up to the layout manager of an app to know how many viewports are being created.
      if (apis[0] && apis[1] && apis[2]) {
        const api = apis[0];

        apis.forEach((api, index) => {
          api.svgWidgets.rotatableCrosshairsWidget.setApiIndex(index);
          api.svgWidgets.rotatableCrosshairsWidget.setApis(apis);
        });

        api.svgWidgets.rotatableCrosshairsWidget.resetCrosshairs(apis, 0);
      }
    };
  };

  handleSlabThicknessChange(evt) {
    const value = Number(evt);
    const valueInMM = value / 10;
    const apis = this.apis;

    apis.forEach(api => {
      const renderWindow = api.genericRenderWindow.getRenderWindow();

      api.setSlabThickness(valueInMM);
      renderWindow.render();
    });
  }

  handleUserModeChange(mode) {
    let crosshairsTool = true;
    const apis = this.apis;

    if (mode == 'wl') {
      crosshairsTool = false;
      EVENTS.ZOOM_BUTTON_NUM = 3;
      EVENTS.PAN_BUTTON_NUM = 2;
      EVENTS.IS_SCROLLING = false;
    } else {
      crosshairsTool = true;
      switch (mode) {
        case 'zoom':
          EVENTS.ZOOM_BUTTON_NUM = 1;
          EVENTS.PAN_BUTTON_NUM = 2;
          EVENTS.IS_SCROLLING = false;
          break;
        case 'pan':
          EVENTS.ZOOM_BUTTON_NUM = 2;
          EVENTS.PAN_BUTTON_NUM = 1;
          EVENTS.IS_SCROLLING = false;
          break;
        case 'scrolling':
          EVENTS.ZOOM_BUTTON_NUM = 3;
          EVENTS.PAN_BUTTON_NUM = 2;
          EVENTS.IS_SCROLLING = true;
          break;
      }
    }

    apis.forEach((api, apiIndex) => {
      let istyle;

      if (crosshairsTool) {
        istyle = vtkInteractorStyleRotatableMPRCrosshairs.newInstance();
      } else {
        istyle = vtkInteractorStyleMPRWindowLevel.newInstance();
      }

      api.setInteractorStyle({
        istyle,
        configuration: { apis, apiIndex },
      });
    });
  }

  // toggleTool = () => {
  //   let { crosshairsTool } = this.state;
  //   const apis = this.apis;

  //   crosshairsTool = !crosshairsTool;

  //   apis.forEach((api, apiIndex) => {
  //     let istyle;

  //     if (crosshairsTool) {
  //       istyle = vtkInteractorStyleRotatableMPRCrosshairs.newInstance();
  //     } else {
  //       istyle = vtkInteractorStyleMPRWindowLevel.newInstance();
  //     }

  //     // // add istyle
  //     api.setInteractorStyle({
  //       istyle,
  //       configuration: { apis, apiIndex },
  //     });
  //   });

  //   this.setState({ crosshairsTool });
  // };

  toggleCrosshairs = () => {
    const { displayCrosshairs } = this.state;
    const apis = this.apis;

    const shouldDisplayCrosshairs = !displayCrosshairs;

    apis.forEach(api => {
      const { svgWidgetManager, svgWidgets } = api;
      svgWidgets.rotatableCrosshairsWidget.setDisplay(shouldDisplayCrosshairs);

      svgWidgetManager.render();
    });

    this.setState({ displayCrosshairs: shouldDisplayCrosshairs });
  };

  resetCrosshairs = () => {
    const apis = this.apis;

    apis.forEach(api => {
      api.resetOrientation();
    });

    // Reset the crosshairs
    apis[0].svgWidgets.rotatableCrosshairsWidget.resetCrosshairs(apis, 0);
  };

  render() {
    if (!this.state.volumes || !this.state.volumes.length) {
      return <h4 style={{ color: 'gray' }}>Loading...</h4>;
    }

    return (
      <div className="cornerstone-container">
        <div id="mpr-list-left" className="mpr-list">
          <div
            className="slab-container"
            // style={{ visibility: str_value ? 'visible' : 'hidden' }}
          >
            {/* <label htmlFor="set-slab-thickness">SlabThickness: </label>
            <input
              id="set-slab-thickness"
              type="range"
              name="points"
              min="1"
              max="5000"
              onChange={this.handleSlabThicknessChange.bind(this)}
            /> */}
            <button onClick={this.toggleCrosshairs}>
              {this.state.displayCrosshairs
                ? 'Hide Crosshairs'
                : 'Show Crosshairs'}
            </button>
            {/* <button onClick={this.toggleTool}>
              {this.state.crosshairsTool
                ? 'Switch To WL/Zoom/Pan/Scroll'
                : 'Switch To Crosshairs'}
            </button> */}
            <button onClick={this.resetCrosshairs}>reset crosshairs</button>
          </div>
          <div className="cornerstone-element">
            <View2D
              className="item mpr-item"
              volumes={this.state.volumes}
              onCreated={this.storeApi(0)}
              orientation={{ sliceNormal: [0, 0, 1], viewUp: [0, -1, 0] }}
              showRotation={true}
              dataDetails={this.state.dataDetails}
            />
          </div>
        </div>
        <div id="mpr-list-right" className="mpr-list">
          <div className="cornerstone-element">
            <View2D
              volumes={this.state.volumes}
              onCreated={this.storeApi(1)}
              orientation={{ sliceNormal: [0, 1, 0], viewUp: [0, 0, 1] }}
              showRotation={true}
              dataDetails={this.state.dataDetails}
            />
          </div>
          <div className="cornerstone-element">
            <View2D
              volumes={this.state.volumes}
              onCreated={this.storeApi(2)}
              orientation={{ sliceNormal: [-1, 0, 0], viewUp: [0, 0, 1] }}
              showRotation={true}
              dataDetails={this.state.dataDetails}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default VTKRotatableCrosshairsExample;
