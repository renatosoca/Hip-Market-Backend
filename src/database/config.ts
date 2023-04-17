import { connect, set } from 'mongoose';

export const connectDB = async () => {

  set('strictQuery', true);

  try {
    const mongoUri: string = process.env.MONGO_URI || '';

    const db = await connect( mongoUri );

    console.log(`PORT: ${db.connection.port} | Database: ${db.connection.name}`);
    return db;
  } catch (error) {
    console.log(error);
    return error;
  }
};