export function baseURL() {
  //DEV
  const dev_protocol = "http";
  const dev_host = "localhost";
  const dev_port = "8081";
  const devURL = `${dev_protocol}://${dev_host}:${dev_port}`;

  //production
  const prod_protocol = "https";
  const prod_host = "portfolio-server26052021.herokuapp.com";
  const prodURL = `${prod_protocol}://${prod_host}`;

  if (window.location.hostname === "localhost") {
    return devURL;
  } else {
    return prodURL;
  }
}

export function imagePath() {
  //DEV
  //const dev = "public/uploads";
  const aws = "images";
  return aws;
}
