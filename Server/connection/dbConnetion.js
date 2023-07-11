import mongoose from "mongoose";

const DbConnection = () => {
  const connection = mongoose
    .connect(process.env.MongoDb)
    .then((err, dataBase) => {
      console.log("database Connected !");
    })
    .catch((err) => {
      throw err;
    });
};
export default DbConnection;
