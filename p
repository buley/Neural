
	Public.prototype.zipSynapses = function( request ) {

		for (a = to_length; a > 1; a -= 1) {
		    to = tos[(a - 1)];
		    console.log('to', to);
		    for (b = from_length; b > 1; b -= 1) {
			from = froms[(b - 1)];
			console.log('from', from);
			// add
			synapse_data = {
			    'to': to,
			    'to_type': 'hidden',
			    'from': from,
			    'from_type': 'input'
			}
			tokens.push(synapse_data);
		    }


	};


