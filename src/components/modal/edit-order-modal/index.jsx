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

export default function BasicModal({ edit, closemodal}) {
  const [form, setForm] = useState();
  const [open, setOpen] = useState(false);
  // const [severity, setSeverity] = useState("");
  const [item, setItem] = useState([]);
  const [data ,setData]=useState([])
const [id,setId]=useState('')
  const get = async () => {
    try {
      const response = await order.getall();
      if (response.status===200 && response.data.orders_list) {
        setData(response.data.orders_list)
      }
    } catch (error) {
      console.log(error);
    }
  }; 

  useEffect(() => {
    get();
  }, []);
  const getdata = async () => {
    try {
      const response = await service.getall();
      if (response.status === 200 && response.data.services) {
        setItem(response.data.services);
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
    data.map(item=>{
      if(item.client_id===form.client_id){
       setId(item.id)
      }
      })
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
      const payload = {
      ...form,
      amount:+form.amount,
      id:id
    };
     
     
      try {
        const response = await order.update(payload);
        if (response.status === 200) {
          console.log(response);
          toggle();
          window.location.reload();
        }
      } catch (error) {}
    
  };
  const toggle = () => {
    setOpen(false);
  };
  return (
    <div>
      {/* <Snackbar open={open} toggle={toggle} severity={severity} /> */}
      <Modal
        open={edit}
        onClose={closemodal}
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
                 <div>
                <select
                  name="client_id"
                  onChange={handleChange}
                  className=" select rounded py-3 border border-neutral-400 pe-[245px] text-neutral-500 "
                >
                  {data.map((item, index) => (
                    <option
                      key={index}
                      className="p-3 border-none"
                      value={item.client_id}
                      
                    >
                      {item.client_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  name="status"
                  onChange={handleChange}
                  className=" select rounded py-3 border border-neutral-400 pe-[230px] text-neutral-500 "
                >
                  <option value="in_process">In process</option>
                  <option value="done">Done</option>
                  <option value="takne">Takne</option>
                </select>
              </div>
              <div>
                <select
                  name="service_id"
                  onChange={handleChange}
                  className=" select rounded py-3 border border-neutral-400 pe-[272px] text-neutral-500 "
                >
                  {item.map((i, index) => (
                    <option
                      key={index}
                      className="p-3 border-none"
                      value={i.id}
                    >
                      {i.name}
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
