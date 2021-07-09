import React from "react";
import { useTable, HeaderGroup } from "react-table";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { font } from "../../public/nanum";

const DB2: React.FC = () => {
  const columns: Array<any> = React.useMemo(
    () => [
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
      ,
    ],
    [],
  );
  const data = [
    {
      firstName: "aa",
      lastName: "bb",
    },
    {
      firstName: "aa1",
      lastName: "bb1",
    },
    {
      firstName: "aa2",
      lastName: "bb3",
    },
    {
      firstName: "aa2",
      lastName: "bb3",
    },
  ];

  // @ts-ignore
  function Table({ columns, data }) {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({
        columns,
        data,
      });
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              // eslint-disable-next-line react/jsx-key
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  const printPDF = () => {
    const table = document.getElementById("my-table");
    if (table) {
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
  };

  return (
    <div className="px-4 space-y-4">
      <Table columns={columns} data={data} />
      <button
        type="button"
        onClick={() => {
          printPDF();
        }}
        className="ring-2 ring-gray-500 px-5 py-2"
      >
        다운로드
      </button>
    </div>
  );
};

export default DB2;
