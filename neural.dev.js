
/* Public.prototype.js
 * Basic MLP neural network.
 **/


var Neural = (function() {

	/* PRIVATE */

	/* Decorate a vanilla InDBApp */
	var Private = new InDBApp();
	
	/* PUBLIC */

	var Public = function ( request ) {

		var current_database = "Neural";
		var current_description = "A basic MLP network."

		if( 'undefined' !== typeof request ) {
			if( 'undefined' !== typeof request.database ) {
				current_database = request.database;
			}

			if( 'undefined' !== typeof request.description ) {
				current_description = request.description;
			}
		}

		Private = new InDBApp( { 'database': current_database, 'description': current_description } );
		Private.shorthand.set( { 'store': 'neurons', 'data': Public.prototype.neurons.shorthand_map } );
		Private.shorthand.set( { 'store': 'synapses', 'data': Public.prototype.synapses.shorthand_map } );

	};

	/* Namespaces */

	Public.prototype = {};
	Public.prototype.neuron = {};
	Public.prototype.neurons = {};
	Public.prototype.synapse = {};
	Public.prototype.synapses = {};
	Public.prototype.utilities = {};

	/* gets a hidden neuron */
	/* {
	 *	'
	 * } 
	 */
	Public.prototype.neurons.getHidden = function( request ) {

		/* Setup */

		var req = new Object();
		for( attr in request ) {
			req[ attr ] = request[ attr ];
		}

		var on_success = request.on_success;
		var on_error = request.on_error;
		
		req.expecting = request.expecting || {};
		req.type = hidden;

		req.on_success = function( value ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.neurons.getHidden success', value );
			}

			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.neurons.getHidden error', context );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.neurons.getHidden complete' );
			}
			if( 'function' == typeof on_complete ) {
				on_complete();
			}
		};

		Public.prototype.neurons.get( req );

		return this;

	};

	/* gets an output neuron */
	Public.prototype.neurons.getOutput = function( key, on_success, on_error ) {

		var on_success = request.on_success;
		var on_error = request.on_error;

		var req = new Object();
		for( attr in request ) {
			req[ attr ] = request[ attr ];
		}

		req.expecting = {
			'type': 'output'
		};

		req.on_success = function( value ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.neurons.getOutput success', value );
			}

			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.neurons.getOutput error', context );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.neurons.getOutput complete' );
			}
			if( 'function' == typeof on_complete ) {
				on_complete();
			}
		};

		Public.prototype.neurons.get( req );

		return this;

	};

	/* gets an input neuron */
	Public.prototype.neurons.getInput = function( key, on_success, on_error ) {

		var on_success = request.on_success;
		var on_error = request.on_error;

		var req = new Object();
		for( attr in request ) {
			req[ attr ] = request[ attr ];
		}

		req.expecting = {
			'type': 'input'
		};

		req.on_success = function( value ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.neurons.getInput success', value );
			}

			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.neurons.getInput error', context );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.neurons.getInput complete' );
			}
			if( 'function' == typeof on_complete ) {
				on_complete();
			}
		};

		Public.prototype.neurons.get( req );

		return this;

	};

	/* Primitives */

	/* Neuron */

	Public.prototype.neuron = Public.prototype.neuron || {};
	Public.prototype.neurons = Public.prototype.neurons || {};

	/* Create */

	/* Decorates Private.add */
	Public.prototype.neurons.add = function( request ) {
		
		var data = request.data;
		var on_complete = function() {
			if( 'function' == typeof request.on_complete ) {
				request.on_complete();
			}
		};
		delete request.on_complete;

		for( var x = 0; x < data.length; x++ ) {
			request.data = data[ x ];
			Private.add( request );
		}

		on_complete();

		return this;

	};

	/* Decorates Private.add */
	Public.prototype.neuron.add = function( request ) {
		
		/* Setup */

		request.store = 'neurons';

		Private.add( request );		

		return this;

	};

	/* Decorates Private.put */
	Public.prototype.neurons.put = function( request ) {
		
		var data = request.data;
		var on_complete = function() {
			if( 'function' == typeof request.on_complete ) {
				request.on_complete();
			}
		};
		delete request.on_complete;

		for( var x = 0; x < data.length; x++ ) {
			request.data = data[ x ];
			Private.put( request );
		}

		on_complete();

		return this;

	};

	/* Decorates Private.put */
	Public.prototype.neuron.put = function( request ) {
		
		/* Setup */

		request.store = 'neurons';

		Private.put( request );		

		return this;

	};

	
	/* Read */

	/* Decorates Private.cursor.get */
	Public.prototype.neurons.get = function( request ) {
		
		/* Setup */

		request.store = 'neurons';

		Private.cursor.get( request );		

		return this;

	};

	/* Decorates Private.get */
	Public.prototype.neuron.get = function( request ) {
		
		/* Setup */

		request.store = 'neurons';

		Private.get( request );		

		return this;

	};

	/* Update */

	/* Decorates Private.cursor.update */
	Public.prototype.neurons.update = function( request ) {
			
		/* Setup */

		request.store = 'neurons';

		Private.cursor.update( request );		

		return this;

	};

	/* Single Neuron */

	/* Decorates Private.update */
	Public.prototype.neuron.update = function( request ) {
		
		/* Setup */

		request.store = 'neurons';

		Private.update( request );		

		return this;

	};


	/* Delete */
	/* Decorates Private.cursor.delete */
	Public.prototype.neurons.delete = function( request ) {
			
		/* Setup */

		request.store = 'neurons';

		Private.cursor.delete( request );		

		return this;

	};

	/* Decorates Private.delete */
	Public.prototype.neuron.delete = function( request ) {
		
		/* Setup */

		request.store = 'neurons';

		Private.delete( request );		

		return this;

	};

	/* Synapse */

	Public.prototype.synapse = Public.prototype.synapse || {};
	Public.prototype.synapses = Public.prototype.synapses || {};
	/* Create */

	/* Decorates Private.add */
	Public.prototype.synapses.add = function( request ) {
		
		var data = request.data;
		var on_complete = function() {
			if( 'function' == typeof request.on_complete ) {
				request.on_complete();
			}
		};
		delete request.on_complete;

		for( var x = 0; x < data.length; x++ ) {
			request.data = data[ x ];
			Private.add( request );
		}

		on_complete();

		return this;

	};


	/* Decorates Private.add */
	/*
	 * Arguments:
	 *	request.to ( requred )
	 *	request.from ( required )
	 *	request.type ( required )
	 *	request.stength ( required )
	 *	request.on_success ( optional )
	 *	request.on_error ( optional )
	 *	request.* ( optional )
	 */
	Public.prototype.synapse.add = function( request ) {
		
		/* Setup */

		var req = {};

		var on_success = request.on_success;
		delete request.on_success;

		var on_error = request.on_error;
		delete request.on_error;

		req.data = request;

		req.store = 'synapses';

		Private.add( req );		

		return this;

	};


	/* Decorates Private.put */
	Public.prototype.synapses.put = function( request ) {
		
		var data = request.data;
		var on_complete = function() {
			if( 'function' == typeof request.on_complete ) {
				request.on_complete();
			}
		};
		delete request.on_complete;

		for( var x = 0; x < data.length; x++ ) {
			request.data = data[ x ];
			Private.put( request );
		}

		on_complete();

		return this;

	};


	/* Decorates Private.put */
	Public.prototype.synapse.put = function( request ) {
		
		/* Setup */

		request.store = 'synapses';

		Private.put( request );		

		return this;

	};

	
	/* Read */

	/* Decorates Private.cursor.get */
	Public.prototype.synapses.get = function( request ) {
		
		/* Setup */

		request.store = 'synapses';

		Private.cursor.get( request );		

		return this;

	};


	/* Decorates Private.get */
	Public.prototype.synapse.get = function( request ) {
		
		/* Setup */

		request.store = 'synapses';

		Private.get( request );		

		return this;

	};


	/* Update */


	/* Decorates Private.cursor.update */
	Public.prototype.synapses.update = function( request ) {
			
		/* Setup */

		request.store = 'synapses';

		Private.cursor.update( request );		

		return this;

	};

	
	/* Single Synapse */

	/* Decorates Private.update */
	Public.prototype.synapse.update = function( request ) {
		
		/* Setup */

		request.store = 'synapses';

		Private.update( request );		

		return this;

	};

	
	/* Delete */
	/* Decorates Private.cursor.delete */
	Public.prototype.synapses.delete = function( request ) {
			
		/* Setup */

		request.store = 'synapses';

		Private.cursor.delete( request );		

		return this;

	};


	/* Decorates Private.delete */
	Public.prototype.synapse.delete = function( request ) {
		
		/* Setup */

		request.store = 'synapses';

		Private.delete( request );		

		return this;

	};


	/* End Primitives */

	/* Conveniences */

	/* Single */

	/* Gets the strength of a synapse */
	/* Decorates Public.prototype.synapses.get */
	Public.prototype.synapse.getStrength = function( request ) {

		var key = request.key;
		var on_success = request.on_success;
		var on_error = request.on_error;

		var req = new Object();
		for( attr in request ) {
			req[ attr ] = request[ attr ];
		}

		req.on_success = function( value ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.synapses.setStrength success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.synapses.setStrength error', context );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};
	
		Public.prototype.synapse.get( req );

		return this;
		
	};


	/* Sets the strength of a synapse */	
	/* Decorates Public.prototype.synapse.update */
	Public.prototype.synapse.setStrength = function( request ) {

		var value = request.value;
		var on_success = request.on_success;
		var on_error = request.on_error;

		var req = new Object();
		for( attr in request ) {
			req[ attr ] = request[ attr ];
		}

		req.on_success = function( value ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.synapses.setStrength success', value );
			}

			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.synapses.setStrength error', context );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.data = { 'strength': value };

		Public.prototype.synapse.update( req );

		return this;

	};

	/* Multi */

	/* Gets the strength of a synapse */
	/* Decorates Public.prototype.synapses.get */
	Public.prototype.synapses.getStrength = function( request ) {

		var key = request.key;
		var on_success = request.on_success;
		var on_error = request.on_error;
		var on_complete = request.on_complete;

		var req = new Object();
		for( attr in request ) {
			req[ attr ] = request[ attr ];
		}

		req.on_success = function( value ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.synapses.setStrength success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.synapses.setStrength error', context );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.synapses.setStrength complete' );
			}
			if( 'function' == typeof on_complete ) {
				on_complete();
			}
		}
		
		Public.prototype.synapses.get( req );

		return this;
		
	};


	/* Sets the strength of a synapse */
	/* Decorates Public.prototype.synapses.update */
	Public.prototype.synapses.setStrength = function( request ) {

		var value = request.value;
		var on_success = request.on_success;
		var on_error = request.on_error;
		var on_complete = request.on_complete;

		var req = new Object();
		for( attr in request ) {
			req[ attr ] = request[ attr ];
		}

		req.on_success = function( value ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.synapses.setStrength success', value );
			}

			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.synapses.setStrength error', context );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.synapses.setStrength complete' );
			}
			if( 'function' == typeof on_complete ) {
				on_complete();
			}
		}
	
		req.data = { 'strength': value };

		Public.prototype.synapses.update( req );

		return this;

	};

	/* queries a network for active output neurons
	 * takes an input and weight matrix and returns a normalized score */
	Public.prototype.queryNetwork = function( weight_matrix, on_success, on_error ) {

		var success_callback = function( value ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.queryNetwork success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		var error_callback = function( context ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.queryNetwork error', value );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		return this;

	};

	/* builds an in memory representation of relevant 
	 * neurons and their connections of an MLP such
	 * that it can be queried */
	Public.prototype.buildNetwork = function( on_success, on_error ) {

		var success_callback = function( value ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.buildNetwork success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		var error_callback = function( context ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.buildNetwork error', value );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		return this;

	};

	/* */
	Public.prototype.buildWeightMatrix = function( on_success, on_error ) {

		var success_callback = function( value ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.buildWeightMatrix success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		var error_callback = function( context ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.buildWeightMatrix error', value );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		return this;


	};

	/* trains an MLP using the standard 'backpropigation' algo */
	Public.prototype.trainNetwork = function( on_success, on_error ) {

		var success_callback = function( value ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.trainNetwork success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		var error_callback = function( context ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.trainNetwork error', value );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		return this;

	};



	/* Database */

	/* Shorthand Map */

	Public.prototype.synapses.shorthand_map = {
		'id': 'i',
		'to': 't',
		'from': 'f',
		'strength': 's',
		'type': 'y',
		'votes': 'v',
		'payload': 'p'
	};

	Public.prototype.neurons.shorthand_map = {
		'id': 'i',
		'display': 'd',
		'display_alternatives': 'a',
		'type': 't',
		'slug': 's',
		'parents': 'p'
	};

	Public.prototype.neurons.install = function ( ) {

		var indexes = {
			'primary': {
				'key': 'id'
				, 'incrementing': true
				, 'unique': true
			}
			, 'display': false
			, 'id': false
			, 'type': false
			, 'slug': false
		};

		if( !!Neural.install ) {
			console.log( 'Neural_neurons_install', indexes );
		}

		Private.install( { 'store': 'neurons', 'indexes': indexes, 'on_success': function( context ) {
			console.log( 'Neural neurons installed', context );
		} } );

	}

	/* Synapses */
	Public.prototype.synapses.install = function ( ) {

		var indexes = {
			'primary': {
				'key': 'id'
				, 'incrementing': true
				, 'unique': true
			}
			, 'from': false
			, 'id': false
			, 'type': false
			, 'to': false
			, 'strength': false
		};

		console.log( 'Neural_synapses_install', indexes );

		Private.install( { 'store': 'synapses', 'indexes': indexes, 'on_success': function( context ) {
			console.log( 'Neural neurons installed', context );
		} } );

	}

	/* Shorthand */

	//global that stores the maps for various dbs
	var shorthand_maps = {};

	Public.prototype.shorthand = Public.prototype.shorthand || {};
	Public.prototype.shorthand.map = Public.prototype.shorthand.map || {};

	// Private object setter
	Public.prototype.shorthand.map.set = function( request ) {
		var on_error = request.on_error;
		var on_success = request.on_success;
		if( 'undefined' === shorthand_maps ) {
			if( 'function' === typeof on_error ) {
				on_error( new Error('Internal configuration error: no shorthand_maps' ) );
			}		
			return this;
		}
		if( 'undefined' == shorthand_maps[ request.network ] ) {
			shorthand_maps[ request.network ] = {};
		} 

		// Private object shorthand_maps
		shorthand_maps[ request.network ] = request.data;

		if( 'undefined' == typeof result ) {
			result = null;
		}
		if( 'function' === typeof on_success ) {
			on_success( result );
		}
		return this;
	};

	// Private object getter
	Public.prototype.shorthand.map.get = function( store ) {
		if( 'undefined' == shorthand_maps ) return null;
		var result = shorthand_maps[ store ]; 
		return ( 'undefined' == typeof result ) ? null : result;
	};

	Public.prototype.shorthand.get = function ( request ) {

		/* Setup */

		var shorthand_map = Public.prototype.shorthand.map.get( request.network );

		/* Debug */

		if( !!Public.prototype.debug ) {
			console.log("Public.prototype.shorthand.get map", shorthand_map);
		}

		/* Work */

		if( null !== shorthand_map && 'undefined' !== typeof shorthand_map && 'undefined' !== typeof shorthand_map[ request.key ] ) {
			return shorthand_map[ request.key ];
		} else {
			return request.key;
		}

	};


	Public.prototype.shorthand.reverse = function ( request ) {
		var k = request.key;
		var reversed = {};
		var shorthand_map = Public.prototype.shorthand.map.get( request.databaes );
		for( var item in shorthand_map ) {
			if( shorthand_map.hasOwnProperty( item ) ) {
				reversed[ Public.prototype.shorthand.get( item ) ] = item;
			}
		}
		if( 'undefined' !== typeof reversed[ k ] ) {
			return reversed[ k ];
		} else {
			return k;
		}
	};


//recursive
	Public.prototype.shorthand.decode = function( request ) {
		var encoded = {};
		var total = 0;
		var object = request.data;
		for( var itemobj in object ) {
			if( 'undefined' !== typeof itemobj && object.hasOwnProperty( itemobj ) ) {
				//recursive case: object value
				//base case: string value
				var value = object[ itemobj ];
				if( 'object' === typeof value ) {
					encoded[ Public.prototype.shorthand.reverse( { 'store': request.network, 'data': itemobj } ) ] = Public.prototype.shorthand.decode( { 'database': request.database, 'data': value } );
					delete value;
				} else { 
					encoded[ Public.prototype.shorthand.reverse( { 'store': request.network, 'data': itemobj } ) ] = value;
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
	Public.prototype.shorthand.encode = function( request ) {
		var encoded = {};
		var object = request.data;
		for( var item in object ) {
			if( object.hasOwnProperty( item ) ) {
				//recursive case: object value
				//base case: string value

				if( 'object' === typeof object[ item ] ) {
					encoded[ Public.prototype.shorthand.get( { 'store': request.network, 'key': item } ) ] = Public.prototype.shorthand.encode( { 'store': request.network, 'data': object[ item ] } );	
				} else { 
					encoded[ Public.prototype.shorthand.get( { 'store': request.network, 'key': item } ) ] = object[ item ];
				}
			}
		}
		return encoded;
	}


	/* Bridge methods */

	// Adds one or more neuron neurons to the network
	Public.prototype.neurons = Public.prototype.neurons || {};

	Public.prototype.neurons.add = function( request ) {
		var neurons = request.neurons || request.neuron;
		var nodes = [];

		var on_success = function( result ) {
			console.log( 'Public.prototype.neuron.add success', result );
			if( 'function' === typeof request.on_success ) {
				request.on_success( result );
			}
		};
		var on_error = function( context ) {
			console.log( 'Public.prototype.neuron.add error', context );
			if( 'function' === typeof request.on_error ) {
				request.on_error( result );
			}
		};
		var on_complete = function() {
			console.log( 'Public.prototype.neuron.add complete' );
			if( 'function' === typeof request.on_complete ) {
				request.on_complete();
			}
		};

		if( 'undefined' === typeof neurons.length ) {
			var next = {};
			if( 'undefined' === typeof neurons || 'undefined' === typeof neurons.data ) {
				on_error( new Error( 'neuron data cannot be empty' ) );
				return;
			}
			for( attr in neurons.data ) {
				next[ attr ] = neurons.data[ attr ];
			}
			nodes.push( next );
		} else {
			for( var x = 0; x < neurons.length; x++ ) {
				var neuron = neurons[ x ];
				var next = {};
				if( 'undefined' === typeof neuron || 'undefined' === typeof neuron.data ) {
					on_error( new Error( 'neuron data cannot be empty' ) );
					return;
				}
				for( attr in neuron.data ) {
					next[ attr ] = neuron.data[ attr ];
				}
				nodes.push( next );
			}
		}

		for( var x = 0; x < nodes.length; x++ ) {
			Public.prototype.neuron.add( { 'neurons': nodes[ x ], 'on_success': on_success, 'on_error': on_error } );
		}
		if( 'undefined' !== typeof on_complete ) {
			on_complete();
		}
		return this;
	};

	return Public;

} )();

