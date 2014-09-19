var DeathCount = DeathCount || {};


DeathCount.lastNum = 0;
DeathCount.playerCollection = [];
DeathCount.createPlayerFormGroup = function(num) {
	return '<label class="col-md-4 control-label" for="prependedtext">Player ' + num + '</label>'
		+ '<div class="col-md-4">'
			+ '<div class="input-group player-group">'
				+ '<label for="player-' + num + '-name" class="input-group-addon">Name</label>'
				+ '<input class="player-name form-control" id="player-'+num+'-name" name="player-'+num+'-name" placeholder="Player '+ num + ' name" type="text">'
				+ '<label for="player-' + num + '-deaths" class="input-group-addon">Initial deaths</label>'
				+ '<input class="player-deaths form-control" id="player-'+num+'-deaths" name="player-'+num+'-deaths" placeholder="Player '+ num + ' deaths" type="text">'
			+ '</div>'

		+ '</div>'
}
DeathCount.createTrackingView = function() {
	DeathCount.createPlayerCollection();
	var out = "<ul>";
	for (var name in  DeathCount.playerCollection ) {
		out += '<div class="input-group track-player-group">'
				+ '<label class="input-group-addon">' + name + '</label>'
				+ '<label id="'+ name +'-deaths" class="form-control">' + DeathCount.playerCollection[name] + '</label>'
				+ '<span class="input-group-btn">'
					+ '<button data-playername="' + name + '" class="btn btn-success">+</button>'
					+ '<button data-playername="' + name + '" class="btn btn-danger">-</botton>'
				+ '</span>'
				// + '<span class="input-group-btn"><button id="increase-player-'+ (i) +'" class="btn">-</button></span>'
			+ '</div>'
		;
	};
	out += "</ul>";
	console.log(out);
	return out;
}

DeathCount.addPlayer =  function(num) {
	if (typeof num === 'undefined' || typeof num === 'object' || num <= DeathCount.lastNum) {
		num = DeathCount.lastNum+1; 
		DeathCount.lastNum = num;
	}
	console.log(num);

	var out = DeathCount.createPlayerFormGroup(num);
	jQuery(out).appendTo('#players-list');
}
DeathCount.listSubmittedPlayers = function() {
	console.log("listSubmittedPlayers called!");
	jQuery(".player-name").each(function(index, el) {
		console.log(index + ' ' + jQuery(el).val() );
	});

}

DeathCount.createPlayerCollection = function() {
	DeathCount.playerCollection= {};

	jQuery(".player-group").each(function(index, el) {
		var name = jQuery(el).find('.player-name').val()
		if (name) {
			// {name:deaths}
			DeathCount.playerCollection[name] = ( parseInt(jQuery(el).find('.player-deaths').val()) || 0)
		}
	});

	console.log(DeathCount.playerCollection)
	return DeathCount.playerCollection;
}

DeathCount.addDeath = function(el) {
	var name = jQuery(el).data("playername")

	jQuery("#"+name+"-deaths").html(
		(parseInt( jQuery("#"+name+"-deaths").html() ) + 1)
	);
	DeathCount.playerCollection[name] = parseInt(DeathCount.playerCollection[name]) + 1;
}

DeathCount.removeDeath = function(el) {
	var name = jQuery(el).data("playername")

	jQuery("#"+name+"-deaths").html(
		(parseInt( jQuery("#"+name+"-deaths").html() ) - 1)
	);
	DeathCount.playerCollection[name] = parseInt(DeathCount.playerCollection[name]) - 1;	
}


DeathCount.startTracking = function() {
	jQuery("#player-tracking-list").html( DeathCount.createTrackingView() );

	jQuery(".track-player-group .btn-success").click(function(event) {
		DeathCount.addDeath( jQuery(this) );
	});
	jQuery(".track-player-group .btn-danger").click(function(event) {
		DeathCount.removeDeath( jQuery(this) );
	});

	jQuery("#player-registration").hide('400', function() {
		jQuery("#player-tracking").fadeTo('400', 1, function() {
			
		});
	});
}

DeathCount.addEventListeners = function() {
	jQuery('#add_player_btn').click(DeathCount.addPlayer);
	//jQuery('#submit_players_btn').click(DeathCount.createPlayerCollection);
	jQuery('#submit_players_btn').click(DeathCount.startTracking);

}

jQuery(document).ready(function($) {
	//jQuery("#player-tracking").hide('', function() {});

	DeathCount.addEventListeners();

	DeathCount.addPlayer();
	DeathCount.addPlayer();
});