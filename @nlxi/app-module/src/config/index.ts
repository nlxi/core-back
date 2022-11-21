const factory = () => ({
  http: {
    port: parseInt(process.env.HTTP_PORT, 10) || 3000,
  },
  env: process.env.NODE_ENV  || 'development', // check production, development, test
});

export default factory;
export type ConfigType = ReturnType<typeof factory>;
