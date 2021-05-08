import { useEffect, useState } from "react";
//styling
import styled from "styled-components";
//router
import { useLocation } from "react-router-dom";
//components
import Projects from "../components/project/projects";
import Packages from "../components/package/packages";
import Links from "../components/link/links";
import Technologies from "../components/technology/techs";
import Libraries from "../components/library/libs";
import Tools from "../components/tool/tools";
import Images from "../components/image/images";
//nav components
import Nav from "../components/nav";
import Bar from "../components/bar";
//data
import { getData } from "../api/api";

function Admin({ auth, setAuth }) {
  const location = useLocation();
  const path = location.pathname;

  const [projects, setProjects] = useState({});
  const [links, setLinks] = useState({});
  const [technologies, setTechnologies] = useState({});
  const [libraries, setLibraries] = useState({});
  const [packages, setPackages] = useState({});
  const [tools, setTools] = useState({});
  const [images, setImages] = useState({});

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
        setTools(await fetchdata("tools"));
        setImages(await fetchdata("images"));
      }
      getData();
    },
    //eslint-disable-next-line
    []
  );

  const data = () => {
    switch (path) {
      case "/admin/projects":
        return <Projects auth={auth} />;
      case "/admin/packages":
        return <Packages auth={auth} />;
      case "/admin/links":
        return <Links auth={auth} />;
      case "/admin/tech":
        return <Technologies auth={auth} />;
      case "/admin/libraries":
        return <Libraries auth={auth} />;
      case "/admin/tools":
        return <Tools auth={auth} />;
      case "/admin/images":
        return <Images auth={auth} />;
      default:
        return "";
    }
  };

  return (
    <StyledAdmin>
      <Bar auth={auth} setAuth={setAuth} />
      <Nav
        projectNo={projects?.length ? projects.length : 0}
        linkNo={links?.length ? links.length : 0}
        techNo={technologies?.length ? technologies.length : 0}
        libNo={libraries?.length ? libraries.length : 0}
        packageNo={packages?.length ? packages.length : 0}
        toolNo={tools?.length ? tools.length : 0}
        imageNo={images?.length ? images.length : 0}
      />
      {data()}
    </StyledAdmin>
  );
}

const StyledAdmin = styled.div`
  width: 84.5vw;
  height: 91vh;
`;
export default Admin;
