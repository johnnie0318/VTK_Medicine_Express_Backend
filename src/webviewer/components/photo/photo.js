import React, { useEffect, useState } from 'react';
import cornerstone from 'cornerstone-core';
import setupCornerstone from './../../../cornerstone-lib/setupCornerstone';
import * as cornerstoneTools from 'cornerstone-tools';
import appState from './../../../cornerstone-lib/appState.js';
import getUrlForImageId from './../../../cornerstone-lib/lib/getUrlForImageId.js';
import { useLocation } from 'react-router-dom';
import './photo.css';
import GL_STORE from '../../../global';

const resetToolByMode = userMode => {
  // cornerstoneTools.setToolDisabled('Length');

  if (userMode == 'direct') {
    cornerstoneTools.setToolActive('Length', { mouseButtonMask: 1 });
  } else if (userMode == 'arrow') {
    cornerstoneTools.setToolActive('ArrowAnnotate', { mouseButtonMask: 1 });
  } else if (userMode == 'text') {
    cornerstoneTools.setToolActive('TextMarker', { mouseButtonMask: 1 });
  } else if (userMode == 'scrolling') {
    cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
    cornerstoneTools.setToolActive('StackScroll', { mouseButtonMask: 1 });
  } else if (userMode == 'pan') {
    cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
  } else if (userMode == 'zoom') {
    cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
  } else if (userMode == 'wl') {
    cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 });
  }
};

const resetToolByRoll = userRoll => {
  let element = document.getElementById('cornerstone-target');
  cornerstone.enable(element);

  let viewport = cornerstone.getViewport(element);

  if (viewport == undefined) {
    return;
  }
  viewport.rotation = userRoll.rotation;
  viewport.vflip = userRoll.vFlip;
  viewport.hflip = userRoll.hFlip;
  cornerstone.setViewport(element, viewport);

  // } else if (userRoll == "clear") {
  //     var toolStateManager = cornerstoneTools.globalImageIdSpecificToolStateManager;
  //     toolStateManager.clear(element);
  // }
};

const setViewportRuler = zoom => {
  let canvasWidth = document.getElementById('nav_content').offsetWidth;
  let canvasHeight = document.getElementById('nav_content').offsetHeight;

  document.getElementById('image-ruler').width = canvasWidth;
  document.getElementById('image-ruler').height = canvasHeight;

  let rulerDefaultInterval = 37.795275591;
  let rulerMaxLength = 11;
  let canvasSizePercent =
    (rulerDefaultInterval * zoom * rulerMaxLength) / canvasHeight;
  if (canvasSizePercent >= 8.6) {
    return;
  } else if (canvasSizePercent >= 4.3 && canvasSizePercent < 8.6) {
    rulerMaxLength = 2;
  } else if (canvasSizePercent >= 2.87 && canvasSizePercent < 4.3) {
    rulerMaxLength = 3;
  } else if (canvasSizePercent >= 2.14 && canvasSizePercent < 2.87) {
    rulerMaxLength = 4;
  } else if (canvasSizePercent >= 1.72 && canvasSizePercent < 2.14) {
    rulerMaxLength = 5;
  } else if (canvasSizePercent >= 1.44 && canvasSizePercent < 1.72) {
    rulerMaxLength = 6;
  } else if (canvasSizePercent >= 1.23 && canvasSizePercent < 1.44) {
    rulerMaxLength = 7;
  } else if (canvasSizePercent >= 1.08 && canvasSizePercent < 1.23) {
    rulerMaxLength = 8;
  } else if (canvasSizePercent >= 0.95 && canvasSizePercent < 1.08) {
    rulerMaxLength = 9;
  } else if (canvasSizePercent >= 0.86 && canvasSizePercent < 0.95) {
    rulerMaxLength = 10;
  } else if (canvasSizePercent < 0.86) {
    rulerMaxLength = 11;
  }

  let rulerInterval = rulerDefaultInterval * zoom;
  let canvasZero =
    canvasHeight / 2 - (rulerInterval * (rulerMaxLength - 1)) / 2;

  let canvas = document.getElementById('image-ruler');
  let ctx = canvas.getContext('2d');
  ctx.font = '12px Segoe UI,Tahoma,Arial';
  ctx.fillStyle = '#F9F59F';
  for (let index = 0; index < rulerMaxLength; index++) {
    ctx.moveTo(canvasWidth - 20, canvasZero + rulerInterval * index);
    ctx.lineTo(canvasWidth - 10, canvasZero + rulerInterval * index);
  }
  ctx.moveTo(canvasWidth - 10, canvasZero);
  ctx.lineTo(
    canvasWidth - 10,
    canvasZero + rulerInterval * (rulerMaxLength - 1)
  );
  ctx.strokeStyle = '#F9F59F';
  ctx.fillText(
    rulerMaxLength - 1 + 'cm',
    canvasWidth - 40,
    canvasZero + rulerInterval * (rulerMaxLength - 1) + 20
  );
  ctx.stroke();
};

const onImageRendered = e => {
  const eventData = e.detail;

  // // set the canvas context to the image coordinate system
  // cornerstone.setToPixelCoordinateSystem(eventData.enabledElement, eventData.canvasContext);

  // // NOTE: The coordinate system of the canvas is in image pixel space.  Drawing
  // // to location 0,0 will be the top left of the image and rows,columns is the bottom
  // // right.
  // const context = eventData.canvasContext;
  // context.beginPath();
  // context.strokeStyle = 'white';
  // context.lineWidth = .5;
  // context.rect(128, 90, 50, 60);
  // context.stroke();
  // context.fillStyle = "white";
  // context.font = "6px Arial";
  // context.fillText("Tumor Here", 128, 85);

  // document.getElementById('topright').textContent = "Render Time:" + eventData.renderTimeInMs + " ms";
  // document.getElementById('bottomleft').textContent = "WW/WL:" + Math.round(eventData.viewport.voi.windowWidth) + "/" + Math.round(eventData.viewport.voi.windowCenter);
  // document.getElementById('bottomright').textContent = "Zoom:" + eventData.viewport.scale.toFixed(2);
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Photo(props) {
  const { userRoll, userMode } = props;
  const [zoom, setZoom] = useState(1);
  const [wwwc, setWwwc] = useState('');
  const query = useQuery();
  const st_id = query.get('st_id');
  const il = query.get('il');
  const imageCnt = GL_STORE.IMAGE_NUM;

  useEffect(() => {
    // Setup
    const seriesNumber = 0;
    setupCornerstone(imageCnt);

    const originalSeriesElement = document.getElementById('cornerstone-target');

    // Display original series
    const seriesImageIds = appState.series[seriesNumber];
    const imageUrl = getUrlForImageId(0);

    cornerstone.loadAndCacheImage(imageUrl).then(image => {
      cornerstone.displayImage(originalSeriesElement, image);

      var CornerstoneCanvasWidth = document.getElementById('nav_content')
        .offsetWidth;
      var CornerstoneCanvasHeight = document.getElementById('nav_content')
        .offsetHeight;
      originalSeriesElement.style.width = CornerstoneCanvasWidth + 'px';
      originalSeriesElement.style.height = CornerstoneCanvasHeight - 3 + 'px';
      cornerstone.resize(originalSeriesElement);
    });

    window.addEventListener('resize', function() {
      var CornerstoneCanvasWidth = document.getElementById('nav_content')
        .offsetWidth;
      var CornerstoneCanvasHeight = document.getElementById('nav_content')
        .offsetHeight;
      originalSeriesElement.style.width = CornerstoneCanvasWidth + 'px';
      originalSeriesElement.style.height = CornerstoneCanvasHeight - 3 + 'px';
      document.getElementById('image-ruler').width = CornerstoneCanvasWidth;
      document.getElementById('image-ruler').height = CornerstoneCanvasHeight;
      cornerstone.resize(originalSeriesElement);
    });

    originalSeriesElement.addEventListener('cornerstoneimagerendered', function(
      e
    ) {
      const eventData = e.detail;
      setZoom((eventData.viewport.scale.toFixed(2) / 1.35).toFixed(2));
      setWwwc(
        Math.round(eventData.viewport.voi.windowCenter) +
          '/' +
          Math.round(eventData.viewport.voi.windowWidth)
      );
    });
  }, []);

  useEffect(() => {
    resetToolByMode(userMode);
  }, [userMode]);

  useEffect(() => {
    resetToolByRoll(userRoll);
  }, [userRoll]);

  useEffect(() => {
    setViewportRuler(zoom);
  }, [zoom]);

  return (
    <div className="cornerstone-container">
      <div className="cornerstone-element">
        <div id="cornerstone-target" className="item photo-item"></div>
        <div className="ViewportOverlay">
          <div className="viewport-ruler overlay-element">
            <canvas id="image-ruler" style={{ zIndex: 2 }}></canvas>
          </div>
          <div className="top-left overlay-element">
            <div>{GL_STORE.STUDY_INFO.pat_name}</div>
            <div>{GL_STORE.STUDY_INFO.pat_id}</div>
            <div>{GL_STORE.SERIES_ID} {GL_STORE.STUDY_INFO.study_desc}</div>
            <div>{GL_STORE.STUDY_INFO.pat_sex}/{GL_STORE.STUDY_INFO.pat_age}</div>
          </div>
          <div className="top-right overlay-element">
            <div>{GL_STORE.SERIES_INFO.institution}</div>
            <div>{GL_STORE.SERIES_INFO.series_desc}</div>
            <div>{GL_STORE.SERIES_INFO.series_datetime}</div>
            <div></div>
          </div>
          <div className="bottom-left overlay-element">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="bottom-right overlay-element">
            <div>{parseInt(zoom * 100)} %</div>
            <div>Центр/Ширина: {wwwc}</div>
            <div>Снимки: 1 из {GL_STORE.IMAGE_NUM}</div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Photo;
