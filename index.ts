import app from "./app/server";
import { port } from "./config.json";

app.listen(port, () => {
  console.log(`Listening on port: ${port}.`);
});
