import { useEffect, useState } from "react";
//styling
import styled from "styled-components";
//router
import { useLocation } from "react-router-dom";
//components
import Projects from "../components/project/projects";
import Packages from "../components/package/packages";
import Links from "../components/link/links";
import Texts from "../components/text/texts";
import Technologies from "../components/technology/techs";
import Libraries from "../components/library/libs";
import Tools from "../components/tool/tools";
import Images from "../components/image/images";
//import Maps from "../components/roadmap/maps";
//nav components
import Nav from "../components/nav";
import Bar from "../components/bar";
//data
import { getUserData, getData } from "../api/api";

function Admin({ auth, setAuth }) {
  const location = useLocation();
  const path = location.pathname;

  const [projects, setProjects] = useState({});
  const [links, setLinks] = useState({});
  const [texts, setTexts] = useState({});
  const [techs, setTechs] = useState({});
  const [libraries, setLibraries] = useState({});
  const [packages, setPackages] = useState({});
  const [tools, setTools] = useState({});
  const [images, setImages] = useState({});
  const [maps, setMaps] = useState({});

  useEffect(() => {
    async function getStuff() {
      return await getUserData(auth);
    }
    getStuff().then((result) => {
      console.log(result);
      setProjects(result[0].data);
      setLinks(result[1].data);
      setTechs(result[2].data);
      setLibraries(result[3].data);
      setPackages(result[4].data);
      setTools(result[5].data);
      setImages(result[6].data);
      setTexts(result[7].data);
    });
  }, []);

  const data = () => {
    switch (path) {
      case "/admin/projects":
        return (
          <Projects auth={auth} projects={projects} setProjects={setProjects} />
        );
      case "/admin/packages":
        return (
          <Packages auth={auth} packages={packages} setPackages={setPackages} />
        );
      case "/admin/links":
        return <Links auth={auth} links={links} setLinks={setLinks} />;
      case "/admin/texts":
        return <Texts auth={auth} texts={texts} setTexts={setTexts} />;
      case "/admin/tech":
        return <Technologies auth={auth} techs={techs} setTechs={setTechs} />;
      case "/admin/libraries":
        return (
          <Libraries
            auth={auth}
            libraries={libraries}
            setLibraries={setLibraries}
          />
        );
      case "/admin/tools":
        return <Tools auth={auth} tools={tools} setTools={setTools} />;
      case "/admin/images":
        return <Images auth={auth} images={images} setImages={setImages} />;
      // case "/admin/roadmaps":
      //   return <Roadmaps auth={auth} maps={maps} setMaps={setMaps} />;
      default:
        return "";
    }
  };

  return (
    <StyledAdmin>
      <Bar auth={auth} setAuth={setAuth} />
      <Nav
        projectNo={projects?.length ? projects.length : 0}
        techNo={techs?.length ? techs.length : 0}
        libNo={libraries?.length ? libraries.length : 0}
        packageNo={packages?.length ? packages.length : 0}
        imageNo={images?.length ? images.length : 0}
        toolNo={tools?.length ? tools.length : 0}
        linkNo={links?.length ? links.length : 0}
        mapNo={maps?.length ? maps.length : 0}
        textNo={texts?.length ? texts.length : 0}
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
