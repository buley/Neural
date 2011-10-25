
/* N.prototype.js
 * Basic MLP neural network.
 **/


var Neural = (function() {

	var N.prototype;
	var current_database = "Neural";
	var current_description = "A basic MLP network."

	function N( request ) {

		if( 'undefined' !== typeof request ) {
			if( 'undefined' !== typeof request.database ) {
				current_database = request.database;
			}

			if( 'undefined' !== typeof request.description ) {
				current_description = request.description;
			}
		}

		var InDBApp = new InDBApp( { 'database': current_database, 'description': current_description } );

		InDBApp.shorthand.set( { 'store': 'neurons', 'data': N.prototype.neurons.shorthand_map } );
		InDBApp.shorthand.set( { 'store': 'synapses', 'data': N.prototype.synapses.shorthand_map } );

	}


	var InDB;

	/* Begin InDBApp singleton */

	var InDBApp = function( request ) {
	
		if( 'undefined' !== typeof request ) {
			if( 'undefined' !== typeof request.database ) {
				current_database = request.database;
			}

			if( 'undefined' !== typeof request.description ) {
				current_description = request.description;
			}
		}

		InDB = new IDB( { 'database': current_database, 'description': current_description } );
		
	};

	/* Not chainable */
	InDBApp.prototype.shorthand = InDBAppl.prototype.shorthand || {};
	InDBApp.prototype.shorthand.set = function( request ) {
		return InDB.shorthand.set( request );
	};
	InDBApp.prototype.shorthand.get = function( request ) {
		return InDB.shorthand.get( request );
	};

	InDBApp.prototype.cursor = InDBAppl.prototype.cursor || {};
	InDBApp.prototype.cursor.get = function( request ) {

		/* Setup */

		var store = request.store;
		if( 'undefined' === typeof store ) {
			throw new Error( 'InDBApp.prototype.cursor.get: Store must not be empty' );
		}

		/* Defaults */

		var index = request.key;
		index = ( 'undefined' !== typeof index ) ? index : null;
		var limit = request.limit;
		limit = ( 'undefined' !== typeof limit ) ? limit : 20;
		var direction = request.limit;
		direction = ( 'undefined' !== typeof direction ) ? direction : InDB.cursor.direction.previous();
		var key = request.key;
		key = ( 'undefined' !== typeof key ) ? key : null;
		var left = request.left;
		left = ( 'undefined' !== typeof left ) ? left : 0;
		var right = request.right;
		right = ( 'undefined' !== typeof right ) ? right : null;
		var left_inclusive = request.left_inclusive;
		left_inclusive = ( 'undefined' !== typeof left_inclusive ) ? left_inclusive : true;
		var right_inclusive = request.right_inclusive;
		right_inclusive = ( 'undefined' !== typeof right_inclusive ) ? right_inclusive : null;

		/* Callbacks */

		var on_complete = function() {
			/* Debug */
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.synapses.get complete' );
			}
			/* Callback */
			if( 'function' == typeof on_complete ) {
				request.on_complete();
			}
		};

		var on_success = function( value ) {
			/* Debug */
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.synapses.get success', value );
			}
			/* Callback */
			if( 'function' == typeof on_success ) {
				request.on_success( value );
			}
		};

		var on_error = function( context ) {
			/* Debug */
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.synapses.get error', context );
			}
			/* Callback */
			if( 'function' == typeof on_error ) {
				request.on_error( context );
			}
		};

		/* Request */

		InDB.cursor.get( {
			'direction': direction
			, 'key': key
			, 'index': index
			, 'left': left
			, 'left_inclusive': left_inclusive
			, 'limit': limit
			, 'on_success': on_success
			, 'on_complete': on_complete
			, 'on_error': on_error
			, 'right': right
			, 'right_inclusive': right_inclusive
			, 'store': store
		} );

		return this;

	};

	InDBApp.prototype.cursor = InDBAppl.prototype.cursor || {};
	InDBApp.prototype.cursor.getAttr = function( request ) {

		/* Setup */

		var store = request.store;
		if( 'undefined' === typeof store ) {
			throw new Error( 'InDBApp.prototype.cursor.get: Store must not be empty' );
		}

		/* Defaults */
		var expecting = request.expecting;
		expecting = ( 'undefined' !== typeof expecting ) ? expecting : null;
		var attributes = request.attributes || request.attribute;
		attributes = ( 'undefined' !== typeof attributes ) ? attributes : null;
		var index = request.index;
		index = ( 'undefined' !== typeof index ) ? index : null;
		var limit = request.limit;
		limit = ( 'undefined' !== typeof limit ) ? limit : 20;
		var direction = request.limit;
		direction = ( 'undefined' !== typeof direction ) ? direction : InDB.cursor.direction.previous();
		var key = request.key;
		key = ( 'undefined' !== typeof key ) ? key : null;
		var left = request.left;
		left = ( 'undefined' !== typeof left ) ? left : 0;
		var right = request.right;
		right = ( 'undefined' !== typeof right ) ? right : null;
		var left_inclusive = request.left_inclusive;
		left_inclusive = ( 'undefined' !== typeof left_inclusive ) ? left_inclusive : true;
		var right_inclusive = request.right_inclusive;
		right_inclusive = ( 'undefined' !== typeof right_inclusive ) ? right_inclusive : null;

		/* Callbacks */

		var on_complete = function() {
			/* Debug */
			if( !!N.prototype.debug ) {
				console.log( 'InDBApp.prototype.cursor.getAttr complete' );
			}
			/* Callback */
			if( 'function' == typeof on_complete ) {
				request.on_complete();
			}
		};

		var on_success = function( value ) {
			/* Debug */
			if( !!N.prototype.debug ) {
				console.log( 'InDBApp.prototype.cursor.getAttr success', value );
			}
			/* Callback */
			if( 'function' == typeof on_success ) {
				request.on_success( value );
			}
		};

		var on_error = function( context ) {
			/* Debug */
			if( !!N.prototype.debug ) {
				console.log( 'InDBApp.prototype.cursor.getAttr error', context );
			}
			/* Callback */
			if( 'function' == typeof on_error ) {
				request.on_error( context );
			}
		};

		/* Request */

		InDB.cursor.getAttr( {
			'attributes': attributes
			, 'direction': direction
			, 'key': key
			, 'expecting': expecting
			, 'index': index
			, 'left': left
			, 'left_inclusive': left_inclusive
			, 'limit': limit
			, 'on_success': on_success
			, 'on_complete': on_complete
			, 'on_error': on_error
			, 'right': right
			, 'right_inclusive': right_inclusive
			, 'store': store
		} );

		return this;

	};


	InDBApp.prototype.get = function( request ) {
	
		/* Setup */

		var store = request.store;
		if( 'undefined' == typeof store || null === store ) {
			throw new Error( 'InDBApp.prototype.get: Store cannot be empty' );
			return null;
		}

		/* Defaults */

		var index = request.key;
		index = ( 'undefined' !== typeof index ) ? index : null;
		var key = request.key;
		key = ( 'undefined' !== typeof key ) ? key : null;
	
		/* Callbacks */

		var on_success = function( value ) {
			/* Debug */
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.synapses.get success', value );
			}
			/* Callback */
			if( 'function' == typeof on_success ) {
				request.on_success( value );
			}
		};

		var on_error = function( context ) {
			/* Debug */
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.synapses.get error', context );
			}
			/* Callback */
			if( 'function' == typeof on_error ) {
				request.on_error( context );
			}
		};

		/* Request */

		InDB.get( {
			'index': index
			, 'key': key
			, 'on_success': on_success
			, 'on_error': on_error
			, 'store': store
		} );

		return this;

	};


	InDBApp.prototype.getAttr = function( request ) {

		/* Setup */

		var store = request.store;
		if( 'undefined' == typeof store || null === store ) {
			throw new Error( 'InDBApp.prototype.get: Store cannot be empty' );
			return null;
		}

		/* Defaults */

		var index = request.key;
		index = ( 'undefined' !== typeof index ) ? index : null;
		var key = request.key;
		key = ( 'undefined' !== typeof key ) ? key : null;
		var expecting = request.expecting;
		expecting = ( 'undefined' !== typeof expecting ) ? expecting : null;
		var attributes = request.attributes;
		attributes = ( 'undefined' !== typeof attributes ) ? attributes: null;
	
		/* Callbacks */

		var on_success = function( value ) {
			/* Debug */
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.synapses.get success', value );
			}
			/* Callback */
			if( 'function' == typeof on_success ) {
				request.on_success( value );
			}
		};

		var on_error = function( context ) {
			/* Debug */
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.synapses.get error', context );
			}
			/* Callback */
			if( 'function' == typeof on_error ) {
				request.on_error( context );
			}
		};

		/* Request */

		InDB.getAttr( {
			'attributes': attributes
			, 'expecting': expecting
			, 'index': index
			, 'key': key
			, 'on_success': on_success
			, 'on_error': on_error
			, 'store': store
		} );

		return this;

	};
	
	InDBApp.prototype.cursor = InDBAppl.prototype.cursor || {};
	InDBApp.prototype.cursor.update = function( request ) {

		/* Setup */

		var store = request.store;
		if( 'undefined' === typeof store ) {
			throw new Error( 'InDBApp.prototype.cursor.get: Store must not be empty' );
		}

		/* Defaults */

		var index = request.key;
		index = ( 'undefined' !== typeof index ) ? index : null;
		var limit = request.limit;
		limit = ( 'undefined' !== typeof limit ) ? limit : 20;
		var direction = request.limit;
		direction = ( 'undefined' !== typeof direction ) ? direction : InDB.cursor.direction.previous();
		var key = request.key;
		key = ( 'undefined' !== typeof key ) ? key : null;
		var left = request.left;
		left = ( 'undefined' !== typeof left ) ? left : 0;
		var right = request.right;
		right = ( 'undefined' !== typeof right ) ? right : null;
		var left_inclusive = request.left_inclusive;
		left_inclusive = ( 'undefined' !== typeof left_inclusive ) ? left_inclusive : true;
		var right_inclusive = request.right_inclusive;
		right_inclusive = ( 'undefined' !== typeof right_inclusive ) ? right_inclusive : null;

		/* Callbacks */

		var on_complete = function() {
			/* Debug */
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.synapses.get complete' );
			}
			/* Callback */
			if( 'function' == typeof on_complete ) {
				request.on_complete();
			}
		};

		var on_success = function( value ) {
			/* Debug */
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.synapses.get success', value );
			}
			/* Callback */
			if( 'function' == typeof on_success ) {
				request.on_success( value );
			}
		};

		var on_error = function( context ) {
			/* Debug */
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.synapses.get error', context );
			}
			/* Callback */
			if( 'function' == typeof on_error ) {
				request.on_error( context );
			}
		};

		/* Request */

		InDB.cursor.update( {
			'left': begin
			, 'direction': direction
			, 'key': key
			, 'index': index
			, 'left': left
			, 'left_inclusive': left_inclusive
			, 'limit': limit
			, 'on_success': on_success
			, 'on_complete': on_complete
			, 'on_error': on_error
			, 'right': right
			, 'right_inclusive': right_inclusive
			, 'store': store
		} );

		return this;

	};

	InDBApp.prototype.update = function( key, on_success, on_error ) {
	
		/* Setup */

		var store = request.store;
		if( 'undefined' == typeof store || null === store ) {
			throw new Error( 'InDBApp.prototype.get: Store cannot be empty' );
			return null;
		}

		/* Defaults */

		var index = request.key;
		index = ( 'undefined' !== typeof index ) ? index : null;
		var key = request.key;
		key = ( 'undefined' !== typeof key ) ? key : null;
	
		/* Callbacks */

		var on_success = function( value ) {
			/* Debug */
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.synapses.get success', value );
			}
			/* Callback */
			if( 'function' == typeof on_success ) {
				request.on_success( value );
			}
		};

		var on_error = function( context ) {
			/* Debug */
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.synapses.get error', context );
			}
			/* Callback */
			if( 'function' == typeof on_error ) {
				request.on_error( context );
			}
		};

		/* Request */

		InDB.update( {
			'index': index
			, 'key': key
			, 'on_success': on_success
			, 'on_error': on_error
			, 'store': store
		} );

		return this;

	};
	
	InDBApp.prototype.cursor = InDBAppl.prototype.cursor || {};
	InDBApp.prototype.cursor.filterUpdate = function( request ) {

		/* Setup */

		var store = request.store;
		if( 'undefined' === typeof store ) {
			throw new Error( 'InDBApp.prototype.cursor.get: Store must not be empty' );
		}

		/* Defaults */

		var expecting = request.expecting;
		expecting = ( 'undefined' !== typeof expecting ) ? expecting : null;
		var attributes = request.attributes || request.attribute;
		attributes = ( 'undefined' !== typeof attributes ) ? attributes : null;
		var index = request.key;
		index = ( 'undefined' !== typeof index ) ? index : null;
		var limit = request.limit;
		limit = ( 'undefined' !== typeof limit ) ? limit : 20;
		var direction = request.limit;
		direction = ( 'undefined' !== typeof direction ) ? direction : InDB.cursor.direction.previous();
		var key = request.key;
		key = ( 'undefined' !== typeof key ) ? key : null;
		var left = request.left;
		left = ( 'undefined' !== typeof left ) ? left : 0;
		var right = request.right;
		right = ( 'undefined' !== typeof right ) ? right : null;
		var left_inclusive = request.left_inclusive;
		left_inclusive = ( 'undefined' !== typeof left_inclusive ) ? left_inclusive : true;
		var right_inclusive = request.right_inclusive;
		right_inclusive = ( 'undefined' !== typeof right_inclusive ) ? right_inclusive : null;

		/* Callbacks */

		var on_complete = function() {
			/* Debug */
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.synapses.get complete' );
			}
			/* Callback */
			if( 'function' == typeof on_complete ) {
				request.on_complete();
			}
		};

		var on_success = function( value ) {
			/* Debug */
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.synapses.get success', value );
			}
			/* Callback */
			if( 'function' == typeof on_success ) {
				request.on_success( value );
			}
		};

		var on_error = function( context ) {
			/* Debug */
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.synapses.get error', context );
			}
			/* Callback */
			if( 'function' == typeof on_error ) {
				request.on_error( context );
			}
		};

		/* Request */

		InDB.cursor.filterUpdate( {
			'attributes': attributes
			, 'direction': direction
			, 'expecting': expecting
			, 'key': key
			, 'index': index
			, 'left': left
			, 'left_inclusive': left_inclusive
			, 'limit': limit
			, 'on_success': on_success
			, 'on_complete': on_complete
			, 'on_error': on_error
			, 'right': right
			, 'right_inclusive': right_inclusive
			, 'store': store
		} );

		return this;

	};

	InDBApp.prototype.filterUpdate = function( key, on_success, on_error ) {
	
		/* Setup */

		var store = request.store;
		if( 'undefined' == typeof store || null === store ) {
			throw new Error( 'InDBApp.prototype.get: Store cannot be empty' );
			return null;
		}

		/* Defaults */

		var index = request.key;
		index = ( 'undefined' !== typeof index ) ? index : null;
		var key = request.key;
		key = ( 'undefined' !== typeof key ) ? key : null;	
		var expecting = request.expecting;
		expecting = ( 'undefined' !== typeof expecting ) ? expecting : null;
		var attributes = request.attributes || request.attribute;
		attributes = ( 'undefined' !== typeof attributes ) ? attributes : null;

		/* Callbacks */

		var on_success = function( value ) {
			/* Debug */
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.synapses.get success', value );
			}
			/* Callback */
			if( 'function' == typeof on_success ) {
				request.on_success( value );
			}
		};

		var on_error = function( context ) {
			/* Debug */
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.synapses.get error', context );
			}
			/* Callback */
			if( 'function' == typeof on_error ) {
				request.on_error( context );
			}
		};

		/* Request */

		InDB.filterUpdate( {
			'index': index
			, 'key': key
			, 'attributes': attributes
			, 'on_success': on_success
			, 'on_error': on_error
			, 'store': store
		} );

		return this;

	};

	/* End InDBApp Singleton */

	N.prototype.neurons = {};
	N.prototype.synapses = {};
	N.prototype.utilities = {};

	/* Bridges */

	/* gets the strength of a synapse */
	/* arguments: 
	 * 	key (string) - required - unique numerical id for the synapse
	 * 	on_success (function) - optional - success callback
	 * 	on_error (function) - optional - error callback
	 */
	N.prototype.synapses.getStrength = function( key, on_success, on_error ) {

		var success_callback = function( value ) {
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.synapses.getStrength error', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		var error_callback = function( context ) {
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.synapses.getStrength success', value );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		N.prototype.getAttr( {
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
	N.prototype.synapses.setStrength = function( key, value, expecting, on_success, on_error ) {

		var success_callback = function( value ) {
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.synapses.setStrength success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		var error_callback = function( context ) {
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.synapses.setStrength error', value );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		N.prototype.setAttr( {
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
	N.prototype.neurons.getHidden = function( key, on_success, on_error ) {

		return this;

	};

	/* gets an output neuron */
	N.prototype.neurons.getOutput = function( key, on_success, on_error ) {

		return this;

	};

	/* gets an input neuron */
	N.prototype.neurons.getInput = function( key, on_success, on_error ) {

		return this;

	};

	/* Primitives */

	/* Synapse */

	/* Create */

	/* Adapts InDBApp.add */
	N.prototype.synapses.add = function( request ) {
		
		var data = request.data;
		var on_complete = function() {
			if( 'function' == typeof request.on_complete ) {
				request.on_complete();
			}
		};
		delete request.on_complete;

		for( var x = 0; x < data.length; x++ ) {
			request.data = data[ x ];
			InDBApp.add( request );
		}

		on_complete();

		return this;

	};

	/* decorates InDBApp.add */
	N.prototype.synapse.add = function( request ) {
		
		/* Setup */

		var request.store = 'synapses';

		InDBApp.add( request );		

		return this;

	};

	/* Adapts InDBApp.put */
	N.prototype.synapses.put = function( request ) {
		
		var data = request.data;
		var on_complete = function() {
			if( 'function' == typeof request.on_complete ) {
				request.on_complete();
			}
		};
		delete request.on_complete;

		for( var x = 0; x < data.length; x++ ) {
			request.data = data[ x ];
			InDBApp.put( request );
		}

		on_complete();

		return this;

	};

	/* decorates InDBApp.put */
	N.prototype.synapse.put = function( request ) {
		
		/* Setup */

		var request.store = 'synapses';

		InDBApp.put( request );		

		return this;

	};

	
	/* Read */

	/* decorates InDBApp.cursor.get */
	N.prototype.synapses.get = function( request ) {
		
		/* Setup */

		var request.store = 'synapses';

		InDBApp.cursor.get( request );		

		return this;

	};

	/* decorates InDBApp.get */
	N.prototype.synapse.get = function( request ) {
		
		/* Setup */

		var request.store = 'synapses';

		InDBApp.get( request );		

		return this;

	};

	/* Get Attributes */

	/* Strength */

	/* decorates InDBApp.cursor.filterGet */
	N.prototype.synapses.getStrength = function( request ) {
		
		/* Setup */

		var request.attributes = [ 'strength' ];

		InDBApp.cursor.filterGet( request );		

		return this;

	};

	/* decorates InDBApp.filterGet */
	N.prototype.synapse.getStrength = function( request ) {
		
		/* Setup */

		var request.attributes = [ 'strength' ];

		InDBApp.filterGet( request );		

		return this;

	};


	/* Update */

	/* Adapts InDBApp.cursor.update */
	N.prototype.synapses.update = function( request ) {
			
		/* Setup */

		var request.store = 'synapses';

		InDBApp.cursor.update( request );		

		return this;

	};

	/* Adapts InDBApp.cursor.update */
	N.prototype.synapses.filterUpdate = function( request ) {
			
		/* Setup */

		var request.store = 'synapses';

		InDBApp.cursor.filterUpdate( request );		

		return this;

	};

	/* Single Synapse */

	/* Decorates InDBApp.update */
	N.prototype.synapse.update = function( request ) {
		
		/* Setup */

		var request.store = 'synapses';

		InDBApp.update( request );		

		return this;

	};

	/* Decorates InDBApp.filterUpdate */
	N.prototype.synapse.filterUpdate = function( request ) {
		
		/* Setup */

		var request.store = 'synapses';

		InDBApp.filterUpdate( request );		

		return this;

	};



	/* Delete */
	/* Adapts InDBApp.cursor.delete */
	N.prototype.synapses.delete = function( request ) {
			
		/* Setup */

		var request.store = 'synapses';

		InDBApp.cursor.delete( request );		

		return this;

	};

	/* decorates InDBApp.delete */
	N.prototype.synapse.delete = function( request ) {
		
		/* Setup */

		var request.store = 'synapses';

		InDBApp.delete( request );		

		return this;

	};

	/* End Primitives */



	// Adds one or more neuron synapses to the network
	N.prototype.synapses = N.prototype.synapses || {};

	N.prototype.synapses.add = function( request ) {
		var synapses = request.neurons || request.neuron;
		var nodes = [];

		var on_success = function( result ) {
			console.log( 'N.prototype.neuron.add success', result );
			if( 'function' === typeof request.on_success ) {
				request.on_success( result );
			}
		};
		var on_error = function( context ) {
			console.log( 'N.prototype.neuron.add error', context );
			if( 'function' === typeof request.on_error ) {
				request.on_error( result );
			}
		};
		var on_complete = function() {
			console.log( 'N.prototype.neuron.add complete' );
			if( 'function' === typeof request.on_complete ) {
				request.on_complete();
			}
		};

		if( 'undefined' === typeof synapses.length ) {
			var next = {};
			if( 'undefined' === typeof synapses || 'undefined' === typeof synapses.data ) {
				on_error( new Error( 'neuron data cannot be empty' ) );
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
					on_error( new Error( 'neuron data cannot be empty' ) );
					return;
				}
				for( attr in synapse.data ) {
					next[ attr ] = synapse.data[ attr ];
				}
				nodes.push( next );
			}
		}

		for( var x = 0; x < nodes.length; x++ ) {
			N.prototype.synapse.add( { 'synapses': nodes[ x ], 'on_success': on_success, 'on_error': on_error } );
		}
		if( 'undefined' !== typeof on_complete ) {
			on_complete();
		}
		return this;
	};




	/* queries a network for active output neurons
	 * takes an input and weight matrix and returns a normalized score */
	N.prototype.queryNetwork = function( weight_matrix, on_success, on_error ) {

		var success_callback = function( value ) {
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.queryNetwork success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		var error_callback = function( context ) {
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.queryNetwork error', value );
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
	N.prototype.buildNetwork = function( on_success, on_error ) {

		var success_callback = function( value ) {
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.buildNetwork success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		var error_callback = function( context ) {
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.buildNetwork error', value );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		return this;


	};

	/* */
	N.prototype.buildWeightMatrix = function( on_success, on_error ) {

		var success_callback = function( value ) {
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.buildWeightMatrix success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		var error_callback = function( context ) {
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.buildWeightMatrix error', value );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		return this;


	};

	/* trains an MLP using the standard 'backpropigation' algo */
	N.prototype.trainNetwork = function( on_success, on_error ) {

		var success_callback = function( value ) {
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.trainNetwork success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		var error_callback = function( context ) {
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.trainNetwork error', value );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		return this;

	};



	/* Database */

	/* Shorthand Map */

	N.prototype.synapses.shorthand_map = {
		'id': 'i',
		'to': 't',
		'from': 'f',
		'strength': 's',
		'type': 'y',
		'votes': 'v',
		'payload': 'p'
	};

	N.prototype.neurons.shorthand_map = {
		'id': 'i',
		'display': 'd',
		'display_alternatives': 'a',
		'type': 't',
		'slug': 's',
		'parents': 'p'
	};

	N.prototype.neurons.install = function ( ) {

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

		N.prototype.install( { 'store': 'neurons', 'indexes': indexes, 'on_success': function( context ) {
			console.log( 'Neural neurons installed', context );
		} } );

	}

	/* Synapses */
	N.prototype.synapses.install = function ( ) {

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

		N.prototype.install( { 'store': 'synapses', 'indexes': indexes, 'on_success': function( context ) {
			console.log( 'Neural neurons installed', context );
		} } );

	}

	/* Shorthand */

	//global that stores the maps for various dbs
	var shorthand_maps = {};

	N.prototype.shorthand.map = N.prototype.shorthand.map || {};

	// Private object setter
	N.prototype.shorthand.map.set = function( request ) {
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
	N.prototype.shorthand.map.get = function( store ) {
		if( 'undefined' == shorthand_maps ) return null;
		var result = shorthand_maps[ store ]; 
		return ( 'undefined' == typeof result ) ? null : result;
	};

	N.prototype.shorthand.get = function ( request ) {

		/* Setup */

		var shorthand_map = N.prototype.shorthand.map.get( request.network );

		/* Debug */

		if( !!N.prototype.debug ) {
			console.log("N.prototype.shorthand.get map", shorthand_map);
		}

		/* Work */

		if( null !== shorthand_map && 'undefined' !== typeof shorthand_map && 'undefined' !== typeof shorthand_map[ request.key ] ) {
			return shorthand_map[ request.key ];
		} else {
			return request.key;
		}

	};


	N.prototype.shorthand.reverse = function ( request ) {
		var k = request.key;
		var reversed = {};
		var shorthand_map = N.prototype.shorthand.map.get( request.databaes );
		for( var item in shorthand_map ) {
			if( shorthand_map.hasOwnProperty( item ) ) {
				reversed[ N.prototype.shorthand.get( item ) ] = item;
			}
		}
		if( 'undefined' !== typeof reversed[ k ] ) {
			return reversed[ k ];
		} else {
			return k;
		}
	};


//recursive
	N.prototype.shorthand.decode = function( request ) {
		var encoded = {};
		var total = 0;
		var object = request.data;
		for( var itemobj in object ) {
			if( 'undefined' !== typeof itemobj && object.hasOwnProperty( itemobj ) ) {
				//recursive case: object value
				//base case: string value
				var value = object[ itemobj ];
				if( 'object' === typeof value ) {
					encoded[ N.prototype.shorthand.reverse( { 'store': request.network, 'data': itemobj } ) ] = N.prototype.shorthand.decode( { 'database': request.database, 'data': value } );
					delete value;
				} else { 
					encoded[ N.prototype.shorthand.reverse( { 'store': request.network, 'data': itemobj } ) ] = value;
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
	N.prototype.shorthand.encode = function( request ) {
		var encoded = {};
		var object = request.data;
		for( var item in object ) {
			if( object.hasOwnProperty( item ) ) {
				//recursive case: object value
				//base case: string value

				if( 'object' === typeof object[ item ] ) {
					encoded[ N.prototype.shorthand.get( { 'store': request.network, 'key': item } ) ] = N.prototype.shorthand.encode( { 'store': request.network, 'data': object[ item ] } );	
				} else { 
					encoded[ N.prototype.shorthand.get( { 'store': request.network, 'key': item } ) ] = object[ item ];
				}
			}
		}
		return encoded;
	}


	/* Bridge methods */

	// Adds one or more neuron neurons to the network
	N.prototype.neurons = N.prototype.neurons || {};

	N.prototype.neurons.add = function( request ) {
		var neurons = request.neurons || request.neuron;
		var nodes = [];

		var on_success = function( result ) {
			console.log( 'N.prototype.neuron.add success', result );
			if( 'function' === typeof request.on_success ) {
				request.on_success( result );
			}
		};
		var on_error = function( context ) {
			console.log( 'N.prototype.neuron.add error', context );
			if( 'function' === typeof request.on_error ) {
				request.on_error( result );
			}
		};
		var on_complete = function() {
			console.log( 'N.prototype.neuron.add complete' );
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
			N.prototype.neuron.add( { 'neurons': nodes[ x ], 'on_success': on_success, 'on_error': on_error } );
		}
		if( 'undefined' !== typeof on_complete ) {
			on_complete();
		}
		return this;
	};

	return N;

} )();

