const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000
const dbConnect = require('./config/dbConnect')
const errorHandler = require('./middlewares/errorHandler')
const documentRoutes = require('./routes/DocumentRoute');
const categoriesRoutes = require('./routes/CategoriesRoutes');
const aspectsRoutes = require('./routes/AspectsRoutes');
const usersRoutes = require('./routes/UserRoutes');
const CustomError = require('./utils/customError');
const path = require('path');





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
app.use(express.static(path.join(__dirname, 'images')));
app.use('/documents', documentRoutes);
app.use('/categories', categoriesRoutes);
app.use('/aspects', aspectsRoutes);
app.use('/users', usersRoutes);

//app.use("/images", express.static("images"));


app.all('*', (req, res, next) => {
    next(new CustomError(`Url Not found : ${req.originalUrl}`, 404))
})

app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})
