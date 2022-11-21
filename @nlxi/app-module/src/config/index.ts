const factory = () => ({
  http: {
    port: parseInt(process.env.HTTP_PORT, 10) || 3000,
  },
  env: process.env.NODE_ENV  || 'development', // check production, development, test
  db: {
    host:  process.env.DB_HOST || 'localhost',
    port:  process.env.DB_PORT || '5432',
    username:  process.env.DB_USERNAME || 'pguser',
    password:  process.env.DB_PASSWORD || 'pgpass',
    database:  process.env.DB_DATABASE || 'app',
    ssl: !!process.env.DB_SSL,
  }
});

export default factory;
export type ConfigType = ReturnType<typeof factory>;
