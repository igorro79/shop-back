const mongoose = require("mongoose");

const app = require("../app");

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose
      .connect(process.env.MONGO_URL)
      .then(console.log("database connect succesfully"))
      .catch((error) => {
        console.log(error.message);
        process.exit(1);
      });

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

start();
