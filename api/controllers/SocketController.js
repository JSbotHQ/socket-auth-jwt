'use strict'

const Controller = require('trails/controller')
const jwt = require('jsonwebtoken')

/**
 * @module SocketController
 * @description socket controller.
 */
module.exports = class SocketController extends Controller {

  home(req, res) {
    return res.sendFile('login.html', {root: './public'});
  }

  login(req,res){

    let model = req.body
    if(!model || ! model.username) return res.send('Invalid credential')

    model.name = model.username
    let token = jwt.sign(model, 'jsbot', { expiresIn: 60*60*5 })

    // res.cookie('sock_token', token, { expires: new Date(Date.now() + 900000) })
    res.json({ token })
  }

  chat(req,res){
    return res.sendFile('chat.html', {root: './public'});
  }

  group(req,res){
    return res.sendFile('group.html', {root: './public'});
  }
}

