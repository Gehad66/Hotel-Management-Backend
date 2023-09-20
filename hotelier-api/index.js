
const express = require("express");
// const HotelController = require('./src/controllers/hotel.controller');
const HotelRouter = require('./src/routes/hotel.routes');

const app = express();



app.get("/", (req, res) => {
    res.send("About hoteliers p");
});
app.use("/hotels", HotelRouter);

app.listen(4000,() => console.log("Server listening at port 4000"));


