export default () => ({
  port: parseInt(process.env.APP_PORT, 10),
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
});
