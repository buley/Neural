
/* Public.prototype.js
 * Basic MLP neural network.
 **/

var Cache = {};
var Neural = (function() {

	var debug = true;

	/* Decorate a vanilla InDBApp */
	var Private = new InDBApp();
	Cache = new CREAM();

	var defaults = {
		'strength': 1
	};

	/* PUBLIC */

	var Public = function ( request ) {

		var current_database = "Neural";
		var current_description = "A basic MLP network."

		if ( 'undefined' !== typeof request ) {
			if ( 'undefined' !== typeof request.database ) {
				current_database = request.database;
			}

			if ( 'undefined' !== typeof request.description ) {
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
			if ( true === debug ) {
				console.log( 'Public.prototype.neurons.getHidden success', value );
			}

			if ( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if ( true === debug ) {
				console.log( 'Public.prototype.neurons.getHidden error', context );
			}
			if ( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if ( true === debug ) {
				console.log( 'Public.prototype.neurons.getHidden complete' );
			}
			if ( 'function' == typeof on_complete ) {
				on_complete();
			}
		};

		Public.prototype.neurons.get( req );

		return this;

	};


	Public.prototype.incrementer = function( current, type_object ) {
		current = ( !isNaN( current ) ) ? current : 0;
		return current + 1;
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
			if ( true === debug ) {
				console.log( 'Public.prototype.neurons.getOutput success', value );
			}

			if ( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if ( true === debug ) {
				console.log( 'Public.prototype.neurons.getOutput error', context );
			}
			if ( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if ( true === debug ) {
				console.log( 'Public.prototype.neurons.getOutput complete' );
			}
			if ( 'function' == typeof on_complete ) {
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
			if ( true === debug ) {
				console.log( 'Public.prototype.neurons.getInput success', value );
			}

			if ( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if ( true === debug ) {
				console.log( 'Public.prototype.neurons.getInput error', context );
			}
			if ( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if ( true === debug ) {
				console.log( 'Public.prototype.neurons.getInput complete' );
			}
			if ( 'function' == typeof on_complete ) {
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
			if ( 'function' == typeof request.on_complete ) {
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
			if ( 'function' == typeof request.on_complete ) {
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
			if ( 'function' == typeof request.on_complete ) {
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
			if ( 'function' == typeof request.on_complete ) {
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
			if ( true === debug ) {
				console.log( 'Public.prototype.synapses.setStrength success', value );
			}
			if ( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if ( true === debug ) {
				console.log( 'Public.prototype.synapses.setStrength error', context );
			}
			if ( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if ( true === debug ) {
				console.log( 'Public.prototype.synapses.setStrength complete' );
			}
			if ( 'function' == typeof on_complete ) {
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
			if ( true === debug ) {
				console.log( 'Public.prototype.synapses.setStrength success', value );
			}

			if ( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if ( true === debug ) {
				console.log( 'Public.prototype.synapses.setStrength error', context );
			}
			if ( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if ( true === debug ) {
				console.log( 'Public.prototype.synapses.setStrength complete' );
			}
			if ( 'function' == typeof on_complete ) {
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
		if ( true === activated ) {
			
		} else {

		}

		return this;

	};

	
	
	Public.prototype.addOrGetNeuron = function( req ) {

		var neuron_data = req.value || {}
		    , on_success = req.on_success || null
		    , on_error = req.on_error || null
		    , return_existing = req.return_existing
		    , on_success = req.on_success || null
		    , on_error = req.on_error || null
		    , x = 0
		    , neuron_hash = ''
		    , neurons = []
		    , neurons_length = 0
		    , neuron
	 	    , neuron_data
		    , cached_neuron_data
		    , cached_neuron_id;

		cached_neuron_id = Cache.get( { 'key': ( 'neurons.hashes.' + neuron_data.hash ) } );

		if ( 'undefined' !== typeof cached_neuron_id && null !== cached_neuron_id ) {
			cached_neuron_data = Cache.get( { 'key': ( 'neurons.data.' + cached_neuron_id ) } );
		}

		if ( neuron_data !== cached_neuron_data && ( 'undefined' === typeof cached_neuron_id || null === cached_neuron_id || 'undefined' === typeof cached_neuron_data || null === cached_neuron_data ) ) {

			Network.get( {  'type': 'neuron', 'on_success': function( returned_neuron ) {
			

				neuron_id = returned_neuron.id;

				if ( true === debug ) {
					console.log( 'Public.prototype.add Network.put error > Network.get success', JSON.stringify( returned_neuron ) );
				}

				Cache.set( { 'key': ( 'neurons.data.' + neuron_id ), 'value': returned_neuron, 'ttl': 300 } );
				Cache.set( { 'key': ( 'neurons.hashes.' + neuron_data.hash ), 'value': neuron_id, 'ttl': 300 } );

				if ( true === return_existing ) {
					neurons.push( neuron_id );
				}

				if ( 'function' === typeof on_success ) {
					on_success( returned_neuron );
				}				

			}, 'on_error': function( context ) {
				
				if ( true === debug ) {
					console.log( 'Public.prototype.add Network.put error > Network.get error', context );
				}

				Cache.delete( { 'key': ( 'neurons.hashes.' + neuron_data.hash ) } );

				if ( 'function' === typeof on_error ) {
					on_error( context );
				}


				Network.put( {  'type': 'neuron', 'on_success': function( neuron_id ) {

					neuron_data.id = neuron_id;

					Cache.set( { 'key': ( 'neurons.data.' + neuron_id ), 'value': neuron_data, 'ttl': 300 } );

					Cache.set( { 'key': ( 'neurons.hashes.' + neuron_data.hash ), 'value': neuron_id, 'ttl': 300 } );

					neurons.push( neuron_id );

					
					if ( 'function' === typeof on_success ) {
						on_success( neuron_data );
					}				

				}, 'on_error': function( context ) {
				
					if ( true === debug ) {
						console.log( 'Public.prototype.add Network.put error', context );
					}

					if ( true === return_existing ) {


					} else {

						Cache.delete( { 'key': ( 'neurons.hashes.' + neuron_data.hash ) } );

						if ( 'function' === typeof on_error ) {
							on_error();
						}

					}

				}, 'data': neuron_data } );



			}, 'index': 'hash', 'key': neuron_data.hash, 'expecting': { 'type': 'hidden' } } );


		} else {

			if ( true === return_existing ) {

				neurons.push( cached_neuron_id );

				if ( 'function' === typeof on_success ) {
					on_success( cached_neuron_data );
				}

			}

		}

	};

	
	Public.prototype.addOrUpdateSynapse = function( req ) {
		if ( !!debug ) {
			console.log('Public.prototype.addOrUpdateSynapse',req);
		}	
		var synapse_data = req.value || {}
		    , on_success = req.on_success || null
		    , on_error = req.on_error || null
		    , return_existing = req.return_existing
		    , on_success = req.on_success || null
		    , on_error = req.on_error || null
		    , x = 0
		    , synapse_hash = ''
		    , synapses = []
		    , synapses_length = 0
		    , synapse
	 	    , synapse_data
		    , synapse_id
		    , cached_synapse_data
		    , cached_synapse_id;

		synapse_hash = Public.prototype.utilities.getId( synapse_data );
		synapse_data[ 'hash' ] = synapse_hash;
		synapse_data[ 'strength' ] = Public.prototype.defaults.get( 'strength' );

		cached_synapse_id = Cache.get( { 'key': ( 'synapses.hashes.' + synapse_hash ) } );
		if ( 'undefined' !== typeof cached_synapse_id && null !== cached_synapse_id ) {
			var cached_synapse = Cache.get( { 'key': ( 'synapses.data.' + cached_synapse_id ) } );
		}

		cached_synapse_id = Cache.get( { 'key': ( 'synapses.hashes.' + synapse_data.hash ) } );

		if ( 'undefined' !== typeof cached_synapse_id && null !== cached_synapse_id ) {
			cached_synapse_data = Cache.get( { 'key': ( 'synapses.data.' + cached_synapse_id ) } );
		}
		if ( synapse_data !== cached_synapse_data && ( 'undefined' === typeof cached_synapse_id || null === cached_synapse_id || 'undefined' === typeof cached_synapse_data || null === cached_synapse_data ) ) {
			
			Network.update( {  'type': 'synapse', 'on_success': function( returned_synapse ) {
		
				synapse_id = returned_synapse.id;

				if ( true === debug ) {
					console.log( 'Public.prototype.add Network.put error > Network.update success', JSON.stringify( returned_synapse ) );
				}

				Cache.set( { 'key': ( 'synapses.data.' + synapse_id ), 'value': returned_synapse, 'ttl': 300 } );
				Cache.set( { 'key': ( 'synapses.hashes.' + synapse_data.hash ), 'value': synapse_id, 'ttl': 300 } );

				if ( 'function' === typeof on_success ) {
					on_success( returned_synapse );
				}				

			}, 'on_error': function( context ) {
				
				if ( true === debug ) {
					console.log( 'Public.prototype.add Network.put error > Network.get error', context );
				}

				Network.put( {  'type': 'synapse', 'on_success': function( synapse_id ) {
					
					synapse_data.id = synapse_id;
					
					Cache.set( { 'key': ( 'synapses.data.' + synapse_id ), 'value': synapse_data, 'ttl': 300 } );

					Cache.set( { 'key': ( 'synapses.hashes.' + synapse_data.hash ), 'value': synapse_id, 'ttl': 300 } );
					console.log("SYN",synapse_data);	
					if ( 'function' === typeof on_success ) {
						on_success( synapse_data );
					}				

				}, 'on_error': function( context ) {
				
					if ( true === debug ) {
						console.log( 'Public.prototype.add Network.put error', context );
					}
					
					if ( 'function' === typeof on_error ) {
						on_error( context );
					}

				}, 'data': synapse_data } );

			}, 'index': 'hash', 'key': synapse_hash, 'data': { 'strength': function( previous ) {

				if ( true === debug ) {
					console.log( 'Public.prototype.update > Previous', previous, 'hash', synapse_hash );
				}

				var next = ( 'number' === typeof previous ) ? Public.prototype.incrementer( previous, { 'hash': synapse_hash } ) : 0;

				if ( true === debug ) {
					console.log( 'Updating', next, synapse_hash );
				}
				return next; 

			} } } );


		} else {

			/* Synapse Update Single */
			Network.update( {  'type': 'synapse', 'on_success': function( finished_value ) {

				console.log('synapse update success',finished_value);
						if ( true === debug ) {
							console.log( 'Public.prototype.update > Network.update > success', finished_value );
						}

						if ( 'undefined' !== typeof on_success ) {
							on_success( finished_value );
						}
						
						Cache.set( { 'key': ( 'synapses.data.' + finished_value.id ), 'value': finished_value, 'ttl': 300  } );


				}, 'on_error': function( context ) {
				
					if ( true === debug ) {
						console.log( 'Cached update error', context );
					}

					Network.put( {  'type': 'synapse', 'on_success': function( synapse_id ) {
						
						synapse_data.id = synapse_id;
						
						Cache.set( { 'key': ( 'synapses.data.' + synapse_id ), 'value': synapse_data, 'ttl': 300 } );

						Cache.set( { 'key': ( 'synapses.hashes.' + synapse_data.hash ), 'value': synapse_id, 'ttl': 300 } );
						console.log("SYN",synapse_data);	
						if ( 'function' === typeof on_success ) {
							on_success( synapse_data );
						}				

					}, 'on_error': function( context ) {
					
						if ( true === debug ) {
							console.log( 'Public.prototype.add Network.put error', context );
						}
						
						if ( 'function' === typeof on_error ) {
							on_error( context );
						}

					}, 'data': synapse_data } );


				}, 'on_complete': function() {
			
					/*if ( true === debug ) {
						console.log( 'complete' );
					}*/

				}, 'index': 'hash', 'key': synapse_hash
			
				, 'data': { 'strength': function( previous ) {

					if ( true === debug ) {
						console.log( 'Public.prototype.update > Previous', previous );
					}

					var next = ( 'number' === typeof cached_synapse_data.strength ) ? Public.prototype.incrementer( cached_synapse_data.strength, { 'hash': cached_synapse_data.hash } ) : 0;

					if ( true === debug ) {
						console.log( 'Updating', next, cached_synapse_data );
					}

					return next; 

				} } 
			} );  
		}

	};
	
	
	

	//xxx
	
	Public.prototype.addOrGetSynapse = function( req ) {

		var synapse_data = req.value || {}
		    , on_success = req.on_success || null
		    , on_error = req.on_error || null
		    , return_existing = req.return_existing
		    , on_success = req.on_success || null
		    , on_error = req.on_error || null
		    , x = 0
		    , synapse_hash = ''
		    , synapses = []
		    , synapses_length = 0
		    , synapse
	 	    , synapse_data
		    , cached_synapse_data
		    , cached_synapse_id;

		synapse_hash = Public.prototype.utilities.getId( synapse_data );
		synapse_data[ 'hash' ] = synapse_hash;
		synapse_data[ 'strength' ] = Public.prototype.defaults.get( 'strength' );

		cached_synapse_id = Cache.get( { 'key': ( 'synapses.hashes.' + synapse_hash ) } );
		if ( 'undefined' !== typeof cached_synapse_id && null !== cached_synapse_id ) {
			var cached_synapse = Cache.get( { 'key': ( 'synapses.data.' + cached_synapse_id ) } );
		}

		cached_synapse_id = Cache.get( { 'key': ( 'synapses.hashes.' + synapse_data.hash ) } );

		if ( 'undefined' !== typeof cached_synapse_id && null !== cached_synapse_id ) {
			cached_synapse_data = Cache.get( { 'key': ( 'synapses.data.' + cached_synapse_id ) } );
		}

		if ( synapse_data !== cached_synapse_data && ( 'undefined' === typeof cached_synapse_id || null === cached_synapse_id || 'undefined' === typeof cached_synapse_data || null === cached_synapse_data ) ) {

			Network.get( {  'type': 'synapse', 'on_success': function( returned_synapse ) {
			
				synapse_id = returned_synapse.id;
				console.log("GOT IT",returned_synapse);
				if ( true === debug ) {
					console.log( 'Public.prototype.add Network.put error > Network.get success', JSON.stringify( returned_synapse ) );
				}

				Cache.set( { 'key': ( 'synapses.data.' + synapse_id ), 'value': returned_synapse, 'ttl': 300 } );
				Cache.set( { 'key': ( 'synapses.hashes.' + synapse_data.hash ), 'value': synapse_id, 'ttl': 300 } );

				if ( true === return_existing ) {
					synapses.push( synapse_id );
				}

				if ( 'function' === typeof on_success ) {
					on_success( returned_synapse );
				}				

			}, 'on_error': function( context ) {
				
				if ( true === debug ) {
					console.log( 'Public.prototype.add Network.put error > Network.get error', context );
				}

				Cache.delete( { 'key': ( 'synapses.hashes.' + synapse_data.hash ) } );

				if ( 'function' === typeof on_error ) {
					on_error( context );
				}

				Network.put( {  'type': 'synapse', 'on_success': function( synapse_id ) {

					synapse_data.id = synapse_id;
					
					Cache.set( { 'key': ( 'synapses.data.' + synapse_id ), 'value': synapse_data, 'ttl': 300 } );

					Cache.set( { 'key': ( 'synapses.hashes.' + synapse_data.hash ), 'value': synapse_id, 'ttl': 300 } );
					
					synapses.push( synapse_id );
					
					if ( 'function' === typeof on_success ) {
						on_success( synapse_data );
					}				

				}, 'on_error': function( context ) {
				
					if ( true === debug ) {
						console.log( 'Public.prototype.add Network.put error', context );
					}

				Cache.delete( { 'key': ( 'synapses.hashes.' + synapse_data.hash ) } );

				if ( 'function' === typeof on_error ) {
					on_error();
				}

				}, 'data': synapse_data } );

			}, 'index': 'hash', 'key': synapse_data.hash, 'expecting': { 'type': 'hidden' } } );


		} else {

			if ( true === return_existing ) {

				synapses.push( cached_synapse_id );

				if ( 'function' === typeof on_success ) {
					on_success( cached_synapse_data );
				}

			}

		}

	};
	
	//Synapses
	Public.prototype.addOrGetSynapses = function( req ) {

		var additions = []
		    , incoming = req.value || []
		    , incoming_length = incoming.length || 0
		    , synapses = []
		    , synapses_length = 0
		    , expected_actions = synapses_length
		    , on_success = req.on_success || null
		    , on_error = req.on_error || null
		    , on_complete = req.on_complete || null
		    , return_existing = req.return_existing
		    , on_success = req.on_success || null
		    , on_error = req.on_error || null
		    , on_complete = req.on_complete || null
		    , own_on_success
		    , own_on_error
		    , own_on_complete
		    , x = 0
		    , neuron_hash = ''
		    , neurons = []
		    , arr = []
		    , neurons_length = 0
		    , neuron
		    , request
	 	    , neuron_data
		    , cached_neuron_data
		    , cached_neuron_id;

		for( x = 0; x < incoming_length; x += 1 ) {

			synapse = incoming[ x ];
			additions.push( { 'to': synapse.to, 'to_type': synapse.to_type, 'from': synapse.from, 'from_type': synapse.from_type } );

		}
		
		if ( true !== return_existing ) {
			return_existing = false;
		}

		own_on_success = function( passed_synapse ) {
	
			if ( !!debug ) {
				console.log( 'Public.prototype.addOrGetSynapses > success', passed_synapse );
			}

			synapse_id = passed_synapse.id;
			synapses.push( synapse_id );

			if ( 'function' === typeof on_success ) {
				on_success( passed_synapse );
			}
			
			if ( synapses.length >= expected_actions ) {
				own_on_complete( synapses );
			}

		};

		own_on_error = function( context ) {
			
			if ( !!debug ) {
				console.log( 'Public.prototype.addOrGetSynapses > error', context );
			}
		
			expected_actions -= 1;
			
			if ( 'function' === typeof on_error ) {
				on_error( context );
			}
			if ( neurons.length >= expected_actions ) {
				own_on_complete( synapses );
			}

		};

		own_on_complete = function( passed_synapses ) {
			if ( !!debug ) {
				console.log( 'Public.prototype.addOrGetSynapses > complete', passed_synapses );
			}
			if ( synapses.length >= expected_actions ) {
				if ( 'function' === typeof on_complete ) {
					on_complete( passed_synapses );
				}
			}
		};

		expected_actions = Public.prototype.countAttributes( additions );
		for( x in additions ) {
			if ( additions.hasOwnProperty( x ) ) {
		
				synapse = additions[ x ];
		
				if ( 'object' !== typeof synapse ) {
					throw( 'Neuron must be an object' );
				}
		
				request = { 'value': synapse, 'on_success': own_on_success, 'on_error': own_on_error, 'return_existing': return_existing }; 
				Public.prototype.addOrGetSynapse( request );
		
			}
		}
		
		return this;	

	}

	//Synapses
	Public.prototype.addOrUpdateSynapses = function( req ) {

		var additions = []
		    , incoming = req.value || []
		    , incoming_length = incoming.length || 0
		    , synapses = []
		    , synapses_length = 0
		    , expected_actions = synapses_length
		    , on_success = req.on_success || null
		    , on_error = req.on_error || null
		    , on_complete = req.on_complete || null
		    , return_existing = req.return_existing
		    , on_success = req.on_success || null
		    , on_error = req.on_error || null
		    , on_complete = req.on_complete || null
		    , own_on_success
		    , own_on_error
		    , own_on_complete
		    , x = 0
		    , neuron_hash = ''
		    , neurons = []
		    , arr = []
		    , neurons_length = 0
		    , neuron
		    , request
	 	    , neuron_data
		    , cached_neuron_data
		    , cached_neuron_id;

		for( x = 0; x < incoming_length; x += 1 ) {

			synapse = incoming[ x ];
			additions.push( { 'to': synapse.to, 'to_type': synapse.to_type, 'from': synapse.from, 'from_type': synapse.from_type } );

		}

		if ( true !== return_existing ) {
			return_existing = false;
		}

		own_on_success = function( passed_synapse ) {
	
			if ( !!debug ) {
				console.log( 'Public.prototype.addOrGetNeuron > success', passed_synapse );
			}

			synapse_id = passed_synapse.id;

			if ( 'undefined' !== typeof synapse_id ) {
				synapses.push( synapse_id );
			}

			if ( 'function' === typeof on_success ) {
				on_success( passed_synapse );
			}
			
			if ( synapses.length >= expected_actions ) {
				own_on_complete( synapses );
			}

		};

		own_on_error = function( context ) {
			
			if ( !!debug ) {
				console.log( 'Public.prototype.addOrGetNeurons > error', context );
			}
		
			expected_actions -= 1;
			
			if ( 'function' === typeof on_error ) {
				on_error( context );
			}

			if ( neurons.length >= expected_actions ) {
				own_on_complete( synapses );
			}

		};

		own_on_complete = function( passed_synapses ) {
			
			if ( !!debug ) {
				console.log( 'Public.prototype.addOrGetNeurons > complete', passed_synapses );
			}
			
			if ( synapses.length >= expected_actions ) {
				if ( 'function' === typeof on_complete ) {
					on_complete( passed_synapses.sort( function(a,b){return (a<b) ? -1 : 1; } ) );
				}
			}

		};

		expected_actions = Public.prototype.countAttributes( additions );

		additions = additions.sort( function(a,b){return (a<b) ? -1 : 1; } );
		for( x in additions ) {
			if ( additions.hasOwnProperty( x ) ) {
		
				synapse = additions[ x ];
		
				if ( 'object' !== typeof synapse ) {
					throw( 'Neuron must be an object' );
				}
		
				request = { 'value': synapse, 'on_success': own_on_success, 'on_error': own_on_error, 'return_existing': return_existing }; 

				Public.prototype.addOrUpdateSynapse( request );
		
			}
		}
		
		return this;	

	}


	//xxx
	//TODO: Have each of these aggresively cache

	Public.prototype.addOrGetInputNeurons = function( req ) {

		var additions = []
		    , tokens = req.tokens || []
		    , tokens_length = tokens.length || 0
		    , expected_actions = tokens.length
		    , on_success = req.on_success || null
		    , on_error = req.on_error || null
		    , on_complete = req.on_complete || null
		    , return_existing = req.return_existing
		    , on_success = req.on_success || null
		    , on_error = req.on_error || null
		    , on_complete = req.on_complete || null
		    , own_on_success
		    , own_on_error
		    , own_on_complete
		    , x = 0
		    , neuron_hash = ''
		    , neurons = []
		    , arr = []
		    , neurons_length = 0
		    , neuron
		    , request
	 	    , neuron_data
		    , cached_neuron_data
		    , cached_neuron_id;

		for( x = 0; x < tokens_length; x += 1 ) {
			additions.push( { 'display': tokens[ x ] } );
		}

		if ( true !== return_existing ) {
			return_existing = false;
		}
		
		own_on_success = function( passed_neuron ) {

			if ( !!debug ) {
				console.log( 'Public.prototype.addOrGetNeuron > success', passed_neuron );
			}
			neuron_id = passed_neuron.id;
		
			neurons.push( neuron_id );
			if ( 'function' === typeof on_success ) {
				on_success( passed_neuron );
			}
			
			if ( neurons.length >= expected_actions ) {
				own_on_complete( neurons );
			}

		};

		own_on_error = function( context ) {
			
			if ( !!debug ) {
				console.log( 'Public.prototype.addOrGetNeurons > error', context );
			}
			expected_actions -= 1;
			
			if ( 'function' === typeof on_error ) {
				on_error( context );
			}
			
			if ( neurons.length >= expected_actions ) {
				own_on_complete( neurons );
			}

		};

		own_on_complete = function( passed_neurons ) {
			if ( !!debug ) {
				console.log( 'Public.prototype.addOrGetNeurons > complete', passed_neurons );
			}
			if ( neurons.length >= expected_actions ) {
				if ( 'function' === typeof on_complete ) {
					on_complete( passed_neurons );
				}
			}
		};

		expected_actions = Public.prototype.countAttributes( additions );

		for( x in additions ) {
			if ( additions.hasOwnProperty( x ) ) {
		
				neuron = additions[ x ];
		
				if ( 'object' !== typeof neuron ) {
					throw( 'Neuron must be an object' );
				}
		
				if ( 'undefined' === typeof neuron.display ) {
					throw( 'Neuron.display must be set' );
				}

				arr = [ neuron.display, 'input' ];
		
				neuron.hash = Public.prototype.utilities.getId( arr );
				neuron.type = 'input';
		
				request = { 'value': neuron, 'on_success': own_on_success, 'on_error': own_on_error, 'return_existing': return_existing }; 
		
				Public.prototype.addOrGetNeuron( request );
		
			}
		}
		
		return this;	

	}

	//xxx
	Public.prototype.activateOutput = function( request ) {

		var output = request.output
		  , input = request.input
		  , on_success = request.on_success
		  , on_error = request.on_complete
		  , on_complete = request.on_complete
		  , expected_actions = 0
		  , action_count = 0
		  , synapses = [];

		//xx
		Network.addOrGetInputNeurons( { 'return_existing': true, 'tokens': input, 'on_success': function(neuron){
		
		} , 'on_error': function(){
		
		}, 'on_complete': function( input_ids ) {

			//begin
			Network.addOrGetOutputNeurons( { 'return_existing': true, 'tokens': output, 'on_success': function( output_neuron ){
				if ( 'function' === typeof on_success ) {
					on_success( output_neuron );
				}		
			}, 'on_error': function( context ){
				if ( 'function' === typeof on_error ) {
					on_error( context );
				}
			}, 'on_complete': function( output_ids ) {

				Network.addOrGetHiddenNeurons(
					{ 'return_existing': true
					, 'tokens': input
					, 'on_success': function( hidden_neuron ){
						if ( 'function' === typeof on_success ) {
							on_success( hidden_neuron );
						}
					}, 'on_error': function( context ){
						if ( 'function' === typeof on_error ) {
							on_error( context );
						}
					}, 'on_complete': function( hidden_ids ) {


			
						synapses = Public.prototype.zipSynapses( 'hidden', hidden_ids, 'output', output_ids );
						
						var syn2 = Public.prototype.zipSynapses( 'input', input_ids, 'hidden', hidden_ids );
						var syn2_len = syn2.length;
						for( var z = 0; z < syn2_len; z+=1) {
							synapses.push( syn2[z] );
						}

						Network.addOrUpdateSynapses( {
						    'return_existing': true
						    , 'value': synapses
						    , 'on_success': function (synapse) {

							    /*if ( 'function' === typeof on_success ) {
								on_success( synapses );
							    }*/
						    
						    }, 'on_complete': function ( synapses ) {
							
    							partial_network = Network.buildNetwork( input_ids, hidden_ids, output_ids, synapses );
							if ( 'function' === typeof on_complete ) {
								on_complete( partial_network );
							}
						    
						    }
						
						} );


					}
				} );

			} } );
			//end
		} } );
	}

	//xxx
	//Hidden neurons

	Public.prototype.addOrGetHiddenNeurons = function( req ) {


		var additions = []
		    , tokens = req.tokens || []
		    , tokens_length = tokens.length || 0
		    , expected_actions = 0
		    , on_success = req.on_success || null
		    , on_error = req.on_error || null
		    , on_complete = req.on_complete || null
		    , return_existing = req.return_existing
		    , on_success = req.on_success || null
		    , on_error = req.on_error || null
		    , on_complete = req.on_complete || null
		    , own_on_success
		    , own_on_error
		    , own_on_complete
		    , x = 0
		    , y = 0
		    , display_count = 0
		    , neuron_hash = ''
		    , neurons = []
		    , arr = []
		    , neurons_length = 0
		    , neuron
		    , request
	 	    , neuron_data
		    , cached_neuron_data
		    , cached_neuron_id;

		for( x = 0; x < tokens_length; x += 1 ) {
			additions.push( { 'display': tokens[ x ] } );
		}

		if ( true !== return_existing ) {
			return_existing = false;
		}
			
		own_on_success = function( passed_neuron ) {

			if ( !!debug ) {
				console.log( 'Public.prototype.addOrGetNeuron > success', passed_neuron );
			}

			neuron_id = passed_neuron.id;
			neurons.push( neuron_id );

			if ( 'function' === typeof on_success ) {
				on_success( passed_neuron );
			}
		
			if ( neurons.length >= expected_actions ) {
				own_on_complete( neurons );
			}

		};

		own_on_error = function( context ) {
			
			if ( !!debug ) {
				console.log( 'Public.prototype.addOrGetNeurons > error', context );
			}
			expected_actions -= 1;
			
			if ( 'function' === typeof on_error ) {
				on_error( context );
			}
			
			if ( neurons.length >= expected_actions ) {
				own_on_complete( neurons );
			}

		};

		own_on_complete = function( passed_neurons ) {
			if ( !!debug ) {
				console.log( 'Public.prototype.addOrGetNeurons > complete', passed_neurons );
			}
			if ( neurons.length >= expected_actions ) {
				if ( 'function' === typeof on_complete ) {
					on_complete( passed_neurons );
				}
			}
		};

		hiddens = Public.prototype.getHiddenIds( tokens );
		expected_actions = Public.prototype.countAttributes( hiddens );
		for( x in hiddens ) {
			if ( hiddens.hasOwnProperty( x ) ) {
		
				neuron = {};
				neuron.display = [];
				display = hiddens[ x ];
				arr = [];	
				if ( 'string' === typeof display ) {	
					arr = [ display ];
				} else {
					display_count = 0;
					if ( 'undefined' !== typeof display.length ) {
						display_count = display.length;
					}
					for( y = 0; y < display_count; y += 1 ) {
						var d = display[ y ];
						arr.push( d );
						neuron.display.push( d );
					}
				}
				var new_arr = arr.slice(0);
				//new_arr.push( 'hidden' );
				//uuu
				neuron.hash = Public.prototype.utilities.getId( new_arr );
				neuron.type = 'hidden';
					
				request = { 'value': neuron, 'on_success': own_on_success, 'on_error': own_on_error, 'return_existing': return_existing }; 
		
				Public.prototype.addOrGetNeuron( request );
		
			}
		}
		
		return this;	

	}

	//Output
	Public.prototype.addOrGetOutputNeurons = function( req ) {

		var additions = []
		    , tokens = req.tokens || []
		    , tokens_length = tokens.length || 0
		    , expected_actions = tokens.length
		    , on_success = req.on_success || null
		    , on_error = req.on_error || null
		    , on_complete = req.on_complete || null
		    , return_existing = req.return_existing
		    , on_success = req.on_success || null
		    , on_error = req.on_error || null
		    , on_complete = req.on_complete || null
		    , own_on_success
		    , own_on_error
		    , own_on_complete
		    , x = 0
		    , neuron_hash = ''
		    , neurons = []
		    , arr = []
		    , neurons_length = 0
		    , neuron
		    , request
	 	    , neuron_data
		    , cached_neuron_data
		    , cached_neuron_id;

		for( x = 0; x < tokens_length; x += 1 ) {
			additions.push( { 'display': tokens[ x ] } );
		}

		if ( true !== return_existing ) {
			return_existing = false;
		}
		
		own_on_success = function( passed_neuron ) {
	
			if ( !!debug ) {
				console.log( 'Public.prototype.addOrGetNeuron > success', passed_neuron );
			}
			neuron_id = passed_neuron.id;
			neurons.push( neuron_id );

			if ( 'function' === typeof on_success ) {
				on_success( passed_neuron );
			}
			
			if ( neurons.length >= expected_actions ) {
				own_on_complete( neurons );
			}

		};

		own_on_error = function( context ) {
			
			if ( !!debug ) {
				console.log( 'Public.prototype.addOrGetNeurons > error', context );
			}
			expected_actions -= 1;
			
			if ( 'function' === typeof on_error ) {
				on_error( context );
			}
			
			if ( neurons.length >= expected_actions ) {
				own_on_complete( neurons );
			}

		};

		own_on_complete = function( passed_neurons ) {
			if ( !!debug ) {
				console.log( 'Public.prototype.addOrGetNeurons > complete', passed_neurons );
			}
			if ( neurons.length >= expected_actions ) {
				if ( 'function' === typeof on_complete ) {
					on_complete( passed_neurons );
				}
			}
		};

		expected_actions = Public.prototype.countAttributes( additions );

		for( x in additions ) {
			if ( additions.hasOwnProperty( x ) ) {
		
				neuron = additions[ x ];
		
				if ( 'object' !== typeof neuron ) {
					throw( 'Neuron must be an object' );
				}
		
				if ( 'undefined' === typeof neuron.display ) {
					throw( 'Neuron.display must be set' );
				}
		
				if ( 'string' === typeof neuron.display ) {	
					arr = [ neuron.display, 'output' ];
				} else {

					display_count = display.length;
					for( y = 0; y < display_count; y += 1 ) {
						arr.push( display[ x ] );
					}
					arr.push( 'output' );
				}
		
				neuron.hash = Public.prototype.utilities.getId( arr );
				neuron.type = 'output';
		
				request = { 'value': neuron, 'on_success': own_on_success, 'on_error': own_on_error, 'return_existing': return_existing }; 
		
				Public.prototype.addOrGetNeuron( request );
		
			}
		}
		
		return this;	

	}

/*
	Public.prototype.addOutputNeurons = function( req ) {

		var hidden_ids = req.hidden_ids
		    , output_ids = req.output_ids
		    , on_success = req.on_success || null
		    , on_error = req.on_error || null
		    , on_complete = req.on_complete || null;	

		//

	}
*/

	Public.prototype.getHiddenIds = function( tokens ) {

		var a = 0
		    , b = 0
		    , c = 0
		    , hiddens = {}
		    , aa
		    , bb
		    , cc
		    , arr = []
		    , tokens_length = tokens.length
	 	    , neuron_data
		    , hidden_id
		    , cached_hidden_neuron_data
		    , cached_hidden_neuron_id;

		for( a = 0; a < tokens_length; a += 1 ) {

			aa = tokens[ a ];

			arr = [ aa ];
			hidden_id = Public.prototype.utilities.getId( [ aa ] );
			hiddens[ hidden_id ] = arr;	

			for( b = 0; b < tokens_length; b += 1 ) {
				bb = tokens[ b ];
				if ( aa !== bb ) {
					arr = [ aa, bb ];
					hidden_id = Public.prototype.utilities.getId( [ aa, bb, 'hidden' ] );
					hiddens[ hidden_id ] = arr;

					for( c = 0; c < tokens_length; c += 1 ) {
						cc = tokens[ c ];
						if ( aa !== cc && bb !== cc && aa !== bb ) {
							arr = Public.prototype.utilities.alphaSortArray( [ aa, bb, cc ] );
							hidden_id = Public.prototype.utilities.getId( [ aa, bb, cc, 'hidden' ] );
							hiddens[ hidden_id ] = arr;
						}
					}

				}
			}
		}

		return hiddens;
	}


	Public.prototype.addHiddenNeurons = function( req ) {

		var tokens = req.tokens
		    , return_existing = req.return_existing
		    , tokens_length = tokens.length
		    , expected_actions = 0
		    , hidden_ids = []
		    , on_success = req.on_success || null
		    , on_error = req.on_error || null
		    , on_complete = req.on_complete || null
		    , a = 0
		    , b = 0
		    , c = 0
		    , x = 0
		    , hidden_hash = ''
		    , hiddens = {}
		    , aa
		    , bb
		    , cc
		    , arr = []
		    , hiddens_length = 0
		    , hidd
	 	    , neuron_data
		    , hidden_id
		    , cached_hidden_neuron_data
		    , cached_hidden_neuron_id;
		if ( true !== return_existing ) {
			return_existing = false;
		}

		for( a = 0; a < tokens_length; a += 1 ) {

			aa = tokens[ a ];

			arr = [ aa ];
			hidden_id = Public.prototype.utilities.getId( arr );
			hiddens[ hidden_id ] = {
				'display': arr	
				, 'hash': hidden_id
			};

			for( b = 0; b < tokens_length; b += 1 ) {
				bb = tokens[ b ];
				if ( aa !== bb ) {
					arr = [ aa, bb ];
					hidden_id = Public.prototype.utilities.getId( arr );
					hiddens[ hidden_id ] = {
						'display': arr	
						, 'hash': hidden_id
					};

					for( c = 0; c < tokens_length; c += 1 ) {
						cc = tokens[ c ];
						if ( aa !== cc && bb !== cc && aa !== bb ) {
							arr = Public.prototype.utilities.alphaSortArray( [ aa, bb, cc ] );
							hidden_id = Public.prototype.utilities.getId( arr );
							hiddens[ hidden_id ] = {
								'display': arr
								, 'hash': hidden_id
							};
						}
					}

				}
			}
		}

		expected_actions = Public.prototype.countAttributes( hiddens );
		for( x in hiddens ) {
			if ( hiddens.hasOwnProperty( x ) ) {
				( function() {
					//yyy
					//
					var neuron_data = {
						'type': 'hidden'
						, 'hash': hiddens[ x ].hash
						, 'display': hiddens[ x ].display
					};

					cached_hidden_neuron_id = Cache.get( { 'key': ( 'neurons.hashes.' + neuron_data.hash ) } );
					if ( 'undefined' !== typeof cached_hidden_neuron_id && null !== cached_hidden_neuron_id ) {
						cached_hidden_neuron_data = Cache.get( { 'key': ( 'neurons.data.' + cached_hidden_neuron_id ) } );
					}

					if ( neuron_data !== cached_hidden_neuron_data && ( 'undefined' === typeof cached_hidden_neuron_id || null === cached_hidden_neuron_id || 'undefined' === typeof cached_hidden_neuron_data || null === cached_hidden_neuron_data ) ) {

						Network.put( {  'type': 'neuron', 'on_success': function( hidden_id ) {

							Cache.set( { 'key': ( 'neurons.data.' + hidden_id ), 'value': neuron_data, 'ttl': 300 } );
							Cache.set( { 'key': ( 'neurons.hashes.' + neuron_data.hash ), 'value': hidden_id, 'ttl': 300 } );

							hidden_ids.push( hidden_id );
			
							if ( 'function' === typeof on_success ) {
								on_success( hidden_id );
							}				

							if ( hidden_ids.length >= expected_actions ) {
								if ( 'function' === typeof on_complete ) {
									on_complete( hidden_ids );
								}
							}

						}, 'on_error': function( context ) {
						
		
							if ( true === debug ) {
								console.log( 'Public.prototype.add Network.put error', context );
							}

							if ( true === return_existing ) {
								Network.get( {  'type': 'neuron', 'on_success': function( hidden_neuron ) {
								
									hidden_id = hidden_neuron.id;

									if ( true === debug ) {
										console.log( 'Public.prototype.add Network.put error > Network.get success', JSON.stringify(hidden_neuron) );
									}

									Cache.set( { 'key': ( 'neurons.data.' + hidden_id ), 'value': hidden_neuron, 'ttl': 300 } );
									Cache.set( { 'key': ( 'neurons.hashes.' + neuron_data.hash ), 'value': hidden_id, 'ttl': 300 } );

									hidden_ids.push( hidden_id );
					
									if ( 'function' === typeof on_success ) {
										on_success( hidden_id );
									}				
									if ( hidden_ids.length >= expected_actions ) {
										if ( 'function' === typeof on_complete ) {
											on_complete( hidden_ids );
										}
									}

								}, 'on_error': function( context ) {
									
									if ( true === debug ) {
										console.log( 'Public.prototype.add Network.put error > Network.get error', context );
									}

									Cache.delete( { 'key': ( 'neurons.hashes.' + hidden_hash ) } );

									if ( 'function' === typeof on_error ) {
										on_error( context );
									}

									expected_actions -= 1;

									if ( hidden_ids.length >= expected_actions ) {
										if ( 'function' === typeof on_complete ) {
											on_complete( hidden_ids );
										}
									}

								}, 'index': 'hash', 'key': neuron_data.hash, 'expecting': { 'type': 'hidden' } } );

							} else {

								Cache.delete( { 'key': ( 'neurons.hashes.' + hidden_hash ) } );

								expected_actions -= 1;
								
								if ( 'function' === typeof on_error ) {
									on_error();
								}

								if ( hidden_ids.length >= expected_actions ) {
									if ( 'function' === typeof on_complete ) {
										on_complete( hidden_ids );
									}
								}

							}

						}, 'data': neuron_data } );

					} else {

						if ( true === return_existing ) {
						
							hidden_ids.push( cached_hidden_neuron_id );
						
						} else {
						
							expected_actions -= 1;
						
						}

						if ( hidden_ids.length >= expected_actions ) {
							if ( 'function' === typeof on_complete ) {
								on_complete( hidden_ids );
							}
							return this;

						}

					}
			
				}() );
			}

		}
		
		return this;	

	}


	
	Public.prototype.train = function( req ) {

		var tokens = req.tokens
		    , output = req.output
		    , strength = req.output
		    , on_success = req.on_success || null
		    , on_error = req.on_error || null
		    , on_complete = req.on_complete || null;

		
		// Add/get hidden neuron ids
		// Fetch the input neuron ids from tokens
		//
		// Get or create an output neuron

	}

	/* TODO: What is the role of this? */
	Public.prototype.activate = function( req ) {

		var tokens = req.tokens
		    , on_success = req.on_success || null
		    , on_error = req.on_error || null
		    , on_complete = req.on_complete || null;

		if ( 'string' === tokens ) {
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


		hidden_layer_callback = function( hidden_id ) {

			if ( true === debug ) {
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
				if ( 'undefined' !== typeof cached_input_id ) {
					cached_input_neuron = Cache.get( { 'key': ( 'neurons.data.' + cached_input_id ) } );
				}
				if ( cached_input_neuron !== new_neuron_data && ( 'undefined' === typeof cached_input_id || null === cached_input_id || 'undefined' === cached_input_neuron || null === cached_input_neuron ) ) {

					Network.put( {  'type': 'neuron', 'on_success': function( neuron_id ) {
			
						if ( true === debug ) {
							console.log( 'Public.prototype.add Network.put success', neuron_id );
						}

						Cache.set( { 'key': ( 'neurons.data.' + neuron_id + '.hash' ), 'value': token_hash, 'ttl': 300 } );
						Cache.set( { 'key': ( 'neurons.hashes.' + token_hash ), 'value': neuron_id, 'ttl': 300 } );

						if ( 'undefined' !== typeof on_success ) {
							on_success( { 'type': 'neuron', 'subtype': 'input', 'value': neuron_id, 'action': 'put', 'cached': false } );
						}
						
						synapse_callback( hidden_id, neuron_id );

					}, 'on_error': function( context ) {
					
						if ( true === debug ) {
							console.log( 'Public.prototype.add > Network.put success > Network.put error', context );
						}

						var cached_input_neuron = Cache.get( { 'key': ( 'neurons.hashes.' + token_hash ) } );
						
						if ( 'undefined' === typeof cached_input_neuron || null === cached_input_neuron ) {
							/* Either there was some sort of data error, or,
							 * more likely, the neuron already exists. Before actually throwing the error,
							 * try to look up the neuron by its hash. If not found, then throw the error. */
							Network.get( {  'type': 'neurons', 'on_success': function( input_neuron_result ) {
						
								var resulting_input_neuron_id = input_neuron_result.id;
								
								if ( true === debug ) {
									console.log( 'Public.prototype.add > Network.put success > Network.put error > Network.get success', JSON.stringify(resulting_input_neuron_id) );
								}
								
								if ( 'undefined' !== typeof on_success ) {
									on_success( { 'type': 'neuron', 'subtype': 'input', 'action': 'get', 'key': token_hash, 'value': resulting_input_neuron_id, 'cached': false } );
								}
								Cache.set( { 'key': ( 'neurons.hashes.' + token_hash ), 'value': resulting_input_neuron_id, 'ttl': 300 } );
								Cache.set( { 'key': ( 'neurons.data.' + resulting_input_neuron_id ), 'value': input_neuron_result, 'ttl': 300 } );

								synapse_callback( hidden_id, input_neuron_result );

							}, 'on_error': function( context ) {
								
								if ( true === debug ) {
									console.log( 'Public.prototype.add > Network.put success > Network.put error > Network.get error', context );
								}

								if ( 'function' === typeof on_error ) {
									on_error( context );
								}
								
								Cache.delete( { 'key': ( 'neurons.hashes.' + token_hash ) } );

							}, 'index': 'hash', 'key': token_hash, 'expecting': { 'type': 'input' }  } );
						} else {

							if ( 'undefined' !== typeof on_success ) {
								on_success( { 'type': 'neuron', 'subtype': 'input', 'action': 'get', 'key': token_hash, 'value': cached_input_neuron, 'cached': true } );
							}

							synapse_callback( hidden_id, cached_input_neuron );

						}

					}, 'data': new_neuron_data } );

				} else {

					if ( 'undefined' !== typeof on_success ) {

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

			if ( 'undefined' !== typeof cached_synapse_id && null !== cached_synapse_id ) {
				var cached_synapse = Cache.get( { 'key': ( 'synapses.data.' + cached_synapse_id ) } );
				console.log("CAMP BUDDY",JSON.stringify({ 'key': ( 'synapses.data.' + cached_synapse_id ) }), cached_synapse );
			}
			if ( ( 'undefined' === typeof cached_synapse || null === cached_synapse ) && new_synapse_data !== cached_synapse ) {

				Network.put( { 'type': 'synapse', 'on_success': function( synapse_id ) {

					if ( true === debug ) {
						console.log( 'Public.prototype.add > Network.put success > Network.put success', synapse_id );
					}
			
					new_synapse_data.id = synapse_id;
console.log("AWSOME",JSON.stringify(new_synapse_data));
					Cache.set( { 'key': ( 'neurons.data.' + input_neuron_id + '.synapses.' + synapse_id ), 'value': new_synapse_data, 'ttl': 300 } );
					Cache.set( { 'key': ( 'synapses.data.' + synapse_id ), 'value': new_synapse_data, 'ttl': 300 } );
					Cache.set( { 'key': ( 'synapses.hashes.' + new_synapse_data.hash  ), 'value': synapse_id, 'ttl': 300 } );
					if ( 'undefined' !== typeof on_success ) {
						on_success( { 'type': 'synapse', 'action': 'put', 'data': new_synapse_data, 'result': synapse_id, 'cached': false, 'updated': false } );
					}

				}, 'on_error': function( context ) {
				
					if ( true === debug ) {
						console.log( 'Public.prototype.add > Network.put success > Network.put error', context );
					}

					/* Either there was some sort of data or database error, or 
					 * the synapse just already exists. If that's the case, emit it as a success. 
					 * Else, throw the error */
					var cached_synapse_data = Cache.get( { 'key': ( 'synapses.hashes.' + synapse_hash ) } );
					if ( 'undefined' === typeof cached_synapse_data || null === cached_synapse_data ) {
						Network.get( {  'type': 'synapse', 'on_success': function( returned_synapse_data ) {
					
							if ( true === debug ) {
								console.log( 'Public.prototype.add > Network.put success > Network.put error > Network.get success', returned_synapse_data );
							}

							if ( 'undefined' !== typeof returned_synapse_data && 'undefined' !== typeof returned_synapse_data.id ) {
								Cache.set( { 'key': ( 'synapses.data.' + returned_synapse_data.id ), 'value': returned_synapse_data, 'ttl': 300 } );
							}

							Cache.set( { 'key': ( 'synapses.hashes.' + synapse_hash ), 'value': returned_synapse_data.id, 'ttl': 300 } );

							//update if exists, on success return new neuron
							/* Synapse Update Single */
							Network.update( {  'type': 'synapse', 'on_success': function( finished_value ) {
	
								if ( 'undefined' !== typeof on_success ) {
									on_success( { 'type': 'synapse', 'action': 'get', 'result': finished_value, 'cached': false, 'updated': true } );
								}

								if ( true === debug ) {
									console.log( 'success', finished_value );
								}
							}, 'on_error': function( context ) {
						
								if ( true === debug ) {
									console.log( 'error', context );
						
								}
							}, 'on_complete': function() {
						
								if ( true === debug ) {
									console.log( 'complete' );
								}	
							}, 'key': returned_synapse_data.id, 'data': { 'strength': function( previous ) {
								
								if ( true === debug ) {
									console.log( 'Public.prototype.update > Previous', previous );
								}

								var next = ( 'number' === typeof previous ) ? Public.prototype.incrementer( previous, { 'hash': synapse_hash } ) : 0;

								returned_synapse_data.strength = next;

								if ( 'undefined' !== typeof returned_synapse_data.id ) {

									Cache.set( { 'key': ( 'synapses.data.' + returned_synapse_data.id ), 'value': returned_synapse_data, 'ttl': 300 } );
								
								}

								if ( true === debug ) {
									console.log( 'Updating', next, returned_synapse_data );
								}

								return next; 

							} } } );  

						}, 'on_error': function( context ) {
							
							if ( true === debug ) {
								console.log( 'Public.prototype.add > Network.put success > Network.put error > Network.get error', context );
							}
							
							Cache.delete( { 'key': ( 'synapses.hashes.' + synapse_hash ) } );
						
							if ( 'function' === typeof on_error ) {
								on_error( context );
							}

						}, 'index': 'hash', 'key': synapse_hash } );
					} else {

						Network.update( {  'type': 'synapse', 'on_success': function( finished_value ) {
							if ( true === debug ) {
								console.log( 'Public.prototype.update > Network.update > success', finished_value );
							}

							if ( 'undefined' !== typeof on_success ) {
								on_success( { 'type': 'synapse', 'action': 'update', 'value': finished_value, 'cached': true, 'updated': true } );
							}

						}, 'on_error': function( context ) {
					
							if ( true === debug ) {
								console.log( 'error', context );
							}

						}, 'on_complete': function() {
					
							if ( true === debug ) {
								console.log( 'complete' );
							}

						}, 'key': new_synapse_data.id, 'data': { 'strength': function( previous ) {

							if ( true === debug ) {
								console.log( 'Public.prototype.update > Previous', previous );
							}

							var next = ( 'number' === typeof previous ) ? Math.floor( Public.prototype.incrementer( previous, { 'hash': synapse_hash } ) ) : 0;

							new_synapse_data.strength = next;

							if ( 'undefined' !== typeof new_synapse_data.id ) {

								Cache.set( { 'key': ( 'synapses.data.' + new_synapse_data.id ), 'value': new_synapse_data, 'ttl': 300 } );
							
							}

							if ( true === debug ) {
								console.log( 'Updating', next, new_synapse_data );
							}

							return next; 

						} } } );  

					}

				}, 'data': new_synapse_data } );

			} else {

				//update if exists, on success return new neuron
				/* Synapse Update Single */
				Network.update( {  'type': 'synapse', 'on_success': function( finished_value ) {

					if ( true === debug ) {
						console.log( 'success', finished_value );
					}

					if ( 'undefined' !== typeof on_success ) {
						on_success( { 'type': 'synapse', 'action': 'update', 'result': finished_value, 'cached': true, 'updated': true } );
					}

				}, 'on_error': function( context ) {
			
					if ( true === debug ) {
						console.log( 'error', context );
					}

				}, 'on_complete': function() {
			
					if ( true === debug ) {
						console.log( 'complete' );
					}

				}, 'key': cached_synapse.id, 'data': { 'strength': function( previous ) {
					
					if ( true === debug ) {
						console.log( 'Public.prototype.update > Previous', previous );
					}

					var next = Public.prototype.incrementer( cached_synapse.strength, { 'hash': synapse_hash } );

					cached_synapse.strength = next;

					if ( 'undefined' !== typeof cached_synapse.id ) {
				

						Cache.set( { 'key': ( 'synapses.data.' + cached_synapse.id ), 'value': cached_synapse, 'ttl': 300 } );
					
					}

					if ( !!debug ) {
						console.log( 'Updating', next, cached_synapse );
					}

					return next; 

				} } } );  


			}

		};

	    // Add the hidden node for the group of tokens	
	
		var hidden_hashes = {};

		Network.addOrGetHiddenNeurons( { 'return_existing': true, 'tokens': tokens, 'on_success': function(neuron){
			if ( !!debug ) {
				console.log("Network.addOrGetHiddenNeurons > success > NEURON",neuron);
			}
			hidden_hashes[ neuron.id ] = neuron.hash;
		}, 'on_error': function(){
			if ( !!debug ) {
				console.log("Network.addOrGetHiddenNeurons > ERROR");
			}
		}, 'on_complete': function( result ) {
		
			var result_len = result.length;

			for( var z = 0; z < result_len; z += 1 ) {

				var result_id = result[ z ];
			
				//begin
				if ( !!debug ) {
					console.log("Network.addOrGetHiddenNeurons > COMPLETE", result );
				}

					hidden_hash = hidden_hashes[ result_id ];

					var neuron_data = {
						'type': 'hidden'
						, 'hash': hidden_hash
						, 'display': tokens
					};
					var cached_hidden_neuron_data;

					if ( 'undefined' !== typeof result_id && null !== result_id ) {
						cached_hidden_neuron_data = Cache.get( { 'key': ( 'neurons.data.' + result_id ) } );
					}

					if ( neuron_data !== cached_hidden_neuron_data && ( 'undefined' === typeof result_id || null === result_id || 'undefined' === typeof cached_hidden_neuron_data || null === cached_hidden_neuron_data ) ) {

						Network.put( {  'type': 'neuron', 'on_success': function( hidden_id ) {


							neuron_data.id = hidden_id;

							Cache.set( { 'key': ( 'neurons.data.' + hidden_id ), 'value': neuron_data, 'ttl': 300 } );
							Cache.set( { 'key': ( 'neurons.hashes.' + hidden_hash ), 'value': hidden_id, 'ttl': 300 } );

							if ( 'undefined' !== typeof on_success ) {
								on_success( { 'type': 'neuron', 'subtype': 'hidden', 'action': 'put', 'value': hidden_id } );
							}

							hidden_layer_callback( hidden_id );

						}, 'on_error': function( context ) {
							
							if ( true === debug ) {
								console.log( 'Public.prototype.add Network.put error', context );
							}

							/* Either there was some sort of data error or,
							 * more likely, it's already added and the new one 
							 * was not unique. In case of the latter, try to get the hidden layer id by hash */

							Network.get( {  'type': 'neurons', 'on_success': function( hidden_id ) {
								
								if ( true === debug ) {
									console.log( 'Public.prototype.add Network.put error > Network.get success', hidden_id );
								}

								Cache.set( { 'key': ( 'neurons.data.' + hidden_id ), 'value': neuron_data } );
								Cache.set( { 'key': ( 'neurons.hashes.' + hidden_hash ), 'value': hidden_id } );

								if ( 'undefined' !== typeof on_success ) {
									on_success( { 'type': 'neuron', 'subtype': 'hidden', 'action': 'get', 'value': hidden_id, 'cached': false } );
								}

								hidden_layer_callback( hidden_id );

							}, 'on_error': function( context ) {
								
								if ( true === debug ) {
									console.log( 'Public.prototype.add Network.put error > Network.get error', context );
								}

								Cache.delete( { 'key': ( 'neurons.hashes.' + hidden_hash ) } );

								if ( 'function' === typeof on_error ) {
									on_error( context );
								}

							}, 'index': 'hash', 'properties': [ 'id' ], 'key': hidden_hash, 'expecting': { 'type': 'hidden' } } );


						}, 'data': neuron_data } );

					} else {

						if ( 'undefined' !== typeof on_success ) {
							on_success( { 'type': 'neuron', 'subtype': 'hidden', 'action': 'put', 'value': result_id, 'cached': true } );
					}

					hidden_layer_callback( result_id );

				}

			}
			//end

		} } );


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
		    , tokens = request.tokens || request.input_ids //carryover
		    , current_layer = request.current_layer
		    , total_layers = request.total_layers
		    , on_success = request.on_success 
		    , on_error = request.on_error
		    , on_complete = request.on_complete;

		if ( true === debug ) {
			console.log( 'Public.prototype.getNetwork', result, tokens, current_layer, total_layers );
		}

		if ( 'string' === typeof tokens ) {
			tokens = [ tokens ];
		}

		if ( null === current_layer || 'undefined' === typeof current_layer ) {
			current_layer = 1;
		}

		if ( null === total_layers || 'undefined' === typeof total_layers ) {
			total_layers = current_layer + 1;
		}
		
		var own_on_complete = function( passed_result, completed_input, completed_synapses, completed_output ) {
	
			if ( true === debug ) {
				console.log( 'Public.prototype.getNetwork > own_on_complete()', completed_input, completed_synapses, completed_output );
			}

			var own_result = Public.prototype.buildNetwork( completed_input, completed_synapses, completed_output )
			  , own_result = Public.prototype.mergeObjects( passed_result, own_result );
			var completed_output_ids = []
			  , completed_output_length = completed_output.length
			  , b = 0;

			if ( current_layer < total_layers ) {

				for( b = 0; b < completed_output_length; b += 1 ) {
					if ( 'undefined' !== typeof completed_output[ b ] ) {
						var completed_id = completed_output[ b ].id;
						if ( 'undefined' !== typeof completed_id ) {
							completed_output_ids.push( completed_id );
						}
					}
				}

				Public.prototype.getNetwork( { 'result': own_result, 'input_ids': completed_output_ids, 'current_layer': ( current_layer + 1 ), 'total_layers': total_layers, 'on_success': on_success, 'on_error': on_error, 'on_complete': on_complete } );

			} else {
		
				if ( true === debug ) {
					console.log("Public.prototype.getNetwork > own_on_complete > FINISHED", passed_result);
				}
				
				if ( 'function' === typeof on_complete ) {
					on_complete( passed_result );
				}
			
			}
		};

		Public.prototype.getInputNeurons( result, tokens, on_success, on_error, own_on_complete );

		return this;
	}

	Public.prototype.mergeObjects = function( obj1, obj2, replace ) {

		if ( debug > 10 ) {
			console.log('Public.prototype.mergeObjects()',obj1, obj2, replace);
		}

		if ( true !== replace ) {
			replace = false;
		}	
		if ( 'undefined' === typeof obj1 ) {
			obj1 = {};
		}
		if ( 'undefined' === typeof obj2 ) {
			obj2 = {};
		}

		var obj3 = {}
		  , attr = ''
		  , x = 0
		  , obj1_length
		  , obj2_length
		  , obj2_type;

		if ( 'function' === typeof obj1.join ) {
			obj3 = [];
			obj1_length = obj1.length;
			for( x = 0; x < obj1_length; x += 1 ) {
				obj3.push( obj1[ x ] );
			}
			obj2_type = typeof obj2.join;
			if ( true === replace ) {
				obj3 = obj2;
			} else if ( 'function' === obj2_type && true !== replace ) {					
				for( x = 0; x < obj2_length; x += 1 ) {
					obj3.push( obj2[ x ] );
				}
			} else if ( 'function' === obj2_type ) {
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
			if ( obj1.hasOwnProperty( attr ) ) {
				var next = obj1[ attr ];
				if ( 'undefined' !== typeof next && Public.prototype.hasAttributes( next ) ) {
					obj3[ attr ] = Public.prototype.mergeObjects( obj3[ attr ], next );
				} else {
					obj3[ attr ] = next;
				}
			}
		}
		for( attr in obj2 ) {
			if ( obj2.hasOwnProperty( attr ) ) {
				var next = obj2[ attr ];
				if ( 'undefined' !== typeof next && Public.prototype.hasAttributes( next ) ) {
					obj3[ attr ] = Public.prototype.mergeObjects( obj3[ attr ], next );
				} else {
					obj3[ attr ] = next;
				}
			}
		}
		return obj3;
	}

	Public.prototype.getInputNeuronIds = function( request ) {

			var input_tokens = request.input_tokens
			  , on_success = request.on_success
			  , on_error = request.on_error
			  , on_complete = request.on_complete;
	
			if ( true === debug ) {
				console.log( 'Public.prototype.getNetwork getInputNeurons()', request );
			}

			var input_ids = []
			  , input_count = 0
			  , input_neuron_id
			  , input_neuron_token
			  , input_neuron_hash
			  , z = 0
			  , input_length = input_tokens.length
			  , expected_input_count = input_length
			  , cached_neuron;
			
			if ( 0 === input_length ) {
				if ( 'function' === typeof on_success ) {
					on_success( input_ids );
				}
				return this;
			}
			// For each input_id in input_ids
			for( z = 0; z < input_length; z += 1 ) {

				input_neuron_token = input_tokens[ z ];	
				input_neuron_hash = Public.prototype.utilities.getId( [ input_neuron_token, 'input' ] );
				// Get the cached neuron
				//
				if ( true === debug ) {
					console.log('Public.prototype.getInputNeuronIds hash', input_neuron_hash, 'token', input_neuron_token );
				}
	
				cached_neuron = Cache.get( { 'key': ( 'neurons.hashes.' + input_neuron_hash ) } );
				// Else get it from the database

				if ( 'undefined' === typeof cached_neuron || null === cached_neuron ) {

					/* Get Cursor Neurons With Secondary Index on From */
					Network.get( {  'type': 'neuron', 'on_success': function( input_neuron_value ) {
					
						if ( true === debug ) {
							console.log( 'Public.prototype.getTokens > get_input_neurons > Network.get cursor success', input_neuron_value );
						}

						if ( 'undefined' !== typeof input_neuron_value && 'undefined' !== input_neuron_value.id ) {
							Cache.set( { 'key': ( 'neurons.hashes.' + input_neuron_hash ), 'value': input_neuron_value.id, 'ttl': 300 } );
						}
						if ( 'undefined' !== typeof input_neuron_value && null !== input_neuron_value && 'undefined' !== input_neuron_value.id ) {
							input_ids.push( input_neuron_value.id );
					
						} else {
						
							expected_input_count -= 1;
						}

						if ( expected_input_count === input_ids.length ) {
						
							if ( 'function' === typeof on_success ) {
								on_success( input_ids );
							}
						}

					}, 'on_error': function( context ) {
						
						//TODO: good error (not in index) or bad error (e.g. missing store)?
						expected_input_count -= 1;
							
						if ( expected_input_count === input_ids.length ) {
							if ( 'function' === typeof on_success ) {
								on_success( input_ids );
							}
						}

						if ( true === debug ) {
							console.log( 'Public.prototype.getTokens > get_input_neurons > Network.get cursor error', context );
						}

					}, 'key': input_neuron_hash, 'index': 'hash', expecting: { 'type': 'input' } } );

				} else {

					if ( 'undefined' !== typeof cached_neuron && cached_neuron ) {

						input_ids.push( cached_neuron );
					
					} else {

						if ( true === debug ) {
							console.log('cached neuron does not have attributes',cached_neuron);
						}
						
						expected_input_count -= 1;
					
					}	
				
					if ( true === debug ) {
						console.log('Public.prototype.getTokens > get_input_neurons > cache success', cached_neuron );
					}

					if ( expected_input_count === input_ids.length ) {
					
						if ( 'function' === typeof on_success ) {
							on_success( input_ids );
						}
					
					}
				}

			}

		}


		Public.prototype.getInputNeurons = function( results, input_ids, on_success, on_error, on_complete ) {

			if ( true === debug ) {
				console.log( 'Public.prototype.getNetwork getInputNeurons()', results, input_ids );
			}

			var input_neurons = []
			  , input_count = 0
			  , input_neuron_id
			  , z = 0
			  , input_length = input_ids.length
			  , expected_input_count = input_length
			  , cached_neuron;

			if ( 0 === input_length ) {
				Public.prototype.getSynapses( results, input_neurons, on_success, on_error, on_complete );
				return this;
			}
			// For each input_id in input_ids
			for( z = 0; z < input_length; z += 1 ) {

				input_neuron_id = input_ids[ z ];
				// Get the cached neuron
				//
				cached_neuron = Public.prototype.returnNeuron( input_neuron_id );
				// Else get it from the database

				if ( 'undefined' === typeof cached_neuron || null === cached_neuron ) {

					/* Get Cursor Neurons With Secondary Index on From */
					Network.get( {  'type': 'neuron', 'on_success': function( input_neuron_value ) {
					
						if ( true === debug ) {
							console.log( 'Public.prototype.getTokens > get_input_neurons > Network.get cursor success', input_neuron_value );
						}
						if ( null !== input_neuron_value && 'undefined' !== typeof input_neuron_value ) {
							Cache.set( { 'key': ( 'neurons.data.' + input_neuron_id ), 'value': input_neuron_value, 'ttl': 300 } );
						}
						if ( 'undefined' !== typeof input_neuron_value && null !== input_neuron_value && Public.prototype.hasAttributes( input_neuron_value ) ) {
							input_neurons.push( input_neuron_value );
					
						} else {
						
							expected_input_count -= 1;
						}

						if ( expected_input_count === input_neurons.length ) {
						
							Public.prototype.getSynapses( results, input_neurons, on_success, on_error, on_complete );
						}


					}, 'on_error': function( context ) {
						
						//TODO: good error (not in index) or bad error (e.g. missing store)?
						expected_input_count -= 1;
							
						if ( expected_input_count === input_neurons.length ) {
							Public.prototype.getSynapses( results, input_neurons, on_success, on_error, on_complete );
						}

						if ( true === debug ) {
							console.log( 'Public.prototype.getTokens > get_input_neurons > Network.get cursor error', context );
						}

					}, 'key': input_neuron_id } );

				} else {

					if ( 'undefined' !== typeof cached_neuron && null !== cached_neuron && Public.prototype.hasAttributes( cached_neuron ) ) {
					
						input_neurons.push( cached_neuron );
					
					} else {

						if ( true === debug ) {
							console.log('cached neuron does not have attributes',cached_neuron);
						}
						
						expected_input_count -= 1;
					
					}	
				
					if ( true === debug ) {
						console.log('Public.prototype.getTokens > get_input_neurons > cache success', cached_neuron );
					}

					if ( expected_input_count === input_neurons.length ) {
					
						if ( true === debug ) {
							console.log('Public.prototype.getTokens > get_input_neurons > getting synapses',input_neurons);
						}

						Public.prototype.getSynapses( results, input_neurons, on_success, on_error, on_complete );
					}
				}

			}

		}

	// takes an array of input neuron objects
	Public.prototype.getSynapses = function( results, input_neurons, on_success, on_error, on_complete ) {

		if ( true === debug ) {
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

		if ( 0 === input_neuron_length ) {

			Public.prototype.getOutputNeurons( results, input_neurons, synapses, on_success, on_error, on_complete );
			return this;

		}
		
		for( y = 0; y < input_neuron_length; y += 1 ) {

			input_neuron = input_neurons[ y ];
			
			if ( 'undefined' !== typeof input_neuron && null !== input_neuron && Public.prototype.hasAttributes(input_neuron) && 'undefined' !== typeof input_neuron.id ) {
				
				input_id = input_neuron.id;

				if ( 'undefined' !== typeof input_id ) {
					cached_input_neuron = Cache.get( { 'key': ( 'neurons.synapses.' + input_id ) } );

					// If it exists in the cache, no need to get it from the database
					if ( 'undefined' === typeof cached_input_neuron || null === cached_input_neuron ) {
					
						// Else get it from the database
						Network.get( {  'type': 'synapse', 'on_success': function( synapse_value ) {
			
							if ( true === debug ) {
								console.log( 'Public.prototype.getTokens > get_synapses > Network.get cursor success', synapse_value );
							}
							
							Cache.set( { 'key': ( 'neurons.synapses.' + input_id ), 'value': synapse_value, 'ttl': 300 } );
							if ( 'undefined' !== typeof synapse_value && null !== typeof synapse_value && Public.prototype.hasAttributes( synapse_value ) ) {
								synapses.push( synapse_value );
							} else {
								expected_synapses_count -= 1;
							}
							
							if ( expected_synapses_count === synapses.length ) {
								Public.prototype.getOutputNeurons( results, input_neurons, synapses, on_success, on_error, on_complete );
							}

						}, 'on_error': function( context ) {
							
							if ( true === debug ) {
								console.log( 'Public.prototype.getTokens > get_synapses > Network.get cursor error', context );
							}
							
							//TODO: Inspect what kind of error this is
							expected_synapses_count -= 1;

							if ( expected_synapses_count === synapses.length ) {
								Public.prototype.getOutputNeurons( results, input_neurons, synapses, on_success, on_error, on_complete );
							}

						}, 'key': input_id, 'index': 'from' } );


					} else {

						if ( 'undefined' !== typeof cached_input_neuron && Public.prototype.hasAttributes( cached_input_neuron ) ) {
							synapses.push( cached_input_neuron );
						} else {
							expected_synapses_count -= 1;
						}

						if ( expected_synapses_count === synapses.length ) {
							Public.prototype.getOutputNeurons( results, input_neurons, synapses, on_success, on_error, on_complete );
						}

					}
				} else {
					expected_synapses_count -= 1;
					if ( expected_synapses_count === synapses.length ) {

						Public.prototype.getOutputNeurons( results, input_neurons, synapses, on_success, on_error, on_complete );
					}

				}
			} else {
				expected_synapses_count -= 1;
				if ( expected_synapses_count === synapses.length ) {

					Public.prototype.getOutputNeurons( results, input_neurons, synapses, on_success, on_error, on_complete );
				}


			}

		}
		
	};

 	Public.prototype.getOutputNeurons = function( results, input_neurons, synapses, on_success, on_error, on_complete ) {

		if ( true === debug ) {
			console.log( 'Public.prototype.getNetwork getOutputNeurons() results', JSON.stringify( results ), 'input_neurons', input_neurons, synapses );
		}

		//For each input neuron, get it's synapses 
		var synapses_length = synapses.length
		  , expected_output_count = synapses_length
		  , a = 0
		  , output_id
		  , output_neurons = []
		  , synapse = {};
		if ( 0 === synapses_length ) {
			on_complete( results, input_neurons, synapses, output_neurons );
			return this;
		}
		for( a = 0; a < synapses_length; a += 1 ) {

			synapse = synapses[ a ];
			if ( null === synapse || 'undefined' !== typeof synapse ) {

				output_id = synapse.to;
				cached_synapse = Cache.get( { 'key': ( 'neurons.data.' + output_id ) } );

				// If it exists in the cache, no need to get it from the database
				if ( 'undefined' === typeof cached_synapse || null === cached_synapse ) {
				
					// Else get it from the database
					Network.get( {  'type': 'neuron', 'on_success': function( output_neuron_value ) {
			
						if ( true === debug ) {
							console.log( 'Public.prototype.getTokens > get_output_neurons > Network.get cursor success', output_neuron_value );
						}

						Cache.set( { 'key': ( 'neurons.data.' + output_id ), 'value': output_neuron_value, 'ttl': 300 } );
						if ( 'undefined' !== typeof output_neuron_value && null !== output_neuron_value ) {
							output_neurons.push( output_neuron_value );
						} else {
							expected_output_count -= 1;
						}
						if ( expected_output_count === output_neurons.length ) {
							on_complete( results, input_neurons, synapses, output_neurons );
						}
					}, 'on_error': function( context ) {
						
						if ( true === debug ) {
							console.log( 'Public.prototype.getTokens > get_output_neurons > Network.get cursor error', context );
						}
						
						//TODO: Inspect error and do maybe do something
						expected_output_count -= 1;
						if ( expected_ouput_count === output_neurons.length ) {
							on_complete( results, input_neurons, synapses, output_neurons );
						}

					}, 'key': output_id } );

				} else {
					if ( 'undefined' !== typeof cached_synapse ) {
						output_neurons.push( cached_synapse );
					}
					if ( expected_output_count === output_neurons.length ) {
						on_complete( results, input_neurons, synapses, output_neurons );
					}
				}
			}

		}
	
	};

	/* queries a network for active output neurons
	 * takes a tokens input (one or more tokens) and network (neuron/connection weight matrix) and returns a normalized score */	
 	Public.prototype.queryNetwork = function( request ) {
	
		var input = request.input
		  , input_len = input.length
		  , output = request.output
		  , output_len = output.length
		  , item = 0
		  , x = 0
		  , attr
		  , to_id
		  , input_ids
		  , input_tos
		  , hidden_froms
		  , hidden_tos
		  , matrix = {}
		  , in_hid_id
		  , in_hid_strength
		  , hid_out_id
		  , hid_out_strength
		  , on_success = request.on_success
		  , on_error = request.on_error
		  , on_complete = request.on_complete;

		var tanh = function( x ) {
			if( x < -3 ) {
				return -1;
			} else if( x > 3 ) {
				return 1;
			} else {
				return x * ( 27 + x * x ) / ( 27 + 9 * x * x );
			} 
		}

		Network.addOrGetInputNeurons( {
			'return_existing': true
			, 'tokens': input
			, 'on_complete': function( input_ids ) {
		
			inpout_len = input_ids.length;

			Network.getPartialNetwork( { 'input': input, 'output': output, 'on_complete': function( network ) {
				
				for( x = 0; x < input_len; x += 1 ) {

					item = input_ids[ x ];
					input_tos = network[ item ][ 'to' ];

					for( attr in input_tos ) {
						if( input_tos.hasOwnProperty( attr ) ) {
							in_hid_id = attr;
							in_hid_strength = input_tos[ attr ];
							in_hid_strength = ( 'number' === typeof in_hid_strength ) ? in_hid_strength : 0;
							hidden_tos = network[ in_hid_id ][ 'to' ];
							for( to_id in hidden_tos ) {
								if( hidden_tos.hasOwnProperty( to_id ) ) {
							
									hid_out_id = to_id
									hid_out_strength = hidden_tos[ to_id ];
									hid_out_strength = ( 'number' === typeof hid_out_strength ) ? hid_out_strength : 0;
									console.log(to_id,"BEFORE",matrix[ to_id ], '1st', hid_out_strength,'2nd', in_hid_strength);
									
									matrix[ to_id ] = ( 'number' === typeof matrix[ to_id ] ) ? matrix[ to_id ] : 0;
									matrix[ to_id ] += ( hid_out_strength * in_hid_strength );
								}
							}
						}
					}
					
				}	
			
				var results = {};	
				for( attr in matrix ) {
					if( matrix.hasOwnProperty( attr ) ) {	
						var neuron = Public.prototype.returnNeuron( attr );
						results[ neuron.display ] = { 
							'neuron': neuron
							, 'score': tanh( matrix[ attr ] )
						};
					}
				}
				console.log("RESULT",results);	
				if( 'function' === typeof on_complete ) {
					on_complete( results );
				}

			} } );
		
			}
		} );	
	};

 	Public.prototype.getPartialNetwork = function( request ) {

		var input = request.input
		  , output = request.output
		  , on_success = request.on_success || null
		  , on_error = request.on_error || null
		  , on_complete = request.on_complete || null
		  , partial_network = {}
		  , synapses;
		Network.addOrGetInputNeurons({
		    'return_existing': true,
		    'tokens': input,
		    'on_success': function (neuron) {
			console.log("NEURON", neuron);
		    },
		    'on_error': function () {
			console.log("ERROR");
		    },
		    'on_complete': function (input_neurons) {
			Network.addOrGetHiddenNeurons({
			    'return_existing': true,
			    'tokens': input,
			    'on_success': function (neuron) {
				console.log("NEURON", neuron);
			    },
			    //end on_success
			    'on_error': function () {
				console.log("ERROR");
			    },
			    //end on_error
			    'on_complete': function (hidden_neurons) {

				Network.addOrGetOutputNeurons({
				    'return_existing': true,
				    'tokens': output,
				    'on_success': function (neuron) {
					if ( !!debug ) {
						console.log("NEURON", neuron);
					}
				    },
				    //on_success
				    'on_error': function () {
					if ( !!debug ) {
						console.log("ERROR");
					}
				    },
				    //end on_error
				    'on_complete': function (output_neurons) {
					if ( !!debug ) {
						console.log('READY', input_neurons, hidden_neurons, output_neurons);
					}
					synapses = Public.prototype.zipSynapses( 'hidden', hidden_neurons, 'output', output_neurons );
						
					var syn2 = Public.prototype.zipSynapses( 'input', input_neurons, 'hidden', hidden_neurons );
					var syn2_len = syn2.length;
			
					for( var z = 0; z < syn2_len; z+=1) {
						synapses.push( syn2[z] );
					}

					Network.addOrGetSynapses({
					    'return_existing': true,
					    'value': synapses,
					    'on_success': function (synapse) {
					    
						    //TODO: Debug statement
					    },
					    'on_complete': function (synapses) {

						partial_network = Network.buildNetwork(input_neurons, hidden_neurons, output_neurons, synapses);

						if ( 'function' === typeof on_complete ) {
							on_complete( partial_network );
						}
					    }
					});

				    } //end on_complete
				});

			    } //end on_complete
			});
		    }
		});
		//DONE
	}
	
	Public.prototype.zipSynapses = function( from_type, froms, to_type, tos ) {
		var a
		  , b
		  , synapse_data
		  , to
		  , to_length = tos.length
		  , from
		  , from_length = froms.length
		  , tokens = [];

		for (a = to_length; a >= 1; a -= 1) {
			to = tos[ ( a - 1 ) ];
		    
			for ( b = from_length; b >= 1; b -= 1 ) {
			
				from = froms[ ( b - 1 ) ];
			
				synapse_data = {
				    'to': to
				    , 'to_type': to_type
				    , 'from': from
				    , 'from_type': from_type
				};

				tokens.push( synapse_data );
			}
		}

		return tokens;

	};


	/* takes a token or tokens and builds an in memory representation of relevant 
	 * neurons and their connections of an MLP such
	 * that it can be queried */
	Public.prototype.buildNetwork = function( inputs, hiddens, outputs, synapses ) {

		if ( true === debug ) {
			console.log( 'Public.prototype.buildNetwork', inputs, 'hiddens',hiddens,'outputs',outputs,'synapses',synapses );
		}

		/*
		 *
		 * var network {
		 *	'neuron_display': {
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
		  , inputs_length = inputs.length
		  , input
		  , input_id
		  , outputs_length = outputs.length
		  , output
		  , output_id
		  , neuron
		  , to_id
		  , from_id
		  , return_neuron;

		for( x = 0; x < synapses_length; x += 1 ) {

			synapse = Public.prototype.returnSynapse( synapses[ x ] );
	
			if ( null !== synapse && 'undefined' !== typeof synapse ) {

				// Handle to
				to_id = synapse.to;
				to_neuron = Public.prototype.returnNeuron( to_id );

				// Handle from
				from_id = synapse.from;
				from_neuron = Public.prototype.returnNeuron( from_id );

				if ( 'undefined' !== to_id && null !== to_id && 'undefined' !== from_id && null !== from_id ) {
					
					if ( 'undefined' === typeof own_network[ from_id ] ) {
						own_network[ from_id ] = {
							'data': from_neuron
						};
					}

					if ( 'undefined' === typeof own_network[ to_id ] ) {
						own_network[ to_id ] = {
							'data': to_neuron
						};
					}

					if ( 'undefined' === typeof own_network[ to_id ][ 'from' ] ) {
						own_network[ to_id ][ 'from' ] = {};
					}

					if ( 'undefined' === typeof own_network[ from_id ][ 'to' ] ) {
						own_network[ from_id ][ 'to' ] = {};
					}	

					own_network[ to_id ][ 'from' ][ from_id ] = synapse.strength;

					own_network[ from_id ][ 'to' ][ to_id ] = synapse.strength;

				}



			}

		}

		for( x = 0; x < inputs_length; x += 1 ) {

			input_id = inputs[ x ];

			if ( null !== input_id && 'undefined' !== typeof input_id ) {

				input = Public.prototype.returnNeuron( input_id );
				
				if ( 'undefined' === typeof own_network[ input_id ] ) {
					own_network[ input_id ] = {};
				}
				own_network[ input_id ][ 'data' ] = input;

			}

		}

		for( x = 0; x < outputs_length; x += 1 ) {

			output_id = outputs[ x ];

			if ( null !== output_id && 'undefined' !== typeof output_id ) {

				output = Public.prototype.returnNeuron( output_id );
				
				if ( 'undefined' === typeof own_network[ output_id ] ) {
					own_network[ output_id ] = {};
				}
				own_network[ output_id ][ 'data' ] = output;

			}

		}

		network = Public.prototype.mergeObjects( network, own_network );

		return network;

	};

	Public.prototype.countAttributes = function( question ) {
		var question_type = typeof question
		  , count = 0;

		if ( 'undefined' === question_type || 'string' === question_type || 'number' === question_type ) {
			return false;
		}

		for( attr in question ) {
			if ( question.hasOwnProperty( attr ) ) {
				count += 1;
			}
		}

		return count;

	};



	Public.prototype.hasAttributes = function( question ) {
		var question_type = typeof question;

		if ( 'undefined' === question_type || 'string' === question_type || 'number' === question_type ) {
			return false;
		}

		for( attr in question ) {
			if ( question.hasOwnProperty( attr ) ) {
				return true;
				break;
			}
		}

		return false;

	};

	/*
	Public.prototype.setNeuron = function( neuron_id, neuron ) {
		Cache.put( { 'key': ( 'neurons.data.' + neuron_id ), 'value': neuron, 'ttl': 300 } );
	};*/


	Public.prototype.returnSynapse = function( synapse_id ) {
		return Cache.get( { 'key': 'synapses.data.' + synapse_id } );
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

		if ( !!Neural.install ) {
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
			, 'hash': false
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
		if ( 'undefined' === shorthand_maps ) {
			if ( 'function' === typeof on_error ) {
				on_error( new Error('Internal configuration error: no shorthand_maps' ) );
			}		
			return this;
		}
		if ( 'undefined' == shorthand_maps[ request.network ] ) {
			shorthand_maps[ request.network ] = {};
		} 

		// Private object shorthand_maps
		shorthand_maps[ request.network ] = request.data;

		if ( 'undefined' == typeof result ) {
			result = null;
		}
		if ( 'function' === typeof on_success ) {
			on_success( result );
		}
		return this;
	};

	// Private object getter
	Public.prototype.shorthand.map.get = function( store ) {
		if ( 'undefined' == shorthand_maps ) return null;
		var result = shorthand_maps[ store ]; 
		return ( 'undefined' == typeof result ) ? null : result;
	};

	Public.prototype.shorthand.get = function ( request ) {

		/* Setup */

		var shorthand_map = Public.prototype.shorthand.map.get( request.network );

		/* Debug */

		if ( true === debug ) {
			console.log("Public.prototype.shorthand.get map", shorthand_map);
		}

		/* Work */

		if ( null !== shorthand_map && 'undefined' !== typeof shorthand_map && 'undefined' !== typeof shorthand_map[ request.key ] ) {
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
			if ( shorthand_map.hasOwnProperty( item ) ) {
				reversed[ Public.prototype.shorthand.get( item ) ] = item;
			}
		}
		if ( 'undefined' !== typeof reversed[ k ] ) {
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
			if ( 'undefined' !== typeof itemobj && object.hasOwnProperty( itemobj ) ) {
				//recursive case: object value
				//base case: string value
				var value = object[ itemobj ];
				if ( 'object' === typeof value ) {
					encoded[ Public.prototype.shorthand.reverse( { 'store': request.network, 'data': itemobj } ) ] = Public.prototype.shorthand.decode( { 'database': request.database, 'data': value } );
					delete value;
				} else { 
					encoded[ Public.prototype.shorthand.reverse( { 'store': request.network, 'data': itemobj } ) ] = value;
					delete value;
				}
			}
			total++;
		}
		if ( total > 0 ) {
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
			if ( object.hasOwnProperty( item ) ) {
				//recursive case: object value
				//base case: string value

				if ( 'object' === typeof object[ item ] ) {
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
			if ( true === debug ) {
				console.log( 'Public.prototype.add success', value );
			}
			if ( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if ( true === debug ) {
				console.log( 'Public.prototype.add error', context );
			}
			if ( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if ( true === debug ) {
				console.log( 'Public.prototype.complete complete' );
			}
			if ( 'function' == typeof on_complete ) {
				on_complete();
			}
		};		
		
		if ( 'synapses' === type ) {
			Public.prototype.synapses.add( req );
		} else if ( 'synapse' === type ) {
			delete req.on_complete;
			Public.prototype.synapse.add( req );
		} else if ( 'neurons' === type ) {
			Public.prototype.neurons.add( req );
		} else if ( 'neuron' === type ) {
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
			if ( true === debug ) {
				console.log( 'Public.prototype.put success', value );
			}
			if ( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if ( true === debug ) {
				console.log( 'Public.prototype.put error', context );
			}
			if ( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if ( true === debug ) {
				console.log( 'Public.prototype.put complete' );
			}
			if ( 'function' == typeof on_complete ) {
				on_complete();
			}
		};

		if ( 'synapses' === type ) {
			Public.prototype.synapses.put( req );
		} else if ( 'synapse' === type ) {
			delete req.on_complete;
			Public.prototype.synapse.put( req );
		} else if ( 'neurons' === type ) {
			Public.prototype.neurons.put( req );
		} else if ( 'neuron' === type ) {
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
		if ( null !== cached_request ) {
			if ( true === debug ) {
				console.log( 'Public.prototype.get success', cached_request );
			}
			if ( 'function' == typeof on_success ) {
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

			if ( true === debug ) {
				console.log( 'Public.prototype.get success', value );
			}
			if ( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if ( true === debug ) {
				console.log( 'Public.prototype.get error', context );
			}
			if ( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if ( true === debug ) {
				console.log( 'Public.prototype.get complete' );
			}
			if ( 'function' == typeof on_complete ) {
				on_complete();
			}
		};

		if ( 'synapses' === type ) {
			Public.prototype.synapses.get( req );
		} else if ( 'synapse' === type ) {
			delete req.on_complete;
			Public.prototype.synapse.get( req );
		} else if ( 'neurons' === type ) {
			Public.prototype.neurons.get( req );
		} else if ( 'neuron' === type ) {
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
			if ( true === debug ) {
				console.log( 'Public.prototype.update success', value );
			}

			if ( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if ( true === debug ) {
				console.log( 'Public.prototype.update error', context );
			}
			if ( 'function' == typeof on_error ) {
				on_error( context );
			}
		};
	
		req.on_complete = function() {
			if ( true === debug ) {
				console.log( 'Public.prototype.update complete' );
			}
			if ( 'function' == typeof on_complete ) {
				on_complete();
			}
		};

		if ( 'synapses' === type ) {
			Public.prototype.synapses.update( req );
		} else if ( 'synapse' === type ) {
			delete req.on_complete;
			Public.prototype.synapse.update( req );
		} else if ( 'neurons' === type ) {
			Public.prototype.neurons.update( req );
		} else if ( 'neuron' === type ) {
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
			if ( true === debug ) {
				console.log( 'Public.prototype.delete success', value );
			}
			if ( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		req.on_error = function( context ) {
			if ( true === debug ) {
				console.log( 'Public.prototype.delete error', context );
			}
			if ( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		req.on_complete = function() {
			if ( true === debug ) {
				console.log( 'Public.prototype.delete complete' );
			}
			if ( 'function' == typeof on_complete ) {
				on_complete();
			}
		};

		if ( 'synapses' === type ) {
			Public.prototype.synapses.delete( req );
		} else if ( 'synapse' === type ) {
			delete req.on_complete;
			Public.prototype.synapse.delete( req );
		} else if ( 'neurons' === type ) {
			Public.prototype.neurons.delete( req );
		} else if ( 'neuron' === type ) {
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
		if ( a.replace ) {
			aA = a.replace(reA, "");
		} else {
			aA = a;
		}
		if ( b.replace ) {
			bA = b.replace(reA, "");
		} else {
			bA = b;
		}

		if (aA === bA) {
			var aN = parseInt(a.replace(reN, ""), 10);
			var bN = parseInt(b.replace(reN, ""), 10);
			return aN === bN ? 0 : aN > bN ? 1 : -1;
		} else {
			return aA > bA ? 1 : -1;
		}

	}

	//TODO: rename topics to tokens here
	Public.prototype.utilities.getId = function( topics ) {
		if ( 'number' === typeof topics || 'string' === typeof topics ) {
			return md5( topics );
		} else if ( Public.prototype.hasAttributes( topics ) ) {
			topics = JSON.stringify( topics );
			return md5( topics );
		} else { 
			sorted_topics = Public.prototype.utilities.alphaSortArray( topics );
			return md5( sorted_topics.join("|") );
		} 
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

