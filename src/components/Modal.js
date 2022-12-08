import React from "react";
import ModalMUI from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import "./Modal.css";
import { Collapse, Fade, Slide } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    minWidth: 390,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: 10,
    display: "flex",
    flexDirection: "column",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade direction="up" ref={ref} {...props} />;
});

const Modal = (props) => {
  const { open, handleClose, title, width, children } = props;
  const classes = useStyles();

  const body = (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%)`,
        width,
      }}
    >
      <header className="text-center w-100">
        <div id="mbc_mpc_title" class="PopupTitle text-white">
          {title}
        </div>
      </header>
      <div className={classes.paper}>{children}</div>
    </div>
  );

  return (
    // <ModalMUI open={open} onClose={handleClose}>
    //   <header className="text-center">
    //     <span id="mbc_mpc_title" class="PopupTitle">
    //       {title}
    //     </span>
    //   </header>
    //   {props.children}
    // </ModalMUI>
    <ModalMUI open={open} onClose={handleClose}>
      <Fade in={open}>{body}</Fade>
    </ModalMUI>
  );
};

export default Modal;
