//the 'game' object wraps in all the game code
var game = {
	//the counter calculates the number of moves
	counter: 0,
	win: false,
	//this array stores in the value of the table
	scoreStore: [["", "", ""], ["", "", ""], ["", "", ""]],

	//when jQuery is loaded this function is called.
	init: function () {
		$( '.row .col' ).on('click', this.playCross );
		$( '#clear' ).on( 'click', this.clearBoard )
	},

	//when the player selects the X move it places the piece X at the cell clicked
	playCross: function ( element ) {
		$( element.currentTarget ).text( 'X' );
		$( element.currentTarget ).addClass( 'visited' );
	    var $rowIndex = $( element.currentTarget ).parent().index();
			var $colIndex = $( element.currentTarget ).index();
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

	computerPlay: function () {

		if ( game.scoreStore[1][1] === "" ) {
			game.scoreStore[i][j] === '0';
			$( '.row.one .one' ).text('0');
			$( '.row.one .one' ).addClass( 'visited' );
			game.counter +=1;
			game.checkWin( '0', 'x' );
		}

		var lines0, linesX, position;
		for ( var i = 0; i < 3; i++ ) {
			for ( var j = 0; j < 3; j++ ) {
				if ( game.scoreStore[i][j] === 'x' ) {
					linesX++;
					if ( game.scoreStore[i][j] === "" ) {
						position = j;
					}
				} else if ( game.scoreStore[i][j] === '0' ) {
					lines0++;
					if ( game.scoreStore[i][j] === "" ) {
						position = j;
					}
				}
			}
			if ( lines0 = 2 ) || ( linesX = 2) {
				game.scoreStore[i][j] = '0';
			}	
		}
		$( '.row.one .one' ).text('0');
		$( '.row.one .one' ).addClass( 'visited' );
		game.counter +=1;
		game.checkWin( '0', 'x' );

		if ( game.scoreStore[1][1] === '0' && (( game.scoreStore[1][0] === 'x' && game.scoreStore[2][0] === 'x' ) || ( game.scoreStore[1][1] === 'x' && game.scoreStore[2][2] === 'x'  ))) {
			
		}


	},

	// computerPlay: function () {
	// 	if ( game.scoreStore[0][0] === "" && ( game.scoreStore[0][1] === 'x' && game.scoreStore[0][2] === 'x' ) || ( game.scoreStore[1][0] === 'x' && game.scoreStore[2][0] === 'x' ) || ( game.scoreStore[1][1] === 'x' && game.scoreStore[2][2] === 'x' )) {
	// 		game.scoreStore[0][0] = '0';
	// 		$( '.row.one .one' ).text('0');
	// 		$( '.row.one .one' ).addClass( 'visited' );
	// 		game.counter +=1;
	// 		game.checkWin( '0', 'x' );
	// 	} else if ( game.scoreStore[0][2] === "" && ( game.scoreStore[0][0] === 'x' && game.scoreStore[0][1] === 'x' ) || ( game.scoreStore[2][0] === 'x' && game.scoreStore[1][1] === 'x' ) || ( game.scoreStore[1][2] === 'x' && game.scoreStore[2][2] === 'x' )) {
	// 		game.scoreStore[0][2] = '0';
	// 		$( '.row.one .three' ).text('0');
	// 		$( '.row.one .three' ).addClass( 'visited' );
	// 		game.counter +=1;
	// 		game.checkWin( '0', 'x' );
	// 	} else if ( game.scoreStore[2][0] === "" && ( game.scoreStore[0][2] === 'x' && game.scoreStore[1][1] === 'x' ) || ( game.scoreStore[2][2] === 'x' && game.scoreStore[2][1] === 'x' ) || ( game.scoreStore[0][0] === 'x' && game.scoreStore[1][0] === 'x' )) {
	// 		game.scoreStore[2][0] = '0';
	// 		$( '.row.three .one' ).text('0');
	// 		$( '.row.three .one' ).addClass( 'visited' );
	// 		game.counter +=1;
	// 		game.checkWin( '0', 'x' );
	// 	} else if ( game.scoreStore[2][2] === "" && ( game.scoreStore[0][2] === 'x' && game.scoreStore[1][2] === 'x' ) || ( game.scoreStore[0][0] === 'x' && game.scoreStore[1][1] === 'x' ) || ( game.scoreStore[2][0] === 'x' && game.scoreStore[2][1] === 'x' )) {
	// 		game.scoreStore[2][2] = '0';
	// 		$( '.row.three .three' ).text('0');
	// 		$( '.row.three .three' ).addClass( 'visited' );
	// 		game.counter +=1;
	// 		game.checkWin( '0', 'x' );
	// 	} else if ( game.scoreStore[1][1] === "" && ( game.scoreStore[0][0] === 'x' && game.scoreStore[0][2] === 'x' ) || ( game.scoreStore[2][0] === 'x' && game.scoreStore[0][2] === 'x' ) || ( game.scoreStore[0][1] === 'x' && 'game.scoreStore[2][1]' === 'x' ) || (game.scoreStore[1][0] === 'x' && 'game.scoreStore[1][2]' === 'x' )) {
	// 		game.scoreStore[1][1] = '0';
	// 		$( '.row.two .two' ).text('0');
	// 		$( '.row.two .two' ).addClass( 'visited' );
	// 		game.counter +=1;
	// 		game.checkWin( '0', 'x' );
	// 	} else if ( game.scoreStore[1][2] === "" && ( game.scoreStore[0][2] === 'x' && game.scoreStore[2][2] === 'x' ) || ( game.scoreStore[1][0] === 'x' && game.scoreStore[1][1] === 'x' )) {
	// 		game.scoreStore[1][2] = '0';
	// 		$( '.row.two .three' ).text('0');
	// 		$( '.row.two .three' ).addClass( 'visited' );
	// 		game.counter +=1;
	// 		game.checkWin( '0', 'x' );
	// 	} else if ( game.scoreStore[1][0] === "" && ( game.scoreStore[0][0] === 'x' && game.scoreStore[2][0] === 'x' ) || ( game.scoreStore[1][1] === 'x' && game.scoreStore[1][2] === 'x' )) {
	// 		game.scoreStore[1][0] = '0';
	// 		$( '.row.two .one' ).text('0');
	// 		$( '.row.two .one' ).addClass( 'visited' );
	// 		game.counter +=1;
	// 		game.checkWin( '0', 'x' );
	// 	} else if ( game.scoreStore[0][1] === "" && ( game.scoreStore[0][0] === 'x' && game.scoreStore[0][2] === 'x' ) || ( game.scoreStore[1][1] === 'x' && game.scoreStore[2][1] === 'x' )) {
	// 		game.scoreStore[0][1] = '0';
	// 		$( '.row.one .two' ).text('0');
	// 		$( '.row.one .two' ).addClass( 'visited' );
	// 		game.counter +=1;
	// 		game.checkWin( '0', 'x' );
	// 	} else if ( game.scoreStore[2][1] === "" && ( game.scoreStore[2][0] === 'x' && game.scoreStore[2][2] === 'x' ) || ( game.scoreStore[1][1] === 'x' && game.scoreStore[0][1] === 'x' )) {
	// 		game.scoreStore[2][1] = '0';
	// 		$( '.row.three .two' ).text('0');
	// 		$( '.row.three .two' ).addClass( 'visited' );
	// 		game.counter +=1;
	// 		game.checkWin( '0', 'x' );
	// 	} else if ( game.scoreStore[1][1] === "" ) {
	// 		game.scoreStore[1][1] = '0';
	// 		$( '.row.two .two' ).text('0');
	// 		$( '.row.two .two' ).addClass( 'visited' );
	// 		game.counter +=1;
	// 		game.checkWin( '0', 'x' );
	// 	} else if ( game.scoreStore[0][0] === "" ) {
	// 		game.scoreStore[0][0] = '0';
	// 		$( '.row.one .one' ).text('0');
	// 		$( '.row.one .one' ).addClass( 'visited' );
	// 		game.counter +=1;
	// 		game.checkWin( '0', 'x' );
	// 	} else if ( game.scoreStore[2][2] === "" ) {
	// 		game.scoreStore[2][2] = '0';
	// 		$( '.row.three .three' ).text('0');
	// 		$( '.row.three .three' ).addClass( 'visited' );
	// 		game.counter +=1;
	// 		game.checkWin( '0', 'x' );
	// 	} else if ( game.scoreStore[0][2] === "" ) {
	// 		game.scoreStore[0][2] = '0';
	// 		$( '.row.one .three' ).text('0');
	// 		$( '.row.one .three' ).addClass( 'visited' );
	// 		game.counter +=1;
	// 		game.checkWin( '0', 'x' );
	// 	} else if ( game.scoreStore[2][0] === "" ) {
	// 		game.scoreStore[2][0] = '0';
	// 		$( '.row.three .one' ).text('0');
	// 		$( '.row.three .one' ).addClass( 'visited' );
	// 		game.counter +=1;
	// 		game.checkWin( '0', 'x' );
	// 	} else if ( game.scoreStore[1][0] === "" ) {
	// 		game.scoreStore[1][0] = '0';
	// 		$( '.row.two .one' ).text('0');
	// 		$( '.row.two .one' ).addClass( 'visited' );
	// 		game.counter +=1;
	// 		game.checkWin( '0', 'x' );
	// 	} else if ( game.scoreStore[1][2] === "" ) {
	// 		game.scoreStore[1][2] = '0';
	// 		$( '.row.two .three' ).text('0');
	// 		$( '.row.two .three' ).addClass( 'visited' );
	// 		game.counter +=1;
	// 		game.checkWin( '0', 'x' );
	// 	} else if ( game.scoreStore[0][1] === "" ) {
	// 		game.scoreStore[0][1] = '0';
	// 		$( '.row.one .two' ).text('0');
	// 		$( '.row.one .two' ).addClass( 'visited' );
	// 		game.counter +=1;
	// 		game.checkWin( '0', 'x' );
	// 	} else {
	// 		game.scoreStore[2][1] = '0';
	// 		$( '.row.three .two' ).text('0');
	// 		$( '.row.three .two' ).addClass( 'visited' );
	// 		game.counter +=1;
	// 		game.checkWin( '0', 'x' );
	// 	}
	// }
};

//calls the init function once the jquery loads
$( document ).ready( function () {
	game.init();
});
