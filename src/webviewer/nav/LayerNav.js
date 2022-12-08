import { PinDropSharp } from '@material-ui/icons';
import React from 'react';
import { useState } from 'react';
import logo from './logon.png';

function Nav2(props) {
  const {
    handleRoll,
    setUserMode,
    setImageMode,
    setDeletedStage,
    setSlab,
  } = props;

  function onSlabSliderChanged() {
    var val = document.getElementById('set-slab-thickness');
    setSlab(Number.parseInt(val.value));
  }

  return (
    <div id="header" style={{ marginLeft: '0px' }}>
      <div id="first" className="same">
        <div id="eye_image">
          <img className="eye_logo" src={logo} />
        </div>
        <div id="header_texts_1">
          <center>
            <p>Menu</p>
          </center>
        </div>
      </div>

      <div id="three" className="same">
        <table>
          <tbody>
            <tr>
              <td onClick={() => setImageMode('axial')}>
                <div id="three_first">
                  <div id="Layer_userimage1"></div>
                  <div id="three_first_txt">
                    <p>Axial</p>
                  </div>
                </div>
              </td>
              <td onClick={() => setImageMode('sagittal')}>
                <div id="three_second">
                  <div id="Layer_userimage2"></div>
                  <div id="three_second_txt">
                    <p>Sagittal</p>
                  </div>
                </div>
              </td>
              <td onClick={() => setImageMode('coronary')}>
                <div id="three_three">
                  <div id="Layer_userimage3"></div>
                  <div id="three_three_txt">
                    <p>Coronary</p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div id="header_texts_3">
          <center>
            <p>RollOver</p>
          </center>
        </div>
      </div>

      <div id="five" className="same">
        <table>
          <tbody>
            <tr>
              <td onClick={() => setUserMode('scrolling')}>
                <div id="five_first">
                  <div
                    style={
                      props.mode == 'scrolling'
                        ? { backgroundColor: '#ffd480' }
                        : {}
                    }
                  >
                    <div id="five_first_img"></div>
                    <div id="five_first_txt">
                      <p>&nbsp;&nbsp;&nbsp;Scrolling&nbsp;&nbsp;&nbsp;</p>
                    </div>
                  </div>
                </div>
              </td>
              <td onClick={() => setUserMode('zoom')}>
                <div id="five_second">
                  <div
                    style={
                      props.mode == 'zoom' ? { backgroundColor: '#ffd480' } : {}
                    }
                  >
                    <div id="five_second_img"></div>
                    <div id="five_second_txt">
                      <p>Zoom</p>
                    </div>
                  </div>
                </div>
              </td>
              <td onClick={() => setUserMode('pan')}>
                <div id="five_third">
                  <div
                    style={
                      props.mode == 'pan' ? { backgroundColor: '#ffd480' } : {}
                    }
                  >
                    <div id="five_third_img"></div>
                    <div id="five_third_txt">
                      <p>Pan</p>
                    </div>
                  </div>
                </div>
              </td>
              {/* <td onClick={() => setUserMode('rotate')}>
                <div id="five_third">
                  <div
                    style={
                      props.mode == 'rotate'
                        ? { backgroundColor: '#ffd480' }
                        : {}
                    }
                  >
                    <div id="Layer_Rotateimage"></div>
                    <div id="five_third_txt">
                      <p>Rotation</p>
                    </div>
                  </div>
                </div>
              </td> */}
            </tr>
          </tbody>
        </table>
        <div id="header_texts_5">
          <center>
            <p>2D Manipulation</p>
          </center>
        </div>
      </div>

      <div id="five" className="same">
        <table>
          <tbody>
            <tr>
              <td>
                <div id="five_first">
                  <div id="five_first_img1"></div>
                  <div id="five_first_txt">
                    <p>&nbsp;&nbsp;&nbsp;Layer&nbsp;&nbsp;&nbsp;</p>
                  </div>
                </div>
              </td>
              <td>
                <div id="five_second">
                  <div id="five_second_img1"></div>
                  <div id="five_second_txt">
                    <p>Rel. dot</p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div id="header_texts_5">
          <center>
            <p>Layer Manipulation</p>
          </center>
        </div>
      </div>

      <div id="twelve" className="same">
        <table>
          <tbody>
            <tr>
              {/* <td onClick={() => setUserMode('3D')}>
                <div id="twelve_first">
                  <div
                    style={
                      props.mode == '3D' ? { backgroundColor: '#ffd480' } : {}
                    }
                  >
                    <div id="twelve_first_img"></div>
                    <div id="twelve_first_txt">
                      <p>3D Rotation</p>
            ;
                    </div>
                  </div>
                </div>
              </td> */}
              <td>
                {/* onClick={() => setSlab()}> */}
                <div id="twelve_first">
                  {/* <div style={props.slab ? { backgroundColor: '#ffd480' } : {}}>
                    <div id="twelve_first_img"></div>
                    <div id="twelve_first_txt">
                      <p>Thickness</p>
                    </div>
                  </div> */}
                  <input
                    id="set-slab-thickness"
                    type="range"
                    name="points"
                    min="1"
                    max="5000"
                    onChange={() => onSlabSliderChanged()}
                  />
                  <div id="twelve_first_txt">
                    <label htmlFor="set-slab-thickness">SlabThickness</label>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div id="header_texts_6">
          <center>
            <p>3D Manipulation</p>
          </center>
        </div>
      </div>

      <div id="six" className="same">
        <table>
          <tbody>
            <tr>
              <td onClick={() => setUserMode('wl')}>
                <div id="six_first">
                  <div
                    style={
                      props.mode == 'wl' ? { backgroundColor: '#ffd480' } : {}
                    }
                  >
                    <div id="six_first_img"></div>
                    <div id="six_first_txt">
                      <p>&nbsp;&nbsp;&nbsp;W/L&nbsp;&nbsp;&nbsp;</p>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div id="six_second">
                  <div id="six_second_img"></div>
                  <div id="six_second_txt">
                    <p>Color</p>
                  </div>
                </div>
              </td>
              <td>
                <div id="six_third">
                  <label id="third_options">Third Option</label>
                  <br />
                  <div id="six_third_child">
                    <div id="six_third_img"></div>
                    <select>
                      <option>Presets</option>
                      <option>No</option>
                      <option>Lungs</option>
                      <option>A heart</option>
                      <option>Bone</option>
                      <option>Brain</option>
                      <option>Thick. intestine</option>
                      <option>Abdomen floor</option>
                    </select>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div id="header_texts_6">
          <center>
            <p>Performance</p>
          </center>
        </div>
      </div>

      <div id="eight" className="same">
        <div id="eight_img"></div>
        <center>
          <p className="img_bottom_txt">Models</p>
        </center>
        <div id="header_texts_8">
          <center>
            <p>Accomm</p>
          </center>
        </div>
      </div>

      <div id="second" className="same">
        <table id="second_table">
          <tbody>
            <tr>
              <td>
                <div id="second_first">
                  <div id="second_first_img1"></div>
                  <div id="second_first_text">
                    <p>Arrow</p>
                  </div>
                </div>
              </td>
              <td>
                <div id="second_three">
                  <div id="second_three_img1"></div>
                  <div id="second_three_text">
                    <p>Direct Line</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div id="second_four">
                  <div id="second_four_img1"></div>
                  <div id="second_four_text">
                    <p>Text</p>
                  </div>
                </div>
              </td>
              <td>
                <div id="second_five">
                  <div id="second_five_img1"></div>
                  <div id="second_five_text">
                    <p>Delete Everything</p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div id="header_texts_2">
          <center>
            <p>Dimensions and Annotations</p>
          </center>
        </div>
      </div>

      <div id="nine" className="same">
        <table>
          <tbody>
            <tr>
              <td>
                <div id="nine_first">
                  <input type="checkbox" />
                  <p className="check_txt">Info about the picture</p>
                </div>
              </td>
              <td>
                <div id="nine_second">
                  <input type="checkbox" />
                  <p className="check_txt">Info about the Patient</p>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div id="nine_three">
                  <input type="checkbox" />
                  <p className="check_txt">Annotations</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div id="header_texts_9">
          <center>
            <p>Show/Hide</p>
          </center>
        </div>
      </div>

      <div id="ten" className="same">
        <div id="ten_img1"></div>
        <center>
          <p className="img_bottom_txt">Auto</p>
        </center>
        <div id="header_texts_10">
          <center>
            <p>Filters</p>
          </center>
        </div>
      </div>

      <div id="eleven" className="same">
        <div id="eleven_img"></div>
        <center>
          <p className="img_bottom_txt">Quality</p>
        </center>
        <div id="header_texts_11">
          <center>
            <p>Quality</p>
          </center>
        </div>
      </div>
    </div>
  );
}

export default Nav2;
