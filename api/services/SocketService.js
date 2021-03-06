'use strict'

const Service = require('trails/service')
const socketioJwt = require('socketio-jwt')

/**
 * @module SocketService
 * @description socket service
 */
module.exports = class SocketService extends Service {

  constructor(app){

    super(app)
    this.io = require('socket.io')
  }

  socketInit(http){

    this.io = this.io(http)

    // On socket client connection
    this.io.sockets
     .on('connection', socketioJwt.authorize({
       secret: 'jsbot',
       timeout: 15000,
     }))
     .on('authenticated', (socket)=> {

      // console.log(socket.id+' connected');
      // console.log(socket.decoded_token)

      //HANDLERS
      /**
       * send all online friends list to all connected socket
       */
      const getOnlineFriends = ()=> {

        let data = Object.keys(this.io.sockets.sockets)
        this.io.emit('allOnlineFriends', { data })
      }
      /**
       * Send a message to particular socket
       * @param data
       */
      const onMessageSubmit = (data)=> {
        this.io.to(data.id).emit('message', { user: socket.decoded_token, message: data.message });
      }
      /**
       * Subscribe to join a room
       * @param room
       */
      const onSubscribe = (room)=> { socket.join(room); }
      /**
       * Unsubscribe to leave a room
       * @param room
       */
      const onUnSubscribe = (room)=> { socket.leave(room); }
      /**
       * Broadcast a message in room
       * @param data
       */
      const onBroadcastToRoom = (data)=> {
        socket.to(data.room).emit('message', { user: socket.decoded_token, message: data.message });
      }
      /**
       * Socket client disconnection
       */
      const onDisconnect = ()=> {
        console.log(socket.id+' disconnected');
        getOnlineFriends();
      }

      //LISTENERS
      getOnlineFriends()
      socket.on('messageSubmit', onMessageSubmit)
      socket.on('subscribe', onSubscribe)
      socket.on('unsubscribe', onUnSubscribe)
      socket.on('broadcast', onBroadcastToRoom)
      socket.on('disconnect', onDisconnect)
    });
  }
}

