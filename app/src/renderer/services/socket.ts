import { Socket } from 'phoenix';
import { getUserToken } from '../utils/localStorage';

const socket = new Socket('http://localhost/socket', { params: { token: getUserToken() } });

export const initSocket = () => {
    socket.connect();
};

export default socket;
