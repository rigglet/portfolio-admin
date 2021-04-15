import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { getData } from "../api/api";
//MUI datatables
import MUIDataTable from "mui-datatables";
//UUID inique ID generator
//import { v4 as uuidv4 } from "uuid";

function Projects({ auth }) {
  const [projects, setProjects] = useState([]);
  const [tableData, setTableData] = useState([]);

  async function getTable() {
    return await getData(auth, "projects");
  }

  useEffect(
    () => {
      getTable().then((res) => {
        setProjects(res.data);
        setTableData(
          res.data.map((item) => {
            return [
              item.projectName,
              item.shortDescription,
              item.featured,
              item.website,
              item.githubLink,
            ];
          })
        );
      });
    },
    // eslint-disable-next-line
    []
  );

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "desc",
      label: "Description",
    },
    {
      name: "featured",
      label: "Featured",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "web",
      label: "Website",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "git",
      label: "Github repo",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    //count: "9",
    download: false,
    print: false,
    filter: true,
    sort: true,
    responsive: "scroll",
    pagination: false,
    //searchOpen: true,
  };

  return (
    <StyledProjects>
      {projects.length > 0 ? (
        <MUIDataTable
          title={"Projects"}
          columns={columns}
          data={tableData}
          options={options}
        />
      ) : (
        ""
      )}
    </StyledProjects>
  );
}

const StyledProjects = styled(motion.div)`
  position: relative;
  left: 15.5vw;
  top: 0;
  width: 84.5vw;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .project-list {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    .project-item {
      padding: 0.25rem;
      min-width: 20%;
      min-height: 1rem;
      //height: 20vh;
      //background-color: green;
    }
  }
`;

export default Projects;

//console.log(tableData);
// addedDate: null
// author: "req.body.author"
// completedDate: null
// featured: true
// githubLink: "req.body.githubLink"
// libraries: ["req.body.libraries"]
// mainImg: {type: "Buffer", data: Array(16)}
// packages: ["req.body.packages"]
// projectDescription: "req.body.projectDescription"
// projectName: "req.body.projectName"
// screenshots: [{…}]
// shortDescription: "req.body.shortDescription"
// startedDate: null
// technologies: ["req.body.technologies"]
// user: "606a02ec243b3b3e1831fcd1"
// version: "req.body.version"
// website: "req.body.website"
// __v: 0
// _id: "606a0cb82c805f37e4da5bb6"
