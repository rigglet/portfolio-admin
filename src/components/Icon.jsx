import PropTypes from "prop-types";
//icons
import { IconContext } from "react-icons";

const Icon = ({ icon, color, size, title, className, allIcons }) => {
  //icons
  let DynamicIcon = allIcons[icon];
  if (icon in allIcons) {
    DynamicIcon = allIcons[icon];
  } else {
    DynamicIcon = allIcons["FaLaptopCode"];
  }

  return (
    <IconContext.Provider value={{ icon, color, size, title, className }}>
      <DynamicIcon />
    </IconContext.Provider>
  );
};

Icon.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
};

Icon.defaultProps = {
  icon: "FaLaptopCode",
  color: "#313131",
  size: "5rem",
  title: "Default icon",
  className: "default",
};

export default Icon;
