import { Database } from './database';
import InlineConfig from './config/InlineConfig';

export let config = new InlineConfig();
export let database = new Database(config);
