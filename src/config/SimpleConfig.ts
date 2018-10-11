import Config from './Config';

export default class SimpleConfig implements Config {
  authenticationEnabled: boolean;
  authorizationEnabled: boolean;
  dbHost: string;
  dbName: string;
  dbPassword: string;
  dbPort: number;
  dbUsername: string;
  expressPort: number;
  jwtIssuer: string;
  jwtSecret: string;
  registrationEnabled: boolean;

  constructor (authenticationEnabled: boolean, authorizationEnabled: boolean, dbHost: string, dbName: string, dbPassword: string, dbPort: number, dbUsername: string, expressPort: number, jwtIssuer: string, jwtSecret: string, registrationEnabled: boolean) {
    this.authenticationEnabled = authenticationEnabled;
    this.authorizationEnabled = authorizationEnabled;
    this.dbHost = dbHost;
    this.dbName = dbName;
    this.dbPassword = dbPassword;
    this.dbPort = dbPort;
    this.dbUsername = dbUsername;
    this.expressPort = expressPort;
    this.jwtIssuer = jwtIssuer;
    this.jwtSecret = jwtSecret;
    this.registrationEnabled = registrationEnabled;
  }
}
