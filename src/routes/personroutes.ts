import { AbstractRoutes } from "./abstractroutes";
import { App } from "../app";

export class PersonRoutes extends AbstractRoutes {
    public constructor(app: App) {
        super(app);
    }

    protected override routes(): void {
        this.express.post("/add/", (req, res, next) => {
            const name = req.body["name"];
            this.app.personRepository.addPerson(name);
            res.send(`Created ${name}!`);
        });

        this.express.get("/all/", (req, res, next) => {
            res.send(this.app.personRepository.getAllPersons());
        });
    }
}