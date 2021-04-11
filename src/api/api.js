import axios from "axios";

export const getUserData = async (auth) => {
  const { id, token } = auth;
  const projects = `http://localhost:8081/api/users/${id}/projects`;
  const links = `http://localhost:8081/api/users/${id}/links`;
  const technologies = `http://localhost:8081/api/users/${id}/technologies`;

  const headers = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const requestProjects = await axios.get(projects, headers);
  const requestLinks = await axios.get(links, headers);
  const requestTechnologies = await axios.get(technologies, headers);
  try {
    axios.all([requestProjects, requestLinks, requestTechnologies]).then(
      axios.spread((...responses) => {
        return responses;
      })
    );
    //console.log(response);
  } catch (errors) {
    return errors;
    //console.error(error);
  }
};

export const getData = async (auth, datatype) => {
  const { id, token } = auth;

  try {
    //axios.headers.Authorization = { bearer: token };
    const response = await axios.get(
      `http://localhost:8081/api/users/${id}/${datatype}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response;
    }

    //console.log(response);
  } catch (error) {
    return error;
    //console.error(error);
  }
};
