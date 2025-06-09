import express from 'express';
import dotenv from 'dotenv';
import Product from './routes/products.js'; // Adjust the path as necessary
import mongoose from 'mongoose';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/products', Product);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));


app.get('/', (req, res) => {
  res.send('Welcome To The Product Web Express Server');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
