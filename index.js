const pino = require('pino');
const pinoElastic = require('pino-elasticsearch');

class VLogger {
    constructor({ service, elasticHost, elasticUser, elasticPass, level, ...options }) {
        const newOptions = Object.assign({
            name: service,
            level: level || 'info',
            depthLimit: 5,
            formatters: {
                level: (label, _number) => ({ level: label }),
            },
            timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
        }, options);

        let streamToElastic;
        if (elasticHost) {
            streamToElastic = pinoElastic({
                index: service,
                consistency: 'one',
                node: elasticHost,
                auth: {
                    username: elasticUser,
                    password: elasticPass,
                },
                'es-version': 7,
                'flush-bytes': 1000
            });
        }

        this.service = service;
        this.logger = pino(newOptions, streamToElastic);
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
