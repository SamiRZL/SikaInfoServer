const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000
const dbConnect = require('./config/dbConnect')
const errorHandler = require('./middlewares/errorHandler')
const documentRoutes = require('./routes/DocumentRoute');
const categoriesRoutes = require('./routes/CategoriesRoutes');
const aspectsRoutes = require('./routes/AspectsRoutes');
const usersRoutes = require('./routes/UserRoutes');
const CustomError = require('./utils/customError');




dbConnect()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.json("hello hello")
})
app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.static(path.join(__dirname, "/public")));
app.use('/documents', documentRoutes);
app.use('/categories', categoriesRoutes);
app.use('/aspects', aspectsRoutes);
app.use('/users', usersRoutes);






app.use("/files", express.static("files"));

// error handle 404 Not Found Page
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        req.json({ error: "404 Not Found" });
    } else {
        res.type("txt").send("404 Not Found");
    }
});

app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})
