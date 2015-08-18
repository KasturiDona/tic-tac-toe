//the 'game' object wraps in all the game code
var game = {
	//the counter calculates the number of moves
	counter: 0,
	win: false,
	//this array stores in the value of the table
	scoreStore: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],

	//when jQuery is loaded this function is called.
	init: function () {
		$( '#cross' ).on( 'click', this.placeMessageX );
		$( '#zero' ).on( 'click', this.placeMessage0 );
		$( '.row .col' ).on('click', this.placePiece );
		$( '#clear' ).on( 'click', this.clearBoard )
	},

	//returns the value of the buttons clicked( either x, 0 oe null)
	currentPiece: function () {
		if ($( '#cross' ).is( '.active' ) ) {
			return 'x';
		} else if ($('#zero').is( '.active' ) ) {
			return '0';
		} else {
			return null;
		}
	},

	//gets the current piece and places it on to the board where the player wants to place it
	placePiece: function () {
		if ( game.currentPiece() === 'x' ) {
			game.playCross( this );
		} else if (game.currentPiece() === '0') {
			game.playZero( this );
		} else {
			//the blink class makes the buttons blink if the player does not select a button
			$( '#cross, #zero' ).addClass( 'blink' );
			setTimeout(function () {
				$('#cross, #zero').removeClass( 'blink' );
			}, 3000 );
		}
	},

	//when the player selects the X move it asks player where to place the piece X
	placeMessageX: function () {
		$( this ).addClass( 'active' );
		$( '#zero' ).removeClass( 'active' );
		$( '.row .col' ).hover(
			function() {
			   $( this ).html( $( "<span>Place 'x' here?</span>" ));
			}, function() {
			   $( this ).find( "span:last" ).remove();
			}
		);
	},

	//when the player selects the 0 move it asks player where to place the piece 0
	placeMessage0: function () {
	    $( this ).addClass( 'active' );
	    $( '#cross' ).removeClass( 'active' );
		$( '.row .col' ).hover(
			function() {
			   $( this ).html( $( "<span>Place '0' here?</span>" ));
			}, function() {
			   $( this ).find( "span:last" ).remove();
			}
		);
	},

	//when the player selects the X move it places the piece X at the cell clicked
	playCross: function ( element ) {
			$( element ).text( 'X' );
			$( element ).addClass( 'visited' );
		    $( '#zero, #cross' ).toggleClass( 'active' );
		    var $rowIndex = $(element).parent().index();
   			var $colIndex = $( element ).index();
		    game.counter +=1;
		    game.scoreStore[$rowIndex][$colIndex] = 'X';
		    game.checkWin( 'X', '0' );
	},

	//when the player selects the 0 move it places the piece 0 at the cell clicked
	playZero: function ( element ) {
			$( element ).text( '0' );
			$( element ).addClass( 'visited' );
		    $( '#zero, #cross' ).toggleClass( 'active' );
		    var $rowIndex = $( element ).parent().index();
   			var $colIndex = $( element ).index();
		    game.counter +=1;
		    game.scoreStore[$rowIndex][$colIndex] = '0';
		    game.checkWin( '0', 'X' );
	},

	//clears the board for a new game
	clearBoard: function () {
		game.counter = 0;
		game.win = false;
		game.scoreStore = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
		$( '#board td' ).text("");
		$( '#board td' ).unbind( "mouseenter mouseleave" );
		$( '#board td' ).removeClass( 'visited' );
		$( '#board td').removeClass( 'notAllowed' );
		$( '#zero' ).removeClass( 'active' );
		$( '#cross' ).removeClass( 'active' );
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
			$( '#message' ).html( "No winner!" );	
		//when game ends in a draw		
		} else if ( game.counter === 9 && game.win === true ) {			
			$( '#message' ).html( " Game ends in a draw!" );
		//calls for placing next move when none of the above criteria are met			
		} else {
			if ( nextMove === '0') {
				game.placeMessage0();
			} else {
				game.placeMessageX();
			}
		}
	}
};

//calls the init function once the jquery loads
$( document ).ready( function () {
	game.init();
});
