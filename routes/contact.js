import express from 'express';
import { submitContact } from '../controllers/ContactController.js';

const router = express.Router();

// Route to handle contact form submission
router.post('/', submitContact);

export default router;
