export const validateSchema = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const formatedMessages = result.error.flatten().fieldErrors;
    const messages = Object.values(formatedMessages).flat().join(", ");
    return res.status(400).json([ messages ]);
  }
  req.body = result.data;
  next();
};

export const validateIdSchema = (schema) => (req, res, next) => {
    const { id } = req.params;
  const result = schema.safeParse({id});
  if (!result.success) {
    const formatedMessages = result.error.flatten().fieldErrors;
    const messages = Object.values(formatedMessages).flat().join(", ");
    return res.status(400).json([ messages ]);
  }
  next();
};

export const validateIdProfileSchema = (schema) => (req, res, next) => {
    const { id } = req.params;
  const result = schema.safeParse({id});
  if (!result.success) {
    const formatedMessages = result.error.flatten().fieldErrors;
    const messages = Object.values(formatedMessages).flat().join(", ");
    return res.status(400).json([ messages ]);
  }
  next();
};