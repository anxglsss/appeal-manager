import app from './app';
import 'reflect-metadata';
import { AppDataSource } from './db/dataSource';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log('Database connection failed:', error));