import express from 'express';
import { createServer } from 'http';

const PORT = 3000;
const app = express();
const server = createServer(app);

server.listen(PORT, () => {
    console.log(`Server is Listening on PORT ${PORT}`);
});
