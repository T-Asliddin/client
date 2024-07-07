import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { order } from "@service";
import { Snackbar } from "../..";
import { service } from "@service";

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

export default function BasicModal({ modal, close, item }) {
  const [form, setForm] = useState();
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [data, setData] = useState([]);
  const getdata = async () => {
    try {
      const response = await service.getallhy  ();
      if (response.status === 200 && response.data.services) {
        setData(response.data.services);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      amount: +form.amount,
      client_full_name: form.name,
      client_phone_number: form.number,
      service_id: form.id,
    };
    try {
      const response = await order.create_order(payload);
      console.log(response);
      if (response.status == 201) {
        setSeverity("success");
        setOpen(true);
        close();
        window.location.reload();
      }
    } catch (error) {
      setSeverity("error");
      setOpen(true);
    }
  };
  const toggle = () => {
    setOpen(false);
  };
  return (
    <div>
      <Snackbar open={open} toggle={toggle} severity={severity} />
      <Modal
        open={modal}
        onClose={close}
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
            Order create
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <TextField
                fullWidth
                type="number"
                label="Amount"
                id="amount"
                name="amount"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                type="text"
                label="Name"
                id="name"
                name="name"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                type="text"
                label="Number"
                id="number"
                name="number"
                onChange={handleChange}
              />

              <div>
                <select
                  name="id"
                  onChange={handleChange}
                  className=" select rounded py-3 border border-neutral-400 pe-[272px] text-neutral-500 "
                >
                  {data.map((item, index) => (
                    <option
                      key={index}
                      className="p-3 border-none"
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

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
