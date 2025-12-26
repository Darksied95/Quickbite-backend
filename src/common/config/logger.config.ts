import { Params } from 'nestjs-pino';

export const loggerConfig: Params = {
  pinoHttp: {
    genReqId: (req) => {
      const existingId = req.id ?? req.headers['x-request-id'];
      if (existingId) return existingId;
      return crypto.randomUUID();
    },
    customProps: (req) => ({
      requestId: req.id,
    }),

    redact: {
      paths: [
        'req.headers.authorization',
        'req.headers.cookie',
        'req.headers["x-api-key"]',
        'req.body.password',
        'req.body.token',
      ],
      censor: '[REDACTED]',
    },

    customAttributeKeys: {
      req: 'request',
      res: 'response',
      err: 'error',
      responseTime: 'duration',
    },

    serializers: {
      req: (req) => ({
        id: req.id,
        method: req.method,
        url: req.url,
      }),
      res: (res) => ({
        statusCode: res.statusCode,
      }),
    },

    transport:
      process.env.NODE_ENV !== 'production'
        ? { target: 'pino-pretty', options: { colorize: true } }
        : undefined,

    autoLogging: {
      ignore: (req) => req.url === '/health',
    },

    customLogLevel: (req, res, err) => {
      if (res.statusCode >= 400 && res.statusCode < 500) return 'warn';
      if (res.statusCode >= 500 || err) return 'error';
      return 'info';
    },
  },
};
