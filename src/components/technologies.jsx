import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { getData } from "../api/api";
import { RiAddCircleLine } from "react-icons/ri";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";
//table
import { useTable } from "react-table";

function Technologies({ auth }) {
  const [technologies, setTechnologies] = useState([]);

  useEffect(
    () => {
      async function getTable() {
        const res = await getData(auth, "technologies");
        if (res.status === 200) {
          setTechnologies(res.data);
        }
      }
      getTable();
    },
    // eslint-disable-next-line
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Name",
        accessor: "col2",
      },
      {
        Header: "Type",
        accessor: "col3",
      },
      {
        Header: "Address",
        accessor: "col4",
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        col1: "Hello",
        col2: "World",
      },
      {
        col1: "react-table",
        col2: "rocks",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <StyledTechnologies>
      <div className="header">
        <h1>Technologies</h1>
        <div className="toolbar">
          <RiAddCircleLine />
        </div>
      </div>
      <table {...getTableProps()} class="tech-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {technologies.length > 0 ? (
        <>
          <div className="header">
            <h1>Technologies</h1>
            <div className="toolbar">
              <RiAddCircleLine />
            </div>
          </div>
          <table class="tech-table">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Address</th>
            </tr>
            {technologies.map((item) => {
              return (
                <tr>
                  <td key={uuidv4()}> {item._id} </td>
                  <td key={uuidv4()}> {item.name} </td>
                  <td key={uuidv4()}> {item.type} </td>
                  <td key={uuidv4()}> {item.address} </td>
                </tr>
              );
            })}
          </table>
        </>
      ) : (
        ""
      )}
    </StyledTechnologies>
  );
}

const StyledTechnologies = styled(motion.div)`
  position: relative;
  left: 15.5vw;
  top: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  .tech-table {
    width: 84vw;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80vw;
    h1 {
      font-size: 16px;
      font-weight: 600;
    }
    .toolbar {
    }
  }
`;

export default Technologies;
