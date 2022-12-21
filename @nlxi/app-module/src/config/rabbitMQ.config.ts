import {
  RabbitRPC,
  RabbitMQChannels,
  RabbitMQExchangeConfig,
} from '@golevelup/nestjs-rabbitmq';

export interface RabbitMQExchangeConfigNext extends RabbitMQExchangeConfig {
  name: 'exchange-1' | 'exchange-2';
}

const exchanges: RabbitMQExchangeConfigNext[] = [
  {
    name: 'exchange-1',
    type: 'topic',
  },
];

const channels: RabbitMQChannels = {
  'channel-1': {
    prefetchCount: 15,
    default: true,
  },
  'channel-2': {
    prefetchCount: 2,
  },
};

export const buildRabbitMQConfig = () => ({
  exchanges,
  channels,
});

type IRabbitRPC = Parameters<typeof RabbitRPC>[0] & {
  exchange: RabbitMQExchangeConfigNext['name'];
};

export function RabbitRPCNext(config: IRabbitRPC) {
  return RabbitRPC({
    routingKey: 'rpc-route',
    queue: 'rpc-queue',
    ...config,
  });
}
