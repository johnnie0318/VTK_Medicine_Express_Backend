import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRowMove } from "../../actions";
// import { getStudy } from "../../API/studies";
import Label from "../label";

const Tabs = () => {
  // const selectedStudyMove = useSelector((state) => state.selectedStudyMove);
  // const selectedStudy = useSelector((state) => state.selectedStudy);
  const dispatch = useDispatch();
  // const handleSelectMoving = () => {
  //   dispatch(setSelectedRowMove(selectedStudy));
  // };
  const [markedStudyMove, setMarkedStudyMove] = useState(null);
  // const handleResetStudy = () => {
  //   dispatch(setSelectedRowMove(null));
  // };

  // useEffect(() => {
  //   getStudy(selectedStudyMove)
  //     .then((res) => setMarkedStudyMove(res.data.data))
  //     .catch((err) => console.error(err));
  // }, [selectedStudyMove]);

  const MovingHandler = () =>
    !selectedStudyMove ? (
      <div /*onClick={handleSelectMoving}*/ className="d-flex align-items-center">
        <img
          src="http://lkmt.kometa-pacs.info/img/wpb/checkmark-18.png"
          alt="checkmark"
        />
        Отметить
      </div>
    ) : (
      <div onClick={handleResetStudy} className="d-flex align-items-center">
        <img
          src="http://lkmt.kometa-pacs.info/img/wpb/reset-16.png"
          alt="Remove selected move"
        />
        Сбросить |
        <span className="titleStudyMarked">
          {markedStudyMove ? (
            <Fragment>
              {markedStudyMove.pat_name} ({markedStudyMove.pat_id}), дата:{" "}
              {markedStudyMove.study_datetime.slice(0, 11)}
            </Fragment>
          ) : (
            "Loading..."
          )}
        </span>
      </div>
    );

  return (
    <div>
      <div
        style={{
          height: "20px",
          background:
            "url(http://lkmt.kometa-pacs.info/App_Themes/BlackDark/images/topGradients.gif)",
          paddingLeft: "12px",
        }}
        className="w-100 d-flex"
      >
        {/* {names.map((item, index) => (
          <Label
            item={item}
            showNumbers={showNumbers}
            key={item.name}
            isSelected={index === selectedIndex}
            onChange={changeTab}
            index={index}
          />
        ))}
        {hasMove && (
          <span className="moveIndicatorButton">
            <MovingHandler />
          </span>
        )} */}
      </div>
    </div>
  );
};

export default Tabs;
