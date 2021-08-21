import betterSqlite3 from "better-sqlite3";

export class Database {
    public static getInstance(databaseFilePath: string) {
        const database = new Database(databaseFilePath);
        //LOG.info("Database initialised.");
        return database;
    }

    readonly file: string;

    private constructor(file: string) {
        this.file = file;
    }

    private openConnection(state: string[]): betterSqlite3.Database {
        const options = {
            verbose: (message: string, additionalArgs: any) => {
                state.push(message);
                // LOG.debug("Sqlite Query:\n" + message, additionalArgs)
            }
        };
        const db = betterSqlite3(this.file, options);
        db.pragma("foreign_keys = ON");
        return db;
    }

    /**
     * Executes an SQL statement and handles errors, as well as closing the DB connection afterwards.
     * f: lambda expression taking the opened sqlite3 connection to run queries on.
     * returns: the result of the lambda.
     */
    public execute<T>(f: (sqlite3: betterSqlite3.Database) => T): T | undefined {
        const queries: string[] = [];
        const db = this.openConnection(queries);
        const start: number = new Date().getTime();

        let res: T | undefined;
        try {
            console.log(db)
            res = f(db);
        } catch (err) {
            res = undefined;
            //LOG.error(`DB execute: ${err["message"]} (stack: ${new Error().stack})`);
        } finally {
            const end = new Date().getTime();
            const time = end - start;
            if (time > 5000) {
                //LOG.debug(`Sqlite Execution took long: ${time}ms: \n` + queries.join("\n---\n"));
            }
        }

        db.close();
        return res;
    }
}