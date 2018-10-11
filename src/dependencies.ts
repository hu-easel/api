import { Database } from './database';
import SimpleConfig from './config/SimpleConfig';

export let config = new SimpleConfig(
  false,
  false,
  'localhost',
  'easel',
  'password',
  32768,
  'root',
  8080,
  'cs.harding.edu',
  'secret',
  false);
export let database = new Database(config);
