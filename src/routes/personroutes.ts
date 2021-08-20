import { AbstractRoutes } from "./abstractroutes";
import { App } from "../app";

export class PersonRoutes extends AbstractRoutes {
    public constructor(app: App) {
        super(app);
    }

    protected override routes(): void {
        this.express.post("/", (req, res, next) => {
            
        })

        this.express.post("/post/", (req, res, next) => {
            const name = req.body["name"];
            this.app.personRepository.addPerson(name);
        })
    }
}