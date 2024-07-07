import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import { auth } from "@service";
import { NavLink } from "react-router-dom";
import { Snackbar } from "../../components";
import { ForgotModal } from "../../components/modal";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const [form, setForm] = useState({});
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [severity,setSeverity]=useState("")
  const navigate =useNavigate()

  const hendleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await auth.sign_in(form);
      console.log(response);
      if (response.status === 200) {
         localStorage.setItem("access_token" , response?.data?.access_token)
         setSeverity("success")
         setOpen(true);
        setTimeout(()=>{
          navigate("drawer")
        } ,1500)
      }
    } catch (error) {
      setSeverity("error")
      setOpen(true)
    }
  };

  const toggle = () => {
    setOpen(false);
  };

  const forgot = () => {
    setModal(false);
  };

  return (
    <>
      <Snackbar open={open} toggle={toggle} severity={severity} />
      <ForgotModal modal={modal} forgot={forgot} />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-[600px]  p-5">
          <h1 className="text-[50px] my-3 text-center ">Login</h1>
          <form onSubmit={handleSubmit} className=" flex flex-col gap-3 ">
            <TextField
              fullWidth
              type="text"
              placeholder="Email"
              id="email"
              name="email"
              onChange={hendleChange}
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              id="password"
              name="password"
              onChange={hendleChange}
            />
            <div className=" flex justify-between ">
              <NavLink to={"sign-up"}>
                <p className=" text-blue-700 ">Register</p>
              </NavLink>
              <p
                onClick={() => {
                  setModal(true);
                }}
                className=" cursor-pointer text-blue-700 "
              >
                {" "}
                Forgot password ?{" "}
              </p>
            </div>
            <Button type="submit" variant="contained">
              Contained
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Index;
