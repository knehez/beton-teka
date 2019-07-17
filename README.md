# Beton Teka
Beton Teka

## Prerequistences
- mySQL server
- node >= 10.x

## Installation steps
- Clone repository
- Install dependencies: ``npm install``
- Check ``ormconfig.json`` and set your DB connections details
- Run DB migration ``npm run migration``
- Start client: ``npm run start``
- Start backend: ``npm run gulp backend``

## Database migration scripts
- Generate new migration: ``npm run generate-migration -- -n <migration_name>``
- Run migrations: ``npm run migration``
- Revert the last migration: ``npm run revert-migration``
