import app from "./app/server";
import config from "./config.json";

const { serverPort } = config[process.env.ENV];

app.listen(serverPort, () => {
  console.log(`Listening on port: ${serverPort}.`);
});
