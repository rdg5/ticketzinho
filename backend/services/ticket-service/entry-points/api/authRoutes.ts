import express from 'express';
import { logger } from '@practica/logger';
import { AppError } from '@practica/error-handling';
import * as authUseCase from '../../domain/auth-use-case';

export default function defineUserRoutes(expressApp: express.Application) {
  const router = express.Router();

  router.post('/register', async (req, res, next) => {
    try {
      logger.info(`Auth API was called to register a new user`);
      const response = await authUseCase.register(req.body);

      if (!response) {
        res.status(404).end();
        return;
      }
      res.status(201).json({ status: 'ok' });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.HTTPStatus).json({ error: error.message });
        next(error);
      }
    }
  });

  router.post('/login', async (req, res, next) => {
    try {
      logger.info(`Auth API was called to login a user`);
      const response = await authUseCase.login(req.body);

      if (!response) {
        res.status(404).end();
        return;
      }
      res.status(201).json({ status: 'ok', token: response });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.HTTPStatus).json({ error: error.message });
        next(error);
      }
    }
  });

  expressApp.use('/auth', router);
}