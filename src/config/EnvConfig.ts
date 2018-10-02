import Config from './Config';

const envVarPrefix = 'EASEL_';

export default class EnvConfig implements Config {
  dbHost = EnvConfig.getEnvironmentVariable('EASEL_DB_HOST');
  dbPort = EnvConfig.getEnvironmentVariable('EASEL_DB_PORT');
  dbName = EnvConfig.getEnvironmentVariable('EASEL_DB_NAME');
  dbUsername = EnvConfig.getEnvironmentVariable('EASEL_DB_USERNAME');
  dbPassword = EnvConfig.getEnvironmentVariable('EASEL_DB_PASSWORD');
  expressPort = EnvConfig.getEnvironmentVariable('EASEL_EXPRESS_PORT');
  jwtSecret = EnvConfig.getEnvironmentVariable('EASEL_JWT_SECRET');
  jwtIssuer = EnvConfig.getEnvironmentVariable('EASEL_JWT_ISSUER');
  registrationEnabled = EnvConfig.getEnvironmentVariable('EASEL_REGISTRATION_ENABLED');
  authenticationEnabled = EnvConfig.getEnvironmentVariable('EASEL_AUTHENTICATION_ENABLED');

  static getEnvironmentVariable (name: string): any {
    name = envVarPrefix + name;
    if (process.env[name]) {
      return process.env[name];
    } else {
      console.log('Environment variable %s has not been set', name);
      return undefined;
    }
  }
}
