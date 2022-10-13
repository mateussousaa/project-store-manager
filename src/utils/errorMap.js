const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  NAME_IS_REQUIRED: 400,
  NAME_IS_TOO_SHORT: 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = { mapError };