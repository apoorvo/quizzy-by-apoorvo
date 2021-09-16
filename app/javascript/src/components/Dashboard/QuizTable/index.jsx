import React, { useMemo } from "react";
import { useHistory, useRouteMatch } from "react-router";

import { useTable } from "react-table";

import { COLUMNS } from "./columns";

const QuizTable = ({ quizzes }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => quizzes, []);

  const history = useHistory();
  const match = useRouteMatch();

  const tableInstance = useTable({
    columns,
    data
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="w-100">
      <table
        {...getTableProps()}
        className="w-4/5 p-2 border-2 text-left m-auto"
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="border-2">
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="p-2">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td className="w-4/5 p-2" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
                <td className="p-2">
                  <button
                    onClick={() => {
                      history.push(`${match.path}/${row.original.id}/edit`);
                    }}
                  >
                    <i className="ri-pencil-line"></i>
                    Edit
                  </button>
                </td>
                <td className="p-2">
                  <button>
                    <i className="ri-delete-bin-line"></i>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default QuizTable;
