import express from 'express';
import { config as dotenv_config } from 'dotenv';
import { connect } from 'mongoose';
import usersRouter from './routes/usersRouter';
import cors from 'cors';
dotenv_config();
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
const port = process.env['PORT'] || 5000;
app.get('/', (req, res) => {
  res.send('Hello from root! ');
});
app.use('/api/users', usersRouter);
app.listen(port, () => {
  console.log(`Listening on URL http://localhost:${port}`);
  if (!process.env.DB_URI) throw new Error('DB_URI is not defined');
  connect(
    process.env.DB_URI,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    },
    () => {
      console.log('Connected to database successfully');
    },
  );
});
