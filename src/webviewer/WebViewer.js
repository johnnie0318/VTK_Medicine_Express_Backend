import React, { Component } from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Photo from './components/photo/photo';
// import Layer1 from './components/layers/index';
import VTKRotatableCrosshairsExample from './components/vtkLayer/VTKRotatableCrosshairsExample.js';
import ThreeD from './components/threeD';
import Stomat from './components/stomat';
import PhotoNav from './nav/photoNav';
import LayerNav from './nav/LayerNav';
import SplittedScreens from './nav/SplittedScreens';
import ThreeDNav from './nav/threeDNav';
import StomatNav from './nav/stomatNav';
import Dialogopen from './components/Dialog';
import GL_STORE from '../global';
import { listSeries } from '../API/series';
import { getStudy } from '../API/studies';
import { getDcmFile } from '../API/dicom';
import { removeToken } from '../API/localstorage';
// import {
//   setStudyId,
//   setSeriesId,
//   setImageNum,
//   setSeriesInfoState,
// } from '../actions';

function WebViewer() {
  let history = useHistory();
  const [userMode, setUserMode] = useState('scrolling');
  const [imageMode, setImageMode] = useState('axial');
  const [roll, setRoll] = useState({ vFlip: false, hFlip: false, rotation: 0 });
  const [slab, setSlab] = useState(1);
  const [Dialog, setDialog] = useState(false);
  const [NavActive, setNavActive] = useState('1');
  const [is_Downloading, setDF] = useState(true);
  // const [imageCnt, setImageCnt] = useState(0);
  // const [seriesInfo, setSeriesInfo] = useState({});

  // const dispatch = useDispatch();
  // const curStudyId = useSelector(state => state.countReducer.studyId);
  // const curSeriesId = useSelector(state => state.countReducer.seriesId);
  // const curImageNum = useSelector(state => state.countReducer.imageNum);
  // const curSeriesInfo = useSelector(state => state.countReducer.seriesInfo);

  var container = {};
  location.search
    .substr(1)
    .split('&')
    .forEach(item => {
      container[item.split('=')[0]] = decodeURIComponent(item.split('=')[1])
        ? item.split('=')[1]
        : '';
    });
  console.log('param', container);

  var curSeriesId = 0;
  var curStudyId = 0;

  if (typeof container.t != 'undefined') {
    GL_STORE.STUDY_ID = container.selStudyId;
    var firstSeriesId = container.id.split(',')[0];
    console.log(firstSeriesId);
    if (!GL_STORE.IS_CHANGING) {
      GL_STORE.SERIES_ID = firstSeriesId;
      curSeriesId = firstSeriesId;
    } else {
      curSeriesId = GL_STORE.SERIES_ID;
      // GL_STORE.IS_CHANGING = false;
    }
    curStudyId = container.selStudyId;
    console.log(curSeriesId);
  }

  // useEffect(() => {
  //   if (typeof container.t != 'undefined') {
  //     dispatch(setStudyId(container.selStudyId));
  //     dispatch(setSeriesId(container.id.split(',')[0]));
  //     dispatch(setImageNum(imageCnt));
  //     dispatch(setSeriesInfoState(seriesInfo));
  //   }
  // }, [
  //   container.id,
  //   container.selStudyId,
  //   container.t,
  //   dispatch,
  //   imageCnt,
  //   seriesInfo,
  // ]);

  if (is_Downloading && typeof container.t != 'undefined') {
    var seriesImageIds = [];
    console.log('curseriesId: ', curSeriesId);
    if (curStudyId != 0)
      getStudy(curStudyId)
        .then(res => {
          console.log(res.data.data);
          GL_STORE.STUDY_INFO.pat_name = res.data.data.pat_name;
          GL_STORE.STUDY_INFO.pat_id = res.data.data.pat_id;
          GL_STORE.STUDY_INFO.study_desc = res.data.data.study_desc;
          GL_STORE.STUDY_INFO.pat_sex = res.data.data.pat_sex;
          GL_STORE.STUDY_INFO.pat_age = res.data.data.pat_age;
        })
        .catch(err => {
          console.log({ message: err.message });
          if (err.message.indexOf('401') != -1) {
            removeToken();
            history.push('/');
          }
        });
    if (curSeriesId != 0)
      listSeries(curSeriesId)
        .then(res => {
          console.log(res.data.data);
          var cnt = res.data.data.num_instances;
          var datm = res.data.data.series_datetime;
          GL_STORE.SERIES_INFO.institution = res.data.data.institution;
          GL_STORE.SERIES_INFO.series_datetime = datm.substr(
            0,
            datm.length - 9
          );
          GL_STORE.SERIES_INFO.series_desc = res.data.data.series_desc;
          GL_STORE.IMAGE_NUM = cnt;
          console.log(GL_STORE.SERIES_INFO);
          seriesImageIds = Array.from(Array(cnt).keys());
          const allImageIds = seriesImageIds.map(id =>
            getDcmFile(curStudyId, curSeriesId, id)
              .then(res => {
                setDF(false);
                if (res.status != 200) console.log('Axios Error', res.status);
                // const token = res.data;
                // console.log(token);
                console.log('Download Passed ', id);
              })
              .catch(err => {
                console.log({ message: err.message });
                if (err.message.indexOf('401') != -1) {
                  removeToken();
                  history.push('/');
                }
              })
          );
        })
        .catch(err => {
          console.log({ message: err.message });
          if (err.message.indexOf('401') != -1) {
            removeToken();
            history.push('/');
          }
        });
  }
  console.log(
    `Redux: ${GL_STORE.STUDY_ID}, ${GL_STORE.SERIES_ID}, ${
      GL_STORE.IMAGE_NUM
    }, ${JSON.stringify(GL_STORE.SERIES_INFO)}, ${JSON.stringify(
      GL_STORE.STUDY_INFO
    )}`
  );

  const handleRoll = dir => {
    if (dir === 'hori') {
      setRoll(prevState => ({ ...prevState, hFlip: !prevState.hFlip }));
    } else if (dir === 'vert') {
      setRoll(prevState => ({ ...prevState, vFlip: !prevState.vFlip }));
    } else if (dir === 'left') {
      setRoll(prevState => ({
        ...prevState,
        rotation: prevState.rotation - 90 == -360 ? 0 : prevState.rotation - 90,
      }));
    } else if (dir === 'right') {
      setRoll(prevState => ({
        ...prevState,
        rotation: prevState.rotation + 90 == 360 ? 0 : prevState.rotation + 90,
      }));
    }
  };

  const handleUserMode = mode => {
    setUserMode(mode);
    // setSlab(false);
  };

  const handleImageMode = mode => {
    setImageMode(mode);
  };

  const handleSetSlab = thick => {
    // if (slab) setSlab(false);
    // else setSlab(true);
    // setUserMode('3D');
    setSlab(thick);
    console.log(thick);
  };

  const setNavActivity = index => {
    setNavActive(index);
  };

  const MoveToRight = (holderId, contentId) => {
    var holder = document.getElementById(holderId);
    var content = document.getElementById(contentId);
    var visibleWidth = holder.offsetWidth;
    var contentWidth = content.offsetWidth;
    var left = parseInt(content.style.marginLeft.replace('px', ''));
    var currWidth = contentWidth + left;
    if (visibleWidth < currWidth) {
      var swipeBtnWidth = 17;
      var marginLeft = left - (visibleWidth - swipeBtnWidth * 2);
      marginLeft = Math.max(
        marginLeft,
        -1 * (contentWidth + 2 * swipeBtnWidth - visibleWidth)
      );
      content.style.marginLeft = marginLeft + 'px';
    }
    return false;
  };

  const MoveToLeft = (holderId, contentId) => {
    var holder = document.getElementById(holderId);
    var content = document.getElementById(contentId);
    var visibleWidth = holder.offsetWidth;
    var contentWidth = content.offsetWidth;
    var left = parseInt(content.style.marginLeft.replace('px', ''));
    if (left < 0) {
      var swipeBtnWidth = 17;
      var marginLeft = left + visibleWidth - swipeBtnWidth;
      if (marginLeft > 0) {
        marginLeft = 0;
      }
      content.style.marginLeft = marginLeft + 'px';
    }
    return false;
  };

  const Identify = () => {
    switch (NavActive) {
      case '1':
        return (
          <PhotoNav
            handleRoll={handleRoll}
            setUserMode={handleUserMode}
            mode={userMode}
          />
        );
      case '2':
        return (
          <LayerNav
            handleRoll={handleRoll}
            setUserMode={handleUserMode}
            setImageMode={handleImageMode}
            mode={userMode}
            setSlab={handleSetSlab}
            // slab={slab}
          />
        );
      case '3':
        return <ThreeDNav />;
      case '4':
        return <StomatNav />;
      case '5':
        return (
          <PhotoNav handleRoll={handleRoll} setUserMode={handleUserMode} />
        );
    }
  };

  const Identify_content = () => {
    switch (NavActive) {
      case '1':
        return <Photo userRoll={roll} userMode={userMode} />;
      case '2':
        // if (userMode === '3D') {
        return (
          <VTKRotatableCrosshairsExample
            slabShowing={slab}
            userMode={userMode}
          />
        );
      // } else
      // return (
      // <Layer1 roll={roll} userMode={userMode} imageMode={imageMode} />
      // );
      case '3':
        return <ThreeD />;
      case '4':
        return <Stomat />;
      case '5':
        return <SplittedScreens roll={roll} userMode={userMode} />;
    }
  };

  const toggleDownloading = () => {
    console.log('toggled');
    setDF(true);
  };

  const ShowDialog = () => {
    switch (Dialog) {
      case true:
        return <Dialogopen flagDown={toggleDownloading} />;
      case false:
        return null;
    }
  };
  const openDialog = () => {
    setDialog(!Dialog);
  };

  useEffect(() => {
    setUserMode(userMode);
  }, [userMode]);

  if (is_Downloading) {
    return <h4 style={{ color: 'gray' }}>Downloading...</h4>;
  }
  return (
    <div>
      <button
        id="left_arrow"
        onClick={() => MoveToLeft('nav-header', 'header')}
      >
        {'<'}
      </button>
      <button
        id="right_arrow"
        onClick={() => MoveToRight('nav-header', 'header')}
      >
        {'>'}
      </button>
      <div
        style={{
          position: 'absolute',
          paddingLeft: '25px',
          left: '0px',
          width: '100%',
          background: '#cccccc',
          overflow: 'hidden',
        }}
      >
        <div
          id="nav-header"
          style={{ width: '100%', overflow: 'hidden', height: '96px' }}
        >
          {Identify()}
        </div>
      </div>
      <div id="content1">
        <div style={{ height: '100%' }}>
          <div id="nav_item">
            <div
              className="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <div
                id="btnWindows"
                className="windows Rect32"
                title="Series selection"
                onClick={openDialog}
              ></div>
              <a
                className="nav-list"
                id={NavActive == '1' ? 'Navselected' : ''}
                role="tab"
                aria-selected="true"
                onClick={() => setNavActivity('1')}
              >
                <p className="nav_txt">2D</p>
              </a>
              <a
                className="nav-list"
                id={NavActive == '2' ? 'Navselected' : ''}
                role="tab"
                aria-selected="false"
                onClick={() => setNavActivity('2')}
              >
                <p className="nav_txt">MPR</p>
              </a>
              <a
                className="nav-list"
                id={NavActive == '3' ? 'Navselected' : ''}
                role="tab"
                aria-selected="false"
                onClick={() => setNavActivity('3')}
              >
                <p className="nav_txt">3D</p>
              </a>
              <a
                className="nav-list"
                id={NavActive == '4' ? 'Navselected' : ''}
                role="tab"
                aria-selected="false"
                onClick={() => setNavActivity('4')}
              >
                <p className="nav_txt">Dental</p>
              </a>
              <a
                className="nav-list"
                id={NavActive == '5' ? 'Navselected' : ''}
                role="tab"
                aria-selected="false"
                onClick={() => setNavActivity('5')}
              >
                <p className="nav_txt">Link</p>
              </a>
            </div>
          </div>
          <div id="nav_content">
            {ShowDialog(Dialog)}
            <div
              style={{
                position: 'absolute',
                marginTop: '0',
                width: '100%',
                height: '100%',
                display: 'inline-block',
              }}
            >
              {Identify_content()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebViewer;
