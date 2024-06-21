import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Icon } from "@iconify/react";
function createData(id, name, action, role, timestamp) {
  return {
    id: id,
    name: name,
    action: action,
    role: role,
    timestamp: new Date(timestamp).toLocaleString(),
  };
}

const rows = [
  createData("1", "Patcharapn", "ล็อคอิน", "Fullstack", Date.now()),
];

function Historypage() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="bg-white h-[100px] col-span-2 rounded-xl">
        <div className="flex justify-start mx-5 my-5 text-[2rem] items-center gap-3">
          <Icon icon="mingcute:history-line" />
          ประวัติการเข้าใช้งาน
        </div>
      </div>
      <div className="bg-white h-[750px] col-span-2 rounded-xl ">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">ชื่อผู้ใช้</TableCell>
                <TableCell align="right">การกระทำ</TableCell>
                <TableCell align="right">ตำเเหน่ง</TableCell>
                <TableCell align="right">วันที่/เวลา</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">
                    <div className="text-green-500">{row.action}</div>
                  </TableCell>
                  <TableCell align="right">{row.role}</TableCell>
                  <TableCell align="right">{row.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Historypage;
