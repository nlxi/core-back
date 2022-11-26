import type { Request } from 'express';
import type { IncomingMessage } from 'http';
import type { Params } from 'nestjs-pino';
import { multistream } from 'pino';
import type { ReqId } from 'pino-http';

const { nanoid } = await import('nanoid');

const passUrl = new Set(['/health', '/graphql']);

type TBuildLoggerOptions = {
  env: string,
  lokiHostname: string,
}

export const buildLoggerOptions = ({ env, lokiHostname }: TBuildLoggerOptions): Params => ({
  pinoHttp: [
    {
      quietReqLogger: true,
      genReqId: (req: IncomingMessage): ReqId =>
        (<Request>req).header('X-Request-Id') || nanoid(),
      ...(env === 'production'
        ? {
            useLevelLabels: true,
            transport: {
              target: 'pino-loki',
              options: {
                host: lokiHostname,
              }     
            }
          }
        : {
            level: 'debug',
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
        ignore: (req: IncomingMessage) =>
          passUrl.has((<Request>req).originalUrl),
      },
    },
    multistream(
      [
        { level: 'debug', stream: process.stdout },
        { level: 'error', stream: process.stderr },
        { level: 'fatal', stream: process.stderr },
      ],
      { dedupe: true },
    ),
  ],
});
