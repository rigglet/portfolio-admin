import axios from "axios";
import serverBaseURL from "../config/config";

//AUTH - signin
export const signin = async (data) => {
  try {
    const response = await axios.post(
      `${serverBaseURL()}/api/auth/signin`,
      data
    );
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

export const getUserData = async (auth) => {
  //const baseUrl = baseURL;
  const { id, token } = auth;
  const projects = `${serverBaseURL()}/api/users/${id}/projects`;
  const links = `${serverBaseURL()}/api/users/${id}/links`;
  const technologies = `${serverBaseURL()}/api/users/${id}/technologies`;
  const libraries = `${serverBaseURL()}/api/users/${id}/libraries`;
  const packages = `${serverBaseURL()}/api/users/${id}/packages`;
  const tools = `${serverBaseURL()}/api/users/${id}/tools`;
  const images = `${serverBaseURL()}/api/users/${id}/images`;

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
  const requestTools = await axios.get(tools, headers);
  const requestImages = await axios.get(images, headers);

  try {
    axios
      .all([
        requestProjects,
        requestLinks,
        requestTechnologies,
        requestLibraries,
        requestPackages,
        requestTools,
        requestImages,
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
      `${serverBaseURL()}/api/users/${id}/${datatype}`,
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
  console.log("data: ", data);
  try {
    //axios.headers.Authorization = { bearer: token };
    const response = await axios.put(
      `${serverBaseURL()}/api/users/${id}/${datatype}/${data._id}`,
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
      `${serverBaseURL()}/api/users/${id}/${datatype}`,
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
      `${serverBaseURL()}/api/users/${id}/${datatype}/${delete_id}`,
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

//USER DATA
export const updateUser = async (auth, data, option) => {
  const { id, token } = auth;
  try {
    const response = await axios.put(
      `${serverBaseURL()}/api/users/${id}?profile_option=${option}`,
      //to test
      //`https://httpbin.org/anything`,
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
