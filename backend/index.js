import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import 'dotenv/config';
import { api } from './routes/index.js';

const app = new Hono();

app.use('*', logger());
app.use('*', cors());

app.get('/', (c) => c.text('Hello Hono!'));

app.route('/api', api);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
