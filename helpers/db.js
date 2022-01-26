import { MongoClient } from "mongodb";

async function connectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.REACT_APP_MY_API_USERNAME}:${process.env.REACT_APP_MY_API_KEY}@cluster0.w1dc5.mongodb.net/auth-data?retryWrites=true&w=majority`
  );

  return client;
}

export default connectToDatabase;
