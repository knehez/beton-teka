import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import setRoutes from './routes';
import { createConnection } from 'typeorm';
import { protectRoutes } from './protect.routes';
import initializeDatabase from './initial-data';

const app = express();

dotenv.config({
  path: 'settings.env'
});

app.set('port', (process.env.PORT || 3001));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json({ limit: process.env.MAXIMUM_FILE_SIZE_BYTES }));
app.use(bodyParser.urlencoded({ extended: false, limit: process.env.MAXIMUM_FILE_SIZE_BYTES }));

protectRoutes(app);

app.use(morgan('dev'));

createConnection().then(connection => {
  process.stdout.write('Connected to MySQL DB\n');

  initializeDatabase();

  setRoutes(app);

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  app.listen(app.get('port'), () => {
    process.stdout.write('HTTP server listening on port ' + app.get('port'));
  });

});

export { app };
