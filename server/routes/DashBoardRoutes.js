import express from 'express';
const router = express.Router();
import DashBoardController from '../controllers/DashBoardController.js';


//public routes
router.get('/loaddata', DashBoardController.avgIntLikeRel);
router.get('/showdata', DashBoardController.showData);
router.post('/filter', DashBoardController.filterdata);



export default router;