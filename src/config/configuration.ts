export default () => ({
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    DBSQL: {
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    },
  });
  