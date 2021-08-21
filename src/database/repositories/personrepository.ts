import { Database } from "../database";
import { DBRepository } from "./dbrepository";

export class PersonRepository extends DBRepository {
    public getAllPersons(): any {
        return this.execute(db => db.prepare("SELECT name FROM persons"));
    }
    
    public constructor(database: Database) {
        super(database);
    }

    public addPerson(name: string): void {
        this.execute(db => db.prepare("INSERT INTO persons(name) VALUES (?)").run(name));
    }

}