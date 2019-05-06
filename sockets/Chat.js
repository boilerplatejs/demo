const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

export const history = (socket, io) => data => {
    for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
            socket.emit('@machete-platform/demo-bundle/Chat/message', msg);
        }
    }
};

export const message = (socket, io) => data => {
    data.id = messageIndex;
    messageBuffer[messageIndex % bufferSize] = data;
    messageIndex++;
    io.emit('@machete-platform/demo-bundle/Chat/message', data);
};
