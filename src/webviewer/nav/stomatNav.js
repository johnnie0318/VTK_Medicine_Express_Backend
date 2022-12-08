import React from 'react'
import {useState} from 'react'

function Nav4(props){

    const [openDrop1, setopenDrop1] = useState(false);
    const [openDrop2, setopenDrop2] = useState(false);

    const DropdownShow1 = () =>{
        setopenDrop1(!openDrop1)
        setopenDrop2(false)
    }

    const DropdownShow2 = () =>{
        setopenDrop2(!openDrop2)
        setopenDrop1(false)
    }
    return (
<div id="header">
    {openDrop1?
        <div id = "droplist1">
            <div id = "droplist_item1">
                Mandible
            </div>
            <div id = "droplist_item1">
                Maxilla
            </div>
            <div id = "droplist_item1">
                Name
            </div>
        </div>
        :null
    }
    {openDrop2?
        <div id = "droplist2">
        <div id = "droplist_item2">
                Left Channel
            </div>
            <div id = "droplist_item2">
                Right Channel
            </div>
        </div>
        :null
    }
        <div id="first" className = "same">
          <div id="eye_image">
            <img src="http://lkmt.kometa-pacs.info/App_Themes/BlackDark/images/shina_icon2.png" />
          </div>
          <div id="header_texts_1">
            <center><p>Menu</p></center>
          </div>
        </div>

        <div id="three" className = "same">
          <table>
            <tbody>
              <tr>
                <td>
                  <div id="three_three" onClick = {DropdownShow1}>
                    <div id="three_three_img1"></div>
                    <div id="three_three_txt">
                      <p>New Curve</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div id="three_four" onClick = {DropdownShow2}>
                    <div id="three_four_img1"></div>
                    <div id="three_four_txt">
                      <p>Channels</p>
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

        <div id="three" className = "same">
          <table>
            <tbody>
              <tr>
                <td>
                  <div id="three_three">
                    <div id="three_three_img11"></div>
                    <div id="three_three_txt">
                      <p>Curves list</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div id="three_four">
                    <div id="three_four_img11"></div>
                    <div id="three_four_txt">
                      <p>Rename</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div id="three_four">
                    <div id="three_five_img11"></div>
                    <div id="three_four_txt">
                      <p>curves place</p>
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


        <div id="five" className = "same">
          <table>
            <tbody>
              <tr>
                <td>
                  <div id="five_first">
                    <div id="five_first_img"></div>
                    <div id="five_first_txt">
                      <p>&nbsp;&nbsp;&nbsp;Scrolling&nbsp;&nbsp;&nbsp;</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div id="five_second">
                    <div id="five_second_img"></div>
                    <div id="five_second_txt">
                      <p>Magnification</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div id="five_third">
                    <div id="five_third_img"></div>
                    <div id="five_third_txt">
                      <p>Bias</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div id="five_third">
                    <div id="Layer_Rotateimage"></div>
                    <div id="five_third_txt">
                      <p>Rotation</p>
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

        <div id="three" className = "same">
          <table>
            <tbody>
              <tr>
                <td>
                  <div id="three_first">
                    <div id="Layer_userimage1"></div>
                    <div id="three_first_txt">
                      <p>Axial</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div id="three_second">
                    <div id="Layer_userimage2"></div>
                    <div id="three_second_txt">
                      <p>Sagittal</p>
                    </div>
                  </div>
                </td>
                <td>
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
            <center><p>RollOver</p></center>
          </div>
        </div>

        <div id="five" className = "same">
          <table>
            <tbody>
              <tr>
                <td>
                  <div id="five_third">
                    <div id="vrmip_image"></div>
                    <div id="five_third_txt">
                      <p>VR</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div id="five_third">
                    <div id="vrmip_image"></div>
                    <div id="five_third_txt">
                      <p>MIP</p>
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

        <div id = "list_scroll1">
            <div id = 'list_scrollItem'>General</div>
            <div id = 'list_scrollItem'>A heart</div>
            <div id = 'list_scrollItem'>Bones</div>
            <div id = 'list_scrollItem'>None</div>
            <div id = 'list_scrollItem'>None</div>
        </div>


        <div id="eight" className = "same">
          <div id="eight_img12">
          </div>
          <center><p className="img_bottom_txt">W/L</p></center>
          <div id="header_texts_8">
            <center><p>Accomm</p></center>
          </div>
        </div>

        <div id="second" className = "same">
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
              <center><p>Dimensions and Annotations</p></center>
            </div>
          </div>

        <div id="nine" className = "same">
          <table>
            <tbody>
              <tr>
                <td>
                  <div id="nine_first">
                    <input type="checkbox" checked /><p className="check_txt">Info about the picture</p>
                  </div>
                </td>
                <td>
                  <div id="nine_second">
                    <input type="checkbox" checked /><p className="check_txt">Info about the Patient</p>
                  </div>                
                </td>
              </tr>
              <tr>
                <td>
                  <div id="nine_three">
                    <input type="checkbox" checked /><p className="check_txt">Annotations</p>
                  </div>                
                </td>
              </tr>
            </tbody>
          </table>
          <div id="header_texts_9">
            <center><p>Show/Hide</p></center>
          </div>
        </div>

      </div>
    )
}

export default Nav4;