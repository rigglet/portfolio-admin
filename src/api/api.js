import axios from "axios";

export const getUserData = async (auth) => {
  const { id, token } = auth;
  const projects = `http://localhost:8081/api/users/${id}/projects`;
  const links = `http://localhost:8081/api/users/${id}/links`;
  const technologies = `http://localhost:8081/api/users/${id}/technologies`;
  const libraries = `http://localhost:8081/api/users/${id}/libraries`;
  const packages = `http://localhost:8081/api/users/${id}/packages`;

  const headers = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const requestPackages = await axios.get(packages, headers);
  const requestLibraries = await axios.get(libraries, headers);
  const requestProjects = await axios.get(projects, headers);
  const requestLinks = await axios.get(links, headers);
  const requestTechnologies = await axios.get(technologies, headers);
  try {
    axios
      .all([
        requestProjects,
        requestLinks,
        requestTechnologies,
        requestLibraries,
        requestPackages,
      ])
      .then(
        axios.spread((...responses) => {
          return responses;
        })
      );
  } catch (errors) {
    return errors;
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
  } catch (error) {
    return error;
  }
};

export const updateData = async (auth, datatype, data) => {
  const { id, token } = auth;

  try {
    //axios.headers.Authorization = { bearer: token };
    const response = await axios.put(
      `http://localhost:8081/api/users/${id}/${datatype}/${data._id}`,
      data,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

export const postData = async (auth, datatype, data) => {
  const { id, token } = auth;

  try {
    //axios.headers.Authorization = { bearer: token };
    const response = await axios.post(
      `http://localhost:8081/api/users/${id}/${datatype}`,
      data,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

export const deleteData = async (auth, datatype, delete_id) => {
  const { id, token } = auth;

  try {
    //axios.headers.Authorization = { bearer: token };
    const response = await axios.delete(
      `http://localhost:8081/api/users/${id}/${datatype}/${delete_id}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    return error;
  }
};
