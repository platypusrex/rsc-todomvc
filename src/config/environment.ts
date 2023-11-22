import { cleanEnv, str, url } from 'envalid';
import 'dotenv/config';

export const env = cleanEnv(process.env, {
  DATABASE_URL: url(),
  AUTH_GITHUB_ID: str(),
  AUTH_GITHUB_SECRET: str(),
  AUTH_SECRET: str(),
});
