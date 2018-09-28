import React, { Component } from "react"
import io from "socket.io-client"
import { Consumer } from "../context/Context.js"

let socket = null
const data = []

export const init = () => {
	socket = io.connect("http://localhost:4001")
}

export const addPost = userData => {
	if(socket.emit("post", userData)) {
		data.unshift(userData)
	}
	returnAllMessages();
}

export const getPost = userData => {
	if(socket.on("post", userData)) {
		console.log(`Received`, userData)
	}
}

export const returnAllMessages = () => {
	return data;
}


