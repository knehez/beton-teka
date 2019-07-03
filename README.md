# Beton Teka
Beton Teka

## Prerequistences
- mySQL server
- node >= 10.x

## Installation steps
- clone repository
- ``npm install``
- Check ormconfig.json and set your DB connections details
- Run db migration ``.\node_modules\.bin\typeorm migration:run``
- start client: ``npm run start``
- start (second time) backend: ``npm run gulp backend``
