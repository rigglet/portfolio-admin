import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { getData } from "../api/api";
import { RiAddCircleLine } from "react-icons/ri";
import { FaTrash, FaEdit } from "react-icons/fa";

//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";
//table
import { useTable } from "react-table";

function Libraries({ auth }) {
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
        accessor: "col1",
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
      {
        Header: "Actions",
        accessor: "col5",
      },
    ],
    []
  );

  const iconbar = () => {
    return (
      <div className="toolbar">
        <FaTrash className="icon" onClick={(e) => handleDeleteRecord(e)} />
        <FaEdit className="icon" onClick={(e) => handleEditRecord(e)} />
      </div>
    );
  };

  const data = technologies.map((item) => {
    return {
      col1: item._id,
      col2: item.name,
      col3: item.type,
      col4: item.address,
      col5: iconbar(),
    };
  });

  //TODO: docs say to use useMemo, but causes data not to update when changing menus
  // const data = useMemo(
  //   () =>
  //     technologies.map((item) => {
  //       return {
  //         col1: item._id,
  //         col2: item.name,
  //         col3: item.type,
  //         col4: item.address,
  //       };
  //     }),
  //   []
  // );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const handleDeleteRecord = (index) => {
    console.log(index);
    //console.log(technologies[index]._id);
  };

  const handleEditRecord = (index) => {
    //console.log(technologies[index]._id);
    console.log(index);
  };

  const handleAddRecord = (index) => {
    //console.log(technologies[index]._id);
    console.log(index);
  };

  return (
    <StyledTechnologies>
      <div className="header">
        <h1>Libraries</h1>
        <RiAddCircleLine
          className="h-icon"
          onClick={(e) => handleAddRecord(e)}
        />
      </div>
      <table {...getTableProps()} className="tech-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="headers">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="table-row">
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="table-cell">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
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
    width: 83vw;
    border-spacing: 0;
    .headers {
      background-color: #688297;
      text-align: left;
      color: white;
      padding: 0.25rem;
      font-weight: 500;
    }
    .table-row {
      //border: 1px solid red;
    }
    .table-cell {
      border-bottom: 1px solid #688297;
      //background-color: #688297;
      text-align: left;
      //color: white;
      padding: 0.5rem;
      font-weight: 500;
      font-size: 11pt;
    }
  }
  .toolbar {
    display: flex;
    align-items: center;
    gap: 1rem;
    .icon {
      width: 1.2rem;
      height: 1.2rem;
      color: #888888;
    }
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80vw;
    margin-bottom: 0.5rem;
    .h-icon {
      width: 1.4rem;
      height: 1.4rem;
    }
    h1 {
      font-size: 16pt;
      font-weight: 600;
    }
  }
`;

export default Libraries;
