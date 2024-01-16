import { io } from 'socket.io-client';

const URL = process.env.REACT_APP_API_HOST;

export const socket = io(URL, {
    autoConnect: false
});