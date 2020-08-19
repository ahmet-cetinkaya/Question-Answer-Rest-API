const express = require('express');
const router = express.Router({ mergeParams: true });
const { getAccessToRoute, getAnswerOwnerAccess } = require('../middlewares/authorization/auth');
const { checkQuestionAndAnswerExists } = require('../middlewares/database/databaseErrorHelpers');
const {
  addNewAnswerToQuestion,
  getAllAnswerByQuestion,
  getSingleAnswer,
  editAnswer,
  deleteAnswer,
  likeAnswer,
  undoLikeAnswer,
} = require('../controllers/answer');

router.post('/', getAccessToRoute, addNewAnswerToQuestion);
router.get('/', getAllAnswerByQuestion);
router.get('/:answer_id', checkQuestionAndAnswerExists, getSingleAnswer);
router.put(
  '/:answer_id/edit',
  [checkQuestionAndAnswerExists, getAccessToRoute, getAnswerOwnerAccess],
  editAnswer
);
router.delete(
  '/:answer_id/delete',
  [checkQuestionAndAnswerExists, getAccessToRoute, getAnswerOwnerAccess],
  deleteAnswer
);
router.get('/:answer_id/like', [checkQuestionAndAnswerExists, getAccessToRoute], likeAnswer);
router.get(
  '/:answer_id/undo_like',
  [checkQuestionAndAnswerExists, getAccessToRoute],
  undoLikeAnswer
);

module.exports = router;
