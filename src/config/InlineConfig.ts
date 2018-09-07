import Config from './Config';

export default class InlineConfig implements Config {
  dbHost = 'localhost';
  dbPort = 32768;
  dbName = 'easel';
  dbUsername = 'root';
  dbPassword = 'password';
}
