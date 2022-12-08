import React, { useState, Fragment, useRef, useEffect } from "react";
import { Collapse, Slide } from "@material-ui/core";
import "./MultiSelection.css";

const MultiSelection = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const node = useRef();
  const {
    styleInput = {},
    options,
    handleSelection,
    valuesSelected,
    selectAll,
  } = props;
  const handleToggleMenu = () => setOpenMenu((prev) => !prev);
  // const handleSelection = (value) => {
  //   const updatedValuesSelected = [...valuesSelected];

  //   if (updatedValuesSelected.includes(value)) {
  //     const i = updatedValuesSelected.indexOf(value);

  //     updatedValuesSelected.splice(i, 1);
  //   } else {
  //     updatedValuesSelected.push(value);
  //   }

  //   setValuesSelected(updatedValuesSelected);
  // };

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setOpenMenu(false);
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div>
      <div
        id="multiSelection"
        className="border"
        style={styleInput}
        onClick={handleToggleMenu}
      >
        <span
          style={{
            width: "71px",
            whiteSpace: "pre-wrap",
            textOverflow: "ellipsis",
          }}
        >
          {valuesSelected.map((value) => (
            <Fragment key={value}>{value},</Fragment>
          ))}
        </span>

        <div id="multiSelectionPicker"></div>
      </div>
      <div>
        <Slide direction="down" in={openMenu}>
          <div
            className="bg-white"
            style={{
              width: "223px",
              height: "200px",
              position: "absolute",
              zIndex: 100,
              overflowY: "scroll",
            }}
            ref={node}
          >
            <div className="d-flex flex-row optionMultiSelection table-striped">
              <input
                type="checkbox"
                className="checkboxMultiSelection"
                onChange={selectAll}
              />
              Все
            </div>
            {options.map((option, index) => (
              <div
                className="d-flex flex-row optionMultiSelection table-striped"
                key={index}
              >
                <input
                  type="checkbox"
                  className="checkboxMultiSelection"
                  checked={valuesSelected.indexOf(option.value) !== -1}
                  onChange={(e) => handleSelection(option.value)}
                />
                {option.label}
              </div>
            ))}
          </div>
        </Slide>
      </div>
    </div>
  );
};

export default MultiSelection;
