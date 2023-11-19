const express =require('express') ;
const bodyparser =require('body-parser');
const mongoose =require('mongoose');
const cors =require('cors');
const dotenv =require('dotenv');
const helmet =require('helmet');
const morgan =require('morgan');
const path =require('path');
const { fileURLToPath } =require('url');
const authRoute =require('./routes/authRoute');
const userRoute =require('./routes/userRoute');
const postRoute =require('./routes/postRoute');
const conRoute =require('./routes/conversationRoute');
const msgRoute =require('./routes/messageRoute');

const errorHandler= require('./middlewares/errorHandler');

/* CONFIGURATIONS */
// let __filename = fileURLToPath(import.meta.url);
// let __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PATCH", "DELETE"],
    },
});


let activeUsers=[];

const addUser=(userId,socketId)=>{
    !activeUsers.some(user=>user.userId === userId)&&
        activeUsers.push({userId,socketId});
    
};

const removeUser= (socketId)=>{
    activeUsers = activeUsers.filter(user=>user.socketId !== socketId)
}

const getUser= (receiverId)=>{
    return activeUsers.find(user => user.userId === receiverId);
}

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("addUser",(userId)=>{
        addUser(userId,socket.id);
        io.emit("getUsers",activeUsers);
    });

    socket.on("sendMessage", ({senderId,receiverId,text})=>{
        const user = getUser(receiverId);
        console.log(user)
        console.log(senderId)
        console.log(text)
        io.to(user?.socketId).emit("getMessage",{
            senderId,
            text
        });
    });
    socket.on("sendLikeNotification",({sender,receiverId,post,type})=>{
        const user = getUser(receiverId);
        console.log(user)
        io.to(user?.socketId).emit("getNotification",{
            sender,
            post,
            type
        });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit("getUsers",activeUsers);
    });
});
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     next();
// });

app.use(cors());
app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
// app.use(morgan("common"));
app.use((express.json({ limit: "30mb", extended: true})));
app.use((express.urlencoded({ limit: "30mb", extended: true})));

app.use("/assets",express.static(path.join(__dirname,'./public/assets')));


app.use('/auth',authRoute);
app.use('/user',userRoute);
app.use('/post',postRoute);
app.use('/con',conRoute);
app.use('/msg',msgRoute);


app.use(errorHandler);


/*MONGOOSE SETUP */
const PORT=process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    server.listen(PORT, ()=>console.log(`server connected at port ${PORT}`))
}).catch(
    (error) => console.log(`${error} disconnected`)
);
