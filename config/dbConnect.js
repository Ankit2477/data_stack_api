const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB);
    console.log(
      `DB Connect: ${connect.connection.host} - ${connect.connection.name}`
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = dbConnect;
