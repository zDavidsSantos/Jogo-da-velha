const jdv = {
    board: ['','','','','','','','',''],
    simbols: {
        options: ['X', 'O'],
        turn_index: 0,
        change: function(){
            this.turn_index = (this.turn_index === 0 ? 1 : 0);
        }
    },
    container_element: null,
    gameOver: false,
    winningSequences: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],

    init: function(container) {
        this.container_element = container;
    },

    make_play: function(position) {
        if (this.gameOver) return false;
        if (this.board[position] === '') {
            this.board[position] = this.simbols.options [this.simbols.turn_index];
            this.draw();
            let winningSequencesIndex = this.check_winnwerSequences (this.simbols.options [this.simbols.turn_index]);
            if (winningSequencesIndex >= 0 ) {
                this.gameIsOver();
            } else {
                this.simbols.change();
            }
            return true;
        } else {
            return false;
        }
        
    },

    gameIsOver: function(){
        this.gameOver = true;
        console.log("Fim do Jogo");
        document.write('Fim do jogo!!') ;
    },

    start: function() {
        this.board.fill('');
        this.draw();
        this.gameOver = false;
    },

    check_winnwerSequences: function(simbol) {
        for ( i in this.winningSequences) {
            if (this.board[this.winningSequences[i][0] ] == simbol &&
                this.board[this.winningSequences[i][1] ] == simbol &&
                this.board[this.winningSequences[i][2] ] == simbol) {
                    console.log('Sequencia Vencedora: ' + i);
                    return i ;
                }
        };
        return -1;
    },

    draw: function() {
        let content = '' ;

        for ( i in this.board) {
            content += '<div onclick="jdv.make_play('+ i +')">' + this.board[i] + '</div>' ;
        }

        this.container_element.innerHTML = content;
    }
};