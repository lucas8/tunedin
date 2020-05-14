import { Socket } from 'phoenix';
import { getUserToken } from '../utils/localStorage';

const socket = new Socket('ws://localhost:4000/socket', { params: { token: getUserToken() } });

export const initSocket = () => {
    socket.connect();

    return socket;
};

export default socket;
