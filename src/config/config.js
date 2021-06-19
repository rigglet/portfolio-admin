export function baseURL() {
  //DEV
  // const protocol = "http";
  // const host = "localhost";
  // const port = "8081";
  // return `${protocol}://${host}:${port}`;

  //production
  const protocol = "https";
  const host = "portfolio-server26052021.herokuapp.com";
  //const port = "80";
  return `${protocol}://${host}`;
}

export function imagePath() {
  //DEV
  //const dev = "public/uploads";
  const aws = "images";
  return aws;
}
