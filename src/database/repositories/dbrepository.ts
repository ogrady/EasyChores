import * as sqlite3 from "better-sqlite3";
import * as db from "../database";

export abstract class DBRepository {
    protected database: db.Database;

    public constructor(database: db.Database) {
        this.database = database;
    }

    protected execute<T>(f: (sqlite3: sqlite3.Database) => T): T | undefined {
        console.log(this.database)
        return this.database.execute(f);
    }
}