function onListening() {
    const address = this.address();

    console.log(`Server listening on http://localhost:${typeof address === 'string' ? `${address}` : `${address.port}`}`);
}

function bind(Server) {
    Server.on('listening', this.onListening.bind(Server));
}

module.exports = {
    bind,
    onListening,
};
