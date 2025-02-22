import { Router } from 'express';
import BookController from '../controllers/BookController';
import { validateBook } from '../middleware/validators';

const router = Router();

router.get('/', BookController.all);
router.get('/isbn/:isbn', BookController.getBookByISBN);
router.get('/:id', BookController.one);
router.post('/', validateBook, BookController.create);
router.put('/:id', validateBook, BookController.update);
router.delete('/:id', BookController.delete);

export default router; 