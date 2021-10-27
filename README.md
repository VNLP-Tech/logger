# VNLP Logger for microservice

Extend from [Pino](https://getpino.io/) and [Pino Elasticsearhc](https://github.com/pinojs/pino-elasticsearch)

### Features
- Logger in many levels
- Logger for http request
- Upload log to ElasticSearch

### Setting

**Setup ELK:**
- Installing in Docker: https://github.com/deviantony/docker-elk

**Setting Logger with service name and other options:**
```js
const logger = new VLogger({
    service: 'nlp',
    elasticHost: 'http://127.0.0.1:9200',
    level: 'debug',
}).init();
```

### Usage

**How to use**
```js
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

```
