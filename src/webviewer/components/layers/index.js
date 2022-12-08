import React, { useEffect, useState } from 'react';
import cornerstone from 'cornerstone-core';
import setupCornerstone from './setupCornerstone.js';
import * as cornerstoneTools from 'cornerstone-tools';
import getMprUrl from './lib/getMprUrl.js';
import { mat4 } from 'gl-matrix';

const resetToolByMode = (userMode, is_scrolling) => {
  if (userMode == 'direct') {
    cornerstoneTools.setToolActive('Length', { mouseButtonMask: 1 });
  } else if (userMode == 'arrow') {
    cornerstoneTools.setToolActive('ArrowAnnotate', { mouseButtonMask: 1 });
  } else if (userMode == 'text') {
    cornerstoneTools.setToolActive('TextMarker', { mouseButtonMask: 1 });
  } else if (userMode == 'scrolling') {
    if (is_scrolling) {
      const mprAxialSeriesElement = document.getElementById('axial-target');
      const mprCoronalSeriesElement = document.getElementById('coronal-target');
      const mprSagittalSeriesElement = document.getElementById(
        'sagittal-target'
      );

      cornerstoneTools.setToolActiveForElement(mprAxialSeriesElement, 'Mpr', {
        mouseButtonMask: 1,
        color: '#9ACD32',
        cosines: '1,0,0,0,1,0',
      });
      cornerstoneTools.setToolActiveForElement(mprCoronalSeriesElement, 'Mpr', {
        mouseButtonMask: 1,
        color: '#0496FF',
        cosines: '1,0,0,0,0,-1',
      });
      cornerstoneTools.setToolActiveForElement(
        mprSagittalSeriesElement,
        'Mpr',
        { mouseButtonMask: 1, color: '#EFBDEB', cosines: '0,1,0,0,0,-1' }
      );
    }
  } else if (userMode == 'pan') {
    cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
  } else if (userMode == 'zoom') {
    cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
  } else if (userMode == 'wl') {
    cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 });
  } else if (userMode == 'rotate') {
    cornerstoneTools.setToolActive('Rotate', { mouseButtonMask: 1 });
  }
};

const setViewportRuler = (zoom, form, size) => {
  let canvasWidth = document.getElementById(form + '-target').parentElement
    .offsetWidth;
  let canvasHeight = document.getElementById(form + '-target').parentElement
    .offsetHeight;
  console.log(canvasHeight, 'canvasHeight');

  document.getElementById('image-ruler-' + form).width = canvasWidth;
  document.getElementById('image-ruler-' + form).height = canvasHeight;

  let rulerDefaultInterval = 37.795275591;
  let rulerMaxLength = 11;
  let canvasSizePercent =
    ((rulerDefaultInterval * zoom * rulerMaxLength) / canvasHeight) * size;
  console.log('size', canvasSizePercent);
  if (form == 'axial') {
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
  } else if (form == 'coronal' || form == 'sagittal') {
    if (canvasSizePercent >= 6.4) {
      return;
    } else if (canvasSizePercent >= 3.24 && canvasSizePercent < 6.4) {
      rulerMaxLength = 2;
    } else if (canvasSizePercent >= 2.16 && canvasSizePercent < 3.24) {
      rulerMaxLength = 3;
    } else if (canvasSizePercent >= 1.62 && canvasSizePercent < 2.16) {
      rulerMaxLength = 4;
    } else if (canvasSizePercent >= 1.29 && canvasSizePercent < 1.62) {
      rulerMaxLength = 5;
    } else if (canvasSizePercent >= 1.07 && canvasSizePercent < 1.29) {
      rulerMaxLength = 6;
    } else if (canvasSizePercent >= 0.92 && canvasSizePercent < 1.07) {
      rulerMaxLength = 7;
    } else if (canvasSizePercent >= 0.8 && canvasSizePercent < 0.92) {
      rulerMaxLength = 8;
    } else if (canvasSizePercent >= 0.71 && canvasSizePercent < 0.8) {
      rulerMaxLength = 9;
    } else if (canvasSizePercent >= 0.64 && canvasSizePercent < 0.71) {
      rulerMaxLength = 10;
    } else if (canvasSizePercent < 0.64) {
      rulerMaxLength = 11;
    }
  }

  let rulerInterval = rulerDefaultInterval * zoom * size;
  let canvasZero =
    canvasHeight / 2 - (rulerInterval * (rulerMaxLength - 1)) / 2;

  let canvas = document.getElementById('image-ruler-' + form);
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

function Main(props) {
  const { userRoll, userMode, imageMode } = props;
  const [scrolling, setScrolling] = useState(false);
  const [zoomAxial, setZoomAxial] = useState(1.0);
  const [zoomCoronal, setZoomCoronal] = useState(1.0);
  const [zoomSagittal, setZoomSagittal] = useState(1.0);
  const [wwwcAxial, setWwwcAxial] = useState('');
  const [wwwcCoronal, setWwwcCoronal] = useState('');
  const [wwwcSagittal, setWwwcSagittal] = useState('');

  useEffect(() => {
    // Setup
    const seriesNumber = 0;
    setupCornerstone(seriesNumber);

    const mprAxialSeriesElement = document.getElementById('axial-target');
    const mprCoronalSeriesElement = document.getElementById('coronal-target');
    const mprSagittalSeriesElement = document.getElementById('sagittal-target');

    // ~~ AXIAL
    // Image orientation patient (IOP)
    const axial = mat4.create();
    const axialIop = new Float32Array([
      axial[0],
      axial[1],
      axial[2],
      axial[4],
      axial[5],
      axial[6],
    ]);
    const axialIopAsString = axialIop.join();
    // const axialMprUrl = getMprUrl(axialIopAsString, "0,0,97.5");
    const axialMprUrl = getMprUrl(axialIopAsString);

    cornerstone.loadAndCacheImage(axialMprUrl).then(image => {
      cornerstone.displayImage(mprAxialSeriesElement, image);

      mprAxialSeriesElement.style.width =
        mprAxialSeriesElement.parentElement.offsetWidth + 'px';
      mprAxialSeriesElement.style.height =
        mprAxialSeriesElement.parentElement.offsetHeight + 'px';
      cornerstone.resize(mprAxialSeriesElement);
    });

    // ~~ CORONAL
    // Image orientation patient (IOP)
    const coronalIop = new Float32Array([1, 0, 0, 0, 0, -1]);
    const coronalIopAsString = coronalIop.join();
    // const coronalMprUrl = getMprUrl(coronalIopAsString, "0,69.3642578125,0");
    const coronalMprUrl = getMprUrl(coronalIopAsString);

    cornerstone.loadAndCacheImage(coronalMprUrl).then(image => {
      cornerstone.displayImage(mprCoronalSeriesElement, image);

      mprCoronalSeriesElement.style.width =
        mprCoronalSeriesElement.parentElement.offsetWidth + 'px';
      mprCoronalSeriesElement.style.height =
        mprCoronalSeriesElement.parentElement.offsetHeight + 'px';
      cornerstone.resize(mprCoronalSeriesElement);
    });

    // ~~ SAGITTAL
    // Image orientation patient (IOP)
    const sagittalIop = new Float32Array([0, 1, 0, 0, 0, -1]);
    const sagittalIopAsString = sagittalIop.join();
    // const sagittalMprUrl = getMprUrl(sagittalIopAsString, "69.3642578125,0,0");
    const sagittalMprUrl = getMprUrl(sagittalIopAsString);

    cornerstone.loadAndCacheImage(sagittalMprUrl).then(image => {
      cornerstone.displayImage(mprSagittalSeriesElement, image);

      mprSagittalSeriesElement.style.width =
        mprSagittalSeriesElement.parentElement.offsetWidth + 'px';
      mprSagittalSeriesElement.style.height =
        mprSagittalSeriesElement.parentElement.offsetHeight + 'px';
      cornerstone.resize(mprSagittalSeriesElement);
    });

    mprAxialSeriesElement.addEventListener('cornerstoneimagerendered', function(
      e
    ) {
      const eventData = e.detail;
      setZoomAxial((eventData.viewport.scale.toFixed(2) / 1.34).toFixed(2));
      setWwwcAxial(
        Math.round(eventData.viewport.voi.windowCenter) +
          '/' +
          Math.round(eventData.viewport.voi.windowWidth)
      );
    });

    mprCoronalSeriesElement.addEventListener(
      'cornerstoneimagerendered',
      function(e) {
        const eventData = e.detail;
        setZoomCoronal((eventData.viewport.scale.toFixed(2) / 0.47).toFixed(2));
        setWwwcCoronal(
          Math.round(eventData.viewport.voi.windowCenter) +
            '/' +
            Math.round(eventData.viewport.voi.windowWidth)
        );
      }
    );

    mprSagittalSeriesElement.addEventListener(
      'cornerstoneimagerendered',
      function(e) {
        const eventData = e.detail;
        setZoomSagittal(
          (eventData.viewport.scale.toFixed(2) / 0.47).toFixed(2)
        );
        setWwwcSagittal(
          Math.round(eventData.viewport.voi.windowCenter) +
            '/' +
            Math.round(eventData.viewport.voi.windowWidth)
        );
      }
    );
  }, [imageMode]);

  useEffect(() => {
    resetToolByMode(userMode, scrolling);
    if (userMode != 'scrolling') {
      setScrolling(true);
    }
  }, [scrolling, userMode]);

  useEffect(() => {
    const form = 'axial';
    setViewportRuler(zoomAxial, form, 1);
    console.log('zoomAxial', zoomAxial);
  }, [zoomAxial]);

  useEffect(() => {
    const form = 'coronal';
    setViewportRuler(zoomCoronal, form, 0.5);
    console.log('zoomCoronal', zoomCoronal);
  }, [zoomCoronal]);

  useEffect(() => {
    const form = 'sagittal';
    setViewportRuler(zoomSagittal, form, 0.5);
    console.log('zoomSagittal', zoomSagittal);
  }, [zoomSagittal]);

  return (
    <div className="cornerstone-container">
      <div id="mpr-list-left" className="mpr-list">
        <div className="cornerstone-element">
          <div id="axial-target" className="item mpr-item"></div>
          <div className="ViewportOverlay">
            <div className="viewport-ruler overlay-element">
              <canvas id="image-ruler-axial" style={{ zIndex: 2 }}></canvas>
            </div>
            <div className="top-left overlay-element">
              <div>DENTAL</div>
              <div>31163581</div>
              <div>353 XORANCAT STUDY</div>
              <div>M</div>
            </div>
            <div className="top-right overlay-element">
              <div>WORKSTATION</div>
              <div>Xoran Technologies ?</div>
              <div>02-фев-2015</div>
              <div></div>
            </div>
            <div className="bottom-left overlay-element">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="bottom-right overlay-element">
              <div>{parseInt(zoomAxial * 100)} %</div>
              <div>Центр/Ширина: {wwwcAxial}</div>
              <div>Снимки: 1 из 214</div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div id="mpr-list-right" className="mpr-list">
        <div className="cornerstone-element">
          <div id="coronal-target" className="item mpr-item"></div>
          <div className="ViewportOverlay">
            <div className="viewport-ruler overlay-element">
              <canvas id="image-ruler-coronal" style={{ zIndex: 2 }}></canvas>
            </div>
            <div className="top-left overlay-element">
              <div>DENTAL</div>
              <div>31163581</div>
              <div>353 XORANCAT STUDY</div>
              <div>M</div>
            </div>
            <div className="top-right overlay-element">
              <div>WORKSTATION</div>
              <div>Xoran Technologies ?</div>
              <div>02-фев-2015</div>
              <div></div>
            </div>
            <div className="bottom-left overlay-element">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="bottom-right overlay-element">
              <div>{parseInt(zoomCoronal * 100)} %</div>
              <div>Центр/Ширина: {wwwcCoronal}</div>
              <div>Снимки: 1 из 214</div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="cornerstone-element">
          <div id="sagittal-target" className="item mpr-item"></div>
          <div className="ViewportOverlay">
            <div className="viewport-ruler overlay-element">
              <canvas id="image-ruler-sagittal" style={{ zIndex: 2 }}></canvas>
            </div>
            <div className="top-left overlay-element">
              <div>DENTAL</div>
              <div>31163581</div>
              <div>353 XORANCAT STUDY</div>
              <div>M</div>
            </div>
            <div className="top-right overlay-element">
              <div>WORKSTATION</div>
              <div>Xoran Technologies ?</div>
              <div>02-фев-2015</div>
              <div></div>
            </div>
            <div className="bottom-left overlay-element">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="bottom-right overlay-element">
              <div>{parseInt(zoomSagittal * 100)} %</div>
              <div>Центр/Ширина: {wwwcSagittal}</div>
              <div>Снимки: 1 из 214</div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
