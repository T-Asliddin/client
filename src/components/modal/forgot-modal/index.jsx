import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { auth } from "@service";
import { ForgotCodModal } from "..";
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

export default function BasicModal({ modal, forgot }) {
  const [email, setEmail] = useState("");
  const [openn ,setOpenn] =useState(false)

const handleSubmit = async (e) => {
    e.preventDefault();
    const newemail={
        "email": email
    }
    try {
      const response = await auth.forgot_password(newemail);
      if (response.status===200) {
        localStorage.setItem("email", email)
        forgot()
        setOpenn(true)
      }
      
    } catch (error) {}
   
  };
  const togglee =()=>{
    setOpenn(false)
}
  return (
    <div>
        <ForgotCodModal openn={openn} togglee={togglee}/>
      <Modal
        open={modal}
        onClose={forgot}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="spring-modal-title"
            variant="h4"
            component="h2"
            className="text-center "
          >
            Email kiriting
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <TextField
                fullWidth
                type="text"
                label="Email"
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Button
                type="submit"
                fullWidth
                className=" mt-3"
                variant="contained"
              >
                Submit
              </Button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
