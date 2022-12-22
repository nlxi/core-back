import {
  RabbitMQChannels,
  RabbitMQExchangeConfig,
} from '@golevelup/nestjs-rabbitmq';

const exchanges: RabbitMQExchangeConfig[] = [
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
