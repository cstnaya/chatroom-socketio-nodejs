import { io } from 'socket.io-client'

const ENDPOINT = 'http://localhost:5600'

export const socket = io(ENDPOINT)
