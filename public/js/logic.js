var board;
var game;


window.onload = function () {
    initGame();
};

var socket = io();


/*
settings up chess game from logic.js and chess.js
 */
var initGame = function () {
    var cfg = {
        draggable: true,
        position: 'start',
        onDrop: handleMove,
    };
    board = new ChessBoard('gameBoard', cfg);
    game = new Chess();
};

/*
can the piece move
 */
var handleMove = function (source, target) {
    var move = game.move({from: source, to: target});
    if(move === null){
        return 'snapback';
    } else {
        socket.emit('move', move);
        socket.emit('move', move);
    }
    if(game.in_checkmate()){

    }
}

// get other players move from server
socket.on('move', (msg) => {
    game.move(msg);
    if(game.in_checkmate()){

    } else{
        board.position(game.fen());
    }

});

