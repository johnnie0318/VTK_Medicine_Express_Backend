import React, { useEffect, useState } from "react";
import Axios from "axios";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import Slider from "@material-ui/core/Slider";
import { getSeries } from "../../API/series";
import "./SplittedScreens.css"

window.img2d = new Object();
window.secondimg2d = new Object();

const useMove = (userMode) => {
    const [state, setState] = useState({x: 0, y: 0})
    const [isDown, setIsDown] = useState(false)
    const [vert, setVert] = useState(1)
    const [zoom, setZoom] = useState(1)
    const [wl, setWl] = useState(100)
    const [horizontal, setHorizontal] = useState(0)
    const [pan, setPan] = useState({x: 0, y: 0})
    // const [userMode, setUserMode] = useState("scrolling")

    const handleMouseMove = e => {
        e.persist()
        const x = e.clientX
        const y = e.clientY
        const oldX = state.x
        const oldY = state.y
        // const result = abstraction / 3

        if (isDown) {
            if (y > oldY) {
                if(userMode === "scrolling") {
                    setVert(prev => prev + 1)
                } else if(userMode === "zoom") {
                    setZoom(prev => prev + 0.02 )
                } else if(userMode === "wl") {
                    setWl(prev => prev + 2 )
                } else if(userMode === "pan") {
                    if (y > 215 && y < 470) {
                        setPan(prev => ({...prev, y: prev.y + e.movementY}))
                    }
                }
            } else if (y < oldY) {
                if(userMode === "scrolling" &&  vert !== 1) {
                    setVert(prev => prev - 1)
                } else if(userMode === "zoom") {
                    setZoom(prev => prev - 0.02 )
                } else if(userMode === "wl" && wl > 0) {
                    setWl(prev => prev - 2)
                } else if(userMode === "pan") {
                    if (y > 215 && y < 470) {
                        setPan(prev => ({...prev, y: prev.y + e.movementY}))
                    }
                }
            }
            if (x > oldX) {
                setHorizontal(prev => prev + 1)
                if(userMode === "pan") {
                    if (x > 215 && x < 860) {
                        setPan(prev => ({...prev, x: prev.x + e.movementX}))
                    }
                }
            } else if (x < oldX) {
                setHorizontal(prev => prev - 1)
                if(userMode === "pan") {
                    if (x > 215 && x < 860) {
                        setPan(prev => ({...prev, x: prev.x + e.movementX}))
                    }
                }
            }
        }
        setState(state => ({...state, x, y}))
    }

    return {
        x: state.x,
        y: state.y,
        handleMouseMove,
        vert,
        zoom,
        brightness: wl,
        pan,
        isDown,
        setIsDown,
    }
}

const updateWidthAndHeight = (zoom) => {
    let canvasWidth = document.getElementById('nav_content').offsetWidth;
    let canvasHeight = document.getElementById('nav_content').offsetHeight;

    document.getElementById('image-ruler').width = canvasWidth;
    document.getElementById('image-ruler').height = canvasHeight;

    let rulerDefaultInterval = 50;
    let rulerMaxLength = 11;
    let canvasSizePercent = rulerDefaultInterval * zoom * rulerMaxLength / canvasHeight;
    if (canvasSizePercent >= 6.5 && canvasSizePercent < 13.7) {
        rulerDefaultInterval = 32;
        rulerMaxLength = 2;    
    } else if (canvasSizePercent >= 4.05 && canvasSizePercent < 6.5) {
        rulerDefaultInterval = 34;
        rulerMaxLength = 3;
    } else if (canvasSizePercent >= 2.85 && canvasSizePercent < 4.05) {
        rulerDefaultInterval = 36;
        rulerMaxLength = 4;    
    } else if (canvasSizePercent >= 2.17 && canvasSizePercent < 2.85) {
        rulerDefaultInterval = 38;
        rulerMaxLength = 5;    
    } else if (canvasSizePercent >= 1.7 && canvasSizePercent < 2.17) {
        rulerDefaultInterval = 40;
        rulerMaxLength = 6;    
    } else if (canvasSizePercent >= 1.4 && canvasSizePercent < 1.7) {
        rulerDefaultInterval = 42;
        rulerMaxLength = 7;    
    } else if (canvasSizePercent >= 1.2 && canvasSizePercent < 1.4) {
        rulerDefaultInterval = 44;
        rulerMaxLength = 8;    
    } else if (canvasSizePercent >= 1 && canvasSizePercent < 1.2) {
        rulerDefaultInterval = 46;
        rulerMaxLength = 9;    
    } else if (canvasSizePercent >= 0.86 && canvasSizePercent < 1) {
        rulerDefaultInterval = 48;
        rulerMaxLength = 10;    
    } else if (canvasSizePercent < 0.86) {
        rulerDefaultInterval = 50;
        rulerMaxLength = 11;
    }

    let rulerInterval = rulerDefaultInterval * zoom;
    let canvasZero = canvasHeight / 2 - rulerInterval * (rulerMaxLength - 1) / 2;

    let canvas = document.getElementById("image-ruler");
    let ctx = canvas.getContext("2d");
    ctx.font = "12px Segoe UI,Tahoma,Arial";
    ctx.fillStyle = "#F9F59F";
    for(let index = 0; index < rulerMaxLength; index ++){
        ctx.moveTo(canvasWidth - 20, canvasZero + rulerInterval * index);
        ctx.lineTo(canvasWidth - 10, canvasZero + rulerInterval * index);	
    }
    ctx.moveTo(canvasWidth - 10, canvasZero);
    ctx.lineTo(canvasWidth - 10, canvasZero + rulerInterval * (rulerMaxLength - 1));
    ctx.strokeStyle = '#F9F59F';
    ctx.fillText((rulerMaxLength - 1) + "cm", canvasWidth - 40, canvasZero + rulerInterval * (rulerMaxLength - 1) + 20);
    ctx.stroke();
};

function Photo(props) {
    const [photo, setPhoto] = useState(null);
    const [secondPhoto, setSecondPhoto] = useState(null);
    const [slice, setSlice] = useState(0);
    const location = useLocation();
    const st_id = new URLSearchParams(location.search).get('st_id');
    const il = new URLSearchParams(location.search).get('il');
    const { roll, userMode } = props
    const {x, y, handleMouseMove, isDown, setIsDown, vert, zoom, pan, brightness} = useMove(userMode);

    const handleMouseDown = () => setIsDown(true)
    const handleMouseUp = () => setIsDown(false)
    const handleChange = (e, value) => setSlice(value);
    const handleAllowDrop = (event) => { event.preventDefault(); };
    const handleDrop = (event) => {
        event.preventDefault();
        var data = event.dataTransfer.getData("image");
        document.getElementById('photo').src = data;
    }

    useEffect(() => {
        window.addEventListener("resize", function() {
            updateWidthAndHeight(zoom);  
        });
        if(vert === y && vert !== 0) return;
        updateWidthAndHeight(zoom);
        var imageID = st_id + '_' + il + '_' + vert;
        const secondImageID = st_id + '_310_' + vert;
        // if (!window.img2d[imageID] && !window.secondimg2d[secondImageID]) {
        //     setPhoto(window.img2d[imageID]);
        //     setSecondPhoto(window.secondimg2d[secondImageID]);
        // } else {
        fetch(  
            `/api/viewer/img2d?m=inter&st_id=${st_id}&il=${il}&in=${vert}&iw=400&ih=400`,
            {
                headers: {
                    Authorization: `${localStorage.getItem("SavedToken")}`, 
                },
            }
        )
            .then((res) => res.blob())
            .then((blob) => {
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function () {
                    var base64data = reader.result;
                    setPhoto(base64data);
                    window.img2d[imageID] = base64data
                };
            });
            fetch(  
                `/api/viewer/img2d?m=inter&st_id=${st_id}&il=310&in=${vert}&iw=400&ih=400`,
                {
                    headers: {
                        Authorization: `${localStorage.getItem("SavedToken")}`, 
                    },
                }
            )
                .then((res) => res.blob())
                .then((blob) => {
                    var reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = function () {
                        var base64data = reader.result;
                        setSecondPhoto(base64data);
                        window.secondimg2d[secondImageID] = base64data
                    };
                });
        
        // }
    }, [vert, zoom]);
  
    return (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center"  
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onDragOver={(event) => handleAllowDrop(event)}
        onDrop={(event) => handleDrop(event)}
        >
        <div id="stHover0" className="stHover d-flex flex-row justify-content">
            <div className="playItem d-flex align-items-center">
                <div className="startImgBtn"></div>
            </div>
            <div className="playItem d-flex align-items-center">
                <div className="prevImgBtn"></div>
            </div>
            <div className="playItem d-flex align-items-center">
                <div className="playBtn"></div>
            </div>
            <div className="playItem d-flex align-items-center">
                <div className="nextImgBtn"></div>
            </div>
            <div className="playItem d-flex align-items-center">
                <div className="endImgBtn"></div>
            </div>
            <div className="playItem d-flex align-items-center">
                <div className="imgNumber">1</div>
            </div>
            <div className="playItem d-flex align-items-center">
                <div className="decreaseBtn"></div>
            </div>
            <div className="playItem d-flex align-items-center" style={{ width: "100%" }}>
                <div className="sliderImg">
                    <a className="sliderHandle"></a>
                </div>
            </div>
            <div className="playItem d-flex align-items-center">
                <div className="increaseBtn"></div>
            </div>
        </div>
        <div className="dicom-info d-flex flex-column justify-content-between">
            <canvas id="image-ruler" style={{position: `absolute`, zIndex: `2`, top: `0`, left: `0`}}></canvas>
            <div className="tHolder d-flex flex-row justify-content-between">
                <div id="tl0" className="left">
                    <div id="n0" className="patientt">DENTAL</div>
                    <div id="id0" className="patientt">31163581</div>
                    <div id="snsd0" className="imaget">353 XORANCAT STUDY</div>
                    <div id="ga0" className="patientt">M</div>
                    <div id="cb0" className="imaget"></div>
                    <div id="ic0" className="imaget"></div>
                </div>
                <div id="tl0" className="right">
                    <div id="instit0" className="patientt">WORKSTATION</div>
                    <div id="mm0" className="imaget">Xoran Technologies ?</div><div id="ad0" className="imaget">02-фев-2015</div>
                    <div id="at0" className="imaget"></div>
                </div>
            </div>
            <div id="lo0" className="mHolder">R</div>
            <div className="bHolder d-flex flex-row justify-content-between">
                <div className="left">
                    <div id="pr0" className="prior" style={{ display: "none" }}>Prior</div>
                </div>
                <div id="bo0" className="bOrient">P</div>
                <div className="right">
                    <div id="inverts0" className="invertlbl imaget"></div>
                    <div id="z0" className="imaget">Увеличение: { Math.floor(zoom * 100) } %</div>
                    <div className="imaget" id="cw0">Центр/Ширина: 1500/5000</div>
                    <div className="imaget" id="in0">Снимки: {vert} из 214</div>
                </div>
            </div>
        </div>
        {!photo && !secondPhoto ? (
            <CircularProgress style={{ width: "200px", height: "200px" }} />
        ) : (
            <div className="d-flex h-100 container justify-content-between">
            {/* <div style={{background: `url(${photo})`}} className="m-auto" id="photo" style={{transform: `rotate(${roll.rotate}deg) scaleY(${roll.y}) scaleX(${roll.x})`, transition: "0.5s"}}>
            </div> */}
                <img src={photo} alt="image" className="photosingeneralonlyinsplitscreen" style={{transform: `rotate(${roll.rotate}deg) scaleY(${roll.y}) scaleX(${roll.x}) scale(${zoom})`, filter: `brightness(${brightness}%)`, top: `${pan.y}px`, left: `${pan.x}px`, }}/>
                <img src={secondPhoto} alt="image" className="photosingeneralonlyinsplitscreen" style={{transform: `rotate(${roll.rotate}deg) scaleY(${roll.y}) scaleX(${roll.x}) scale(${zoom})`, filter: `brightness(${brightness}%)`}}/>
            {/* <div id="container-slider">0
                <Slider
                defaultValue={0.00000005}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-smal l-steps"
                step={1}
                marks
                min={0}
                max={214}
                valueLabelDisplay="auto"
                onChange={handleChange}
                />
            </div> */}
            </div>
        )}
        </div>
    );
}

export default Photo;
