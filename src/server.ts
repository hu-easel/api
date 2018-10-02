import * as log from 'loglevel';
import { app } from './app';
import { config } from './dependencies';

let { expressPort } = config;

if (app !== null) {
  app.listen(expressPort, () => {
    log.info('Express listening on port ' + expressPort);
  });
}
