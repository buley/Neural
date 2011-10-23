
/* N.prototype.js
 * Basic MLP neural network.
 **/


var Neural = (function() {

	var current_database = "Neural";
	var current_description = "A basic MLP network."

	function N( request ) {
		InDB.shorthand.set( { 'store': 'neurons', 'data': N.prototype.neurons.shorthand_map } );
		InDB.shorthand.set( { 'store': 'synapses', 'data': N.prototype.synapses.shorthand_map } );
		if( 'undefined' !== request.database ) {
			current_database = request.database;
		}
		if( 'undefined' !== request.description ) {
			current_description = request.description;
		}
	}

	var db;
	var InDB = new IDB( { 'database': current_database, 'description': current_description, 'target': db } );

	N.prototype.neurons = {};
	N.prototype.synapses = {};

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

		InDB.getAttr( {
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

		InDB.setAttr( {
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

	/* create a new node (hidden, input or output) */
	N.prototype.neurons.create = function( nodes, on_success, on_error ) {

		var success_callback = function( value ) {
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.neurons.create success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		var error_callback = function( context ) {
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.neurons.create error', value );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		return this;


	};

	/* generic get used by getHidde, getOutput, getInput */
	N.prototype.neurons.get = function( key, on_success, on_error ) {

		var success_callback = function( value ) {
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.neurons.get success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		var error_callback = function( context ) {
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.neurons.get error', value );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		return this;


	};

	/* gets a hidden node */
	N.prototype.neurons.getHidden = function( key, on_success, on_error ) {

		var success_callback = function( value ) {
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.neurons.getHidden success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		var error_callback = function( context ) {
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.neurons.getHidden error', context );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		return this;


	};

	/* gets an output node */
	N.prototype.neurons.getOutput = function( key, on_success, on_error ) {

		var success_callback = function( value ) {
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.neurons.getOutput success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		var error_callback = function( context ) {
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.neurons.getOutput error', value );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		return this;


	};

	/* gets an input node */
	N.prototype.neurons.getInput = function( key, on_success, on_error ) {

		var success_callback = function( value ) {
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.neurons.getInput success', value );
			}
			if( 'function' == typeof on_success ) {
				on_success( value );
			}
		};

		var error_callback = function( context ) {
			if( !!N.prototype.debug ) {
				console.log( 'N.prototype.neurons.getInput error', value );
			}
			if( 'function' == typeof on_error ) {
				on_error( context );
			}
		};

		return this;


	};

	/* queries a network for active output nodes
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
	 * nodes and their connections of an MLP such
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

		console.log( 'Neural_neurons_install', indexes );

		InDB.install( { 'store': 'neurons', 'indexes': indexes, 'on_success': function( context ) {
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

		InDB.install( { 'store': 'synapses', 'indexes': indexes, 'on_success': function( context ) {
			console.log( 'Neural neurons installed', context );
		} } );

	}

	return N;

} )();

