//the 'game' object wraps in all the game code
var game = {
	//the counter calculates the number of moves
	counter: 0,
	win: false,
	//this array stores in the value of the table
	scoreStore: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],

	//when jQuery is loaded this function is called.
	init: function () {
		$( '.row .col' ).on('click', this.playCross );
		$( '#clear' ).on( 'click', this.clearBoard )
	},

	//when the player selects the X move it places the piece X at the cell clicked
	playCross: function ( element ) {
		// $( element.currentTarget ).text( 'X' );
		// $( element.currentTarget ).addClass( 'visited' );
		var $column = $(element.currentTarget);
	    var $rowIndex = $column.parent().index();
		var $colIndex = $column.index();
		var list = ".row." + $rowIndex + " ." + $colIndex;
		$( "list" ).text('X');
		$( "list" ).addClass( 'visited' );
	    game.counter +=1;
	    game.scoreStore[$rowIndex][$colIndex] = 'x';
	    game.checkWin( 'x', '0' );
	},

	//clears the board for a new game
	clearBoard: function () {
		game.counter = 0;
		game.win = false;
		game.scoreStore = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
		$( '#board td' ).text("");
		$( '#board td' ).removeClass( 'visited' );
		$( '#message' ).html( "" );
		
	},

	//checks for the winner
	checkWin: function ( winner, nextMove ) {
		debugger;
		if ( game.scoreStore[0][0] === game.scoreStore[0][1] && game.scoreStore[0][0] === game.scoreStore[0][2] && game.scoreStore[0][1] === game.scoreStore[0][2] ) {
			$( '#message' ).html( winner + " wins!" );
			game.win = true;	
		} else if ( game.scoreStore[1][0] === game.scoreStore[1][1] && game.scoreStore[1][0] === game.scoreStore[1][2] && game.scoreStore[1][1] === game.scoreStore[1][2] ) {
			$( '#message' ).html( winner + " wins!" );
			game.win = true;			
		} else if ( game.scoreStore[2][0] === game.scoreStore[2][1] && game.scoreStore[2][0] === game.scoreStore[2][2] && game.scoreStore[2][1] === game.scoreStore[2][2] ) {			
			$( '#message' ).html( winner + " wins!" );
			game.win = true;			
		} else if ( game.scoreStore[0][0] === game.scoreStore[1][0] && game.scoreStore[0][0] === game.scoreStore[2][0] && game.scoreStore[1][0] === game.scoreStore[2][0] ) {			
			$( '#message' ).html( winner + " wins!" );
			game.win = true;			
		} else if ( game.scoreStore[0][1] === game.scoreStore[1][1] && game.scoreStore[0][1] === game.scoreStore[2][1] && game.scoreStore[1][1] === game.scoreStore[2][1] ) {			
			$( '#message' ).html( winner + " wins!" );
			game.win = true;			
		} else if ( game.scoreStore[0][2] === game.scoreStore[1][2] && game.scoreStore[0][2] === game.scoreStore[2][2] && game.scoreStore[1][2] === game.scoreStore[2][2] ) {			
			$( '#message' ).html( winner + " wins!" );
			game.win = true;			
		} else if ( game.scoreStore[0][0] === game.scoreStore[1][1] && game.scoreStore[0][0] === game.scoreStore[2][2] && game.scoreStore[1][1] === game.scoreStore[2][2] ) {			
			$( '#message' ).html( winner + " wins!" );
			game.win = true;			
		} else if ( game.scoreStore[2][0] === game.scoreStore[1][1] && game.scoreStore[2][0] === game.scoreStore[0][2] && game.scoreStore[1][1] === game.scoreStore[0][2] ) {			
			$( '#message' ).html( winner + " wins!" );
			game.win = true;
		//for no winner			
		} else if ( game.counter === 9 && game.win === false ) {			
			$( '#message' ).html( "No winner!" );	
		//when game ends in a draw		
		} else if ( game.counter === 9 && game.win === true ) {			
			$( '#message' ).html( " Game ends in a draw!" );
		//calls for placing next move when none of the above criteria are met			
		} else {
			if ( nextMove === '0') {
				game.computerPlay();
			} else {
				game.playCross();
			}
		}
	},

	theCounter: function (i, j) {
		var list = ".row." + i + " ." + j;
		$( "list" ).text('0');
		$( "list" ).addClass( 'visited' );
		game.counter +=1;
		game.checkWin( '0', 'x' );
	},

	computerPlay: function () {
		//playing the center
		if ( game.scoreStore[1][1] !== '0' || game.scoreStore[1][1] !== 'x' ) {
			game.scoreStore[1][1] === '0';
			game.theCounter(1, 1);	
		}

		//if 2 in a row, play the third in that row
		var lines, position;
		for ( var i = 0; i < 3; i++ ) {
			for ( var j = 0; j < 3; j++ ) {
				if ( game.scoreStore[i][j] === '0' ) {
					lines++;
					if ( game.scoreStore[i][j] !== '0' || game.scoreStore[i][j] !== 'x' ) {
						position = j;
					}
					if ( lines = 2 ) {
						game.scoreStore[i][position] = '0';
						game.theCounter(i, position);
					}	
				} else if ( game.scoreStore[i][j] === 'x' ) {
					lines++;
					if ( game.scoreStore[i][j] !== '0' || game.scoreStore[i][j] !== 'x' ) {
						position = j;
					}
					if ( lines = 2 ) {
						game.scoreStore[i][position] = '0';
						game.theCounter(i, position);
					}
				}
			}
		} 

		//forking the oponent's pieces
		if ( game.scoreStore[1][1] === '0' && (game.scoreStore[0][2] === 'x' && game.scoreStore[2][0] === 'x') || (game.scoreStore[0][0] === 'x' && game.scoreStore[2][2] === 'x')) {
			if ( game.scoreStore[0][1] !== '0' || game.scoreStore[0][1] !== 'x' ) {
				 game.scoreStore[0][1] = "0";
				 game.theCounter(0,1);
			}
			if ( game.scoreStore[1][0] !== '0' || game.scoreStore[1][0] !== 'x' ) {
				 game.scoreStore[1][0] = "0";
				 game.theCounter(1,0);
			}
			if ( game.scoreStore[1][2] !== '0' || game.scoreStore[1][2] !== 'x' ) {
				 game.scoreStore[1][2] = "0";
				 game.theCounter(1,2);
			}
			if ( game.scoreStore[2][1] !== '0' || game.scoreStore[2][1] !== 'x' ) {
				 game.scoreStore[2][1] = "0";
				 game.theCounter(2,1);
			}
		}
		
		//playing the opposite corner
		if ( game.scoreStore[0][0] === 'x' && ( game.scoreStore[2][2] !== '0' || game.scoreStore[2][2] !== 'x' ) ) {
			game.scoreStore[2][2] = '0';
			game.theCounter(2,2);
		}
		if ( ( game.scoreStore[0][0] !== '0' || game.scoreStore[0][0] !== 'x' ) && game.scoreStore[2][2] === "x" ) {
			game.scoreStore[0][0] = '0';
			game.theCounter(0,0);
		}
		if ( ( game.scoreStore[0][2] !== '0' || game.scoreStore[0][2] !== 'x' ) && game.scoreStore[2][0] === "x" ) {
			game.scoreStore[0][2] = '0';
			game.theCounter(0,2);
		}
		if ( game.scoreStore[0][2] === "x" && ( game.scoreStore[2][0] !== '0' || game.scoreStore[2][0] !== 'x' ) ) {
			game.scoreStore[2][0] = '0';
			game.theCounter(2,0);
		}

		//playing an empty corner
		if ( game.scoreStore[0][0] !== '0' || game.scoreStore[0][0] !== 'x' ) {
			game.scoreStore[0][0] = '0';
			game.theCounter(0,0);
		} else if ( game.scoreStore[0][2] !== '0' || game.scoreStore[0][2] !== 'x' ) {
			game.scoreStore[0][2] = '0';
			game.theCounter(0,2);
		} else if ( game.scoreStore[2][0] !== '0' || game.scoreStore[2][0] !== 'x' ) {
			game.scoreStore[2][0] = '0';
			game.theCounter(2,0);
		} else if ( game.scoreStore[2][2] !== '0' || game.scoreStore[2][2] !== 'x' ) {
			game.scoreStore[2][2] = '0';
			game.theCounter(2,2);
		}
		
		//playing an empty side
		if ( game.scoreStore[0][1] !== '0' || game.scoreStore[0][1] !== 'x' ) {
			game.scoreStore[0][1] = '0';
			game.theCounter(0,1);
		} else if ( game.scoreStore[1][0] !== '0' || game.scoreStore[1][0] !== 'x' ) {
			game.scoreStore[1][0] = '0';
			game.theCounter(1,0);
		} else if ( game.scoreStore[1][2] !== '0' || game.scoreStore[1][2] !== 'x' ) {
			game.scoreStore[1][2] = '0';
			game.theCounter(1,2);
		} else if ( game.scoreStore[2][1] !== '0' || game.scoreStore[2][1] !== 'x' ) {
			game.scoreStore[2][1] = '0';
			game.theCounter(2,1);
		}
	},
};

//calls the init function once the jquery loads
$( document ).ready( function () {
	game.init();
});
