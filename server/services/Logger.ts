import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://158.160.118.181:9200',
  auth: {
    username: 'elastic',
    password: '2VFGaHd46OwL',
  },
});

type Extra = { [index: string]: unknown };

export class Logger {
  static info(message: string, extra: Extra = {}) {
    Logger.log('INFO', message, extra);
  }

  static error(message: string, extra: Extra = {}) {
    Logger.log('ERROR', message, extra);
  }

  static debug(message: string, extra: Extra = {}) {
    Logger.log('DEBUG', message, extra);
  }

  static warning(message: string, extra: Extra = {}) {
    Logger.log('WARNING', message, extra);
  }

  static log(level: string, message: string, extra: Extra = {}) {
    console.log(message);
    client.index({
      index: 'server-logs',
      document: {
        message,
        level,
        '@timestamp': new Date(),
        dev: extra,
      },
    });
  }
}
