import SOCKET_OPEN from "socket.io-client";

const BASE_SOCKET_URL = ''

export const socket = SOCKET_OPEN(BASE_SOCKET_URL);

// SOCKET REQUEST
export  const SOCKET_REQUEST = (name, data) => socket.emit(name, data);

// SOCKET RESPONSE
export  const SOCKET_RESPONSE = (name, cb) => socket.on(name, (message) => cb(message));
