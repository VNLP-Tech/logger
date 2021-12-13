const pino = require('pino');
const pinoElastic = require('pino-elasticsearch');
const pinoCloudwatch = require('pino-cloudwatch');

const STREAM_TYPE = {
    STDOUT: 'stdout',
    ELASTIC: 'elastic',
    CLOUDWATCH: 'cloudwatch',
};

class VLogger {
    constructor({
        service,
        level,
        streamType,
        ...options
    }) {
        const newOptions = Object.assign({
            name: service,
            level: level || 'info',
            depthLimit: 5,
            formatters: {
                level: (label, _number) => ({ level: label }),
            },
            timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
        }, options);

        let stream;
        switch (streamType) {
            case STREAM_TYPE.ELASTIC:
                const {
                    host,
                    username,
                    password,
                } = options.elastic;

                stream = pinoElastic({
                    index: service,
                    consistency: 'one',
                    node: host,
                    auth: {
                        username: username,
                        password: password,
                    },
                    'es-version': 7,
                    'flush-bytes': 1000
                });
                break;
            case STREAM_TYPE.CLOUDWATCH:
                const {
                    group,
                    prefix,
                    interval,
                    awsRegion: aws_region,
                    awsAccessKeyId: aws_access_key_id,
                    awsSecretAccessKey: aws_secret_access_key,
                } = options.cloudwatch;
                stream = pinoCloudwatch({
                    group,
                    prefix,
                    interval,
                    aws_region,
                    aws_access_key_id,
                    aws_secret_access_key,
                });
                break
            default:

        }

        this.service = service;
        this.logger = pino(newOptions, stream);
    }

    httpInfo(name, { url, method, headers, body, dest, response }) {
        this.logger.info({
            url,
            method,
            headers,
            response,
            body,
            flow: `${this.service}-${dest || 'external'}`,
        }, name);
    }

    httpError(name, { url, method, headers, body, dest, error }) {
        this.logger.error({
            url,
            method,
            headers,
            body,
            errorResponse: error,
            flow: `${this.service}-${dest || 'external'}`,
        }, name);
    }

    init() {
        this.logger.httpInfo = this.httpInfo.bind(this);
        this.logger.httpError = this.httpError.bind(this);
        return this.logger;
    }
}

module.exports = VLogger;
