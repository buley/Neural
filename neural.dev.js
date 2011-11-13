
/* Public.prototype.js
 * Basic MLP neural network.
 **/

var Cache = {};
var Neural = (function() {

	var debug = false;

	/* Decorate a vanilla InDBApp */
	var Private = new InDBApp();
	Cache = new CREAM();

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
	Public.prototype.debug = true;
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
			if( true === debug ) {
				console.log( 'Public.prototype.neurons.getHidden success', value );
			}

			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if( true === debug ) {
				console.log( 'Public.prototype.neurons.getHidden error', context );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if( true === debug ) {
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
			if( true === debug ) {
				console.log( 'Public.prototype.neurons.getOutput success', value );
			}

			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if( true === debug ) {
				console.log( 'Public.prototype.neurons.getOutput error', context );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if( true === debug ) {
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
			if( true === debug ) {
				console.log( 'Public.prototype.neurons.getInput success', value );
			}

			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if( true === debug ) {
				console.log( 'Public.prototype.neurons.getInput error', context );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if( true === debug ) {
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
			if( true === debug ) {
				console.log( 'Public.prototype.synapses.setStrength success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if( true === debug ) {
				console.log( 'Public.prototype.synapses.setStrength error', context );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if( true === debug ) {
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
			if( true === debug ) {
				console.log( 'Public.prototype.synapses.setStrength success', value );
			}

			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if( true === debug ) {
				console.log( 'Public.prototype.synapses.setStrength error', context );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if( true === debug ) {
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
	Public.prototype.activate = function( req ) {

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

			if( true === debug ) {
				console.log( 'Public.prototype.add > hidden_layer_callback success', hidden_id );
			}

			//begin for each token
			for( x = 0; x < tokens_length; x++ ) {
				var token = tokens[ x ]
				    , token_hash = ''
				    , token_copy = [ token, 'input' ];
				
				token_hash = Public.prototype.utilities.getId( token_copy );
				var new_neuron_data = {
					'type': 'input'
					, 'hash': token_hash
					, 'display': token
				};
				// Put neuron; on_success, id is returned; next add a add synapse from hidden to neuron
				var cached_input_id = Cache.get( { 'key': ( 'neurons.hashes.' + token_hash ) } );
				var cached_input_neuron;
				if( 'undefined' !== typeof cached_input_id ) {
					cached_input_neuron = Cache.get( { 'key': ( 'neurons.data.' + cached_input_id ) } );
				}
				if( cached_input_neuron !== new_neuron_data && ( 'undefined' === typeof cached_input_id || null === cached_input_id || 'undefined' === cached_input_neuron || null === cached_input_neuron ) ) {

					Network.put( {  'type': 'neuron', 'on_success': function( neuron_id ) {
			
						if( true === debug ) {
							console.log( 'Public.prototype.add Network.put success', neuron_id );
						}

						Cache.set( { 'key': ( 'neurons.data.' + neuron_id + '.hash' ), 'value': token_hash, 'ttl': 300 } );
						Cache.set( { 'key': ( 'neurons.hashes.' + token_hash ), 'value': neuron_id, 'ttl': 300 } );

						if( 'undefined' !== typeof on_success ) {
							on_success( { 'type': 'neuron', 'subtype': 'input', 'value': neuron_id, 'action': 'put', 'cached': false } );
						}
						
						synapse_callback( hidden_id, neuron_id );

					}, 'on_error': function( context ) {
					
						if( true === debug ) {
							console.log( 'Public.prototype.add > Network.put success > Network.put error', context );
						}

						var cached_input_neuron = Cache.get( { 'key': ( 'neurons.hashes.' + token_hash ) } );
						
						if( 'undefined' === typeof cached_input_neuron || null === cached_input_neuron ) {
							/* Either there was some sort of data error, or,
							 * more likely, the neuron already exists. Before actually throwing the error,
							 * try to look up the neuron by its hash. If not found, then throw the error. */
							Network.get( {  'type': 'neurons', 'on_success': function( input_neuron_result ) {
						
								if( true === debug ) {
									console.log( 'Public.prototype.add > Network.put success > Network.put error > Network.get success', input_neuron_id );
								}

								var input_neuron_id = input_neuron_result.id;
								
								if( 'undefined' !== typeof oni_success ) {
									on_success( { 'type': 'neuron', 'subtype': 'input', 'action': 'get', 'key': token_hash, 'value': input_neuron_id, 'cached': false } );
								}
								Cache.set( { 'key': ( 'neurons.hashes.' + token_hash ), 'value': input_neuron_id, 'ttl': 300 } );
								Cache.set( { 'key': ( 'neurons.data.' + input_neuron_id ), 'value': input_neuron_result, 'ttl': 300 } );
								synapse_callback( hidden_id, input_neuron_id );

							}, 'on_error': function( context ) {
								
								if( true === debug ) {
									console.log( 'Public.prototype.add > Network.put success > Network.put error > Network.get error', context );
								}

								if( 'undefined' !== typeof on_error ) {
									on_error( context );
								}
								
								Cache.delete( { 'key': ( 'neurons.hashes.' + token_hash ) } );

							}, 'index': 'hash', 'key': token_hash, 'expecting': { 'type': 'input' }  } );
						} else {

							if( 'undefined' !== typeof on_success ) {
								on_success( { 'type': 'neuron', 'subtype': 'input', 'action': 'get', 'key': token_hash, 'value': cached_input_neuron, 'cached': true } );
							}

							synapse_callback( hidden_id, cached_input_neuron );

						}

					}, 'data': new_neuron_data } );

				} else {

					if( 'undefined' !== typeof on_success ) {

						on_success( { 'type': 'neuron', 'subtype': 'input', 'action': 'get', 'key': token_hash, 'value': cached_input_neuron, 'cached': true } );

					}

					synapse_callback( hidden_id, cached_input_id );

				}
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

			var cached_synapse_id = Cache.get( { 'key': ( 'synapses.hashes.' + synapse_hash ) } );
			if( 'undefined' !== typeof cached_synapse_id && null !== cached_synapse_id ) {
				var cached_synapse = Cache.get( { 'key': ( 'synapses.data.' + cached_synapse_id ) } );
			}
			if( ( 'undefined' === typeof cached_synapse || null === cached_synapse ) && new_synapse_data !== cached_synapse ) {

				Network.put( { 'type': 'synapse', 'on_success': function( synapse_id ) {

					if( true === debug ) {
						console.log( 'Public.prototype.add > Network.put success > Network.put success', synapse_id );
					}

					Cache.set( { 'key': ( 'neurons.data.' + input_neuron_id + '.synapses.' + synapse_id ), 'value': new_synapse_data, 'ttl': 300 } );
					Cache.set( { 'key': ( 'synapses.data.' + synapse_id ), 'value': new_synapse_data, 'ttl': 300 } );
					Cache.set( { 'key': ( 'synapses.hashes.' + new_synapse_data.hash  ), 'value': synapse_id, 'ttl': 300 } );
					if( 'undefined' !== typeof on_success ) {
						on_success( { 'type': 'synapse', 'action': 'put', 'data': new_synapse_data, 'result': synapse_id, 'cached': false } );
					}

				}, 'on_error': function( context ) {
				
					if( true === debug ) {
						console.log( 'Public.prototype.add > Network.put success > Network.put error', context );
					}

					/* Either there was some sort of data or database error, or 
					 * the synapse just already exists. If that's the case, emit it as a success. 
					 * Else, throw the error */
					var cached_synapse_data = Cache.get( { 'key': ( 'synapses.hashes.' + synapse_hash ) } );
					if( 'undefined' === typeof cached_synapse_data || null === cached_synapse_data ) {
						Network.get( {  'type': 'synapse', 'on_success': function( returned_synapse_data ) {
					
							if( true === debug ) {
								console.log( 'Public.prototype.add > Network.put success > Network.put error > Network.get success', returned_synapse_data );
							}

							if( 'undefined' !== typeof returned_synapse_data && 'undefined' !== typeof returned_synapse_data.id ) {
								Cache.set( { 'key': ( 'synapses.data.' + returned_synapse_data.id ), 'value': returned_synapse_data, 'ttl': 300 } );
							}

							Cache.set( { 'key': ( 'synapses.hashes.' + synapse_hash ), 'value': returned_synapse_data.id, 'ttl': 300 } );
							
							if( 'undefined' !== typeof on_success ) {
								on_success( { 'type': 'synapse', 'action': 'get', 'result': returned_synapse_data, 'cached': false } );
							}

						}, 'on_error': function( context ) {
							
							if( true === debug ) {
								console.log( 'Public.prototype.add > Network.put success > Network.put error > Network.get error', context );
							}
							
							Cache.delete( { 'key': ( 'synapses.hashes.' + synapse_hash ) } );
						
							if( 'undefined' !== typeof on_error ) {
								on_error( context );
							}

						}, 'index': 'hash', 'key': synapse_hash } );
					} else {
					
						if( 'undefined' !== typeof on_success ) {
							on_success( { 'type': 'synapse', 'action': 'get', 'value': cached_synapse_data, 'cached': true } );
						}

					}

				}, 'data': new_synapse_data } );

			} else {

				if( 'undefined' !== typeof on_success ) {
					on_success( { 'type': 'synapse', 'action': 'get', 'result': cached_synapse, 'cached': true } );
				}

			}

		};

	    // Add the hidden node for the group of tokens	

		var neuron_data = {
			'type': 'hidden'
			, 'hash': hidden_hash
			, 'display': tokens
		};
		var cached_hidden_neuron_data;

		var cached_hidden_neuron_id = Cache.get( { 'key': ( 'neurons.hashes.' + hidden_hash ) } );
		if( 'undefined' !== typeof cached_hidden_neuron_id && null !== cached_hidden_neuron_id ) {
			cached_hidden_neuron_data = Cache.get( { 'key': ( 'neurons.data.' + cached_hidden_neuron_id ) } );
		}
		if( neuron_data !== cached_hidden_neuron_data && ( 'undefined' === typeof cached_hidden_neuron_id || null === cached_hidden_neuron_id || 'undefined' === typeof cached_hidden_neuron_data || null === cached_hidden_neuron_data ) ) {

			Network.put( {  'type': 'neuron', 'on_success': function( hidden_id ) {

				Cache.set( { 'key': ( 'neurons.data.' + hidden_id ), 'value': neuron_data, 'ttl': 300 } );
				Cache.set( { 'key': ( 'neurons.hashes.' + hidden_hash ), 'value': hidden_id, 'ttl': 300 } );

				if( 'undefined' !== typeof on_success ) {
					on_success( { 'type': 'neuron', 'subtype': 'hidden', 'action': 'put', 'value': hidden_id } );
				}

				hidden_layer_callback( hidden_id );

			}, 'on_error': function( context ) {
				
				if( true === debug ) {
					console.log( 'Public.prototype.add Network.put error', context );
				}

				/* Either there was some sort of data error or,
				 * more likely, it's already added and the new one 
				 * was not unique. In case of the latter, try to get the hidden layer id by hash */

				Network.get( {  'type': 'neurons', 'on_success': function( hidden_id ) {
					
					if( true === debug ) {
						console.log( 'Public.prototype.add Network.put error > Network.get success', hidden_id );
					}

					Cache.set( { 'key': ( 'neurons.data.' + hidden_id ), 'value': neuron_data } );
					Cache.set( { 'key': ( 'neurons.hashes.' + hidden_hash ), 'value': hidden_id } );

					if( 'undefined' !== typeof on_success ) {
						on_success( { 'type': 'neuron', 'subtype': 'hidden', 'action': 'get', 'value': hidden_id, 'cached': false } );
					}

					hidden_layer_callback( hidden_id );

				}, 'on_error': function( context ) {
					
					if( true === debug ) {
						console.log( 'Public.prototype.add Network.put error > Network.get error', context );
					}

					Cache.delete( { 'key': ( 'neurons.hashes.' + hidden_hash ) } );

					if( 'undefined' !== typeof on_error ) {
						on_error( context );
					}

				}, 'index': 'hash', 'properties': [ 'id' ], 'key': hidden_hash, 'expecting': { 'type': 'hidden' } } );


			}, 'data': neuron_data } );

		} else {

			if( 'undefined' !== typeof on_success ) {
				on_success( { 'type': 'neuron', 'subtype': 'hidden', 'action': 'put', 'value': cached_hidden_neuron_id, 'cached': true } );
			}

			hidden_layer_callback( cached_hidden_neuron_id );

		}
		return this;	

	};

	/*
	 * Pre(Get layer n neuron ids from display tokens)
	 *
	 * For each layer n id, get the layer n neuron
	 * For each layer n neuron, get all of its n->n+1 synapses
	 * For each synapse of each layer n id, get all n+1 neurons
	 * if ( start layer n + 1 < number of layers ) {
	 *	result = self( result, n + 1, t - 1, on_success, on_error, null );
	 * }
	 * on_complete( result );
	 */

	//
	
	
	/* input array of string tokens e.g. [ 'this', 'that', 'the_other' ]  */
	Public.prototype.getNetwork = function( request ) {

		var result = request.result
		    , input_ids = request.input_ids
		    , current_layer = request.current_layer
		    , total_layers = request.total_layers
		    , layer_state = request.layer_state
		    , on_success = request.on_success 
		    , on_error = request.on_error
		    , on_complete = request.on_complete;

		if( true === debug ) {
			console.log( 'Public.prototype.getNetwork', result, input_ids, current_layer, total_layers );
		}

		if( 'string' === typeof input_ids ) {
			input_ids = [ input_ids ];
		}

		if( 'undefined' === typeof layer_state || null === layer_state ) {
			console.log('SETTING DEFAULT ALYER STATE');
			layer_state = 1;
		}

		if( null === current_layer ) {
			current_layers = 0;
		}

		if( null === total_layers ) {
			total_layers = current_layer + 1;
		}
		
		var own_on_complete = function( passed_result, completed_input, completed_synapses, completed_output ) {
	
			if( true === debug ) {
				console.log( 'Public.prototype.getNetwork > own_on_complete()', completed_input, completed_synapses, completed_output );
			}

			var own_result = Public.prototype.buildNetwork( completed_input, completed_synapses, completed_output )
			  , own_result = Public.prototype.mergeObjects( passed_result, own_result );
			var completed_output_ids = []
			  , completed_output_length = completed_output.length
			  , b = 0;
			console.log('layer state',layer_state);
			if( current_layer < ( total_layers - 1 ) ) {

				for( b = 0; b < completed_output_length; b += 1 ) {
					if( 'undefined' !== typeof completed_output[ b ] ) {
						var completed_id = completed_output[ b ].id;
						if( 'undefined' !== typeof completed_id ) {
							completed_output_ids.push( completed_id );
						}
					}
				}

				layer_state++;

				Public.prototype.getNetwork( { 'result': own_result, 'input_ids': completed_output_ids, 'current_layer': ( current_layer + 1 ), 'total_layers': ( total_layers - 1 ), 'layer_state': layer_state, 'on_success': on_success, 'on_error': on_error, 'on_complete': on_complete } );


			} else {
				if( true === debug ) {
					console.log("Public.prototype.getNetwork > own_on_complete > FINISHED",passed_result);
				}
				
				if( 0 === layer_state && 'function' === typeof on_complete ) {
					layer_state = 0;
					on_complete( passed_result );
				} else {
					layer_state--;
				}

			}
		};

		Public.prototype.getInputNeurons( result, input_ids, on_success, on_error, own_on_complete );

		return this;
	}

	Public.prototype.mergeObjects = function( obj1, obj2, replace ) {

		if( true === debug ) {
			console.log('Public.prototype.mergeObjects()',obj1, obj2, replace);
		}

		if( true !== replace ) {
			replace = false;
		}	
		if( 'undefined' === typeof obj1 ) {
			obj1 = {};
		}
		if( 'undefined' === typeof obj2 ) {
			obj2 = {};
		}

		var obj3 = {}
		  , attr = ''
		  , x = 0
		  , obj1_length
		  , obj2_length
		  , obj2_type;

		if( 'function' === typeof obj1.join ) {
			obj3 = [];
			obj1_length = obj1.length;
			for( x = 0; x < obj1_length; x += 1 ) {
				obj3.push( obj1[ x ] );
			}
			obj2_type = typeof obj2.join;
			if( true === replace ) {
				obj3 = obj2;
			} else if( 'function' === obj2_type && true !== replace ) {					
				for( x = 0; x < obj2_length; x += 1 ) {
					obj3.push( obj2[ x ] );
				}
			} else if( 'function' === obj2_type ) {
				obj3.push( obj2 );
			}
			return obj3;
		}

  		if ( false === Public.prototype.hasAttributes( obj2 ) ) {
			return obj1;
		}
		if ( false === Public.prototype.hasAttributes( obj1 ) ) {
			return obj2;
		}	
		for( attr in obj1 ) {
			if( obj1.hasOwnProperty( attr ) ) {
				var next = obj1[ attr ];
				if( 'undefined' !== typeof next && Public.prototype.hasAttributes( next ) ) {
					obj3[ attr ] = Public.prototype.mergeObjects( obj3[ attr ], next );
				} else {
					obj3[ attr ] = next;
				}
			}
		}
		for( attr in obj2 ) {
			if( obj2.hasOwnProperty( attr ) ) {
				var next = obj2[ attr ];
				if( 'undefined' !== typeof next && Public.prototype.hasAttributes( next ) ) {
					obj3[ attr ] = Public.prototype.mergeObjects( obj3[ attr ], next );
				} else {
					obj3[ attr ] = next;
				}
			}
		}
		return obj3;
	}

	Public.prototype.getInputNeurons = function( results, input_ids, on_success, on_error, on_complete ) {

			if( true === debug ) {
				console.log( 'Public.prototype.getNetwork getInputNeurons()', results, input_ids );
			}

			var input_neurons = []
			  , input_count = 0
			  , input_neuron_id
			  , z = 0
			  , input_length = input_ids.length
			  , expected_input_count = input_length;

			// For each input_id in input_ids
			for( z = 0; z < input_length; z += 1 ) {

				input_neuron_id = input_ids[ z ];
				// Get the cached neuron
				//
				cached_neuron = Public.prototype.returnNeuron( input_neuron_id );
				// Else get it from the database

				if( 'undefined' === typeof cached_neuron || null === cached_neuron ) {

					/* Get Cursor Neurons With Secondary Index on From */
					Network.get( {  'type': 'neuron', 'on_success': function( input_neuron_value ) {
					
						if( true === debug ) {
							console.log( 'Public.prototype.getTokens > get_input_neurons > Network.get cursor success', input_neuron_value );
						}

						Cache.set( { 'key': ( 'neurons.data.' + input_neuron_id ), 'value': input_neuron_value, 'ttl': 300 } );
						if( 'undefined' !== typeof input_neuron_value && null !== input_neuron_value && Public.prototype.hasAttributes( input_neuron_value ) ) {
							input_neurons.push( input_neuron_value );
					
						} else {
						
							expected_input_count -= 1;
						}

						if( expected_input_count === input_neurons.length ) {
						
							Public.prototype.getSynapses( results, input_neurons, on_success, on_error, on_complete );
						}

					}, 'on_error': function( context ) {
						
						//TODO: good error (not in index) or bad error (e.g. missing store)?
						expected_input_count -= 1;
							
						if( expected_input_count === input_neurons.length ) {
							Public.prototype.getSynapses( results, input_neurons, on_success, on_error, on_complete );
						}

						if( true === debug ) {
							console.log( 'Public.prototype.getTokens > get_input_neurons > Network.get cursor error', context );
						}

					}, 'key': input_neuron_id } );

				} else {

					if( 'undefined' !== typeof cached_neuron && Public.prototype.hasAttributes( cached_neuron ) ) {
					
						input_neurons.push( cached_neuron );
					
					} else {

						if( true === debug ) {
							console.log('cached neuron does not have attributes',cached_neuron);
						}
						
						expected_input_count -= 1;
					
					}	
				
					if( true === debug ) {
						console.log('Public.prototype.getTokens > get_input_neurons > cache success', cached_neuron );
					}

					if( expected_input_count === input_neurons.length ) {
					
						if( true === debug ) {
							console.log('Public.prototype.getTokens > get_input_neurons > getting synapses',input_neurons);
						}

						Public.prototype.getSynapses( results, input_neurons, on_success, on_error, on_complete );
					}
				}

			}

		}

	// takes an array of input neuron objects
	Public.prototype.getSynapses = function( results, input_neurons, on_success, on_error, on_complete ) {

		if( true === debug ) {
			console.log( 'Public.prototype.getNetwork getSynapses() results', JSON.stringify(results),'input_neurons',JSON.stringify( input_neurons ) );
		}

		//For each input neuron, get it's synapses 
		var input_neuron_length = input_neurons.length
		  , y = 0
		  , synapse_count = 0
		  , expected_synapses_count = input_neuron_length
		  , synapses = []
		  , input_id
		  , input_neuron = {}
		  , cached_synapse;

		if( 0 === input_neuron_length ) {

			Public.prototype.getOutputNeurons( results, input_neurons, synapses, on_success, on_error, on_complete );

		}
		
		for( y = 0; y < input_neuron_length; y += 1 ) {

			input_neuron = input_neurons[ y ];
			
			if( 'undefined' !== typeof input_neuron && null !== input_neuron && Public.prototype.hasAttributes(input_neuron) && 'undefined' !== typeof input_neuron.id ) {
				
				input_id = input_neuron.id;

				if( 'undefined' !== typeof input_id ) {
					cached_input_neuron = Cache.get( { 'key': ( 'neurons.synapses.' + input_id ) } );

					// If it exists in the cache, no need to get it from the database
					if( 'undefined' === typeof cached_input_neuron || null === cached_input_neuron ) {
					
						// Else get it from the database
						Network.get( {  'type': 'synapse', 'on_success': function( synapse_value ) {
			
							if( true === debug ) {
								console.log( 'Public.prototype.getTokens > get_synapses > Network.get cursor success', synapse_value );
							}
							
							Cache.set( { 'key': ( 'neurons.synapses.' + input_id ), 'value': synapse_value, 'ttl': 300 } );
							if( 'undefined' !== typeof synapse_value && null !== typeof synapse_value && Public.prototype.hasAttributes( synapse_value ) ) {
								synapses.push( synapse_value );
							} else {
								expected_synapses_count -= 1;
							}
							
							if( expected_synapses_count === synapses.length ) {
								Public.prototype.getOutputNeurons( results, input_neurons, synapses, on_success, on_error, on_complete );
							}

						}, 'on_error': function( context ) {
							
							if( true === debug ) {
								console.log( 'Public.prototype.getTokens > get_synapses > Network.get cursor error', context );
							}
							
							//TODO: Inspect what kind of error this is
							expected_synapses_count -= 1;

							if( expected_synapses_count === synapses.length ) {
								Public.prototype.getOutputNeurons( results, input_neurons, synapses, on_success, on_error, on_complete );
							}

						}, 'key': input_id, 'index': 'from' } );


					} else {

						if( 'undefined' !== typeof cached_input_neuron && Public.prototype.hasAttributes( cached_input_neuron ) ) {
							synapses.push( cached_input_neuron );
						} else {
							expected_synapses_count -= 1;
						}

						if( expected_synapses_count === synapses.length ) {
							Public.prototype.getOutputNeurons( results, input_neurons, synapses, on_success, on_error, on_complete );
						}

					}
				} else {
					expected_synapses_count -= 1;
					if( expected_synapses_count === synapses.length ) {

						Public.prototype.getOutputNeurons( results, input_neurons, synapses, on_success, on_error, on_complete );
					}

				}
			} else {
				expected_synapses_count -= 1;
				if( expected_synapses_count === synapses.length ) {

					Public.prototype.getOutputNeurons( results, input_neurons, synapses, on_success, on_error, on_complete );
				}


			}

		}
		
	};

	Public.prototype.getOutputNeurons = function( results, input_neurons, synapses, on_success, on_error, on_complete ) {

		if( true === debug ) {
			console.log( 'Public.prototype.getNetwork getOutputNeurons() results', JSON.stringify( results ), 'input_neurons', input_neurons, synapses );
		}

		//For each input neuron, get it's synapses 
		var synapses_length = synapses.length
		  , expected_output_count = synapses_length
		  , a = 0
		  , output_id
		  , output_neurons = []
		  , synapse = {};
		if( 0 === synapses_length ) {
			on_complete( results, input_neurons, synapses, output_neurons );
			return;
		}
		for( a = 0; a < synapses_length; a += 1 ) {

			synapse = synapses[ a ];

			output_id = synapse.to;
			cached_synapse = Cache.get( { 'key': ( 'neurons.data.' + output_id ) } );

			// If it exists in the cache, no need to get it from the database
			if( 'undefined' === typeof cached_synapse || null === cached_synapse ) {
			
				// Else get it from the database
				Network.get( {  'type': 'neuron', 'on_success': function( output_neuron_value ) {
		
					if( true === debug ) {
						console.log( 'Public.prototype.getTokens > get_output_neurons > Network.get cursor success', output_neuron_value );
					}

					Cache.set( { 'key': ( 'neurons.data.' + output_id ), 'value': output_neuron_value, 'ttl': 300 } );
					if( 'undefined' !== typeof output_neuron_value && null !== output_neuron_value ) {
						output_neurons.push( output_neuron_value );
					} else {
						expected_output_count -= 1;
					}
					if( expected_output_count === output_neurons.length ) {
						on_complete( results, input_neurons, synapses, output_neurons );
					}
				}, 'on_error': function( context ) {
					
					if( true === debug ) {
						console.log( 'Public.prototype.getTokens > get_output_neurons > Network.get cursor error', context );
					}
					
					//TODO: Inspect error and do maybe do something
					expected_output_count -= 1;
					if( expected_ouput_count === output_neurons.length ) {
						on_complete( results, input_neurons, synapses, output_neurons );
					}

				}, 'key': output_id } );

			} else {
				if( 'undefined' !== typeof cached_synapse ) {
					output_neurons.push( cached_synapse );
				}
				if( expected_output_count === output_neurons.length ) {
					on_complete( results, input_neurons, synapses, output_neurons );
				}
			}


		}
	
	};

	/* takes a token or tokens and builds an in memory representation of relevant 
	 * neurons and their connections of an MLP such
	 * that it can be queried */
	Public.prototype.buildNetwork = function( inputs, synapses, outputs ) {

		if( true === debug ) {
			console.log( 'Public.prototype.buildNetwork', inputs, synapses, outputs );
		}

		/*
		 *
		 * var network {
		 *	'input_id': {
		 *		'data': { ... } 
		 *		, 'to': {
		 *			id (int): strength (number)
		 *		}, 'from': {
		 *			id (int): strength (number)
		 *		}
		 * }
		 *
		 */
		var network = {}
		  , own_network = {}
		  , x = 0
		  , synapses_length = synapses.length
		  , synapse
		  , input_length = inputs.length
		  , input
		  , output_length = outputs.length
		  , output
		  , to_id
		  , from_id
		  , return_neuron;

		for( x = 0; x < synapses_length; x += 1 ) {

			synapse = synapses[ x ];

			// Handle to
			to_id = synapse.to;
			to_neuron = Public.prototype.returnNeuron( to_id );

			if( 'undefined' !== to_id && null !== to_id ) {
				if( 'undefined' !== typeof to_id && null !== to_id && 'undefined' === typeof own_network[ to_id ] ) {
					own_network[ to_id ] = {
						'data': to_neuron
					};
				}
				if( 'undefined' !== typeof from_id && null !== from_id ) {
					if( 'undefined' === typeof own_network[ to_id ][ 'from' ] ) {
						own_network[ to_id ][ 'from' ] = {};
					}
					own_network[ to_id ][ 'from' ][ from_id ] = synapse.strength;
				}
			}

			// Handle from
			from_id = synapse.from;
			from_neuron = Public.prototype.returnNeuron( from_id );

			if( 'undefined' !== from_id && null !== from_id ) {
				
				if( 'undefined' === typeof own_network[ from_id ] ) {
					own_network[ from_id ] = {
						'data': from_neuron
					};
				}
				if( 'undefined' !== typeof to_id && null !== to_id ) {
					if( 'undefined' === typeof own_network[ from_id ][ 'to' ] ) {
						own_network[ from_id ][ 'to' ] = {};
					}
					own_network[ from_id ][ 'to' ][ to_id ] = synapse.strength;
				}
			}
		
			network = Public.prototype.mergeObjects( network, own_network );

		}
		return network;

	};


	Public.prototype.hasAttributes = function( question ) {
		var question_type = typeof question;

		if( 'undefined' === question_type || 'string' === question_type || 'number' === question_type ) {
			return false;
		}

		for( attr in question ) {
			if( question.hasOwnProperty( attr ) ) {
				return true;
				break;
			}
		}

		return false;

	};


	Public.prototype.returnNeuron = function( neuron_id ) {
		return Cache.get( { 'key': 'neurons.data.' + neuron_id } );
	};

	/* Takes input tokens and an output token (e.g. 'click'). */

	/* trains an MLP using the standard 'backpropigation'  (feedforward?) algo */
	Public.prototype.trainNetwork = function( input_tokens, output_token, layers_to_train,  on_success, on_error ) {


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
			, 'hash': true
			, 'from': false
			, 'from_type': false
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

		if( true === debug ) {
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
			if( true === debug ) {
				console.log( 'Public.prototype.add success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if( true === debug ) {
				console.log( 'Public.prototype.add error', context );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if( true === debug ) {
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
			if( true === debug ) {
				console.log( 'Public.prototype.getAttr success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if( true === debug ) {
				console.log( 'Public.prototype.getAttr error', context );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if( true === debug ) {
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
			if( true === debug ) {
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

			if( true === debug ) {
				console.log( 'Public.prototype.get success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if( true === debug ) {
				console.log( 'Public.prototype.get error', context );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if( true === debug ) {
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
			if( true === debug ) {
				console.log( 'Public.prototype.synapses.setStrength success', value );
			}

			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if( true === debug ) {
				console.log( 'Public.prototype.synapses.setStrength error', context );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};
	
		req.on_complete = function() {
			if( true === debug ) {
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
			if( true === debug ) {
				console.log( 'Public.prototype.getAttr success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if( true === debug ) {
				console.log( 'Public.prototype.getAttr error', context );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if( true === debug ) {
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

