import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import { OrderModal, EditOrderModal } from "@modal";
import { Button } from "@mui/material";
import { OrderTable } from "@ui";
import { order } from "@service";
import { useEffect } from "react";
const Index = () => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [params, setParams] = useState({ page: 1, limit: 6 });
  const handleChange = (event, value) => {
    setParams({
      ...params,
      page: value,
    });
  };

  const getdata = async () => {
    try {
      const response = await order.get(params);
      if (response.status === 200 && response.data.orders_list) {
        let total = Math.ceil(response.data.total / params.limit);
        setCount(total);
        setData(response.data.orders_list);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, [params]);

  const inputChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <>
      <OrderModal
        modal={modal}
        close={() => {
          setModal(false);
        }}
      />
      <div className="flex flex-col gap-2">
        <div className=" flex justify-between ">
          <input
          className="border-solid border-2 border-sky-600 rounded-md w-[400px] "
            type="search"
            placeholder="Search..."
            id="search"
            onChange={inputChange}
          />
          <Button
            onClick={() => {
              setModal(true);
            }}
            variant="contained"
          >
            Add
          </Button>
        </div>
        <EditOrderModal data={data} />
        <OrderTable data={data} />
        <Pagination count={count} page={params.page} onChange={handleChange} />
      </div>
    </>
  );
};

export default Index;
