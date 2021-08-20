import { App } from "./app";

const port: number = 8080;

const app = new App();

app.express.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})