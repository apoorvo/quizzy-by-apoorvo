import React, { useMemo, useState } from "react";

import Modal from "react-modal";
import { useHistory, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { useTable } from "react-table";

import quizzesApi from "apis/quizzes";

import { COLUMNS } from "./columns";

const QuizTable = ({ quizzes, fetchQuizzes }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => quizzes, []);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const history = useHistory();
  const match = useRouteMatch();

  const tableInstance = useTable({
    columns,
    data
  });

  const handleDelete = async id => {
    await quizzesApi.destroy(id);
    fetchQuizzes();
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="w-100">
      <Modal
        isOpen={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        style={{
          overlay: {},
          content: {
            width: "25%",
            height: "200px",
            overflow: "scroll",
            margin: "auto",
            borderRadius: "20px"
          }
        }}
      >
        <div className="flex flex-col mt-4 justify-center items-center">
          <h1 className="text-xl flex-grow">
            Are you sure you want to delete {`${selectedRow.name}`}?
          </h1>
          <div className="flex space-x-3 absolute bottom-0 mb-2">
            <button
              className="px-6 py-2 border-1"
              onClick={() => setIsOpen(false)}
            >
              No
            </button>
            <button
              className="px-6 py-2 bg-red-500 text-white"
              onClick={() => handleDelete(selectedRow.id)}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
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
                      <Link to={`${match.url}/${row.original.id}/show`}>
                        {cell.render("Cell")}
                      </Link>
                    </td>
                  );
                })}
                <td className="p-2">
                  <button
                    className="bg-blue-300 flex items-center rounded px-4 py-2"
                    onClick={() => {
                      history.push(`${match.path}/${row.original.id}/edit`);
                    }}
                  >
                    <i className="ri-pencil-line"></i>
                    <h1>Edit</h1>
                  </button>
                </td>
                <td className="p-2">
                  <button
                    className="bg-red-500 flex px-4 items-center rounded py-2 text-white"
                    onClick={() => {
                      setSelectedRow(row.original);
                      setIsOpen(true);
                    }}
                  >
                    <i className="ri-delete-bin-line"></i>
                    <h1>Delete</h1>
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
