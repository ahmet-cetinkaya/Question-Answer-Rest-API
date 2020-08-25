const asyncErrorWrapper = require('express-async-handler');
const { populateHelper, paginationHelper } = require('./queryMiddlewareHelpers');

const answerQueryMiddleware = function (model, options) {
  return asyncErrorWrapper(async function (req, res, next) {
    const { id } = req.params;
    const arrayName = 'answers';
    // Pagination
    const total = (await model.findById(id))['answerCount'];
    const paginationResult = await paginationHelper(total, undefined, req);
    const startIndex = paginationResult.startIndex;
    const limit = paginationResult.limit;
    let queryObject = {};
    queryObject[arrayName] = { $slice: [startIndex, limit] };
    let query = model.find({ _id: id }, queryObject);
    query = populateHelper(query, options.population);
    const queryResults = await query;
    res.queryResults = {
      success: true,
      pagination: paginationResult.pagination,
      data: queryResults,
    };
    next();
  });
};

module.exports = answerQueryMiddleware;
