const VLogger = require('..');

const loggerElastic = new VLogger({
    service: 'elastic-log',
    streamType: 'elastic',
    elastic: {
        host: 'http://127.0.0.1:9200',
        username: 'elastic',
        password: 'changeme',
    },
    level: 'debug',
}).init();

const loggerLocal = new VLogger({
    service: 'local-log',
    streamType: 'local',
    level: 'debug',
}).init();

const loggerCloudWatch = new VLogger({
    service: 'cloudwatch-log',
    streamType: 'cloudwatch',
    cloudwatch: {
        group: 'cw-group',
        prefix: 'p-log',
        interval: 1000,
        awsRegion: '_________',
        awsAccessKeyId: '________________',
        awsSecretAccessKey: '________________________________',
    },
    level: 'debug',
}).init();

// const logger = loggerElastic;
// const logger = loggerLocal;
const logger = loggerCloudWatch;

logger.info('Info');
logger.warn('Warning');
logger.trace('Tracing');
logger.debug('Debug');
logger.error(new Error('Error here'), 'Error');

logger.httpInfo('call example service', {
    url: 'http://example.com',
    method: 'POST',
    headers: {
        'content-type': 'application/json',
    },
    body: {
        data: 'data',
    },
    response: {
        success: true,
    },
    dest: 'example service',
});
logger.httpError('call example service', {
    url: 'http://example.com',
    method: 'POST',
    headers: {
        'content-type': 'application/json',
    },
    body: {
        data: 'data',
    },
    error: {
        message: 'Something went wrong',
    },
    dest: 'example service',
});
