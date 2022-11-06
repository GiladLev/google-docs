const express = require('express');
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const mongoose =require("mongoose")
const dotnev = require("dotenv");
const Document = require('./Document');
dotnev.config();

mongoose
.connect(process.env.MONGO_URL)
  .then(() => console.log("DBConnection Successfull"))
  .catch((err) => console.log(err));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const defaultValue =""

io.on('connection', (socket) => {
    console.log('connected');
    socket.on('get-document',async documentId =>{
      const document = await findOrCreateDocument(documentId)
      socket.join(documentId)
      socket.emit('load-document', document.data)

      socket.on("send-changes", delta =>{
          socket.broadcast.to(documentId).emit("receive-changes", delta)
    })
    socket.on("save-document", async data=>{
      await Document.findOneAndUpdate(documentId, {data})
    })
    })
  });

const findOrCreateDocument=async (id)=>{
  if (id == null) return

  const document = await Document.findById(id)
  if (document) return document
  return await Document.create({_id: id, data: defaultValue})
  
}


  server.listen(3001, () => {
    console.log('listening on *:3000');
  });