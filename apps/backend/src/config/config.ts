export default () => ({
  database: {
    url: process.env.DATABASE_URL,
  },
  security: {
    corsOrigin: process.env.CORS_ORIGIN,
    jwtSecret: process.env.JWT_SECRET,
  },
  general: {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
  },
});
