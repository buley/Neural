
/* Cursor Get */

Neural.synapses.cursor.get = function( key, key_name, data, on_success, on_error, begin, end, left_inclusive, right_inclusive ) {

        /* Action */

        jQuery(document).trigger('cursor_put_synapses', { "key_name": key_name, "key": key, "begin": begin, "end": end, "left_inclusive": left_inclusive, "right_inclusive": right_inclusive, "on_success": on_success, 'on_error': on_error } );

	/* Defaults */

	replace = ( true == replace ) ? true : false;
	begin = ( 'undefined' !== typeof begin ) ? begin : null;
	end = ( 'undefined' !== typeof end ) ? end : null;
	left_inclusive = ( 'undefined' !== typeof left_inclusive ) ? left_inclusive : null;
	right_inclusive = ( 'undefined' !== typeof right_inclusive ) ? right_inclusive : null;
	key = ( 'undefined' !== typeof begin && 'undefined' !== typeof end ) ? key : null;

	/* Setup */

	var keyRange = InDB.range.get( val, begin, end, left_inclusive, right_inclusive );

	/* Callbacks */

	var cursor_on_success = function ( context ) {
		var result = context_1.event.target.result;
		var item = result.value;
		console.log( 'synapses test', item, result );
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

	InDB.trigger( 'InDB_do_cursor_get', { 'store': 'synapses', 'keyRange': InDB.range.only( key ), 'index': key_name, 'on_success': cursor_on_success, 'on_error': cursor_on_error } );

}

/* Cursor Delete */
Neural.synapses.cursor.delete = function( key, key_name, begin, end, on_success, on_error ) {

        /* Action */

        jQuery(document).trigger('cursor_delete_synapses', { "key_name": key_name, "key": key, "begin": begin, "end": end, "left_inclusive": left_inclusive, "right_inclusive": right_inclusive, "on_success": on_success, 'on_error': on_error } );

	/* Defaults */

	replace = ( true == replace ) ? true : false;
	begin = ( 'undefined' !== typeof begin ) ? begin : null;
	end = ( 'undefined' !== typeof end ) ? end : null;
	left_inclusive = ( 'undefined' !== typeof left_inclusive ) ? left_inclusive : null;
	right_inclusive = ( 'undefined' !== typeof right_inclusive ) ? right_inclusive : null;
	key = ( 'undefined' !== typeof begin && 'undefined' !== typeof end ) ? key : null;

	/* Setup */

	var keyRange = InDB.range.get( val, begin, end, left_inclusive, right_inclusive );

	/* Callbacks */

	var cursor_on_success = function ( context ) {
		var result = context_1.event.target.result;
		var item = result.value;
		console.log( 'synapses test', item, result );
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

	InDB.trigger( 'InDB_do_cursor_delete', { 'store': 'synapses', 'keyRange': InDB.range.only( key ), 'index': key_name, 'on_success': cursor_on_success, 'on_error': cursor_on_error } );

/* Cursor Update */
Neural.synapses.cursor.update = function( key, key_name, data, on_success, on_error, begin, end, left_inclusive, right_inclusive ) {

        /* Action */

        jQuery(document).trigger('cursor_put_synapses', { "key_name": key_name, "key": key, "begin": begin, "end": end, "left_inclusive": left_inclusive, "right_inclusive": right_inclusive, "on_success": on_success, 'on_error': on_error } );

	/* Defaults */

	replace = ( true == replace ) ? true : false;
	begin = ( 'undefined' !== typeof begin ) ? begin : null;
	end = ( 'undefined' !== typeof end ) ? end : null;
	left_inclusive = ( 'undefined' !== typeof left_inclusive ) ? left_inclusive : null;
	right_inclusive = ( 'undefined' !== typeof right_inclusive ) ? right_inclusive : null;
	key = ( 'undefined' !== typeof begin && 'undefined' !== typeof end ) ? key : null;

	/* Setup */

	var keyRange = InDB.range.get( val, begin, end, left_inclusive, right_inclusive );

	/* Callbacks */

	var cursor_on_success = function ( context ) {
		var result = context_1.event.target.result;
		var item = result.value;
		console.log( 'synapses test', item, result );
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

	InDB.trigger( 'InDB_do_cursor_update', { 'store': 'synapses', 'data': data, 'keyRange': InDB.range.only( key ), 'index': key_name, 'replace': replace,'on_success': cursor_on_success, 'on_error': cursor_on_error } );
	
}


