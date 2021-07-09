import React, { useEffect } from "react";
import { useTable, HeaderGroup } from "react-table";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
// import { font } from "../../public/font";
import { font } from "../../public/nanum";

const dataList = [
  { id: 1, name: "a", email: "a@email.com" },
  { id: 2, name: "b", email: "b@email.com" },
  { id: 3, name: "c", email: "c@email.com" },
];
const DB2: React.FC = () => {
  const columns: Array<any> = [
    {
      Header: "Name",
      columns: [
        {
          Header: "First Name",
          accessor: "firstName",
        },
        {
          Header: "Last Name",
          accessor: "lastName",
        },
      ],
    },
  ];
  const data: Array<any> = [
    {
      firstName: "안녕",
      lastName: "하세요",
    },
    {
      firstName: "tt2",
      lastName: "bb2",
    },
    {
      firstName: "t3t",
      lastName: "bb3",
    },
  ];
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  useEffect(() => {
    // eslint-disable-next-line new-cap
    const table = document.getElementById("my-table");
    if (table) {
      // html2canvas(table).then((canvas) => {
      //   const imgData = canvas.toDataURL("image/png");
      //   // eslint-disable-next-line new-cap
      //   const doc = new jsPDF();
      //   doc.addImage(imgData, "PNG", 10, 10, 200, 200);
      //   // doc.save("data.pdf");
      // });
      // eslint-disable-next-line new-cap
      const doc = new jsPDF();
      doc.addFileToVFS("nanum.ttf", font);
      doc.addFont("nanum.ttf", "nanum", "normal");
      doc.setFont("nanum", "normal");
      autoTable(doc, {
        html: "#my-table",
        styles: {
          font: "nanum",
        },
      });
      doc.save("data.pdf");
    }
  }, []);

  return (
    <table
      {...getTableProps()}
      className="table-auto w-full h-1/2"
      id="my-table"
    >
      <thead>
        {headerGroups.map((headerGroup: HeaderGroup<any>, i) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={i}>
            {headerGroup.headers.map((column, i) => (
              <th {...column.getHeaderProps()} className="border py-5" key={i}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={i}>
              {row.cells.map((cell, i) => {
                return (
                  <td {...cell.getCellProps()} className="border py-5" key={i}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DB2;
