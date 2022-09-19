import styled from "styled-components";
import { motion } from "framer-motion";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";
//components
import PackageItem from "./packageItem";

function PackageList({
  packages,
  setViewEditPackage,
  setViewViewPackage,
  declineFnc,
  acceptFnc,
  handleViewEditRecord,
  handleDuplicatePackage,
  deletingData,
  clickedItem,
}) {
  return (
    <StyledPackageList>
      {packages.length > 0 && (
        <>
        <ul className="table-header">
          <li key={uuidv4()} className="headers">
            <h4 className="name-header">Name</h4>
            <h4 className="short-header">Version</h4>
            <h4 className="long-header">Description</h4>
            <h4 className="actions-header">Actions</h4>
            </li>
          </ul>
          <ul className="table-data">
          {packages
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((pack) => {
              return (
                <PackageItem
                key={uuidv4()}
                pack={pack}
                declineFnc={declineFnc}
                  acceptFnc={acceptFnc}
                  setViewEditPackage={setViewEditPackage}
                  setViewViewPackage={setViewViewPackage}
                  handleViewEditRecord={handleViewEditRecord}
                  handleDuplicatePackage={handleDuplicatePackage}
                  deletingData={deletingData}
                  clickedItem={clickedItem}
                />
              );
            })}
        </ul>
      </>
      )}
    </StyledPackageList>
  );
}

const StyledPackageList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 80vh;
  row-gap: 0.5rem;

  .table-header{

    .headers {
      display: flex;
    gap: 0.25rem;
    
    h4 {
      background-color: #688297;
      padding: 0.25rem 0.5rem;
      font-weight: 500;
      color: white;
      text-align: left;
      display: flex;
      align-items: center;
      cursor: default;
    }
  }
  .name-header {
    flex: 0 0 20%;
  }
  .short-header {
    flex: 0 0 10%;
    justify-content: center;
  }
  .long-header {
    flex-grow: 1;
    text-align: left;
  }
  .actions-header {
    flex: 0 0 165px;
    justify-content: center;
  }
}
  .table-data{
    height: 100%;
    width: auto;
    list-style: none;
    overflow-y: scroll;
  }

  //#### RESPONSIVE SECTION ####
  //320px — 480px: Mobile devices
  @media screen and (max-width: 480px) and (orientation: portrait) {
    h4 {
      padding: 0.15rem 0.25rem;
    }
    .name-header {
      flex: 0 0 50%;
    }
    .actions-header {
      flex: 0 0 50%;
      justify-content: center;
    }
    .short-header {
      display: none !important;
    }
    .long-header {
      display: none !important;
    }
  }

  //320px — 480px: Mobile devices
  @media screen and (max-width: 850px) and (orientation: landscape) {
    h4 {
      padding: 0.15rem 0.25rem;
    }
    .name-header {
      flex: 0 0 50%;
    }
    .actions-header {
      flex: 0 0 50%;
      justify-content: center;
    }
    .short-header {
      display: none !important;
    }
    .long-header {
      display: none !important;
    }
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

export default PackageList;
