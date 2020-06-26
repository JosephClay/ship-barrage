// env
export const PORT = process.env.PORT;
export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_TEST = !IS_PROD;
export const SSL = process.env.SSL === 'true';
export const LIMIT = process.env.LIMIT === 'true';
export const MAX_AGE = IS_PROD ? 31536000 : 0;

// db
export const DATABASE_URI = process.env.MONGO_DATABASE_URI;
export const DATABASE_CONFIG = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  poolSize: 25,
  connectTimeoutMS: 5000,
  socketTimeoutMS: 5000,
};

// static assets
export const STATIC = { maxAge: MAX_AGE };
export const STATIC_GZIP = {
  maxAge: MAX_AGE,
  enableBrotli: IS_PROD,
  orderPreference: IS_PROD ? ['br', 'gz'] : [],
};