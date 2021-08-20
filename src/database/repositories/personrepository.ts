import { Database } from "../database";
import { DBRepository } from "./dbrepository";

export class PersonRepository extends DBRepository {
    public constructor(database: Database) {
        super(database);
    }

    public addPerson(name: string): void {
        this.execute(db => db.prepare("INSERT INTO persons(name) VALUES (?)").run(name));
    }

}