import express,{Request,Response} from 'express';
import http from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import * as mongoose from  'mongoose';
import EmtChatModel from './models/emtChatModel.js';
import cors from 'cors';
import { hostname } from 'os';

const app:express.Application = express();
const server:http.Server = http.createServer(app);
const io = new SocketIOServer(server);

//Database connection if not working instead of localhost use 127.0.0.1
mongoose.connect('mongodb://localhost:27017/emtChat').then(()=>{console.log("connection success")}).catch((e)=>{console.log(e)})
app.use(express.json())
app.use(cors())

interface Message{
    EmtId:string,
    UserId:string,
    HospitalId:string,
    message:string,
}

app.get('/', (req:Request, res:Response) => {
    res.status(200).json({"message":"Working fine"})
});

io.on('connection', (socket: Socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', async(msg:any) => {
    let newMessage=new EmtChatModel();
    newMessage.EmtId=msg.EmtId;
    newMessage.UserId=msg.UserId;
    newMessage.HospitalId=msg.HospitalId;
    newMessage.message=msg.message;
    await newMessage.save();
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

const PORT:string|number=process.env.PORT||3000;

server.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
});
  

