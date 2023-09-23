const express = require("express");
const BookingsRoute = require('./src/routes/bookings.routes');

const app = express();
app.use(express.json())

app.get("/", (req, res) => {
    res.send("About bookings");
});
app.use("/bookings", BookingsRoute);

app.listen(3000,() => console.log("Server listening at port 3000"));
