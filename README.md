# VNLP Logger for microservice

Extend from [Pino](https://getpino.io/) and [Pino Elasticsearhc](https://github.com/pinojs/pino-elasticsearch)

### Features
- Logger in many levels
- Logger for http request
- Upload log to ElasticSearch

### Setting

**Setup ELK:**
- Installing in Docker: https://github.com/deviantony/docker-elk

**Setup Cloudwatch**
- Using AWS account, create `aws_access_key_id` and `aws_secret_access_key` in IAM Service

**Setting Logger with service name and other options:**
```js
const logger = new VLogger({
    service: 'elastic-log',
    level: 'debug',
    // for elk
    streamType: 'elastic',
    elastic: {
        host: 'http://127.0.0.1:9200',
        username: 'elastic',
        password: 'changeme',
    },
    // for cloudwatch
    streamType: 'cloudwatch',
    cloudwatch: {
        group: 'cw-group',
        prefix: 'p-log',
        interval: 1000,
        awsRegion: '_________',
        awsAccessKeyId: '________________',
        awsSecretAccessKey: '________________________________',
    },
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
