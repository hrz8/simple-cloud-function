const _ = require('lodash');
const express = require('express');
const cors = require('cors');
const jsYaml = require("js-yaml");
const { functions, wrapper } = require('./functions');
const { difyMiddleware } = require('./middlewares');

const app = express();

app.use(cors());
app.use(express.json({limit: '10mb'}));
app.post('/functions/:id', difyMiddleware, async (req, res) => {
    const functionId = req.params.id;

    const func = functions.find((f) => f.id === functionId);

    if (_.isEmpty(func)) {
        res.writeHead(404);
        res.end('Not found');

        return;
    }

    const response = await new Function(
        'require',
        'process',
        wrapper(func.script),
    )(require, process);

    if (!_.chain(response).get('result').isString().value()) {
        res.json({...response, result: jsYaml.dump(response.result)});

        return;
    }

    res.json(response);
});

app.listen(3080);
