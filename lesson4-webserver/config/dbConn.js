const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopologu: true,
            useNewUrlParser: true
        });

    }catch (err){
        console.error(err);
    }
}

module.exports = connectDB