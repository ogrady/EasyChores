# Purpose
Small utility to note down repeatable household chores and assign them to a person. While sites like habitica are awesome, they are hard to be run locally and lack some functionality I needed (integration into Home Assistant, load balancing, multi user view). The use case is to run this too locally as web page and integrating it into Home Assistant.

**Features**
- [x] adding tasks as templates
- [x] adding tasks from template
- [ ] assigning people to tasks
- [x] listing open tasks
- [ ] repeatedly creating tasks in defined intervals
- [ ] automatically assining tasks based on a load balancing algorithm
- [ ] dockerize      

# Installation
```sh
npm i
``´
from the main directory. Then do an initial migration (see below).

## Database
Uses a SQLite3 DB.

### Migrating the DB
Running

```sh
npm run migrate-db
```

applies all available migrations.

### Creating a New Migration

```sh
node node_modules/db-migrate/bin/db-migrate create NAME --sql-file
```

Where `NAME` is the descriptive name for the patch. Edit the newly created `up` and `down` files.
