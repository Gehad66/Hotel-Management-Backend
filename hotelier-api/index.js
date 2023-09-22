
const express = require("express");
// const HotelController = require('./src/controllers/hotel.controller');
const HotelRouter = require('./src/routes/hotel.routes');

const app = express();
app.use(express.json())

app.get("/", (req, res) => {
    res.send("About hoteliers p");
});
app.use("/hoteliers", HotelRouter);

app.listen(4000,() => console.log("Server listening at port 4000"));


