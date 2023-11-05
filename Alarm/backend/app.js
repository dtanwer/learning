const express = require('express');
const http = require("http");
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const { Server } = require("socket.io");

app.set('view engine', 'ejs');
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

try {
    mongoose.connect('mongodb+srv://dtanwer:1234@cluster0.nicacv5.mongodb.net/alarm?retryWrites=true&w=majority');
    console.log('MongoDB connected');
} catch (error) {
    console.log(error.message, "error")
}



app.use('/auth', require('./routes/auth'));
app.use('/alarm', require('./routes/alarm')(io));

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});

