/** 完成済み **/
const completeUrl = (req, res, next) => {
  req.completeUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  next();
};

export default completeUrl;
