import mongoose from "mongoose";

 const connection = async () => {
    const dbName = `${process.env.MONGODB_URI}passwordReset`;
    try {
        await mongoose.connect(dbName,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('connected to database');
    } catch (err) {
        console.log(err, 'failed to connect to database');
    }
};
export default connection;