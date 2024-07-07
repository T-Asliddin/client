import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { client } from "@service";
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ data }) {
  const [opened, setOpened] = useState(false);
  const [severity, setSeverity] = useState("");
  const [eror , setEror]=useState("")

  const daletItem = async (client_id ,owner_id) => {
    const params={
      client_id,
      owner_id
    }
    try {
      const response = await client.delete(params);
      if (response.status === 200) {
        window.location.reload()
      }
    } catch (error) {
      setEror("Mijozni o'chirirsh imkonsiz, mijozning ba'zi buyurtmalari bor")
      setSeverity("error");
      setOpened(true);
      console.log(error);
    }
  };
  const toggle = () => {
    setOpened(false);
  };


  return (
    <>
      <ClientSnackbar opened={opened} toggle={toggle} severity={severity} eror={eror} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">T/R</StyledTableCell>
              <StyledTableCell align="center"> Client Name</StyledTableCell>
              <StyledTableCell align="center">Client Phone</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.full_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.phone_number}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div>
            
                    <button
                      onClick={() => {
                        daletItem(item.id ,item.owner_id);
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
