import { useEffect, useState } from "react";
//import styled from "styled-components";
//import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
//components
import Projects from "../components/projects";
import Links from "../components/links";
import Technologies from "../components/technologies";
import Packages from "../components/packages";
import Libraries from "../components/libraries";
import Nav from "../components/nav";
import Bar from "../components/bar";
import { getData } from "../api/api";

function Admin({ auth }) {
  const location = useLocation();
  const path = location.pathname;

  const [projects, setProjects] = useState({});
  const [links, setLinks] = useState({});
  const [technologies, setTechnologies] = useState({});
  const [libraries, setLibraries] = useState({});
  const [packages, setPackages] = useState({});

  async function fetchdata(type) {
    const res = await getData(auth, type);
    if (res.status === 200) {
      return res.data;
    }
  }

  useEffect(
    () => {
      async function getData() {
        setProjects(await fetchdata("projects"));
        setLinks(await fetchdata("links"));
        setTechnologies(await fetchdata("technologies"));
        setPackages(await fetchdata("packages"));
        setLibraries(await fetchdata("libraries"));
      }
      getData();
    },
    //eslint-disable-next-line
    []
  );

  const data = () => {
    switch (path) {
      case "/admin/projects":
        return <Projects auth={auth} intialProjects={projects} />;
      case "/admin/links":
        return <Links auth={auth} intialLinks={links} />;
      case "/admin/tech":
        return <Technologies auth={auth} intialTech={technologies} />;
      case "/admin/packages":
        return <Packages auth={auth} intialPackages={packages} />;
      case "/admin/libraries":
        return <Libraries auth={auth} intialLibraries={libraries} />;
      default:
        return "";
    }
  };

  return (
    <div>
      <Bar />
      <Nav
        projectNo={projects?.length ? projects.length : 0}
        linkNo={links?.length ? links.length : 0}
        techNo={technologies?.length ? technologies.length : 0}
        libNo={libraries?.length ? libraries.length : 0}
        packageNo={packages?.length ? packages.length : 0}
      />
      {data()}
    </div>
  );
}

export default Admin;
