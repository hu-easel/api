export default interface Config {
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUsername: string;
  dbPassword: string;
  expressPort: number;
  jwtSecret: string;
  jwtIssuer: string;
  isRegistrationEnabled: boolean;
  isAuthenticationEnabled: boolean;
  isAuthorizationEnabled: boolean;
  isDevelopmentMode: boolean;
  shouldForceModelSync: boolean;
}
