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
  const technologies = `${serverBaseURL()}/api/users/${id}/technologies`;
  const libraries = `${serverBaseURL()}/api/users/${id}/libraries`;
  const packages = `${serverBaseURL()}/api/users/${id}/packages`;
  const images = `${serverBaseURL()}/api/users/${id}/images`;
  const tools = `${serverBaseURL()}/api/users/${id}/tools`;
  const links = `${serverBaseURL()}/api/users/${id}/links`;
  const texts = `${serverBaseURL()}/api/users/${id}/texts`;
  //const roadmaps = `${serverBaseURL()}/api/users/${id}/roadmaps`;

  const headers = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const requestProjects = await axios.get(projects, headers);
  const requestTechnologies = await axios.get(technologies, headers);
  const requestLibraries = await axios.get(libraries, headers);
  const requestPackages = await axios.get(packages, headers);
  const requestImages = await axios.get(images, headers);
  const requestTools = await axios.get(tools, headers);
  const requestLinks = await axios.get(links, headers);
  const requestTexts = await axios.get(texts, headers);
  //const requestRoadmaps = await axios.get(roadmaps, headers);

  try {
    return axios
      .all([
        requestProjects,
        requestTechnologies,
        requestLibraries,
        requestPackages,
        requestImages,
        requestTools,
        requestLinks,
        requestTexts,
      ])
      .then(
        axios.spread((...responses) => {
          //console.log(...responses);
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
