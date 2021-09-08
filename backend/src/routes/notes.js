const { Router } = require('express');
const notesController = require('../controllers/notes.controller')

const router = Router();

router.route('/get-notes').get(notesController.getNotes);
router.route('/get-note/:id').get(notesController.getNote);
router.route('/create-note').post(notesController.createNote);
router.route('/update-note/:id').put(notesController.updateNote);
router.route('/delete-note/:id').delete(notesController.deleteNote);

module.exports = router;
