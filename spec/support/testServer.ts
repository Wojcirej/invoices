import http from "http";
import app from "./../../app/server";

import config from "./../../config.json";

const { serverPort } = config[process.env.ENV];
const baseUrl = `http://localhost:${serverPort}`;

const setUpTestServer = () => {
  const server = http.createServer(app);
  server.listen(serverPort);
  console.log(`Test server listenning on port: ${serverPort}`);
  return server;
};

export { setUpTestServer, baseUrl };
