import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import GL_STORE from '../../global';

function Dialog(props) {
  const [serieses, setSeries] = useState([]);
  const [thumbLists, setThumb] = useState(null);
  const location = useLocation();
  const st_id = new URLSearchParams(location.search).get('selStudyId');
  const il = new URLSearchParams(location.search).get('id');
  const { flagDown } = props;
  const handleDragStart = (event, id) => {
    event.dataTransfer.setData('id', id);
  };

  useEffect(() => {
    if (serieses == undefined) return;
    if (serieses.length == 0) {
      fetch(`${GL_STORE.DATA_SERVER_URL}/api/series?filter[study_id]=${st_id}`, {
        headers: {
          Authorization: `${localStorage.getItem('SavedToken')}`,
        },
      })
        .then(response => response.json())
        .then(json => {
          setSeries(json.data);
        });
    } else {
      if (serieses[0].thumbnails == undefined) {
        serieses.map((series, index) => {
          var base64data = '';
          fetch(`${GL_STORE.DATA_SERVER_URL}/api/images/thumbnails/${series.id}`, {
            headers: {
              Authorization: `${localStorage.getItem('SavedToken')}`,
            },
          })
            .then(res => res.blob())
            .then(blob => {
              var reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = function() {
                base64data = reader.result;
                serieses[index]['thumbnails'] = base64data;
                if (index == serieses.length - 1) {
                  setThumb(
                    serieses.map(series => {
                      console.log(series.id);
                      return (
                        <div
                          onDragStart={event =>
                            handleDragStart(event, series.id)
                          }
                          onDragEnd={() => {
                            GL_STORE.IS_CHANGING = true;
                            GL_STORE.SERIES_ID = series.id;
                            flagDown();
                          }}
                          key={series.id}
                          className="item draggable ui-draggable"
                          draggable="true"
                        >
                          <div
                            className="imgListItem zfpThumbnail btnPressed"
                            draggable="true"
                          >
                            <img
                              id="img353"
                              src={series.thumbnails}
                              style={{ width: '70px', height: '70px' }}
                            />
                            <br />
                            <span id="descr353" className="imgListCaptionDescr">
                              {series.num_instances}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  );
                }
              };
            });
        });
      }
    }
  }, [serieses, st_id]);

  return (
    <div
      id="DialogContainer"
      onMouseOver={function() {
        document.getElementById('DialogContainer').classList.add('thover');
      }}
      onMouseOut={function() {
        document.getElementById('DialogContainer').classList.remove('thover');
      }}
    >
      <div className="rCaption">Series</div>
      <div className="studyHeader studyHeaderSelected">
        <div className="minus"></div>
        {GL_STORE.STUDY_INFO.pat_name}
        <br />
        {GL_STORE.SERIES_INFO.series_datetime}
      </div>
      {thumbLists}
    </div>
  );
}

export default Dialog;
