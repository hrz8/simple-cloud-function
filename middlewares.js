const _ = require('lodash');

const API_KEY = '12345';

const difyMiddleware = (req, res, next) => {
    console.info('incoming request:', JSON.stringify(req.body));

    const [authSchema, apiKey] = _.split(req.header('authorization'), ' ');

    if (authSchema.toLowerCase() !== 'bearer' && apiKey !== API_KEY) {
        res.writeHead(401);
        res.end('Unauthorized');

        return;
    }

    if (req.body.point === 'ping') {
        res.json({
            result: 'pong',
        });

        return;
    }

    if (req.body.point !== 'app.external_data_tool.query') {
        res.writeHead(400);
        res.end('Not implemented');

        return;
    }

    next();
}

module.exports = { difyMiddleware };
