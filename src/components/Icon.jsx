import PropTypes from "prop-types";
//icons
import { IconContext } from "react-icons";
import * as allIcons from "react-icons/all";

const Icon = ({ icon, color, size, title, className }) => {
  //icons
  let DynamicIcon = allIcons[icon];
  if (icon in allIcons) {
    DynamicIcon = allIcons[icon];
  } else {
    DynamicIcon = allIcons["FaLaptopCode"];
  }

  //console.log("DynamicIcon: ", DynamicIcon);
  console.log(icon, color, size, title, className);

  return (
    <IconContext.Provider value={{ icon, color, size, title, className }}>
      <DynamicIcon />

      {/* {DynamicIcon !== undefined ? (
        <DynamicIcon
          //icon={icon ? icon : "FaDAndD"}
          color={color ? color : "green"}
          // size={(size = "100px")}
          // title={(title = "Icon")}
          // className={(className = "")}
        />
      ) : (
        ""
      )} */}
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
