const middleware = (schema, isParams = false) => (req, res, next) => {
    let params = null;

    if (isParams) {
        if (Object.keys(req.params).length) {
            params = req.params;
        }
        if (Object.keys(req.query).length) {
            params = req.query;
        }
    } else {
        params = req.body;
    }

    if (params) {
        const { error } = schema.validate(params);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map((i) => i.message).join(',');

            res.status(422).json({ error: message });
        }
    } else {
        next();
    }
};

module.exports = middleware;
