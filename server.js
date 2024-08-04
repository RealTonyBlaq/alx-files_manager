import express from 'express';
import router from './routes/index';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(router);

app.listen(PORT, () => {
  console.log(`Server connected and listing on http://127.0.0.1:${PORT}`);
});

export default app;
