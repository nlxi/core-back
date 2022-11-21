import type { Request } from 'express';
import type { IncomingMessage } from 'http';
import { nanoid } from 'nanoid';
import type { Params } from 'nestjs-pino';
import { multistream } from 'pino';
import type { ReqId } from 'pino-http';



const passUrl = new Set(['/health', '/graphql']);

export const buildLoggerOptions= ({ env}:{env: string }): Params => ({
  pinoHttp: [{
    // https://getpino.io/#/docs/api?id=timestamp-boolean-function
    // Change time value in production log.
    // timestamp: stdTimeFunctions.isoTime,
    quietReqLogger: true,
    // @ts-ignore
    genReqId: (req: IncomingMessage): ReqId => (<Request>req).header('X-Request-Id') || nanoid(),
    ...(env === 'production'
      ? {
        useLevelLabels: true,
      }
      : {
        level: 'debug',
        // https://github.com/pinojs/pino-pretty
        transport: {
          target: 'pino-pretty',
          options: {
            sync: true,
            singleLine: true,
            colorize: true,
            levelFirst: true,
          },
        },
      }),
    autoLogging: {
      ignore: (req: IncomingMessage) => passUrl.has((<Request>req).originalUrl),
    },

  }, multistream([
    // https://getpino.io/#/docs/help?id=log-to-different-streams
    { level: 'debug', stream: process.stdout },
    { level: 'error', stream: process.stderr },
    { level: 'fatal', stream: process.stderr },
  ], { dedupe: true })],
});
