const register = (req, res, next) => {
  res.status(200).json({ success: true });
};
module.exports = {
  register,
};
