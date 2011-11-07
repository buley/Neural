
/* Public.prototype.js
 * Basic MLP neural network.
 **/

var Cache = {};
var cache;
var Neural = (function() {

	/* PRIVATE */
	Cache = ( function () {

		var self = function() {

		}
		
		//var cache = {};
		self.prototype.set = function( request ) {
		
			var key = request.key || null
			    , value = request.value || null
	    		    , ttl = request.ttl || null //in seconds
	    		    , current_date = new Date()
			    , timestamp = ( current_date.getTime() + ( ttl * 1000 ) );

			if( 'function' === typeof value ) {
				value = value()
			}	

			var obj = {};
			if( -1 !== key.indexOf( '.' ) ) {
				var precount = key.split('.').length;
				while( key && -1 !== key.indexOf( '.' ) ) {
					var keys = key.split( '.' );
					new_obj = {};
					key = keys.pop();
					if( 'undefined' === typeof key ) {
						break;
					}
					if( ( precount - 1 )=== keys.length ) {
						new_obj[ key ] = {
							'timestamp': timestamp
							, 'data': value
						};
					} else {
						new_obj[ key ] = {
							'timestamp': timestamp
							, 'data': obj
						};
					}
					obj = new_obj;
					key = keys.join( '.' );
				}
				new_obj = {};
				new_obj[ key ] = {
					'timestamp': timestamp
					, 'data': obj
				};
				obj = new_obj;

			} else {
				cache[ key ] = {
					'timestamp': timestamp
					, 'data': obj
				};
			}
			console.log('mergin',cache,'with',obj);
			cache = Public.prototype.utilities.merge( cache, obj );
			return this;

		};

		self.prototype.get = function( request ) {

			var key = request.key || null;

			var result = {};
			if( -1 !== key.indexOf( '.' ) ) {
				result = cache;
				while( key && -1 !== key.indexOf( '.' ) ) {
					var keys = key.split( '.' );
					key = keys.shift();
					var res = result[ key ];
					if( 'undefined' !== typeof res && res[ 'data' ] ) {
						result = res[ 'data' ];
					} else {
						result = res;
					}
					key = keys.join( '.' );
				}
				result = result[ key ];
			} else {
				result = cache[ key ];
			}
			return filterOutput( key, result );

		};

		self.prototype.delete = function( request ) {

			var key = request.key || null;

			var result = {};
			if( -1 !== key.indexOf( '.' ) ) {
				result = cache;
				while( key && -1 !== key.indexOf( '.' ) ) {
					var keys = key.split( '.' );
					key = keys.shift();
					result = result[ key ][ 'data' ];
					key = keys.join( '.' );
				}
				delete result[ key ];
				cache = result;
			} else {
				delete cache[ key ];
			}

			return this;

		};

		self.prototype.pop = function( request ) {

			request.value = function( previous ) {
				return updateAndReturn( request.key, previous.pop() );
			};

			self.prototype.update( request );

			return this;

		};

		self.prototype.head = function( request ) {

			request.value = function( previous ) {
				return updateAndReturn( request.key, previous.shift() );
			};

			self.prototype.update( request );

			return this;

		};


		self.prototype.slice = function( request ) {

			request.value = function( previous ) {
				return updateAndReturn( request.key, previous.slice( request.begin, request.end ) );
			};

			self.prototype.update( request );

			return this;
		};

		// key, property
		self.prototype.remove = function( request ) {

			request.value = function( previous ) {
				delete previous[ request.property ] 
				return updateAndReturn( request.key, previous );
			};

			return self.prototype.update( request );
			
			return this;

		};

		self.prototype.prepend = function( request ) {

			request.value = function( previous ) {
				var value = request.value;
				if( 'string' === typeof previous ) {
					previous = value + previous;
				} else {
					previous.unshift( request.value );
				}
				return updateAndReturn( request.key, previous );
			};

			self.prototype.update( request );

			return this;

		};

		self.prototype.append = function( request ) {

			request.value = function( previous ) {
				var value = request.value;
				if( 'string' === typeof previous ) {
					previous = previous + value;
				} else {
					previous.push( request.value );
				}

				return updateAndReturn( request.key, previous );
			};

			self.prototype.update( request );

			return this;

		};

		self.prototype.increment = function( request ) {
	
			request.value = function( previous ) {
				previous += request.value;
				return updateAndReturn( request.key, previous );
			};

			self.prototype.update( request );

			return this;

		};

		self.prototype.update = function( request ) {

			var key = request.key || null
			  , value = request.value || null;

			var previous = self.prototype.get( key );

			if( 'function' === typeof value ) {
				value = value( previous );
			}

			cache[ key ] = {
				'timestamp': self.prototype.getExpires( { 'key': key } )
				, 'data': value
			};

			return this;

		};
	
		self.prototype.setExpires = function( request ) {

			var key = request.key || null
			    , timestamp = request.timestamp || 0;

			if( 'undefined' !== typeof cache[ key ] ) {
				cache[ key ][ 'timestamp' ] = timestamp;
			}

			return this;
		};


		self.prototype.getExpires = function( request ) {

			var key = request.key || null
			    , result = cache[ key ];

			if( 'undefined' !== typeof result ) {
				return result.timestamp;
			}
		
		};

		self.prototype.extendTTL = function( request ) {

			var key = request.key || null
			    , current = self.prototype.getExpires( { 'key': key } )
			    , timestamp = ( current + request.value );

		    	self.prototype.setExpires( { 'key': key, 'timestamp': timestamp } );

			return this;			    

		};

		self.prototype.shortenTTL = function( request ) {
	
			var key = request.key || null
			    , current = self.prototype.getExpires( { 'key': key } )
			    , timestamp = currrent + request.value;
			
		    	self.prototype.setExpires( { 'key': key, 'timestamp': timestamp } );

			return this;

		};


		self.prototype.increment = function( request ) {
	
			request.value = function( previous ) {
				previous += request.value;
				return updateAndReturn( request.key, previous );
			};

			self.prototype.update( request );

			return this;

		};
	
		var updateAndReturn = function( request ) {
			var key = request.key || null
			  , value = request.value || null
			  , timestamp = getExpires( { 'key': key } );

			self.prototype.update( { 'key': key, 'value': value, 'timestamp': timestamp } );
			
			return value;
		};

		var isStale = function( request ) {
			var current_date = new Date()
			  , current_time = current_date.getTime()
			  , timestamp = request.timestamp;

			if( 'undefined' === timestamp || null === timestamp) {
				return false;
			}
			return ( timestamp < current_time ) ? false : true;
		}

		var removeMeta = function( incoming ) {
			var result = {};

			if( Object !== typeof incoming.constructor || 'string' === typeof incoming ) {
				return incoming;
			}
			for( attr in incoming ) {
				if( incoming.hasOwnProperty( attr ) ) {
					var data = incoming[ attr ];
					if( !isStale( data ) ) {
						result[ attr ] = ( 'undefined' !== data.data ) ? removeMeta( data.data ) : data;
					}
				}
			}
			return result;
		};

		var filterOutput = function( key, request ) {
			var timestamp = parseInt( request.timestamp, 10 ) || 0
			    , data = request.data || null
			    , key = request.key || null;

			if( 'undefined' !== typeof data && null !== data ) {
				return removeMeta( data );
			} else {
				if( stale ) {
					self.prototype.delete( { 'key': key } );
				}
				return null;
			}
		};

		return self;

	})();

	/* Decorate a vanilla InDBApp */
	var Private = new InDBApp();

	var defaults = {
		'strength': 0
	};

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
	Public.prototype.defaults = {};

	Public.prototype.defaults.get = function( type ) {
		return defaults[ type ];
	}
	Public.prototype.defaults.set = function( type, value ) {
		defaults[ type ] = value;
	}


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

	Public.prototype.activation = function( request ) {

		var value,
		    activated;
		//hyperbolic tangent (tan h)
		if( true === activated ) {
			
		} else {

		}

		return this;

	};

	/* queries a network for active output neurons
	 * takes a tokens input (one or more tokens) and network (neuron/connection weight matrix) and returns a normalized score */
	Public.prototype.queryNetwork = function( tokens, network, on_success, on_error ) {

		/* How many tokens? If single, make it the only item in an array */
		if( 'string' === typeof tokens ) {
			tokens = [ tokens ];
		}

		var sum = 0;
		// For each neuron id in network 
			// For each 
			// xxx
			// TODO: go back and figure out how to do this right. three types? network = neurons + connections; also need neurons by type (for each input)

		// sum of weights times inputs + bias
		return this;

	};

	//TODO: Figure out why new tokens are non staying unique
	//do we need to add type to md5 and then make hash unique?
	//currently can't be unique b/c hidden and input nodes can be the
	//same value
	Public.prototype.addTokens = function( req ) {

		var tokens = req.tokens
		    , on_success = req.on_success || null
		    , on_error = req.on_error || null
		    , on_complete = req.on_complete || null;

		if( 'string' === tokens ) {
			tokens = [ tokens ];
		}

		tokens = Public.prototype.utilities.alphaSortArray( tokens );

		// TODO: comma forward
		var neurons = [],
		    x = 0,
		    hidden_hash = '',
		    tokens_copy = tokens.slice(0), //clone the array
		    tokens_length = tokens.length,
		    hidden_layer_callback = function() {},
		    synapse_callback = function() {};

		tokens_copy.push( 'hidden' );
		hidden_hash = Public.prototype.utilities.getId( tokens_copy );

		hidden_layer_callback = function( hidden_id ) {

			console.log( 'Public.prototype.add > Network.put success', hidden_id );

			//begin for each token
			for( x = 0; x < tokens_length; x++ ) {
				var token = tokens[ x ]
				    , token_hash = ''
				    , token_copy = [ token, 'input' ];
				
				token_hash = Public.prototype.utilities.getId( token_copy );
				// Put neuron; on_success, id is returned; next add a add synapse from hidden to neuron
				Network.put( {  'type': 'neuron', 'on_success': function( neuron_id ) {
					console.log( 'Public.prototype.add Network.put success', neuron_id );
					if( 'undefined' !== typeof on_success ) {
						on_success( { 'type': 'neuron', 'subtype': 'hidden', 'value': neuron_id, 'action': 'put' } );
					}

					synapse_callback( hidden_id, neuron_id );

				}, 'on_error': function( context ) {
					console.log( 'Public.prototype.add > Network.put success > Network.put error', context );

					/* Either there was some sort of data error, or,
					 * more likely, the neuron already exists. Before actually throwing the error,
					 * try to look up the neuron by its hash. If not found, then throw the error. */
					Network.get( {  'type': 'neurons', 'on_success': function( input_neuron_id ) {
						console.log( 'Public.prototype.add > Network.put success > Network.put error > Network.get success', input_neuron_id );

						if( 'undefined' !== typeof on_success ) {
							on_success( { 'type': 'neuron', 'subtype': 'input', 'action': 'get', 'key': token_hash, 'value': input_neuron_id } );
						}

						synapse_callback( hidden_id, input_neuron_id );

					}, 'on_error': function( context ) {
						console.log("Extention 777");
						console.log( 'Public.prototype.add > Network.put success > Network.put error > Network.get error', context );
						if( 'undefined' !== typeof on_error ) {
							on_error( context );
						}

					}, 'index': 'hash', 'key': token_hash, 'properties': [ 'id' ], 'expecting': { 'type': 'input' }  } );

				}, 'data': {
					'type': 'input'
					, 'hash': token_hash
					, 'display': token
				} } );

			}
			//end for each token

		};

		synapse_callback = function( hidden_neuron_id, input_neuron_id ) {

			var new_synapse_data = { 'from_type': 'input'
				, 'from': input_neuron_id
				, 'to_type': 'hidden'
				, 'to': hidden_neuron_id 
			};

			var synapse_hash = Public.prototype.utilities.getId( JSON.stringify( new_synapse_data ) );
			new_synapse_data[ 'hash' ] = synapse_hash;
			new_synapse_data[ 'strength' ] = Public.prototype.defaults.get( 'strength' );

			Network.put( { 'type': 'synapse', 'on_success': function( synapse_id ) {
				console.log( 'Public.prototype.add > Network.put success > Network.put success', synapse_id );

				if( 'undefined' !== typeof on_success ) {
					on_success( { 'type': 'synapse', 'action': 'put', 'data': new_synapse_data, 'result': synapse_id } );
				}

			}, 'on_error': function( context ) {
				console.log( 'Public.prototype.add > Network.put success > Network.put error', context );
				/* Either there was some sort of data or database error, or 
				 * the synapse just already exists. If that's the case, emit it as a success. 
				 * Else, throw the error */
				Network.get( {  'type': 'synapse', 'on_success': function( returned_synapse_data ) {
					console.log( 'Public.prototype.add > Network.put success > Network.put error > Network.get success', returned_synapse_data );
					if( 'undefined' !== typeof on_success ) {
						on_success( { 'type': 'synapse', 'action': 'get', 'result': returned_synapse_data } );
					}

				}, 'on_error': function( context ) {
					console.log( 'Public.prototype.add > Network.put success > Network.put error > Network.get error', context );
					if( 'undefined' !== typeof on_error ) {
						on_error( context );
					}

				}, 'index': 'hash', 'key': synapse_hash } );


			}, 'data': new_synapse_data } );

		};

	    // Add the hidden node for the group of tokens	
		Network.put( {  'type': 'neuron', 'on_success': function( hidden_id ) {

			if( 'undefined' !== typeof on_success ) {
				on_success( { 'type': 'neuron', 'subtype': 'hidden', 'action': 'put', 'value': hidden_id } );
			}

			hidden_layer_callback( hidden_id );

		}, 'on_error': function( context ) {
			console.log( 'Public.prototype.add Network.put error', context );

			/* Either there was some sort of data error or,
			 * more likely, it's already added and the new one 
			 * was not unique. In case of the latter, try to get the hidden layer id by hash */

			Network.get( {  'type': 'neurons', 'on_success': function( hidden_id ) {
				console.log( 'Public.prototype.add Network.put error > Network.get success', hidden_id );
				if( 'undefined' !== typeof on_success ) {
					on_success( { 'type': 'neuron', 'subtype': 'hidden', 'action': 'get', 'value': hidden_id } );
				}

				hidden_layer_callback( hidden_id );

			}, 'on_error': function( context ) {
				console.log( 'Public.prototype.add Network.put error > Network.get error', context );

				if( 'undefined' !== typeof on_error ) {
					on_error( context );
				}

			}, 'index': 'hash', 'properties': [ 'id' ], 'key': hidden_hash, 'expecting': { 'type': 'hidden' } } );

		}, 'data': {
			'type': 'hidden'
			, 'hash': hidden_hash
			, 'display': tokens
		} } );

		return this;	

	};

	/* takes a token or tokens and builds an in memory representation of relevant 
	 * neurons and their connections of an MLP such
	 * that it can be queried */
	Public.prototype.buildNetwork = function( tokens, layers, on_success, on_error ) {

		/*
		 * var network = {
		 *	neuron_id (string): {
		 *		'from': {
		 *			synapse_id (int): strength (number)
		 *			, ...
		 *		}, 'to': {
		 *			synapse_id: strength
		 *			, ...
		 *		}
		 *	}
		 *	, neuron_id: { ... }
		 *	...
		 * };
		 *
		 * var neurons = {
		 *	'id': {
		 *		'attr': value
		 *		, ...
		 *	}, 'id': { ... }
		 * };
		 *
		 * var synapses = {
		 *	'id': {
		 *		'attr': value
		 *		, ...
		 *	}, 'id': { ... }
		 * };
		 *
		 */

		var network = {},
		    x = 0;

		/* How many tokens? If single, make it the only item in an array */
		if( 'string' === typeof tokens ) {
			tokens = [ tokens ];
		}

		/* Alpha order words */

		/* How many input neurons? For each token in tokens, get all input layer node
		 * where the neuron hash is equal to the md5 of the token (i.e. the token id).
		 * If no neuron exists for the token id, create one.  */
		var token_length = tokens.length;
		for( x = token_length; x > 0; x -= 1 ) {

			var token = tokens[ x ];

			if( !!debug ) {
				console.log( 'Public.prototype.buildNetwork', x, tokens[ x ] );
			}
		
			var token_hash = Public.prototype.utilities.toId( token );

			/* Get Single Neuron With Primary Index */ 
			Network.get( {  'type': 'neuron', 'on_success': function( value ) {

				console.log( 'Network.get single success', value );
				var from_ids = [];

				/* Get Cursor Neurons With Secondary Index on From */
				Network.get( {  'type': 'neurons', 'on_success': function( value ) {
					console.log( 'Public.prototype.buildNetwork Network.get cursor success', value );
					from_ids.push( value );
				}, 'on_error': function( context ) {
					console.log( 'Public.prototype.buildNetwork Network.get cursor error', context );
				}, 'on_complete': function() {
					console.log( 'Public.prototype.buildNetwork Network.get cursor complete' );
					console.log( 'Public.prototype.buildNetwork Network.get cursor complete ids', from_ids );
				}, 'index': 'from', 'key': token_id, 'properties': [ 'from' ]  } );

			}, 'on_error': function( context ) {
				console.log( 'Public.prototype.buildNetwork Network.get error', context );
			}, 'index': 'hash', 'key': token_hash } );

		}

			// Add nodes to in-memory network
			
			/* How many layers? For each layer, get synapses
			 * where to is an input layer node equal to the input layer id
			 * and from is a hidden layer node */
		
				/* How many synapses? For each synapse get neurons
				 * where neuron primary key is equal to the synapse from id.
				 * If no synapse exists, create one with default strength. */

					// Add synapses to in-memory network

			

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
		'hash': 'h',
		'to': 't',
		'to_type': 'a',
		'from': 'f',
		'from_type': 'b',
		'strength': 's',
		'type': 'y',
		'votes': 'v',
		'payload': 'p'
	};

	Public.prototype.neurons.shorthand_map = {
		'id': 'i',
		'hash': 'h',
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
			, 'hash': true
			, 'type': false
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
			, 'from_type': false
			, 'hash': true
			, 'to': false
			, 'to_type': false
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

	/* End Primitives */

	/* Bridge methods */

	/* Adds an object or series of them given a type and request */
	/* Decorates Public.prototype.synapse(s)/neuron(s).add */
	Public.prototype.add = function( request ) {
		
		var req = new Object()
		    , type = request.type || {}
		    , on_success = request.on_success || null
		    , on_error = request.on_error || null
		    , on_complete = request.on_complete || null
		    , attr = new String();

		delete request.type;
		delete request.on_success;
		delete request.on_error;
		delete request.on_complete;

		for( attr in request ) {
			req[ attr ] = request[ attr ];
		}

		req.on_success = function( value ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.add success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.add error', context );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.complete complete' );
			}
			if( 'function' == typeof on_complete ) {
				on_complete();
			}
		};		
		
		if( 'synapses' === type ) {
			Public.prototype.synapses.add( req );
		} else if( 'synapse' === type ) {
			delete req.on_complete;
			Public.prototype.synapse.add( req );
		} else if( 'neurons' === type ) {
			Public.prototype.neurons.add( req );
		} else if( 'neuron' === type ) {
			delete req.on_complete;
			Public.prototype.neuron.add( req );
		}

		return this;
		
	};


	/* Puts an object or series of them given a type and request */
	/* Decorates Public.prototype.synapse(s)/neuron(s).put */
	Public.prototype.put = function( request ) {

		var req = new Object()
		    , type = request.type || {}
		    , on_success = request.on_success || null
		    , on_error = request.on_error || null
		    , on_complete = null
		    , attr = new String();

		delete request.type;
		delete request.on_success;
		delete request.on_error;
		delete request.on_complete;

		for( attr in request ) {
			req[ attr ] = request[ attr ];
		}

		req.on_success = function( value ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.getAttr success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.getAttr error', context );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.getAttr complete' );
			}
			if( 'function' == typeof on_complete ) {
				on_complete();
			}
		};

		if( 'synapses' === type ) {
			Public.prototype.synapses.put( req );
		} else if( 'synapse' === type ) {
			delete req.on_complete;
			Public.prototype.synapse.put( req );
		} else if( 'neurons' === type ) {
			Public.prototype.neurons.put( req );
		} else if( 'neuron' === type ) {
			delete req.on_complete;
			Public.prototype.neuron.put( req );
		}

		return this;
		
	};


	/* Emits a an object or series of them given a type and request */
	/* Decorates Public.prototype.synapse(s)/neuron(s).get */
	Public.prototype.get = function( request ) {

		var req = new Object()
		    , type = request.type || {}
		    , on_success = request.on_success || null
		    , on_error = request.on_error || null
		    , on_complete = request.on_complete || null
		    , attr = new String();

		var request_id = Public.prototype.utilities.hashedJSON( request );
		var cached_request = Cache.get( { 'key': request_id } );
		if( null !== cached_request ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.get success', cached_request );
			}
			if( 'function' == typeof on_success ) {
				on_success( cached_request );
			}
			return this;
		}

		delete request.type;
		delete request.on_success;
		delete request.on_error;
		delete request.on_complete;

		for( attr in request ) {
			req[ attr ] = request[ attr ];
		}

		req.on_success = function( value ) {

			var obj_key = type + '.' + value.id;
			Cache.set( { 'key': obj_key, 'value': value, 'ttl': 300 } );

			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.get success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.get error', context );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.get complete' );
			}
			if( 'function' == typeof on_complete ) {
				on_complete();
			}
		};

		if( 'synapses' === type ) {
			Public.prototype.synapses.get( req );
		} else if( 'synapse' === type ) {
			delete req.on_complete;
			Public.prototype.synapse.get( req );
		} else if( 'neurons' === type ) {
			Public.prototype.neurons.get( req );
		} else if( 'neuron' === type ) {
			delete req.on_complete;
			Public.prototype.neuron.get( req );
		}

		return this;
		
	};

	/* Decorates Public.prototype.synapse/neuron.update */
	Public.prototype.update = function( request ) {

		var req = new Object()
		    , type = request.type || {}
		    , on_success = request.on_success || null
		    , on_error = request.on_error || null
		    , on_complete = request.on_complete || null
		    , attr = new String();

		delete request.type;
		delete request.on_success;
		delete request.on_error;
		delete request.on_complete;

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
				console.log( 'Public.prototype.getAttr complete' );
			}
			if( 'function' == typeof on_complete ) {
				on_complete();
			}
		};

		if( 'synapses' === type ) {
			Public.prototype.synapses.update( req );
		} else if( 'synapse' === type ) {
			delete req.on_complete;
			Public.prototype.synapse.update( req );
		} else if( 'neurons' === type ) {
			Public.prototype.neurons.update( req );
		} else if( 'neuron' === type ) {
			delete req.on_complete;
			Public.prototype.neuron.update( req );
		}

		return this;

	};

	/* Deletes an object or series of them given a type and request */
	/* Decorates Public.prototype.synapse(s)/neuron(s).get */
	Public.prototype.delete = function( request ) {

		var req = new Object()
		    , type = request.type || {}
		    , on_success = request.on_success || null
		    , on_error = request.on_error || null
		    , on_complete = request.on_complete || null
		    , attr = new String();

		delete request.type;
		delete request.on_success;
		delete request.on_error;
		delete request.on_complete;

		for( attr in request ) {
			req[ attr ] = request[ attr ];
		}

		req.on_success = function( value ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.getAttr success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.getAttr error', context );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if( !!Public.prototype.debug ) {
				console.log( 'Public.prototype.getAttr complete' );
			}
			if( 'function' == typeof on_complete ) {
				on_complete();
			}
		};

		if( 'synapses' === type ) {
			Public.prototype.synapses.delete( req );
		} else if( 'synapse' === type ) {
			delete req.on_complete;
			Public.prototype.synapse.delete( req );
		} else if( 'neurons' === type ) {
			Public.prototype.neurons.delete( req );
		} else if( 'neuron' === type ) {
			delete req.on_complete;
			Public.prototype.neuron.delete( req );
		}

		return this;
		
	};


	/* Convenience Methods */


	Public.prototype.utilities = Public.prototype.utilities || {};

	Public.prototype.utilities.hashedJSON = function( obj ) {
		return md5( JSON.stringify( obj ) );
	};

	Public.prototype.utilities.merge = function(obj1, obj2) {
		if( 'undefined' === typeof obj1 ) {
			obj1 = {};
		}
		if( 'undefined' === typeof obj2 ) {
			obj2 = {};
		}
		var obj3 = {}
		  , attr = '';

		for( attr in obj1 ) {
			if( obj1.hasOwnProperty( attr ) ) {
				var next = obj1[ attr ];
				if( 'undefined' !== typeof next && Object === next.constructor ) {
					obj3[ attr ] = Public.prototype.utilities.merge( obj3[ attr ], next );
				} else {
					obj3[ attr ] = next;
				}
			}
		}
		for( attr in obj2 ) {
			if( obj2.hasOwnProperty( attr ) ) {
				var next = obj2[ attr ];
				if( 'undefined' !== typeof next && Object === next.constructor ) {
					obj3[ attr ] = Public.prototype.utilities.merge( obj3[ attr ], next );
				} else {
					obj3[ attr ] = next;
				}
			}
		}
		return obj3;
	}

	Public.prototype.utilities.alphaSortArray = function( unsorted ) {
		return unsorted.sort( Public.prototype.utilities.alphaSort );
	};

	Public.prototype.utilities.alphaSort = function( a, b ) {
		// http://stackoverflow.com/questions/4340227/sort-mixed-alpha-numeric-array
		var reA = /[^a-zA-Z]/g;
		var reN = /[^0-9]/g;
		var aA, bA;
		if( a.replace ) {
			aA = a.replace(reA, "");
		} else {
			aA = a;
		}
		if( b.replace ) {
			bA = b.replace(reA, "");
		} else {
			bA = b;
		}

		if(aA === bA) {
			var aN = parseInt(a.replace(reN, ""), 10);
			var bN = parseInt(b.replace(reN, ""), 10);
			return aN === bN ? 0 : aN > bN ? 1 : -1;
		} else {
			return aA > bA ? 1 : -1;
		}
	}

	//TODO: rename topics to tokens here
	Public.prototype.utilities.getId = function( topics ) {
		if( 'string' === typeof topics ) {
			topics = [ topics ];
		}
		var sorted_topics = Public.prototype.utilities.alphaSortArray( topics );
		return md5( sorted_topics.join("|") );
	};


	/* Begin MD5 (non-original work; see https://github.com/wbond/md5-js/blob/master/md5.js) */
	/*!
	 * Joseph Myer's md5() algorithm wrapped in a self-invoked function to prevent
	 * global namespace polution, modified to hash unicode characters as UTF-8.
	 *  
	 * Copyright 1999-2010, Joseph Myers, Paul Johnston, Greg Holt, Will Bond <will@wbond.net>
	 * http://www.myersdaily.org/joseph/javascript/md5-text.html
	 * http://pajhome.org.uk/crypt/md5
	 * 
	 * Released under the BSD license
	 * http://www.opensource.org/licenses/bsd-license
	 */
	Public.prototype.utilities.md5 = (function() {
		function md5cycle(x, k) {
			var a = x[0], b = x[1], c = x[2], d = x[3];

			a = ff(a, b, c, d, k[0], 7, -680876936);
			d = ff(d, a, b, c, k[1], 12, -389564586);
			c = ff(c, d, a, b, k[2], 17, 606105819);
			b = ff(b, c, d, a, k[3], 22, -1044525330);
			a = ff(a, b, c, d, k[4], 7, -176418897);
			d = ff(d, a, b, c, k[5], 12, 1200080426);
			c = ff(c, d, a, b, k[6], 17, -1473231341);
			b = ff(b, c, d, a, k[7], 22, -45705983);
			a = ff(a, b, c, d, k[8], 7, 1770035416);
			d = ff(d, a, b, c, k[9], 12, -1958414417);
			c = ff(c, d, a, b, k[10], 17, -42063);
			b = ff(b, c, d, a, k[11], 22, -1990404162);
			a = ff(a, b, c, d, k[12], 7, 1804603682);
			d = ff(d, a, b, c, k[13], 12, -40341101);
			c = ff(c, d, a, b, k[14], 17, -1502002290);
			b = ff(b, c, d, a, k[15], 22, 1236535329);

			a = gg(a, b, c, d, k[1], 5, -165796510);
			d = gg(d, a, b, c, k[6], 9, -1069501632);
			c = gg(c, d, a, b, k[11], 14, 643717713);
			b = gg(b, c, d, a, k[0], 20, -373897302);
			a = gg(a, b, c, d, k[5], 5, -701558691);
			d = gg(d, a, b, c, k[10], 9, 38016083);
			c = gg(c, d, a, b, k[15], 14, -660478335);
			b = gg(b, c, d, a, k[4], 20, -405537848);
			a = gg(a, b, c, d, k[9], 5, 568446438);
			d = gg(d, a, b, c, k[14], 9, -1019803690);
			c = gg(c, d, a, b, k[3], 14, -187363961);
			b = gg(b, c, d, a, k[8], 20, 1163531501);
			a = gg(a, b, c, d, k[13], 5, -1444681467);
			d = gg(d, a, b, c, k[2], 9, -51403784);
			c = gg(c, d, a, b, k[7], 14, 1735328473);
			b = gg(b, c, d, a, k[12], 20, -1926607734);

			a = hh(a, b, c, d, k[5], 4, -378558);
			d = hh(d, a, b, c, k[8], 11, -2022574463);
			c = hh(c, d, a, b, k[11], 16, 1839030562);
			b = hh(b, c, d, a, k[14], 23, -35309556);
			a = hh(a, b, c, d, k[1], 4, -1530992060);
			d = hh(d, a, b, c, k[4], 11, 1272893353);
			c = hh(c, d, a, b, k[7], 16, -155497632);
			b = hh(b, c, d, a, k[10], 23, -1094730640);
			a = hh(a, b, c, d, k[13], 4, 681279174);
			d = hh(d, a, b, c, k[0], 11, -358537222);
			c = hh(c, d, a, b, k[3], 16, -722521979);
			b = hh(b, c, d, a, k[6], 23, 76029189);
			a = hh(a, b, c, d, k[9], 4, -640364487);
			d = hh(d, a, b, c, k[12], 11, -421815835);
			c = hh(c, d, a, b, k[15], 16, 530742520);
			b = hh(b, c, d, a, k[2], 23, -995338651);

			a = ii(a, b, c, d, k[0], 6, -198630844);
			d = ii(d, a, b, c, k[7], 10, 1126891415);
			c = ii(c, d, a, b, k[14], 15, -1416354905);
			b = ii(b, c, d, a, k[5], 21, -57434055);
			a = ii(a, b, c, d, k[12], 6, 1700485571);
			d = ii(d, a, b, c, k[3], 10, -1894986606);
			c = ii(c, d, a, b, k[10], 15, -1051523);
			b = ii(b, c, d, a, k[1], 21, -2054922799);
			a = ii(a, b, c, d, k[8], 6, 1873313359);
			d = ii(d, a, b, c, k[15], 10, -30611744);
			c = ii(c, d, a, b, k[6], 15, -1560198380);
			b = ii(b, c, d, a, k[13], 21, 1309151649);
			a = ii(a, b, c, d, k[4], 6, -145523070);
			d = ii(d, a, b, c, k[11], 10, -1120210379);
			c = ii(c, d, a, b, k[2], 15, 718787259);
			b = ii(b, c, d, a, k[9], 21, -343485551);

			x[0] = add32(a, x[0]);
			x[1] = add32(b, x[1]);
			x[2] = add32(c, x[2]);
			x[3] = add32(d, x[3]);
		}

		function cmn(q, a, b, x, s, t) {
			a = add32(add32(a, q), add32(x, t));
			return add32((a << s) | (a >>> (32 - s)), b);
		}

		function ff(a, b, c, d, x, s, t) {
			return cmn((b & c) | ((~b) & d), a, b, x, s, t);
		}

		function gg(a, b, c, d, x, s, t) {
			return cmn((b & d) | (c & (~d)), a, b, x, s, t);
		}

		function hh(a, b, c, d, x, s, t) {
			return cmn(b ^ c ^ d, a, b, x, s, t);
		}

		function ii(a, b, c, d, x, s, t) {
			return cmn(c ^ (b | (~d)), a, b, x, s, t);
		}

		function md51(s) {
			// Converts the string to UTF-8 "bytes" when necessary
			if (/[\x80-\xFF]/.test(s)) {
				s = unescape(encodeURI(s));
			}
			txt = '';
			var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i;
			for (i = 64; i <= s.length; i += 64) {
				md5cycle(state, md5blk(s.substring(i - 64, i)));
			}
			s = s.substring(i - 64);
			var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			for (i = 0; i < s.length; i++)
			tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
			tail[i >> 2] |= 0x80 << ((i % 4) << 3);
			if (i > 55) {
				md5cycle(state, tail);
				for (i = 0; i < 16; i++) tail[i] = 0;
			}
			tail[14] = n * 8;
			md5cycle(state, tail);
			return state;
		}

		function md5blk(s) { /* I figured global was faster.   */
			var md5blks = [], i; /* Andy King said do it this way. */
			for (i = 0; i < 64; i += 4) {
				md5blks[i >> 2] = s.charCodeAt(i) +
						  (s.charCodeAt(i + 1) << 8) +
						  (s.charCodeAt(i + 2) << 16) +
						  (s.charCodeAt(i + 3) << 24);
			}
			return md5blks;
		}

		var hex_chr = '0123456789abcdef'.split('');

		function rhex(n) {
			var s = '', j = 0;
			for (; j < 4; j++)
			s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] +
			     hex_chr[(n >> (j * 8)) & 0x0F];
			return s;
		}

		function hex(x) {
			for (var i = 0; i < x.length; i++)
			x[i] = rhex(x[i]);
			return x.join('');
		}

		/* this function is much faster, so if possible we use it. Some IEs are the
		only ones I know of that need the idiotic second function, generated by an
		if clause.  */
		function add32(a, b) {
			return (a + b) & 0xFFFFFFFF;
		}

		if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
			function add32(x, y) {
				var lsw = (x & 0xFFFF) + (y & 0xFFFF),
				    msw = (x >> 16) + (y >> 16) + (lsw >> 16);
				return (msw << 16) | (lsw & 0xFFFF);
			}
		}
		
		return function (s) {
			return hex(md51(s));
		}
		
	})();

	/* End MD5 */

	return Public;

} )();

