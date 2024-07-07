import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { service } from "@service";
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

export default function BasicModal({ open, toggle ,item}) {
  const [form, setForm] = useState({});
const heandleChange = (e) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = {
    name: form.name,
    price: +form.price,
  };
 
  console.log(form);
  if (item) {
    const edit ={
    id:item.id,
    name: form.name,
    price: +form.price,
   }
    try {
      const response = await service.update(edit);
      if (response.status===200) {
        console.log(response);
        toggle()
          window.location.reload()
      }
    } catch (error) {}
  }else{
    try {
      const response = await service.create_service(payload);
      if (response.status===201) {
        toggle()
        window.location.reload()
      }
    } catch (error) {}
  }
};
  return (
    <div>
      <Modal
        open={open}
        onClose={toggle}
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
           Create Service
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <TextField
                fullWidth
                type="text"
                label="Name"
                id="name"
                name="name"
                onChange={heandleChange}
              />
              <TextField
                fullWidth
                type="number"
                label="Price"
                id="price"
                name ="price"
                onChange={heandleChange}
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


