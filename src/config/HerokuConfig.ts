import * as log from 'loglevel';
import Config from './Config';
import * as url from 'url';

const envVarPrefix = 'EASEL_';

export default class HerokuConfig implements Config {
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUsername: string;
  dbPassword: string;
  expressPort = HerokuConfig.getEnvironmentVariable('PORT');
  jwtSecret = HerokuConfig.getPrefixedEnvironmentVariable('JWT_SECRET');
  jwtIssuer = HerokuConfig.getPrefixedEnvironmentVariable('JWT_ISSUER');
  isRegistrationEnabled = HerokuConfig.getPrefixedEnvironmentVariable('IS_REGISTRATION_ENABLED');
  isAuthenticationEnabled = HerokuConfig.getPrefixedEnvironmentVariable('IS_AUTHENTICATION_ENABLED');
  isAuthorizationEnabled = HerokuConfig.getPrefixedEnvironmentVariable('IS_AUTHORIZATION_ENABLED');
  isDevelopmentMode = HerokuConfig.getPrefixedEnvironmentVariable('IS_DEVELOPMENT_MODE');
  shouldForceModelSync = HerokuConfig.getPrefixedEnvironmentVariable('SHOULD_FORCE_MODEL_SYNC');

  constructor () {
    let databaseUrl = url.parse(HerokuConfig.getEnvironmentVariable('CLEARDB_DATABASE_URL'));
    this.dbHost = databaseUrl.hostname as string;
    this.dbPort = parseInt(databaseUrl.port as string, 10) || 3306;
    this.dbName = databaseUrl.path as string;
    this.dbUsername = (databaseUrl.auth as string).split(':')[0];
    this.dbPassword = (databaseUrl.auth as string).split(':')[1];
  }

  static getEnvironmentVariable (name: string): any {
    if (process.env.hasOwnProperty(name)) {
      return process.env[name];
    } else {
      log.error('Environment variable %s has not been set', name);
      return undefined;
    }
  }

  static getPrefixedEnvironmentVariable (name: string): any {
    return this.getEnvironmentVariable(envVarPrefix + name);
  }
}
