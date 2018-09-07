import Config from './Config';

export default class EnvConfig implements Config {
  dbHost = EnvConfig.getEnvironmentVariable('DB_HOST');
  dbPort = EnvConfig.getEnvironmentVariable('DB_PORT');
  dbName = EnvConfig.getEnvironmentVariable('DB_NAME');
  dbUsername = EnvConfig.getEnvironmentVariable('DB_USERNAME');
  dbPassword = EnvConfig.getEnvironmentVariable('DB_PASSWORD');

  static getEnvironmentVariable (name: string): any {
    if (process.env[name]) {
      return process.env[name];
    } else {
      console.log('Environment variable %s has not been set', name);
      return undefined;
    }
  }
}
