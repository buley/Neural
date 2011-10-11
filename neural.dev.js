
/* Neural.js */


/* Database */
/* Built using InDB */

/* Neurons */

Buleys.neurons.shorthand_map = {
	'id': 'i',
	'display': 'd',
	'display_alternatives': 'a',
	'type': 't',
	'slug': 's',
	'parents': 'p'
};

Buleys.neurons.install = function ( ) {

        var neurons = {
                'neurons': { 'key': Buleys.neurons.shorthand( 'id' ), 'incrementing_key': true, 'unique': true }
        };

        var neurons_idxs = {};
	neurons_idxs[ 'neurons' ] = {
		'display': {},
		'type': {},
		'slug': {}
	};

        //neurons_idxs[ '' ][ Buleys.neurons.shorthand( '' ) ] = '';
        neurons_idxs.neurons[ 'type' ][ Buleys.neurons.shorthand( 'type' ) ] = false;
        neurons_idxs.neurons[ 'display' ][ Buleys.neurons.shorthand( 'display' ) ] = false;
        neurons_idxs.neurons[ 'slug' ][ Buleys.neurons.shorthand( 'slug' ) ] = false;

	console.log( 'Buleys_neurons_install', neurons, neurons_idxs );

        InDB.trigger( 'InDB_do_stores_create', { 'stores': neurons, 'on_success': function( context ) {
                InDB.trigger( 'InDB_do_indexes_create', { 'indexes': neurons_idxs, 'on_complete': function( context2 ) {
                        console.log( 'neurons store loaded', context2 );
                } } );
        } } );


}

Buleys.neurons.put = function ( data, on_success, on_error )  {
	InDB.trigger( 'InDB_do_row_put', { 'store': 'neurons', 'data': Buleys.neurons.shorthand_encode( data ), 'on_success': on_success, 'on_error': on_error } );
}

Buleys.neurons.add = function ( data, on_success, on_error )  {
	InDB.trigger( 'InDB_do_row_add', { 'store': 'neurons', 'data': Buleys.neurons.shorthand_encode( data ), 'on_success': on_success, 'on_error': on_error } );
}

Buleys.neurons.remove = function ( key, on_success, on_error )  {
	InDB.trigger( 'InDB_do_row_delete', { 'store': 'neurons', 'key': Buleys.neurons.shorthand( key ), 'on_success': on_success, 'on_error': on_error } );
}

Buleys.neurons.shorthand = function ( key ) {
	if( 'undefined' !== typeof Buleys.neurons.shorthand_map[ key ] ) {
		return Buleys.neurons.shorthand_map[ key ];
	} else {
		return key;
	}
}


Buleys.neurons.shorthand_reverse = function ( key ) {
	var k = key;
	var reversed = {};
	for( var item in Buleys.neurons.shorthand_map ) {
		if( Buleys.neurons.shorthand_map.hasOwnProperty( item ) ) {
			reversed[ Buleys.neurons.shorthand_map[ item ] ] = item;
		}
	}
	if( 'undefined' !== typeof reversed[ k ] ) {
		return reversed[ k ];
	} else {
		return k;
	}
}

//recursive
Buleys.neurons.shorthand_decode = function( object ) {
	var encoded = {};
	var total = 0;
	for( var itemobj in object ) {
		if( 'undefined' !== typeof itemobj && object.hasOwnProperty( itemobj ) ) {
			//recursive case: object value
			//base case: string value
			var value = object[ itemobj ];
			if( 'object' === typeof value ) {
				encoded[ Buleys.neurons.shorthand_reverse( itemobj ) ] = Buleys.neurons.shorthand_decode( value );
				delete value;
			} else { 
				encoded[ Buleys.neurons.shorthand_reverse( itemobj ) ] = value;
				delete value;
			}
		}
		total++;
	}
	if( total > 0 ) {
		return encoded;
	} else {
		return {};
	}
}


//recursive
Buleys.neurons.shorthand_encode = function( object ) {
	var encoded = {};
	for( var item in object ) {
		if( object.hasOwnProperty( item ) ) {
			//recursive case: object value
			//base case: string value

			if( 'object' === typeof object[ item ] ) {
				encoded[ Buleys.neurons.shorthand( item ) ] = Buleys.neurons.shorthand_encode( object[ item ] );	
			} else { 
				encoded[ Buleys.neurons.shorthand( item ) ] = object[ item ];
			}
		}
	}
	return encoded;
}





/* Synapses */

Buleys.synapses.shorthand_map = {
	'id': 'i',
	'to': 't',
	'from': 'f',
	'strength': 's',
	'votes': 'v',
	'payload': 'p'
};

Buleys.synapses.install = function ( ) {

        var synapses = {
                'synapses': { 'key': Buleys.synapses.shorthand( 'id' ), 'incrementing_key': true, 'unique': true }
        };

        var synapses_idxs = {};
	synapses_idxs[ 'synapses' ] = {
		'type': {},
		'to': {},
		'from': {},
		'strength': {}
	};

        //synapses_idxs[ '' ][ Buleys.synapses.shorthand( '' ) ] = '';
        synapses_idxs[ 'synapses' ][ 'type' ][ Buleys.synapses.shorthand( 'type' ) ] = false;
        synapses_idxs[ 'synapses' ][ 'to' ][ Buleys.synapses.shorthand( 'to' ) ] = false;
        synapses_idxs[ 'synapses' ][ 'from' ][ Buleys.synapses.shorthand( 'from' ) ] = false;
        synapses_idxs[ 'synapses' ][ 'strength' ][ Buleys.synapses.shorthand( 'strength' ) ] = false;

	console.log( 'Buleys_synapses_install', synapses, synapses_idxs );

        InDB.trigger( 'InDB_do_stores_create', { 'stores': synapses, 'on_success': function( context ) {
                InDB.trigger( 'InDB_do_indexes_create', { 'indexes': synapses_idxs, 'on_complete': function( context2 ) {
                        console.log( 'synapses store loaded', context2 );
                } } );
        } } );


}

Buleys.synapses.put = function ( data, on_success, on_error )  {
	InDB.trigger( 'InDB_do_row_put', { 'store': 'synapses', 'data': Buleys.synapses.shorthand_encode( data ), 'on_success': on_success, 'on_error': on_error } );
}

Buleys.synapses.add = function ( data, on_success, on_error )  {
	InDB.trigger( 'InDB_do_row_add', { 'store': 'synapses', 'data': Buleys.synapses.shorthand_encode( data ), 'on_success': on_success, 'on_error': on_error } );
}

Buleys.synapses.remove = function ( key, on_success, on_error )  {
	InDB.trigger( 'InDB_do_row_delete', { 'store': 'synapses', 'key': Buleys.synapses.shorthand( key ), 'on_success': on_success, 'on_error': on_error } );
}

Buleys.synapses.shorthand = function ( key ) {
	if( 'undefined' !== typeof Buleys.synapses.shorthand_map[ key ] ) {
		return Buleys.synapses.shorthand_map[ key ];
	} else {
		return key;
	}
}


Buleys.synapses.shorthand_reverse = function ( key ) {
	var k = key;
	var reversed = {};
	for( var item in Buleys.synapses.shorthand_map ) {
		if( Buleys.synapses.shorthand_map.hasOwnProperty( item ) ) {
			reversed[ Buleys.synapses.shorthand_map[ item ] ] = item;
		}
	}
	if( 'undefined' !== typeof reversed[ k ] ) {
		return reversed[ k ];
	} else {
		return k;
	}
}

//recursive
Buleys.synapses.shorthand_decode = function( object ) {
	var encoded = {};
	var total = 0;
	for( var itemobj in object ) {
		if( 'undefined' !== typeof itemobj && object.hasOwnProperty( itemobj ) ) {
			//recursive case: object value
			//base case: string value
			var value = object[ itemobj ];
			if( 'object' === typeof value ) {
				encoded[ Buleys.synapses.shorthand_reverse( itemobj ) ] = Buleys.synapses.shorthand_decode( value );
				delete value;
			} else { 
				encoded[ Buleys.synapses.shorthand_reverse( itemobj ) ] = value;
				delete value;
			}
		}
		total++;
	}
	if( total > 0 ) {
		return encoded;
	} else {
		return {};
	}
}


//recursive
Buleys.synapses.shorthand_encode = function( object ) {
	var encoded = {};
	for( var item in object ) {
		if( object.hasOwnProperty( item ) ) {
			//recursive case: object value
			//base case: string value

			if( 'object' === typeof object[ item ] ) {
				encoded[ Buleys.synapses.shorthand( item ) ] = Buleys.synapses.shorthand_encode( object[ item ] );	
			} else { 
				encoded[ Buleys.synapses.shorthand( item ) ] = object[ item ];
			}
		}
	}
	return encoded;
}

/* End Synapses InDB */

