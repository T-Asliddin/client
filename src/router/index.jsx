import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import { SignIn, SignUp, Asosiy, Order, Servise,Client } from "@pages";
import { Drawer } from "../components";

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="/drawer/*" element={<Drawer />}>
          <Route index element={<Asosiy />} />
          <Route index path=" " element={<Asosiy />} />
          <Route path="orders" element={<Order />} />
          <Route path="servise" element={<Servise />} />
          <Route path="client" element={<Client/>} />
        </Route>
        <Route path="sign-up" element={<SignUp />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Index;
