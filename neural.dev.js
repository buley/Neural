
/* Neural.js
 * Basic MLP neural network.
 **/

var Neural = Neural || {};
Neural.neurons = Neural.neurons || {};
Neural.synapses = Neural.synapses || {};

/* Relationship helpers */

/*
Each takes an object w/attributes { options: obj, on_success: fn, on_error: fn }
*/

Neural.synapses.cursor = Neural.synapses.cursor || {};

/* Synapses Set */
Neural.synapses..shorthand( key )etStrength = function( request ) {

	if( !!Neural.debug ) {
		console.log( 'Neural.synapses.setStrength', request );
	}

	var on_success =  function( context ) {
		console.log( 'Neural.synapses.setStrength success', context );
        };

	var on_error =  function( context ) {
		console.log( 'Neural.synapses.setStrength error', context );
	};

	Neural.synapses.update( request.key, request.index, { 'strength': request.strength }, request.on_success, request.on_error );

};

/* Synapses Get */
//TODO: need to implement update/no replace
// ( 'key': string, 'index': string (requred), 'strength': int, 'on_success': fn, 'on_error': fn }
Neural.synapses.getStrength = function( request ) {
	
	var on_success =  function( context ) {
		console.log( 'Neural.synapses.setStrength success', context );
        };

	var on_error =  function( context ) {
		console.log( 'Neural.synapses.setStrength error', context );
	};

	Neural.synapses.get( request.key, request.index, request.on_success, request.on_error );

};

/* Synapses Cursor set */
// ( 'key': string, 'index': string (requred), 'strength': int, 'on_success': fn, 'on_error': fn }
Neural.synapses.cursor.setStrength = function( request ) {
	
	var on_success =  function( context ) {
		console.log( 'Neural.synapses.cursor.setStrength success', context );
        };

	var on_error =  function( context ) {
		console.log( 'Neural.synapses.cursor.setStrength', context );
	};

	Neural.synapses.cursor.update( request.key, request.index, request.data, request.on_success, request.on_error, request.left_inclusive, request.right_inclusive );

};

/* Synapses Cursor get */
Neural.synapses.cursor.getStrength = function( request ) {
	
	var on_success =  function( context ) {
		console.log( 'Neural.synapses.setStrength success', context );
        };

	var on_error =  function( context ) {
		console.log( 'Neural.synapses.setStrength error', context );
	};

	Neural.synapses.get( request.key, request.index, request.on_success, request.on_error );

};




/* Database */

/* Neurons */

Neural.neurons.shorthand_map = {
	'id': 'i',
	'display': 'd',
	'display_alternatives': 'a',
	'type': 't',
	'slug': 's',
	'parents': 'p'
};

Neural.neurons.install = function ( ) {

        var neurons = {
                'neurons': { 'key': Neural.neurons.shorthand( 'id' ), 'incrementing_key': true, 'unique': 'true' }
        };

        var neurons_idxs = {};
	neurons_idxs[ 'neurons' ] = {
		'id': {},
		'display': {},
		'type': {},
		'slug': {}
	};

        //neurons_idxs[ '' ][ Neural.neurons.shorthand( '' ) ] = '';
        neurons_idxs.neurons[ 'id' ][ Neural.neurons.shorthand( 'id' ) ] = false;
        neurons_idxs.neurons[ 'type' ][ Neural.neurons.shorthand( 'type' ) ] = false;
        neurons_idxs.neurons[ 'display' ][ Neural.neurons.shorthand( 'display' ) ] = false;
        neurons_idxs.neurons[ 'slug' ][ Neural.neurons.shorthand( 'slug' ) ] = false;

	console.log( 'Neural_neurons_install', neurons, neurons_idxs );

        InDB.trigger( 'InDB_do_stores_create', { 'stores': neurons, 'on_success': function( context ) {
                InDB.trigger( 'InDB_do_indexes_create', { 'indexes': neurons_idxs, 'on_complete': function( context2 ) {
                        console.log( 'neurons store loaded', context2 );
                } } );
        } } );

}

/* Get */
Neural.neurons.get = function ( key, on_success, on_error )  {
	InDB.trigger( 'InDB_do_row_get', { 'store': 'neurons', 'key': Neural.neurons.shorthand( key ), 'on_success': on_success, 'on_error': on_error } );
}

/* Put */
Neural.neurons.put = function ( data, on_success, on_error )  {
	InDB.trigger( 'InDB_do_row_put', { 'store': 'neurons', 'data': Neural.neurons.shorthand_encode( data ), 'on_success': on_success, 'on_error': on_error } );
}

/* Update */
Neural.neurons.update = function ( data, on_success, on_error )  {
	InDB.trigger( 'InDB_do_row_update', { 'store': 'neurons', 'key': Neural.neurons.shorthand( key ), 'data': Neural.neurons.shorthand_encode( data ), 'on_success': on_success, 'on_error': on_error } );
}

/* Add */
Neural.neurons.add = function ( data, on_success, on_error )  {
	InDB.trigger( 'InDB_do_row_add', { 'store': 'neurons', 'data': Neural.neurons.shorthand_encode( data ), 'on_success': on_success, 'on_error': on_error } );
}

/* Remove */
Neural.neurons.remove = function ( key, on_success, on_error )  {
	InDB.trigger( 'InDB_do_row_delete', { 'store': 'neurons', 'key': Neural.neurons.shorthand( key ), 'on_success': on_success, 'on_error': on_error } );
}

/* Multi */

Neural.neurons.cursor = Neural.neurons.cursor || {};

/* Cursor Get */

Neural.neurons.cursor.get = function( key, index, on_success, on_error, begin, end, left_inclusive, right_inclusive ) {

        /* Action */

ao      jQuery(document).trigger('cursor_get_neurons', { "index": index, "key": key, "begin": begin, "end": end, "left_inclusive": left_inclusive, "right_inclusive": right_inclusive, "on_success": on_success, 'on_error': on_error } );

	/* Defaults */

	begin = ( 'undefined' !== typeof begin ) ? begin : null;
	end = ( 'undefined' !== typeof end ) ? end : null;
	left_inclusive = ( 'undefined' !== typeof left_inclusive ) ? left_inclusive : null;
	right_inclusive = ( 'undefined' !== typeof right_inclusive ) ? right_inclusive : null;
	key = ( 'undefined' !== typeof begin && 'undefined' !== typeof end ) ? key : null;

	/* Setup */

	var keyRange = InDB.range.get( key, begin, end, left_inclusive, right_inclusive );

	/* Callbacks */

	var cursor_on_success = function ( context ) {
		var item = Neural.synapses.shorthand_reverse( InDB.row.value( context.event ) );
		if( !!Neural.debug ) console.log( 'success', item );
		if( 'function' == typeof on_error ) {
			on_success( context );
		}
	};

	var cursor_on_error = function ( context ) {
		if( 'function' == typeof on_error ) {
			on_error( context );
		}
	};

	/* Request */

	InDB.trigger( 'InDB_do_cursor_get', { 'store': 'neurons', 'keyRange': keyRange, 'index': index, 'on_success': cursor_on_success, 'on_error': cursor_on_error } );

};

/* Cursor Delete */
Neural.neurons.cursor.delete = function( key, index, begin, end, on_success, on_error ) {

        /* Action */

        jQuery(document).trigger('cursor_delete_neurons', { "index": index, "key": key, "begin": begin, "end": end, "left_inclusive": left_inclusive, "right_inclusive": right_inclusive, "on_success": on_success, 'on_error': on_error } );

	/* Defaults */

	begin = ( 'undefined' !== typeof begin ) ? begin : null;
	end = ( 'undefined' !== typeof end ) ? end : null;
	left_inclusive = ( 'undefined' !== typeof left_inclusive ) ? left_inclusive : null;
	right_inclusive = ( 'undefined' !== typeof right_inclusive ) ? right_inclusive : null;
	key = ( 'undefined' !== typeof begin && 'undefined' !== typeof end ) ? key : null;

	/* Setup */

	var keyRange = InDB.range.get( key, begin, end, left_inclusive, right_inclusive );

	/* Callbacks */

	var cursor_on_success = function ( context ) {
		var item = Neural.synapses.shorthand_reverse( InDB.row.value( context.event ) );
		if( !!Neural.debug ) console.log( 'success', item );
		if( 'function' == typeof on_error ) {
			on_success( context );
		}
	};

	var cursor_on_error = function ( context ) {
		if( 'function' == typeof on_error ) {
			on_error( context );
		}
	};

	/* Request */

	InDB.trigger( 'InDB_do_cursor_delete', { 'store': 'neurons', 'keyRange': keyRange, 'index': index, 'on_success': cursor_on_success, 'on_error': cursor_on_error } );

};

/* Cursor Update */
Neural.neurons.cursor.update = function( key, index, data, on_success, on_error, begin, end, left_inclusive, right_inclusive, replace ) {

        /* Action */

        jQuery(document).trigger('cursor_put_neurons', { "index": index, "key": key, "begin": begin, "end": end, "left_inclusive": left_inclusive, "right_inclusive": right_inclusive, "replace": replace, "on_success": on_success, 'on_error': on_error } );

	/* Defaults */

	replace = ( true == replace ) ? true : false;
	begin = ( 'undefined' !== typeof begin ) ? begin : null;
	end = ( 'undefined' !== typeof end ) ? end : null;
	left_inclusive = ( 'undefined' !== typeof left_inclusive ) ? left_inclusive : null;
	right_inclusive = ( 'undefined' !== typeof right_inclusive ) ? right_inclusive : null;
	key = ( 'undefined' !== typeof begin && 'undefined' !== typeof end ) ? key : null;

	/* Setup */

	var keyRange = InDB.range.get( key, begin, end, left_inclusive, right_inclusive );

	/* Callbacks */

	var cursor_on_success = function ( context ) {
		var item = Neural.synapses.shorthand_reverse( InDB.row.value( context.event ) );
		if( !!Neural.debug ) console.log( 'success', item );
		if( 'function' == typeof on_error ) {
			on_success( context );
		}
	};

	var cursor_on_error = function ( context ) {
		if( 'function' == typeof on_error ) {
			on_error( context );
		}
	};

	/* Request */

	InDB.trigger( 'InDB_do_cursor_update', { 'store': 'neurons', 'data': data, 'keyRange': keyRange, 'index': index, 'replace': replace,'on_success': cursor_on_success, 'on_error': cursor_on_error } );
	
};

Neural.neurons.shorthand = function ( key ) {
	if( 'undefined' !== typeof Neural.neurons.shorthand_map[ key ] ) {
		return Neural.neurons.shorthand_map[ key ];
	} else {
		return key;
	}
};


Neural.neurons.shorthand_reverse = function ( key ) {
	var k = key;
	var reversed = {};
	for( var item in Neural.neurons.shorthand_map ) {
		if( Neural.neurons.shorthand_map.hasOwnProperty( item ) ) {
			reversed[ Neural.neurons.shorthand_map[ item ] ] = item;
		}
	}
	if( 'undefined' !== typeof reversed[ k ] ) {
		return reversed[ k ];
	} else {
		return k;
	}
};

//recursive
Neural.neurons.shorthand_decode = function( object ) {
	var encoded = {};
	var total = 0;
	for( var itemobj in object ) {
		if( 'undefined' !== typeof itemobj && object.hasOwnProperty( itemobj ) ) {
			//recursive case: object value
			//base case: string value
			var value = object[ itemobj ];
			if( 'object' === typeof value ) {
				encoded[ Neural.neurons.shorthand_reverse( itemobj ) ] = Neural.neurons.shorthand_decode( value );
				delete value;
			} else { 
				encoded[ Neural.neurons.shorthand_reverse( itemobj ) ] = value;
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
Neural.neurons.shorthand_encode = function( object ) {
	var encoded = {};
	for( var item in object ) {
		if( object.hasOwnProperty( item ) ) {
			//recursive case: object value
			//base case: string value

			if( 'object' === typeof object[ item ] ) {
				encoded[ Neural.neurons.shorthand( item ) ] = Neural.neurons.shorthand_encode( object[ item ] );	
			} else { 
				encoded[ Neural.neurons.shorthand( item ) ] = object[ item ];
			}
		}
	}
	return encoded;
}


/* Synapses */


Neural.synapses.shorthand_map = {
	'id': 'i',
	'to': 't',
	'from': 'f',
	'strength': 's',
	'votes': 'v',
	'payload': 'p'
};

Neural.synapses.install = function ( ) {

        var synapses = {
                'synapses': { 'key': Neural.synapses.shorthand( 'id' ), 'incrementing_key': true, 'unique': true }
        };

        var synapses_idxs = {};
	synapses_idxs[ 'synapses' ] = {
		'id': {},
		'type': {},
		'to': {},
		'from': {},
		'strength': {}
	};

        //synapses_idxs[ '' ][ Neural.synapses.shorthand( '' ) ] = '';
        synapses_idxs[ 'synapses' ][ 'id' ][ Neural.synapses.shorthand( 'id' ) ] = false;
        synapses_idxs[ 'synapses' ][ 'type' ][ Neural.synapses.shorthand( 'type' ) ] = false;
        synapses_idxs[ 'synapses' ][ 'to' ][ Neural.synapses.shorthand( 'to' ) ] = false;
        synapses_idxs[ 'synapses' ][ 'from' ][ Neural.synapses.shorthand( 'from' ) ] = false;
        synapses_idxs[ 'synapses' ][ 'strength' ][ Neural.synapses.shorthand( 'strength' ) ] = false;

	console.log( 'Neural_synapses_install', synapses, synapses_idxs );

        InDB.trigger( 'InDB_do_stores_create', { 'stores': synapses, 'on_success': function( context ) {
                InDB.trigger( 'InDB_do_indexes_create', { 'indexes': synapses_idxs, 'on_complete': function( context2 ) {
                        console.log( 'synapses store loaded', context2 );
                } } );
        } } );


}

/* Single */

/* Get */
Neural.synapses.get = function ( key, index, on_success, on_error )  {
	InDB.trigger( 'InDB_do_row_get', { 'store': 'synapses', 'key': key, 'index': index, 'on_success': on_success, 'on_error': on_error } );
}

/* Remove */
Neural.synapses.remove = function ( key, index, on_success, on_error )  {
	InDB.trigger( 'InDB_do_row_delete', { 'store': 'synapses', 'key': key, 'index': index, 'on_success': on_success, 'on_error': on_error } );
}

/* Put */
Neural.synapses.put = function ( data, on_success, on_error )  {
	InDB.trigger( 'InDB_do_row_put', { 'store': 'synapses', 'data': Neural.synapses.shorthand_encode( data ), 'on_success': on_success, 'on_error': on_error } );
}

/* Add */
Neural.synapses.add = function ( data, on_success, on_error )  {
	InDB.trigger( 'InDB_do_row_add', { 'store': 'synapses', 'data': Neural.synapses.shorthand_encode( data ), 'on_success': on_success, 'on_error': on_error } );
}

/* Update */
Neural.synapses.update = function ( key, index, data, on_success, on_error )  {
	InDB.trigger( 'InDB_do_row_update', { 'store': 'synapses', 'key': key, 'index': index, 'data': data, 'on_success': on_success, 'on_error': on_error } );
}



/* Multi */

Neural.synapses.cursor = Neural.synapses.cursor || {};

/* Cursor Get */
Neural.synapses.cursor.get = function( key, index, on_success, on_error, begin, end, left_inclusive, right_inclusive ) {

        /* Action */

	var request = { "index": index, "key": key, "begin": begin, "end": end, "left_inclusive": left_inclusive, "right_inclusive": right_inclusive, "on_success": on_success, 'on_error': on_error };

	if( !!Neural.debug ) {
		console.log( 'Neural.synapses.cursor.get', request );
	}

        jQuery(document).trigger('cursor_put_synapses',request);

	/* Defaults */

	begin = ( 'undefined' !== typeof begin ) ? begin : null;
	end = ( 'undefined' !== typeof end ) ? end : null;
	left_inclusive = ( 'undefined' !== typeof left_inclusive ) ? left_inclusive : null;
	right_inclusive = ( 'undefined' !== typeof right_inclusive ) ? right_inclusive : null;
	key = ( 'undefined' !== typeof begin && 'undefined' !== typeof end ) ? key : null;

	/* Setup */

	var keyRange = InDB.range.get( key, begin, end, left_inclusive, right_inclusive );

	/* Callbacks */

	var cursor_on_success = function ( context ) {
		var item = Neural.synapses.shorthand_reverse( InDB.row.value( context.event ) );
		if( !!Neural.debug ) console.log( 'success', item );
		if( 'function' == typeof on_error ) {
			if( !!Neural.debug ) console.log( 'success', item );
			on_success( context );
		}
	};

	var cursor_on_error = function ( context ) {
		if( 'function' == typeof on_error ) {
			on_error( context );
		}
	};

	/* Request */

	InDB.trigger( 'InDB_do_cursor_get', { 'store': 'synapses', 'keyRange': keyRange, 'index': index, 'on_success': cursor_on_success, 'on_error': cursor_on_error } );

}

/* Cursor Delete */
Neural.synapses.cursor.delete = function( key, index, begin, end, on_success, on_error ) {

        /* Action */

        jQuery(document).trigger('cursor_delete_synapses', { "index": index, "key": key, "begin": begin, "end": end, "left_inclusive": left_inclusive, "right_inclusive": right_inclusive, "on_success": on_success, 'on_error': on_error } );

	/* Defaults */

	begin = ( 'undefined' !== typeof begin ) ? begin : null;
	end = ( 'undefined' !== typeof end ) ? end : null;
	left_inclusive = ( 'undefined' !== typeof left_inclusive ) ? left_inclusive : null;
	right_inclusive = ( 'undefined' !== typeof right_inclusive ) ? right_inclusive : null;
	key = ( 'undefined' !== typeof begin && 'undefined' !== typeof end ) ? key : null;

	/* Setup */

	var keyRange = InDB.range.get( key, begin, end, left_inclusive, right_inclusive );

	/* Callbacks */

	var cursor_on_success = function ( context ) {
		var item = Neural.synapses.shorthand_reverse( InDB.row.value( context.event ) );
		if( !!Neural.debug ) console.log( 'success', item );
		if( 'function' == typeof on_error ) {
			on_success( context );
		}
	};

	var cursor_on_error = function ( context ) {
		if( 'function' == typeof on_error ) {
			on_error( context );
		}
	};

	/* Request */

	InDB.trigger( 'InDB_do_cursor_delete', { 'store': 'synapses', 'keyRange': keyRange, 'index': index, 'on_success': cursor_on_success, 'on_error': cursor_on_error } );

};

/* Cursor Update */
Neural.synapses.cursor.update = function( key, index, data, on_success, on_error, begin, end, left_inclusive, right_inclusive, replace ) {

        /* Action */

        jQuery(document).trigger('cursor_put_synapses', { "index": index, "key": key, "begin": begin, "end": end, "left_inclusive": left_inclusive, "right_inclusive": right_inclusive, "replace": replace, "on_success": on_success, 'on_error': on_error } );

	/* Defaults */

	replace = ( true == replace ) ? true : false;
	begin = ( 'undefined' !== typeof begin ) ? begin : null;
	end = ( 'undefined' !== typeof end ) ? end : null;
	left_inclusive = ( 'undefined' !== typeof left_inclusive ) ? left_inclusive : null;
	right_inclusive = ( 'undefined' !== typeof right_inclusive ) ? right_inclusive : null;
	key = ( 'undefined' !== typeof begin && 'undefined' !== typeof end ) ? key : null;

	/* Setup */

	var keyRange = InDB.range.get( key, begin, end, left_inclusive, right_inclusive );

	/* Callbacks */

	var cursor_on_success = function ( context ) {
		var item = Neural.synapses.shorthand_reverse( InDB.row.value( context.event ) );
		if( !!Neural.debug ) console.log( 'success', item );
		if( 'function' == typeof on_error ) {
			on_success( context );
		}
	};

	var cursor_on_error = function ( context ) {
		if( 'function' == typeof on_error ) {
			on_error( context );
		}
	};

	/* Request */

	InDB.trigger( 'InDB_do_cursor_update', { 'store': 'synapses', 'data': data, 'keyRange': keyRange, 'index': index, 'replace': replace, 'on_success': cursor_on_success, 'on_error': cursor_on_error } );
	
}


Neural.synapses.shorthand = function ( key ) {
	if( 'undefined' !== typeof Neural.synapses.shorthand_map[ key ] ) {
		return Neural.synapses.shorthand_map[ key ];
	} else {
		return key;
	}
}


Neural.synapses.shorthand_reverse = function ( key ) {
	var k = key;
	var reversed = {};
	for( var item in Neural.synapses.shorthand_map ) {
		if( Neural.synapses.shorthand_map.hasOwnProperty( item ) ) {
			reversed[ Neural.synapses.shorthand_map[ item ] ] = item;
		}
	}
	if( 'undefined' !== typeof reversed[ k ] ) {
		return reversed[ k ];
	} else {
		return k;
	}
}

//recursive
Neural.synapses.shorthand_decode = function( object ) {
	var encoded = {};
	var total = 0;
	for( var itemobj in object ) {
		if( 'undefined' !== typeof itemobj && object.hasOwnProperty( itemobj ) ) {
			//recursive case: object value
			//base case: string value
			var value = object[ itemobj ];
			if( 'object' === typeof value ) {
				encoded[ Neural.synapses.shorthand_reverse( itemobj ) ] = Neural.synapses.shorthand_decode( value );
				delete value;
			} else { 
				encoded[ Neural.synapses.shorthand_reverse( itemobj ) ] = value;
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
Neural.synapses.shorthand_encode = function( object ) {
	var encoded = {};
	for( var item in object ) {
		if( object.hasOwnProperty( item ) ) {
			//recursive case: object value
			//base case: string value

			if( 'object' === typeof object[ item ] ) {
				encoded[ Neural.synapses.shorthand( item ) ] = Neural.synapses.shorthand_encode( object[ item ] );	
			} else { 
				encoded[ Neural.synapses.shorthand( item ) ] = object[ item ];
			}
		}
	}
	return encoded;
}

/* End Synapses InDB */

