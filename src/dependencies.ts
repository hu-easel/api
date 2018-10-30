import { Database } from './database';
import SimpleConfig from './config/SimpleConfig';
import Config from './config/Config';
import EnvConfig from './config/EnvConfig';

export let config: Config;

if (process.env.IS_TRAVIS) {
  config = new EnvConfig();
} else {
  config = new SimpleConfig(
    true,
    true,
    'localhost',
    'easel',
    'password',
    32768,
    'root',
    8080,
    'cs.harding.edu',
    'secret',
    true,
    true,
    false);
}

export let database = new Database(config);
