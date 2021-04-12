import styled from "styled-components";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
//components
import Projects from "../components/projects";
import Links from "../components/links";
import Technologies from "../components/technologies";

function Admin({ auth }) {
  const location = useLocation();
  const path = location.pathname;

  const data = () => {
    switch (path) {
      case "/admin/projects":
        return <Projects auth={auth} />;
      case "/admin/links":
        return <Links auth={auth} />;
      case "/admin/tech":
        return <Technologies auth={auth} />;
      default:
        return <Projects />;
    }
  };

  return <div>{data()}</div>;
}

export default Admin;
