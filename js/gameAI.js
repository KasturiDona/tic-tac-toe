//the 'game' object wraps in all the game code
var game = {
	//the counter calculates the number of moves
	counter: 0,
	win: false,
	//this array stores in the value of the table
	scoreStore: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],

	//when jQuery is loaded this function is called.
	init: function () {
		$( '.row .col' ).on('click', this.placePiece );
		$( '#clear' ).on( 'click', this.clearBoard )
	},

	placePiece: function () {
		game.playCross( this );
	},

	//when the player selects the X move it places the piece X at the cell clicked
	playCross: function ( element ) {
		$( element ).text( 'x' ).css( 'color', 'blue' );
		$( element ).addClass( 'visited' );
	    var $rowIndex = $(element).parent().index();
		var $colIndex = $( element ).index();
	    game.counter +=1;
	    game.scoreStore[$rowIndex][$colIndex] = 'x';
	    console.log(game.scoreStore[$rowIndex][$colIndex]);
	    game.checkWin( 'x', '0' );
	},

	//clears the board for a new game
	clearBoard: function () {
		game.counter = 0;
		game.win = false;
		game.scoreStore = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
		$( '#board td' ).text("").removeAttr('style');
		$( '#board td' ).removeClass( 'visited' );
		$( '#board td' ).removeClass( 'notAllowed' );
		$( '#message' ).html( "" );
		
	},

	//checks for the winner
	checkWin: function ( winner, nextMove ) {
		if ( game.scoreStore[0][0] === game.scoreStore[0][1] && game.scoreStore[0][0] === game.scoreStore[0][2] && game.scoreStore[0][1] === game.scoreStore[0][2] ) {
			$( '#message' ).html( winner + " wins!" );
			game.win = true;
			$( '.row .col').addClass( 'notAllowed' );	
		} else if ( game.scoreStore[1][0] === game.scoreStore[1][1] && game.scoreStore[1][0] === game.scoreStore[1][2] && game.scoreStore[1][1] === game.scoreStore[1][2] ) {
			$( '#message' ).html( winner + " wins!" );
			game.win = true;
			$( '.row .col').addClass( 'notAllowed' );			
		} else if ( game.scoreStore[2][0] === game.scoreStore[2][1] && game.scoreStore[2][0] === game.scoreStore[2][2] && game.scoreStore[2][1] === game.scoreStore[2][2] ) {			
			$( '#message' ).html( winner + " wins!" );
			game.win = true;
			$( '.row .col').addClass( 'notAllowed' );			
		} else if ( game.scoreStore[0][0] === game.scoreStore[1][0] && game.scoreStore[0][0] === game.scoreStore[2][0] && game.scoreStore[1][0] === game.scoreStore[2][0] ) {			
			$( '#message' ).html( winner + " wins!" );
			game.win = true;	
			$( '.row .col').addClass( 'notAllowed' );		
		} else if ( game.scoreStore[0][1] === game.scoreStore[1][1] && game.scoreStore[0][1] === game.scoreStore[2][1] && game.scoreStore[1][1] === game.scoreStore[2][1] ) {			
			$( '#message' ).html( winner + " wins!" );
			game.win = true;	
			$( '.row .col').addClass( 'notAllowed' );		
		} else if ( game.scoreStore[0][2] === game.scoreStore[1][2] && game.scoreStore[0][2] === game.scoreStore[2][2] && game.scoreStore[1][2] === game.scoreStore[2][2] ) {			
			$( '#message' ).html( winner + " wins!" );
			game.win = true;
			$( '.row .col').addClass( 'notAllowed' );			
		} else if ( game.scoreStore[0][0] === game.scoreStore[1][1] && game.scoreStore[0][0] === game.scoreStore[2][2] && game.scoreStore[1][1] === game.scoreStore[2][2] ) {			
			$( '#message' ).html( winner + " wins!" );
			game.win = true;	
			$( '.row .col').addClass( 'notAllowed' );		
		} else if ( game.scoreStore[2][0] === game.scoreStore[1][1] && game.scoreStore[2][0] === game.scoreStore[0][2] && game.scoreStore[1][1] === game.scoreStore[0][2] ) {			
			$( '#message' ).html( winner + " wins!" );
			game.win = true;
			$( '.row .col').addClass( 'notAllowed' );
		//for no winner			
		} else if ( game.counter === 9 && game.win === false ) {			
			$( '#message' ).html( "Draw!" );	
		//calls for placing next move when none of the above criteria are met			
		} else {
			if ( nextMove === '0') {
				game.computerPlay();
			} else {
				game.placePiece();
			}
		}
	},

	//computer plays '0'
	playZero: function (i, j) {
		var list = ".row." + i + " ." + j;
		$( list ).html('0');
		$( list ).addClass( 'visited' ).addClass( 'appear' );
		game.counter +=1;
		game.checkWin( '0', 'x' );
	},

	computerPlay: function () {
		var position;

		//playing the center
		if ( game.scoreStore[1][1] !== 'x' && game.scoreStore[1][1] !== '0' ) {
			game.scoreStore[1][1] = '0';
			game.playZero(1, 1);	
			return;
		}

		//if 2 '0' a row, play the third in that row if its empty
		for ( var i = 0; i < 3; i++ ) {
			var lines0 = 0;
			for ( var j = 0; j < 3; j++ ) {
				if ( game.scoreStore[i][j] === '0' ) {
					lines0++;
				}
			} if ( lines0 === 2 ) {
				for ( var m = 0; m < 3; m++ ) {
					if ( game.scoreStore[i][m] !== '0' && game.scoreStore[i][m] !== 'x' ) {
						position = m;
						console.log("M: " + m)
						game.scoreStore[i][position] = '0';
						game.playZero(i, position);
						return;
					}
				}
			}
		}

		//if 2 '0' a column, play the third in that column if its empty
		for ( var i = 0; i < 3; i++ ) {
			var lines0 = 0;
			for ( var j = 0; j < 3; j++ ) {
				if ( game.scoreStore[j][i] === '0' ) {
					lines0++;
				}
			} if ( lines0 === 2 ) {
				for ( var m = 0; m < 3; m++ ) {
					if ( game.scoreStore[m][i] !== '0' && game.scoreStore[m][i] !== 'x' ) {
						position = m;
						console.log("M: " + m)
						game.scoreStore[position][i] = '0';
						game.playZero(position, i);
						return;
					}
				}
			}
		}

		//playing the diagonal if other 2 are '0'
		if ( game.scoreStore[0][2] === '0' && game.scoreStore[1][1] === '0' && ( game.scoreStore[2][0] !== '0' && game.scoreStore[2][0] !== 'x')) {
			game.scoreStore[2][0] = '0';
			game.playZero(2, 0);
			return;
		}
		if ( game.scoreStore[0][0] === '0' && game.scoreStore[1][1] === '0' && ( game.scoreStore[2][2] !== '0' && game.scoreStore[2][2] !== 'x')) {
			game.scoreStore[2][2] = '0';
			game.playZero(2, 2);
			return;
		}
		if ( game.scoreStore[2][2] === '0' && game.scoreStore[1][1] === '0' && ( game.scoreStore[0][0] !== '0' && game.scoreStore[0][0] !== 'x')) {
			game.scoreStore[0][0] = '0';
			game.playZero(0, 0);
			return;
		}
		if ( game.scoreStore[2][0] === '0' && game.scoreStore[1][1] === '0' && ( game.scoreStore[0][2] !== '0' && game.scoreStore[0][2] !== 'x')) {
			game.scoreStore[0][2] = '0';
			game.playZero(0, 2);
			return;
		}


		//if 2 'x' a row, play the third in that row if its empty
		for ( var i = 0; i < 3; i++ ) {
			var linesX = 0;
			for ( var j = 0; j < 3; j++ ) {
				if ( game.scoreStore[i][j] === 'x' ) {
					linesX++;
				}
			} if ( linesX === 2 ) {
				for ( var m = 0; m < 3; m++ ) {
					if ( game.scoreStore[i][m] !== '0' && game.scoreStore[i][m] !== 'x' ) {
						position = m;
						game.scoreStore[i][position] = '0';
						game.playZero(i, position);
						return;
					}
				} 
			}
		}

		//if 2 'x' a column, play the third in that column if its empty
		for ( var i = 0; i < 3; i++ ) {
			var linesX = 0;
			for ( var j = 0; j < 3; j++ ) {
				if ( game.scoreStore[j][i] === 'x' ) {
					linesX++;
				}
			} 
			if ( linesX === 2 ) {
				for ( var m = 0; m < 3; m++ ) {
					if ( game.scoreStore[m][i] !== '0' && game.scoreStore[m][i] !== 'x' ) {
						position = m;
						game.scoreStore[position][i] = '0';
						game.playZero(position, i);
						return;
					}
				}
			}
		}

		
		//playing an empty corner
		if ( game.scoreStore[0][0] !== '0' && game.scoreStore[0][0] !== 'x' ) {
			game.scoreStore[0][0] = '0';
			game.playZero(0,0);
			return;
		} else if ( game.scoreStore[0][2] !== '0' && game.scoreStore[0][2] !== 'x' ) {
			game.scoreStore[0][2] = '0';
			game.playZero(0,2);
			return;
		} else if ( game.scoreStore[2][0] !== '0' && game.scoreStore[2][0] !== 'x' ) {
			game.scoreStore[2][0] = '0';
			game.playZero(2,0);
			return;
		} else if ( game.scoreStore[2][2] !== '0' && game.scoreStore[2][2] !== 'x' ) {
			game.scoreStore[2][2] = '0';
			game.playZero(2,2);
			return;
		}
		
		
		//playing the diagonal if other 2 are 'x'
		if ( game.scoreStore[0][2] === 'x' && game.scoreStore[1][1] === 'x' && ( game.scoreStore[2][0] !== '0' && game.scoreStore[2][0] !== 'x')) {
			game.scoreStore[2][0] = '0';
			game.playZero(2, 0);
			return;
		}
		if ( game.scoreStore[0][0] === 'x' && game.scoreStore[1][1] === 'x' && ( game.scoreStore[2][2] !== '0' && game.scoreStore[2][2] !== 'x')) {
			game.scoreStore[2][2] = '0';
			game.playZero(2, 2);
			return;
		}

		//forking the oponent's piece
		if ( game.scoreStore[1][1] === '0' && (game.scoreStore[0][2] === 'x' && game.scoreStore[2][0] === 'x') || (game.scoreStore[0][0] === 'x' && game.scoreStore[2][2] === 'x')) {
			if ( game.scoreStore[0][1] !== '0' && game.scoreStore[0][1] !== 'x' ) {
				 game.scoreStore[0][1] = "0";
				 game.playZero(0, 1);
				 return;
			}
			if ( game.scoreStore[1][0] !== '0' && game.scoreStore[1][0] !== 'x' ) {
				 game.scoreStore[1][0] = "0";
				 game.playZero(1, 0);
				 return;
			}
			if ( game.scoreStore[1][2] !== '0' && game.scoreStore[1][2] !== 'x' ) {
				 game.scoreStore[1][2] = "0";
				 game.playZero(1, 2);
				 return;
			}
			if ( game.scoreStore[2][1] !== '0' && game.scoreStore[2][1] !== 'x' ) {
				 game.scoreStore[2][1] = "0";
				 game.playZero(2, 1);
				 return;
			}
		}
		
		//playing the opposite corner
		if ( game.scoreStore[0][0] === 'x' && ( game.scoreStore[2][2] !== '0' && game.scoreStore[2][2] !== 'x' ) ) {
			game.scoreStore[2][2] = '0';
			game.playZero(2,2);
			return;
		}
		if ( ( game.scoreStore[0][0] !== '0' && game.scoreStore[0][0] !== 'x' ) && game.scoreStore[2][2] === "x" ) {
			game.scoreStore[0][0] = '0';
			game.playZero(0,0);
			return;
		}
		if ( ( game.scoreStore[0][2] !== '0' && game.scoreStore[0][2] !== 'x' ) && game.scoreStore[2][0] === "x" ) {
			game.scoreStore[0][2] = '0';
			game.playZero(0,2);
			return;
		}
		if ( game.scoreStore[0][2] === "x" && ( game.scoreStore[2][0] !== '0' && game.scoreStore[2][0] !== 'x' ) ) {
			game.scoreStore[2][0] = '0';
			game.playZero(2,0);
			return;
		}
		
		//playing an empty side
		if ( game.scoreStore[0][1] !== '0' && game.scoreStore[0][1] !== 'x' ) {
			game.scoreStore[0][1] = '0';
			game.playZero(0,1);
			return;
		} else if ( game.scoreStore[1][0] !== '0' && game.scoreStore[1][0] !== 'x' ) {
			game.scoreStore[1][0] = '0';
			game.playZero(1,0);
			return;
		} else if ( game.scoreStore[1][2] !== '0' && game.scoreStore[1][2] !== 'x' ) {
			game.scoreStore[1][2] = '0';
			game.playZero(1,2);
			return;
		} else if ( game.scoreStore[2][1] !== '0' && game.scoreStore[2][1] !== 'x' ) {
			game.scoreStore[2][1] = '0';
			game.playZero(2,1);
			return;
		}

	},
};

//calls the init function once the jquery loads
$( document ).ready( function () {
	game.init();
});
