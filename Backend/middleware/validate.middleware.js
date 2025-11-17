
export const validateBody = (schema) => (req, res, next) => {

    //validate request body
    const {error, value} = schema.validate(req.body);

    //if invalid return error
    // console.log("Request received: ", req.body);
    console.log("valu is ", value)
    if (error) {
        return res
        .status(400)
        .json({
            ok: false,
            message: "Error time to validate Body",
            error: error.details[0].message
        });
    }

    req.validated = value;

    next();
}