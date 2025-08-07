import express from 'express';
import { requireAuth } from '@clerk/express';
import { generateArticle } from '../controllers/aiController.js';
import { auth } from '../middlewares/auth.js';
import { generateBlogTitle } from '../controllers/aiController.js';
import { generateImage } from '../controllers/aiController.js';
import { removeImageBackground } from '../controllers/aiController.js';
import { upload } from '../configs/multer.js';
import { removeImageObject } from '../controllers/aiController.js';
import { resumeReview } from '../controllers/aiController.js';

const aiRouter = express.Router();

aiRouter.post('/generate-article',auth,generateArticle);
aiRouter.post('/generate-blog-title',auth,generateBlogTitle);
aiRouter.post('/generate-image',auth,generateImage);
aiRouter.post('/remove-image-background', upload.single('image') ,auth, removeImageBackground);
aiRouter.post('/remove-image-object', upload.single('image') ,auth,removeImageObject );
aiRouter.post('/resume-review', upload.single('resume'), auth, resumeReview);



export default aiRouter;
