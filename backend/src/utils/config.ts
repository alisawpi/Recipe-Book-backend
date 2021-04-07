import dotenv from 'dotenv';
dotenv.config();

let MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const SECRET = process.env.SECRET

if (process.env.NODE_ENV === 'test') {
  console.log('test db');
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}
const config = {
  MONGODB_URI,
  PORT, 
  SECRET
};
export default config;