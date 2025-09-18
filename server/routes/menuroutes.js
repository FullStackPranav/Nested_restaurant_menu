import { Router } from 'express';
import { createMenu, getAllMenus, getMenuById, createMenuItem } from '../controller/menucontroller.js';

const router = Router();

// Menus
router.post('/menus', createMenu);
router.get('/menus', getAllMenus);
router.get('/menus/:id', getMenuById);

// Menu Items
router.post('/menus/:id/items', createMenuItem);

export default router;


