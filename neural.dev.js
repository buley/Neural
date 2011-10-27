
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

		Private = new Private( { 'database': current_database, 'description': current_description } );
		Private.shorthand.set( { 'store': 'neurons', 'data': Public.prototype.neurons.shorthand_map } );
		Private.shorthand.set( { 'store': 'synapses', 'data': Public.prototype.synapses.shorthand_map } );

	};

	/* Namespaces */

	Public.prototype = {};
	Public.prototype.neurons = {};
	Public.prototype.synapses = {};
	Public.prototype.utilities = {};

	/* Bridges */

	/* gets the strength of a synapse */
	/* arguments: 
	 * 	key (string) - required - unique numerical id for the synapse
	 * 	on_success (function) - optional - success callback
	 * 	on_error (function) - optional - error callback
	 */
	Public.prototype.synapses.getStrength = function( key, on_success, on_error ) {

		var success_callback = function( value ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.synapses.filterGet error', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		var error_callback = function( context ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.synapses.filterGet success', value );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		Public.prototype.filterGet( {
			'key': key
			, 'store': 'synapses'
			, 'index': 'id'
			, 'on_success': function( value ) {
				if( 'function' == typeof success_callback ) {
					var result = ( 'undefined' !== value && 'undefined' !== value.strength ) ? value.strength : null;
					success_callback( result );
				}
			}, 'on_error': function( context ) {
				if( 'function' == typeof error_callback ) {
					error_callback( context );
				}		
			}
		} );

		return this;

	};


	/* sets the strength of a synapse */
	Public.prototype.synapses.setStrength = function( key, value, expecting, on_success, on_error ) {

		var success_callback = function( value ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.synapses.setStrength success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		var error_callback = function( context ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.synapses.setStrength error', value );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		Public.prototype.filterUpdate( {
			'key': key
			, 'store': 'synapses'
			, 'index': 'id'
			, 'expecting': ( 'undefined' !== typeof expecting ) ? expecting : null
			, 'on_success': function( value ) {
				if( 'function' == typeof success_callback ) {
					success_callback( value );
				}
			}, 'on_error': function( context ) {
				if( 'function' == typeof error_callback ) {
					error_callback( context );
				}		
			}
		} );

		return this;

	};

	/* gets a hidden neuron */
	Public.prototype.neurons.getHidden = function( key, on_success, on_error ) {

		return this;

	};

	/* gets an output neuron */
	Public.prototype.neurons.getOutput = function( key, on_success, on_error ) {

		return this;

	};

	/* gets an input neuron */
	Public.prototype.neurons.getInput = function( key, on_success, on_error ) {

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

	/* Get Attributes */

	/* Strength */

	/* Decorates Private.cursor.filterGet */
	Public.prototype.neurons.filterGet = function( request ) {
		
		/* Setup */

		request.attributes = [ 'strength' ];

		Private.cursor.filterGet( request );		

		return this;

	};

	/* Decorates Private.filterGet */
	Public.prototype.neuron.filterGet = function( request ) {
		
		/* Setup */

		request.attributes = [ 'strength' ];

		Private.filterGet( request );		

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

	/* Decorates Private.cursor.update */
	Public.prototype.neurons.filterUpdate = function( request ) {
			
		/* Setup */

		request.store = 'neurons';

		Private.cursor.filterUpdate( request );		

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

	/* Decorates Private.filterUpdate */
	Public.prototype.neuron.filterUpdate = function( request ) {
		
		/* Setup */

		request.store = 'neurons';

		Private.filterUpdate( request );		

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
	Public.prototype.synapse.add = function( request ) {
		
		/* Setup */

		request.store = 'synapses';

		Private.add( request );		

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

	/* Get Attributes */

	/* Strength */

	/* Decorates Private.cursor.filterGet */
	Public.prototype.synapses.filterGet = function( request ) {
		
		/* Setup */

		request.attributes = [ 'strength' ];

		Private.cursor.filterGet( request );		

		return this;

	};

	/* Decorates Private.filterGet */
	Public.prototype.synapse.filterGet = function( request ) {
		
		/* Setup */

		request.attributes = [ 'strength' ];

		Private.filterGet( request );		

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

	/* Decorates Private.cursor.update */
	Public.prototype.synapses.filterUpdate = function( request ) {
		
		/* Setup */

		request.store = 'synapses';

		Private.cursor.filterUpdate( request );		

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

	/* Decorates Private.filterUpdate */
	Public.prototype.synapse.filterUpdate = function( request ) {
		
		/* Setup */

		request.store = 'synapses';

		Private.filterUpdate( request );		

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


	// Adds one or more synapse synapses to the network
	Public.prototype.synapses = Public.prototype.synapses || {};

	Public.prototype.synapses.add = function( request ) {
		var synapses = request.synapses || request.synapse;
		var nodes = [];

		var on_success = function( result ) {
			console.log( 'Public.prototype.synapses.add success', result );
			if( 'function' === typeof request.on_success ) {
				request.on_success( result );
			}
		};
		var on_error = function( context ) {
			console.log( 'Public.prototype.synapses.add error', context );
			if( 'function' === typeof request.on_error ) {
				request.on_error( result );
			}
		};
		var on_complete = function() {
			console.log( 'Public.prototype.synapses.add complete' );
			if( 'function' === typeof request.on_complete ) {
				request.on_complete();
			}
		};

		if( 'undefined' === typeof synapses.length ) {
			var next = {};
			if( 'undefined' === typeof synapses || 'undefined' === typeof synapses.data ) {
				on_error( new Error( 'synapses data cannot be empty' ) );
				return;
			}
			for( attr in synapses.data ) {
				next[ attr ] = synapses.data[ attr ];
			}
			nodes.push( next );
		} else {
			for( var x = 0; x < synapses.length; x++ ) {
				var synapse = synapses[ x ];
				var next = {};
				if( 'undefined' === typeof synapse || 'undefined' === typeof synapse.data ) {
					on_error( new Error( 'synapses data cannot be empty' ) );
					return;
				}
				for( attr in synapse.data ) {
					next[ attr ] = synapse.data[ attr ];
				}
				nodes.push( next );
			}
		}

		for( var x = 0; x < nodes.length; x++ ) {
			Public.prototype.synapse.add( { 'synapses': nodes[ x ], 'on_success': on_success, 'on_error': on_error } );
		}
		if( 'undefined' !== typeof on_complete ) {
			on_complete();
		}
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
			}, 'id': true,
			'display': true,
			'type': true,
			'slug': true
		};

		if( !!Neural.install ) {
			console.log( 'Neural_neurons_install', indexes );
		}

		Public.prototype.install( { 'store': 'neurons', 'indexes': indexes, 'on_success': function( context ) {
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
			}, 'id': true,
			'type': true,
			'to': true,
			'from': true,
			'strength': true
		};

		console.log( 'Neural_synapses_install', indexes );

		Public.prototype.install( { 'store': 'synapses', 'indexes': indexes, 'on_success': function( context ) {
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

