import { Router } from 'express';
import * as controller from '../controllers/appealsController';

const router = Router();

router.post('/', controller.create);
router.patch('/:id/in-progress', controller.takeInProgress);
router.patch('/:id/complete', controller.complete);
router.patch('/:id/cancel', controller.cancel);
router.get('/', controller.list);
router.patch('/cancel-all/in-progress', controller.cancelAllInProgress);

export default router;