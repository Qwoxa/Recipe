const app = require('./server/app');

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
    console.info(`The server is running on ${PORT} port`);
});