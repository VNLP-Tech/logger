const VLogger = require('..');

const logger = new VLogger({
    service: 'nlp',
    elasticHost: 'http://127.0.0.1:9200',
    elasticUser: 'elastic',
    elasticPass: 'changeme',
    level: 'debug',
}).init();

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
