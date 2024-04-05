const validate = (schema) => async (req, res, next) => {
  try {
    const parsedBody = await schema.parseAsync(req.body);
    req.body = parsedBody;
    next();
  } catch (err) {  
    // console.log("error occured")
    console.log("Error at -", err.errors[0].path[0]);
    console.log("Error:-", err.errors[0].message);
    res.status(401).json({ error: "Error occured" });
  }
};

module.exports = validate;
