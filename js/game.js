
var game = {
	counter: 0,

	init: function () {
		$( '#cross' ).on( 'click', this.placeMessageX );
		$( '#zero' ).on( 'click', this.placeMessage0 );
	},

	// placeMessage: function () {
		
	// 	$( '.row .col' ).hover(
	// 		function() {
	// 		   $( this ).html( $( "<span>Place '" + game.currentPiece() + "' here?</span>" ));
	// 		}, function() {
	// 		   $( this ).find( "span:last" ).remove();
	// 		}
	// 	);

	// 	$( '.row .col' ).on('click', game.placePiece() );
	// },

	// currentPiece: function () {
	// 	if ($('#cross').is('.active')) {
	// 		return 'x';
	// 	} else {
	// 		return '0';
	// 	}
	// },

	// placePiece: function () {
	// 	$( this ).text( game.currentPiece() );
	// 	$( this ).addClass( 'visited' );
	// 	$( '#zero, #cross' ).toggleClass( 'active' );
	// },

	placeMessageX: function () {
		$( this ).addClass( 'active' );
		$( '#zero' ).removeClass( 'active' ).delay(400);
		$( '.row .col' ).hover(
			function() {
			   $( this ).html( $( "<span>Place 'x' here?</span>" ));
			}, function() {
			   $( this ).find( "span:last" ).remove();
			}
		);
		game.playCross();
	},

	placeMessage0: function () {
	    $( this ).addClass( 'active' );
	    $( '#cross' ).removeClass( 'active' ).delay(400);
		$( '.row .col' ).hover(
			function() {
			   $( this ).html( $( "<span>Place '0' here?</span>" ));
			}, function() {
			   $( this ).find( "span:last" ).remove();
			}
		);
		game.playZero();
	},

	playCross: function () {
		$( '.row .col').on( 'click', function () {
			$( this ).text( 'X' );
			$( this ).addClass( 'visited' );
		    $( '#zero, #cross' ).toggleClass( 'active' );
		    game.counter +=1;
		});
		if ( game.counter === 9 ) {
			game.score();
		} else {
			game.placeMessage0();
		}
		
	},

	playZero: function () {
		$( '.row .col').on( 'click', function () {
			$( this ).text( '0' );
			$( this ).addClass( 'visited' );
		    $( '#zero, #cross' ).toggleClass( 'active' );
		    game.counter +=1;
		});
		if ( game.counter === 9 ) {
			game.score();
		} else {
			game.placeMessageX();
		}
		
	},

	score: function () {
		var r0c0 = $( '.row.one .col.one' ).val();
		var r0c1 = $( '.row.one .col.two' ).val();
		var r0c2 = $( '.row.one .col.three' ).val();

		var r1c0 = $( '.row.two .col.one' ).val();
		var r1c1 = $( '.row.two .col.two' ).val();
		var r1c2 = $( '.row.two .col.three' ).val();

		var r2c0 = $( '.row.three .col.one' ).val();
		var r2c1 = $( '.row.three .col.two' ).val();
		var r2c2 = $( '.row.three .col.three' ).val();

		var sc = 0;
		$( 'td' ).each( function () {
			$value = $( '.row .col' ).val();
		});
		console.log(sc);
	}
};

$( document ).ready( function () {
	game.init();
})