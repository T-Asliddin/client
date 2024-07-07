import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { auth } from "@service";
import { Snackbar } from "../..";
const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Index(props) {
  const [code, setCode] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [severity,setSeverity]=useState("")

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      code: code,
      email: localStorage.getItem("email"),
    };
    console.log(payload);
    try {
      const response = await auth.verify_code(payload);
      if (response.status === 201) {
        props.toggle();
        setSeverity("success")
        setOpen(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setSeverity("error")
      setOpen(true)
    }
  };
  const toggle = () => {
    setOpen(false);
  };


  return (
    <div>
            <Snackbar open={open} toggle={toggle} severity={severity} />

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={props.open}
        onClose={props.toggle}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <Typography
              id="spring-modal-title"
              variant="h5"
              component="h2"
              className="text-center "
            >
              Enter Code
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <TextField
                  fullWidth
                  type="text"
                  label="Code"
                  id="code"
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  className=" mt-3"
                  variant="contained"
                >
                  Sign up
                </Button>
              </form>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
