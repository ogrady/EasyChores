import { App } from "./app";

const port: number = 8080;

const app = App.getInstance();

app.express.listen(port, () => {
  console.log(`Chores server listening at http://localhost:${port}`)
})