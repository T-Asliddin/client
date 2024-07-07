import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { auth } from "@service";
import { Snackbar } from "../..";

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

export default function BasicModal({ openn, togglee }) {
  const [form, setForm] = useState({});
  const [open , setOpen]=useState(false)
  const [severity,setSeverity]=useState("")

  const Heandlchange=(e)=>{
    const {name , value} = e.target
    setForm({...form , [name]:value})
  }
const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload={
        code:form.cod,
        email:localStorage.getItem("email"),
        new_password:form.password
    }
    try {
      const response = await auth.verify_forgot_password(payload);
      if (response.status==201) {
        setSeverity("success")
        setOpen(true)
        togglee()
      }
    } catch (error) {
      setSeverity("error")
      setOpen(true)
    } 
  };
  const toggle=()=>{
    setOpen(false)
  }
  return (
    <div>
      <Snackbar open={open} toggle={toggle} severity={severity} />
      <Modal
        open={openn}
        onClose={togglee}
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
            Parolni yangilash
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <TextField
                fullWidth
                type="text"
                label="Cod"
                id="cod"
                name="cod"
                onChange={Heandlchange}
              />
              <TextField
                fullWidth
                type="text"
                label="New password"
                id="password"
                name ="password"
                onChange={Heandlchange}
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
