import { connect } from 'mongoose';

function connectDB() {
  connect(process.env.DB_CONN_STRING).then(() => {
    console.log('connected to MongoDB');
  });
}

export default connectDB;
