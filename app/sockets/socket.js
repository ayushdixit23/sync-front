import { io } from "socket.io-client";

// const socketUrl = "http://localhost:8100";
const socketUrl = "https://realsync.nexoo.site/api";

const socket = io(socketUrl, {
  reconnectionAttempts: 100,
  reconnectionDelay: 3000,
  reconnection: true,
  autoConnect: true,
  transports: ["websocket"],
});

if (socket.connected) {
} else {
  if (!socket.connected) {
    socket.connect();
    setTimeout(() => {
      console.log("Reconnecting...", socket.connected);
    }, 1000);
  }
}

// emit function to join group
export const joingroup = async ({ groupId }) => {
  console.log(`Joining group: ${groupId}`);
  if (!socket.connected) {
    socket.connect();
    setTimeout(() => {
      socket.emit("joinGroup", { groupId });
    }, 1000);
  } else {
    socket.emit("joinGroup", { groupId });
  }
};
// Emitting function for sending a message
export const sendMessage = ({ groupId, senderId, text }) => {
  console.log("Socket Connection:", socket.connected);
  if (!socket.connected) {
    socket.connect();
    setTimeout(() => {
      socket.emit("sendMessage", { groupId, senderId, text });
    }, 1000);
  } else {
    socket.emit("sendMessage", { groupId, senderId, text });
  }
};
// Listening function for incoming messages
export const socketOnMessage = (callback) => {
  socket.on("message", (message) => {
    console.log("New message received:", message);
    callback(message);
  });
};
//emitting function
export const socketemitfunc = async ({ event, data }) => {
  console.log("Socket Connection:", socket.connected);
  if (!socket.connected) {
    socket.connect();
    socket.emit(event, data);
    setTimeout(() => {
      console.log("Reconnecting...", socket.connected);
    }, 1000);
  } else {
    console.log("Connecting...");
    socket.emit(event, data);
  }
};

//function for listening
export const socketonfunc = async ({ event, data }) => {
  if (!socket.connected) {
    socket.connect();
    socket.on(event, data);
    setTimeout(() => {
      console.log("Reconnecting...", socket.connected);
    }, 1000);
  } else {
    socket.emit(event, data);
  }
};

export const disconnectSocket = () => {
  socket.disconnect();
  console.log("Socket disconnected manually");
};
export default socket;
