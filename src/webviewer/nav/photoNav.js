import React from 'react'
import {useState} from "react"
import logo from './logon.png'

function Nav1(props){
    const [SecondDrop, setSecondDrop] = useState(false);
    const { handleRoll, setUserMode } = props;
    
    return (
      <div id="header" style={{ marginLeft: "0px" }}>
        {SecondDrop?
            <div id = "droplist3">
                <div id = "droplist_item3">
                    <div id = "list_image31"></div>
                    elipse
                </div>
                <div id = "droplist_item3">
                <div id = "list_image32"></div>
                    rectangle
                </div>
                <div id = "droplist_item3">
                <div id = "list_image33"></div>
                    circle
                </div>
            </div>
            :null
        }

        <div id="first" className = "same">
          <div id="eye_image">
            {/* <img src="http://lkmt.kometa-pacs.info/App_Themes/BlackDark/images/shina_icon2.png" style={{width="38px", height="38px"}} /> */}
            <img className='eye_logo' src={logo} />
          </div>
          <div id="header_texts_1">
            <center><p>Menu</p></center>
          </div>
        </div>

        <div id="second" className = "same">
            <table id="second_table">
              <tbody>
                <tr>
                  <td onClick={() => setUserMode("direct")}>
                    <div id="second_first" style={props.mode == "direct" ?{height:"20px",backgroundColor: "#ffd480"}:{}}>
                      <div id="second_first_img"></div>
                      <div id="second_first_text">
                        <p>Direct Line</p>
                      </div>
                    </div>
                  </td>
                  <td onClick = {() => setSecondDrop(!SecondDrop)}>
                    <div id="second_second">
                      <div id="second_second_img"></div>
                      <div id="second_second_text">
                        <p>Rectangle   &nbsp; &#9660;</p>
                      </div>
                    </div>
                  </td>
                  <td onClick = {() => handleRoll("clear")}>
                    <div id="second_three">
                      <div id="second_three_img"></div>
                      <div id="second_three_text">
                        <p>Delete Everything</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td onClick={() => setUserMode("arrow")}>
                    <div id="second_four" style={props.mode == "arrow" ?{backgroundColor: "#ffd480"}:{}}>
                      <div id="second_four_img"></div>
                      <div id="second_four_text">
                        <p>Arrow</p>
                      </div>
                    </div>
                  </td>
                  <td onClick={() => setUserMode("text")}>
                    <div id="second_five" style={props.mode == "text" ?{backgroundColor: "#ffd480"}:{}}>
                      <div id="second_five_img"></div>
                      <div id="second_five_text">
                        <p>Text</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div id="header_texts_2">
              <center><p>Dimensions and Annotations</p></center>
            </div>
          </div>

        <div id="three" className = "same">
          <table>
            <tbody>
              <tr>
                <td onClick={() => handleRoll("left")}>
                  <div id="three_first">
                    <div id="three_first_img"></div>
                    <div id="three_first_txt">
                      <p>Rotate left</p>
                    </div>
                  </div>
                </td>
                <td onClick={() => handleRoll("right")}>
                  <div id="three_second">
                    <div id="three_second_img"></div>
                    <div id="three_second_txt">
                      <p>Rotate Right</p>
                    </div>
                  </div>
                </td>
                <td onClick={() => handleRoll("vert")}>
                  <div id="three_three">
                    <div id="three_three_img"></div>
                    <div id="three_three_txt">
                      <p>Translate Vert</p>
                    </div>
                  </div>
                </td>
                <td onClick={() => handleRoll("hori")}>
                  <div id="three_four">
                    <div id="three_four_img"></div>
                    <div id="three_four_txt">
                      <p>Translate Horizon</p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div id="header_texts_3">
            <center><p>RollOver</p></center>
          </div>
        </div>

        <div id="four" className = "same">
          <div id="four_img">
            <img src="http://lkmt.kometa-pacs.info/App_Themes/WebPbCommon/images/play.png" />
          </div>
          <center><p className="img_bottom_txt">Assoc</p></center>
          <div id="header_texts_4">
            <center><p>Movie</p></center>
          </div>
        </div>

        <div id="five" className = "same">
          <table>
            <tbody>
              <tr>
                <td onClick={() => setUserMode("scrolling")}>
                  <div id="five_first">
                    <div style={props.mode == "scrolling" ?{backgroundColor: "#ffd480"}:{}}>
                      <div id="five_first_img"></div>
                      <div id="five_first_txt">
                        <p>&nbsp;&nbsp;&nbsp;Scrolling&nbsp;&nbsp;&nbsp;</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td onClick={() => setUserMode("zoom")}>
                  <div id="five_second">
                    <div style={props.mode == "zoom" ?{backgroundColor: "#ffd480"}:{}}>
                      <div id="five_second_img"></div>
                      <div id="five_second_txt">
                        <p>Magnification</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td onClick={() => setUserMode("pan")}>
                  <div id="five_third">
                    <div style={props.mode == "pan" ?{backgroundColor: "#ffd480"}:{}}>
                      <div id="five_third_img"></div>
                      <div id="five_third_txt">
                        <p>Bias</p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div id="header_texts_5">
            <center><p>Manipulation</p></center>
          </div>
        </div>

         <div id="six" className = "same">
          <table>
            <tbody>
              <tr>
                <td onClick={() => setUserMode("wl")}>
                  <div id="six_first">
                    <div style={props.mode == "wl" ?{backgroundColor: "#ffd480"}:{}}>
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
                    <label id  = "third_options">Third Option</label><br/>
                    <div id="six_third_child">
                      <div id="six_third_img"></div>
                      <select id = "select_tag">
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
            <center><p>Performance</p></center>
          </div>
        </div>


        <div id="seven" className = "same">
          <table>
            <tbody>
              <tr>
                <td>
                  <div id="seven_first">
                    <div id="seven_first_img"></div>
                    <div id="seven_first_txt">
                      <p>&nbsp;&nbsp;&nbsp;Ruller&nbsp;&nbsp;&nbsp;</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div id="seven_second">
                    <div id="seven_second_img"></div>
                    <div id="seven_second_txt">
                      <p>Orig size</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div id="seven_third">
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;Scale</label><br/>
                    <div id="seven_third_child">
                      <select>
                        <option>25%</option>
                        <option>50%</option>
                        <option>100%</option>
                      </select>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div id="header_texts_7">
            <center><p>Magnification</p></center>
          </div>
        </div>

        <div id="eight" className = "same">
          <div id="eight_img">
          </div>
          <center><p className="img_bottom_txt">Models</p></center>
          <div id="header_texts_8">
            <center><p>Accomm</p></center>
          </div>
        </div>

        <div id="nine" className = "same">
          <table>
            <tbody>
              <tr>
                <td>
                  <div id="nine_first">
                    <input type="checkbox"/><p className="check_txt">Info about the picture</p>
                  </div>
                </td>
                <td>
                  <div id="nine_second">
                    <input type="checkbox"/><p className="check_txt">Info about the Patient</p>
                  </div>                
                </td>
              </tr>
              <tr>
                <td>
                  <div id="nine_three">
                    <input type="checkbox"/><p className="check_txt">Annotations</p>
                  </div>                
                </td>
              </tr>
            </tbody>
          </table>
          <div id="header_texts_9">
            <center><p>Show/Hide</p></center>
          </div>
        </div>

        <div id="ten" className = "same">
          <div id="ten_img">
          </div>
          <center><p className="img_bottom_txt">Invert</p></center>
          <div id="header_texts_10">
            <center><p>Filters</p></center>
          </div>
        </div>

        <div id="eleven" className="same">
          <div id="eleven_img">
          </div>
          <center><p className="img_bottom_txt">Quality</p></center>
          <div id="header_texts_11">
            <center><p>Quality</p></center>
          </div>
        </div>
      </div>
    )
}

export default Nav1;