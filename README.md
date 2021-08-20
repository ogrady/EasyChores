# Database
Uses a SQLite3 DB.

## Migrating the DB
Running

```sh
npm run migrate-db
```

applies all available migrations.

## Creating a New Migration

```sh
node node_modules/db-migrate/bin/db-migrate create NAME --sql-file
```

Where `NAME` is the descriptive name for the patch. Edit the newly created `up` and `down` files.
