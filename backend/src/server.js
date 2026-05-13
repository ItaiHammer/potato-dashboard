import { buildApp } from './app.js';
import { env } from './config/env.js';

const app = buildApp();

await app.listen({ port: env.port, host: env.host });
