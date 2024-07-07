import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { service } from "@service";
import { CreateModal } from "@modal";
import { ClientSnackbar } from "../..";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(35,137,218,1)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ data }) {
  const [opened, setOpened] = useState(false);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState();
  const [severity, setSeverity] = useState("");
  const [eror, setEror] = useState("");
  const daletItem = async (id) => {
    try {
      const response = await service.delete(id);
      response.status === 200 && window.location.reload();
    } catch (error) {
      setEror("O'chirish xizmati cheklangan: mavjud buyurtmalar bilan bog'liq");
      setSeverity("error");
      setOpened(true);
      console.log(error);
    }
  };

  const editItem = (item) => {
    setOpen(true);
    setItem(item);
  };
  const toggle = () => {
    setOpened(false);
  };

  return (
    <>
      <ClientSnackbar
        opened={opened}
        toggle={toggle}
        severity={severity}
        eror={eror}
      />
      <CreateModal open={open} toggle={() => setOpen(false)} item={item} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">T/R</StyledTableCell>
              <StyledTableCell align="center">Cervice Name</StyledTableCell>
              <StyledTableCell align="center">Cervice Price</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">{item.name}</StyledTableCell>
                <StyledTableCell align="center">{item.price}</StyledTableCell>
                <StyledTableCell align="center">
                  <div>
                    <button
                      onClick={() => {
                        editItem(item);
                      }}
                      class=" mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        daletItem(item.id);
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white py-2 px-5 rounded "
                    >
                      Delet
                    </button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
