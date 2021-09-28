import React, { useMemo } from "react";

import { useSortBy, useTable } from "react-table";

import { COLUMNS } from "./columns";

const ReportsTable = ({ attempts }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => attempts, []);

  const tableInstance = useTable(
    {
      columns,
      data
    },
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div>
      <table
        {...getTableProps()}
        className="w-4/5 p-2 border-2 text-left m-auto"
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="border-2">
              {headerGroup.headers.map(column => {
                if (column.id === "quiz_name") {
                  return (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="p-2  border-2"
                    >
                      {column.render("Header")}
                      <span className="px-4">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <i className="ri-sort-desc"></i>
                          ) : (
                            <i className="ri-sort-asc"></i>
                          )
                        ) : (
                          <i className="ri-list-settings-line"></i>
                        )}
                      </span>
                    </th>
                  );
                }
                return (
                  <th {...column.getHeaderProps()} className="p-2 border-2">
                    {column.render("Header")}
                  </th>
                );
              })}
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
                    <td className="w-4/5 p-2 border-2" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;
