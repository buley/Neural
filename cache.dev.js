/* Cache.js */
var Cache = ( function () {

	var cache = {};

	var self = function( cache ) {
		if( cache ) {
			this.cache = preheatCache( cache );
		}
	}
	
	//
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

	var hasAttributes = function() {
		var answer = false;
		for( attr in question ) {
			if( question.hasOwnPropery( answer ) ) {
				answer = true;
				break;
			}
		}
		return answer;
	};

	var preheat = function( incoming, ttl = null ) {
	
		if( 'undefined' === typeof incoming ) {
			throw Error( 'The oven can\'t be empty.' );
		}
		var outgoing = {}
		  , item = {}
		  , current_date = new Date()
		  , ttl = ( 'number' === typeof ttl ) ? ttl : 0
		  , item_timestamp = ( 0 === ttl ) ? 0 : current_date.getTime() + ttl;
		
		for( attr in incoming ) {
			item = incoming[ attr ];
			if( incoming.hasOwnProperty( attr ) ) {
				if( true === hasAttributes( item ) ) {
					outgoing[ attr ] = preheat( incoming, ttl );	
				}	
			} else {
				outgoing[ attr ] = {
					'data': item
					, 'timestamp': item_timestamp	
				};
			}
		}
		
		return outgoing;
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
		console.log('removeMeta() incoming',incoming,incoming.constructor);
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
