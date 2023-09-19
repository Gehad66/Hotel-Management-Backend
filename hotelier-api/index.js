const express = require("express");
const app = express();
app.get("/", (req, res) => {
    res.send("About hoteliers p");
});
app.listen(4000,() => console.log("Server listening at port 4000"));
