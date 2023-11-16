import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';
import { create } from 'express-handlebars';
import { existsSync } from 'fs';
import { readFile, rename, writeFile } from 'fs/promises';
import { AppOptions, JSONEditorOptions } from './types';
import rateLimit from 'express-rate-limit';

export const MS_IN_ONE_MINUTE = 60 * 1000;
export const DEFAULT_REQUESTS_PER_WINDOW_MS = 100;

/**
 * Even though our application is meant to be hosted locally,
 * we should still implement basic rate limiting to prevent
 * file operation endpoints from being abused. (Denial of Service)
 */
export const limiter = rateLimit({
  windowMs: MS_IN_ONE_MINUTE,
  max: DEFAULT_REQUESTS_PER_WINDOW_MS,
});

export const startJSONEditor = (appConfig: AppOptions, options: JSONEditorOptions = {
  use_name_attributes: true,
}) => {
  const stringifiedOptions = JSON.stringify(options);
  const {
    port,
    schemaString,
    data = {},
    dataFilePath = null,
    createBackup = true,
  } = appConfig;

  const app = express();
  const hbs = create({
    helpers: {
      toJSON: (obj: unknown) => JSON.stringify(obj, null, 3),
    },
  });

  app.use(rateLimit);
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');
  app.set('views', path.resolve(__dirname, '../src/views'));

  app.get('/', async (_req, res) => {
    if (!data && !dataFilePath) {
      res.render('home', { schema: schemaString, data: {}, options: stringifiedOptions });
      return;
    }

    let dataFromFile = {};
    if (dataFilePath && existsSync(dataFilePath)) {
      try {
        dataFromFile = await readFile(dataFilePath, 'utf-8');
      } catch (err) {
        console.error(`Error reading ${dataFilePath}:`, err);
      }
    }

    res.render('home', {
      layout: 'main',
      title: 'Home',
      schema: schemaString,
      data: dataFromFile ?? data ?? {},
      options: stringifiedOptions,
    });
  });

  app.post('/data', bodyParser.json(), async (req, res) => {
    const newData = req.body;
    if (createBackup && existsSync(dataFilePath)) {
      await rename(dataFilePath, `${dataFilePath}.bak`);
    }
    await writeFile(dataFilePath, JSON.stringify(newData, null, 2));
    res.redirect('/');
  });

  app.listen(port);
  console.info(`JSON editor started on port ${port}`);
};
