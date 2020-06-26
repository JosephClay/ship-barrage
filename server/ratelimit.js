import ratelimit from 'express-rate-limit';
import { LIMIT } from './config';

export default ratelimit({
  windowMs: LIMIT ? 15 * 60 * 1000 : Number.MAX_SAFE_INTEGER, // 15 minutes
  max: LIMIT ? 100 : Number.MAX_SAFE_INTEGER, // limit each IP to 100 requests per windowMs
});