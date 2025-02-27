import { connect } from 'mongoose';

async function connectDB() {
  await connect(process.env.DB_CONN_STRING).then(() =>
    console.log('connected to MongoDB'),
  );
}

export default connectDB;
