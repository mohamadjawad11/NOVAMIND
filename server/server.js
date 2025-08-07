import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express';
import aiRouter from './routes/aiRoutes.js';
import sql from './configs/db.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoutes.js';

const app = express();
await connectCloudinary();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());


app.get('/', (req, res) => res.send('Server is running...'));

console.log("🛠 Registering /api/ai routes...");

app.use('/api/ai', aiRouter);
app.use('/api/user',userRouter)

try {
  await sql`SELECT 1`;
  console.log("✅ DB connection successful.");
} catch (err) {
  console.error("❌ DB connection failed:", err.message);
}


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
