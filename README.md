# Beton Teka
Beton Teka

## Prerequistences
- mySQL server

## Installation steps
- clone repository
- ``npm install``
- Check ormconfig.json and set your DB connections details
- start backend: ``npm run gulp backend``
- after error messages - stop
- Run db migration ``.\node_modules\.bin\typeorm migration:run``
- start client: ``npm run start``
- start (second time) backend: ``npm run gulp backend``
