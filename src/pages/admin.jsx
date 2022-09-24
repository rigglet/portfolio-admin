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
import { getUserData } from "../api/api";

function Admin({ auth, setAuth, allIcons }) {
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
  const [settings, setSettings] = useState({});
  //const [maps, setMaps] = useState({});

  useEffect(() => {
    async function getApplicationData() {
      return await getUserData(auth);
    }

    getApplicationData().then((result) => {
      setProjects(result[0].data);
      setTechs(result[1].data);
      setLibraries(result[2].data);
      setPackages(result[3].data);
      setImages(result[4].data);
      setTools(result[5].data);
      setLinks(result[6].data);
      setTexts(result[7].data);
      setSettings(result[8].data);
    });
  }, [auth]);

  const data = () => {
    switch (path) {
      case "/admin/projects":
        return (
          <Projects
            auth={auth}
            projects={projects}
            setProjects={setProjects}
            images={images}
            setImages={setImages}
            techs={techs}
            setTechs={setTechs}
            packages={packages}
            setPackages={setPackages}
            libraries={libraries}
            setLibraries={setLibraries}
            allIcons={allIcons}
          />
        );
      case "/admin/tech":
        return (
          <Technologies
            auth={auth}
            techs={techs}
            setTechs={setTechs}
            projects={projects}
            setProjects={setProjects}
            allIcons={allIcons}
            />
            );
      case "/admin/libraries":
        return (
          <Libraries
            auth={auth}
            libraries={libraries}
            setLibraries={setLibraries}
            projects={projects}
            setProjects={setProjects}
            allIcons={allIcons}
            />
            );
            case "/admin/packages":
              return (
                <Packages
                auth={auth}
                packages={packages}
                setPackages={setPackages}
                projects={projects}
                setProjects={setProjects}
                allIcons={allIcons}
                />
                );
      case "/admin/images":
        return (
          <Images
            auth={auth}
            images={images}
            projects={projects}
            setImages={setImages}
            setProjects={setProjects}
          />
        );
      case "/admin/tools":
        return <Tools allIcons={allIcons} auth={auth} tools={tools} setTools={setTools} />;
      case "/admin/links":
        return <Links allIcons={allIcons} auth={auth} links={links} setLinks={setLinks} />;
      case "/admin/texts":
        return <Texts auth={auth} texts={texts} setTexts={setTexts} />;
      // case "/admin/roadmaps":
      //   return <Roadmaps auth={auth} maps={maps} setMaps={setMaps} />;
      default:
        return "";
    }
  };

  return (
    <StyledAdmin>
      <Bar
        auth={auth}
        setAuth={setAuth}
        settings={settings}
        setSettings={setSettings}
      />
      <Nav
        projectNo={projects?.length ? projects.length : 0}
        techNo={techs?.length ? techs.length : 0}
        libNo={libraries?.length ? libraries.length : 0}
        packageNo={packages?.length ? packages.length : 0}
        imageNo={images?.length ? images.length : 0}
        toolNo={tools?.length ? tools.length : 0}
        linkNo={links?.length ? links.length : 0}
        textNo={texts?.length ? texts.length : 0}
        //mapNo={maps?.length ? maps.length : 0}
      />
      {data()}
    </StyledAdmin>
  );
}

const StyledAdmin = styled.div`
  width: 84.5vw;
  height: 91vh;

  //#### RESPONSIVE SECTION ####
  //320px — 480px: Mobile devices
  @media screen and (max-width: 480px) and (orientation: portrait) {
  }

  //320px — 480px: Mobile devices
  @media screen and (max-width: 850px) and (orientation: landscape) {
    width: 100vw;
    height: auto;
  }

  //481px — 768px: iPads, Tablets
  @media screen and (min-width: 481px) and (max-width: 769px) and (orientation: portrait) {
  }

  //481px — 768px: iPads, Tablets
  //@media screen and (min-width: 481px) and (max-width: 769px) and (orientation: landscape) {}

  //769px — 1024px: Small screens, laptops
  //@media screen and (min-width: 769px) and (max-width: 1024px) and (orientation: portrait) {}

  //769px — 1024px: Small screens, laptops
  //@media screen and (min-width: 769px) and (max-width: 1024px) and (orientation: landscape) {}

  //1025px — 1200px: Desktops, large screens
  @media screen and (min-width: 1024px) and (max-width: 1200px) and (orientation: portrait) {
  }

  //1025px — 1200px: Desktops, large screens
  //@media screen and (min-width: 1024px) and (max-width: 1200px) and (orientation: landscape) {}

  //1201px and more —  Extra large screens, TV
  //@media screen and (min-width: 1201px) and (max-width: 1500px) and (orientation: portrait) {}

  //1201px and more —  Extra large screens, TV
  //@media screen and (min-width: 1201px) and (max-width: 1500px) and (orientation: landscape) {}

  //1501px and more —  Extra large screens, TV
  //@media screen and (min-width: 1501px) and (orientation: portrait) {}

  //1501px and more —  Extra large screens, TV
  @media screen and (min-width: 1921px) and (orientation: landscape) {
  }
`;
export default Admin;
