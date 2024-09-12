// Global

    var map;
    var zoom_start = 13;
    var zoom_min = 8;
    var zoom_max = 18;

	var page; // Which page are we on?
    
    var q;
        
    // Center of the circle marker
    var marker = new google.maps.Marker({
        draggable: true
    });
    
    // Crime markers
    var markers = [];
    var marker_icons_single = new Object();
    var marker_icons = new Object();
    // Setup the crime marker icons
    $.each(categories, function(k, v) {
        
        // Non-clustered icons
        marker_icons_single[k] = new google.maps.MarkerImage(media_url +'images/crime/markers/'+ k +'-small.png', new google.maps.Size(30, 30));
        
        // Clustered icons
        marker_icons[k] = [{
            url: media_url +'images/crime/markers/'+ k +'-small.png',
            height: 30,
            width: 30,
            opt_anchor: [15, 0],
            opt_clickable: [[8,8], [15,15]],
            opt_textColor: '#ffffff',
            opt_textSize: 8
        },{
            url: media_url +'images/crime/markers/'+ k +'-medium.png',
            height: 60,
            width: 60,
            opt_anchor: [30, 0],
            opt_clickable: [[19,20], [23,23]],
            opt_textColor: '#ffffff',
            opt_textSize: 12
        },{
            url: media_url +'images/crime/markers/'+ k +'-large.png',
            height: 100,
            width: 100,
            opt_anchor: [50, 0],
            opt_clickable: [[27,28], [45,45]],
            opt_textColor: '#ffffff',
            opt_textSize: 14
        } ];
        
    });
    
    // Marker Clusterer
    var cluster = null;

    // Container for all the crimes currently in view
    var current_crimes = new Object();
    var no_location_crimes = {};

    // Do we need to refresh the crimes?
    var refresh_crimes_street = true;
    var refresh_crimes_neighbourhood = true;

    // Current street locations in view
    var streets = new Object();
    var street_ids = []; // Index for where each street is in the streets object
    
    // Neighbourhood KML layer
    var kml_layer = null;
    
    // The crime radius circle
    var circle_radius; // Set in the footer of the crime/overview page
    var circle = new google.maps.Circle({
        radius: circle_radius,
        fillColor: '#5eb1ff',
        fillOpacity: 0.26,
        strokeWeight: 2,
        strokeColor: '#4e6c89',
        strokeOpacity: 0.2,
        clickable: false
    });
    
    // All the crime levels - they're like this so they can be translated
    var crime_levels = {
        'low': {
            'en-gb': 'low',
            'cy': gettext('low')
        },
        'below_average': {
            'en-gb': 'below average',
            'cy': gettext('below_average')
        },
        'average': {
            'en-gb': 'average',
            'cy': gettext('average')
        },
        'above_average': {
            'en-gb': 'above average',
            'cy': gettext('above_average')
        },
        'high': {
            'en-gb': 'high',
            'cy': gettext('high')
        }
    };

	// Month names
	Date.prototype.getMonthName = function() {
		
		var m = [gettext('Jan'), gettext('Feb'), gettext('Mar'), gettext('Apr'), gettext('May'), gettext('Jun'), gettext('Jul'), gettext('Aug'), gettext('Sep'), gettext('Oct'), gettext('Nov'), gettext('Dec')];
		
		return m[this.getMonth()];
		
	}
        
    // Currently open info windows
    var info_windows = [];
    
    // Current crime category
    var category = "all-crime";
    
    // Current mode, i.e. crime_type, streets or neighbourhood
    var mode = 'crimetypes';
	//if(window.location.hash && $.inArray(['crimetypes', 'streets', 'neighbourhood'], window.location.hash.substr(1))) mode = window.location.hash.substr(1);
	
// Resize vars

    var resize_timeout; // Timeout for resize function (IE calls it too many times)
    var current_width = 0; // Current viewport width

    // The latest date for which crime data can be displayed (set on load)
    var latest_date;
    // The current date being displayed -- Array("2011-01","January 2011")
    var current_date;
    
    read_url_hash();

// On load
$( function() {
	
	if(page == 'overview') {
		
		// Turn off crime types for IE6 & show the generic marker
	    if($.browser.msie && $.browser.version < 7) {
			
			$('#map_marker').show();
			
		} else {
		
			// Load the map!
	    	setTimeout("init("+ centre_lat +", "+ centre_lng +", "+ zoom_start +")", 1000);
	
		};
		
	} else {
	
		
		// Turn off crime types for IE6 & set default mode to streets
	    if($.browser.msie && $.browser.version < 7) {

	        mode = 'streets';

	        $('#tab_types').remove();
	        $('#panel_street').remove();
	        $('#tab_streets').addClass('active');

	        $('#main .section .main').before('<div id="ie6_message"><p><strong>'+ gettext('You are viewing Police.uk in an unsupported web browser') +'.</strong> '+ gettext('For faster maps and more options, <a href="http://www.microsoft.com/windows/internet-explorer/default.aspx" target="_blank">please upgrade your browser</a>') +'.</p></div>');

	    };

	    // Street level commentary popups
	    $('.street_commentary').live('click', function(e) {

	        e.preventDefault();

	        crimes_street_commentary($(this));

	    });
	
		// Neighbourhood 'help' icon
		$('#neighbourhood_help').click( function(e) {
			
			e.preventDefault();
			
			$.fancybox({
				href: '/ajax'+ $(this).attr('href'),
				type: 'iframe',
				width: 600,
				height: 400
			});
			
		});

	    // Street level / neighbourhood buttons
	    $('#mode_switch a').click( function(e) {

	        e.preventDefault();

	        // Highlight it
	        $('#mode_switch li').removeClass('active');
	        $(this).parent().addClass('active');

	        // Update the left panel & map
	        request_crimes($(this).attr('rel'));

	    });

	    // When "Compare this area to other area(s)" is clicked
	    //$('#compare_select').change( compare_area );

	    // "View comparison" link
	    //$('#compare_link').fancybox();

	    // "Help" links
	    $('h4 small.help a').fancybox({
	        type: 'iframe',
	        width: 560,
	        height: 340,
	        padding: 20
		});

	    // Show help info under 'all crime' in left panel as popup for those with js enabled
	    $('#all_crime_details_more').wrap('<div style="display:none" />').prepend('<h3>Street level crime</h3>').parent('div').before(' <a href="#all_crime_details_more">'+ gettext('More...') +'</a>').prev('a').fancybox({
	        type: 'inline',
	        autoDimensions: false,
	        width: 560,
	        height: 340,
	        padding: 20
	    });;

	    // Hide key on street tab, add help icon to 'crime types td', then toggle key on off when help icon is clicked
	    var key = $('#key');

	    key.hide();

	    $('#key div').append('<p class="close"><a href="javascript:void(0)" title="Hide">x</a></p>');

	    $('#crime_roads th.categories').append(' <small class="help"><a href="javascript:void(0)" title="'+ gettext('Show crime type colour key') +'" class="png_bg ir">'+ gettext('(Key)') +'</a></small>');

	    $('#crime_roads th.categories small a').click(function() {
        
	        if(key.is(':visible')) {
         
	            key.hide();
	            $('#crime_roads_table').css('height', 507);
            
	        } else {
            
	            key.show();
	            $('#crime_roads_table').css('height', 507 - key.height());
            
	        }
        
	    });
    
	    $('#key p.close a').click(function() {
        
	        key.hide();
	        $('#crime_roads_table').css('height', 507);
        
	    });

	    // Set the circle radius and an event for when the radius drop down on the left changes
	    /*$('#radius_options ul li a').live('click', function(e) {

	        e.preventDefault();

	        $(this).parent().siblings().removeClass('active');
	        $(this).parent().addClass('active');

	        circle_radius = parseFloat($(this).attr('rel'));
	        circle.setRadius(circle_radius);

	        map.setCenter(circle.getCenter());
	        map.fitBounds(circle.getBounds());

	        request_crimes('street');

	    });*/

	    // Set the current crime category as the highlighted one 
	    $('#'+ category +' th').addClass('active');

	    // If you click a crime category on the left, update the map markers
	    $('#crime_types tr th').delegate('a', 'click', function(e) {
		
	        remove('info_windows');

	        e.preventDefault();

	        // Highlight the category on the left
	        $('#crime_types tr th').removeClass('active');
	        $(this).parent().addClass('active');
	        category = $(this).attr('rel');

	        // Show the crimes on the map
	        show_markers(category);
	
			// Track this click on Analytics
			analytics_track('/crime/category/'+ category, 'Crime', 'Category', category);

	    });

	    // If you click on a street name on the left, pop it up on the map
	    $('#crime_roads_table').delegate('tr', 'click', function(e) {

	        e.preventDefault();

	        show_crime_street($(this).attr('rel'), 'left_panel');
	
			// Track this click on Analytics
			analytics_track('/crime/street/', 'Crime', 'Street');

	    });

	    // Show red marker control
	    $('#map').after('<a id="marker_control" title="'+ gettext('Move the marker to the centre of the map') +'" class="vtip"></a>');
		$('#marker_control').hide().live('click', function(e) {
			
			//trace('Clicked!');
			
			e.preventDefault();
			
			marker.setPosition(map.getCenter());
			circle.setCenter(map.getCenter());
			
			refresh_crimes_street = true;
			refresh_crimes_neighbourhood = true;
			
			request_crimes(mode);
			
		});

        // Some preprocessing for date selection

        first_date_option = $($('#choose_date option:selected')[0]);
        latest_date = first_date_option.val();
        
        if(current_date == null) { // If no date was supplied in the URL
            current_date = latest_date;
        }

        $('#choose_date option:selected').attr('selected','');
        $('#choose_date [value='+current_date+']').attr('selected','selected');
        
        // Load new data when the date dropdown is changed
		
		$('#choose_date').change(function() {
			$('#choose_date option:selected').each(function(){
                if(mode == 'neighbourhood')
                    $('#tab_types a[rel=crimetypes]').click();
                _this = $(this);
                current_date = _this.val();
                remove('info_windows');
				crimes_street();
			});
		});
	
		// Load the map!
	    setTimeout("init("+ centre_lat +", "+ centre_lng +", "+ zoom_start +")", 1000);
		
	}
        
});

// Tick compare crimes
/*function compare_area() {
    
    var checked = $('#compare_select').attr('checked');
    
    if(checked == true) {
        
        var mode = 'add';
        
    } else {
        
        mode = 'remove';
        
    }
    
    var url = 'crime/compare/'+ mode +'?q='+ q;
    
    $.ajax({
        type: "GET",
        //dataType: "json",
        url: url,
        success: function(data) {
            
            $('#compare_selected').html(data);
            
        }
    });
    
};*/


// Helper function to sort categories in the popups
function category_cmp(a, b) {

    var ai = $.inArray(a, category_order);
    var bi = $.inArray(b, category_order);

    if(ai > bi) return 1;
    
    return 0;
    
};


// Sort categories in the popups
function sort_categories(o) {
    
    var sorted = {}, key, a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort(category_cmp);

    //trace(a);

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    
    return sorted;
    
}


// Sort the streets list by name
function sort_streets(o) {
    
    var sorted = [], key, a = [];
    street_ids = [];

    for(key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(o[key].details.name +'|'+ key);
        }
    }
    
    a.sort();

    for (key = 0; key < a.length; key++) {
        var bits = a[key].split('|');
        //trace('n: '+ bits[0] +', k:'+ bits[1]);
        sorted.push(o[bits[1]]);
        street_ids.push(bits[1]);
    }
    
    //trace(street_ids);

    return sorted;
    
}


// Show crimes for a particular street
function show_crime_street(streetid, source) {

    //trace('Show street: '+ streetid);

    // Turn off all the open info windows
    remove('info_windows');

	// Get the right street
    var street = streets[$.inArray(streetid.toString(), street_ids)];

    // Create popup HTML
	var html = '<div class="popup">'+
            '<h2 style="font-size:123.1%; margin-bottom: 1em; margin-right:20px;">'+ street.details.name +' <sup style="color:#888; font-size:60%; font-weight:normal;">&dagger;</sup></h2>'+
            '<table style="border:0; border-collapse:collapse; overflow:visible; width:100%;">'+
                '<tr>'+
                '<th style="background:#EFF5FF; color:#888; padding:4px 16px 4px 8px; text-align:left;">'+ gettext('Crime type') +'</th>'+
                '<th style="background:#EFF5FF; color:#888; padding:4px 8px 4px 8px; text-align:center;">'+ gettext('Total') +'</th>'+
            '</tr>';
    
    var cc = new Object();
    
    // Run through each crime on or near this street
    $.each(street.crimes, function(i, crime) {
                
        // Check to see if this category has already been loaded into the popup
        if(typeof(cc[crime.category]) == "undefined") {
            
            var context = false;
            
            // Is there any context for this crime?
            if(crime.context) context = true;
            
            cc[crime.category] = new Object({
                'total': 1,
                'context': context
            });
            
        } else {
            cc[crime.category].total += 1;
            
            if(crime.context) {
                cc[crime.category].context = true;
            }
        }
        
    });
    
    // Sort the categories so that they match the order in the left panel
    var sorted_categories = sort_categories(cc);

    // For each street by crime category
    $.each(sorted_categories, function(cat, street) {
        
        html += '<tr>'+
                    '<td style="border-top:1px solid #D3D5D7; padding:4px 16px 4px 8px;"><img style="border-radius:5px; -moz-border-radius:5px; -ms-border-radius:5px; o-border-radius:5px; -webkit-border-radius:5px; margin-right:6px; position:relative; top:3px;" src="'+ media_url +'images/crime/colours/'+ cat +'.png" alt="'+ categories[cat] +'"/>'+ categories[cat];
        
        // Add the speech bubble if at least one crime on or near this street has commentary
        if(street.context) {
            html += ' <a href="#street_commentary" class="street_commentary" rel="'+ streetid +'"><img src="'+ media_url +'images/crime/bubble.png" /></a>';
        }
                    
            html += '</td>'+
                    '<td style="border-top:1px solid #D3D5D7; padding:4px 8px 4px 8px; text-align:center;">'+ street.total +'</td>'+
                '</tr>';
    });
    
    html += '</table>'+
            '<p style="color:#999; line-height:110%; margin-top:1.5em;"><small style="font-size:85%;"><sup style="font-size:77%">&dagger;</sup> <span style="font-style:italic;">'+ gettext('To protect privacy, crimes are mapped to points on or near the road where they occurred.') +'</span></small></p>'+
            '</div>';

    // Get the street's location
    var latlng = street.crimes[0].location;
    var street_centre = new google.maps.LatLng(latlng.latitude, latlng.longitude);

    // If the click is from the left panel, pan & zoom to fit
    if(source == 'left_panel' && map.getZoom() != 16) {

        map.setCenter(street_centre);
        map.setZoom(16);

    }

    // Create the info window internally
    var info_window = new google.maps.InfoWindow({
        content: html,
        maxWidth: 300,
        position: street_centre
    });
    
    // Show & open the info window
    info_window.open(map);
    info_windows.push(info_window);

	// Track this click on Analytics
	analytics_track('/crime/marker/', 'Crime', 'Marker');
    
    // Highlight left hand panel
    google.maps.event.addListener(info_window, 'domready', function() {
        $('#crime_roads tr[rel='+ streetid +'] td').addClass('highlight');
    });
        
    // If the close button is pressed, use the remove() function to unhighlight the left panel
    google.maps.event.addListener(info_window, 'closeclick', function() {
        remove('info_windows');
    });
    
};


// Resize map
function resize_map() {
    
    //trace('Resize map');
	
	// Don't resize the map on the overview page
	if (page == 'overview') return;


	// Map
    	
	map_width = parseInt($('#main').width())-($('#info').width()+3);
	map_height = parseInt($(window).height()-$('#header').height()-$('#nav').height()-$('#main h1').height()-100);

    if (map_width < 300) {
	    map_width = 301;
	}
	if (map_height < 400) map_height = 400;

	$('#map').width(map_width).height(map_height);
	
	
	// Streets list
	
	street_height = parseInt(map_height-$('#nav').height()-115);

	if (street_height < 250) street_height = 250;

	$('#crime_roads_table').height(street_height);
    
    	
    // No loction crimes box
    
    var posTop = parseInt(map_height + 130) + 'px';
    if (parseInt($('#main').width()) < 980) {
        $('#no_location_crimes').css({'top': posTop, 'left': '531px', 'right': 'auto'});
    } else {
        $('#no_location_crimes').css({'top': posTop, 'left': 'auto', 'right': '26px'});
    }


    clearTimeout(resize_timeout);
    resize_timeout = setTimeout("google.maps.event.trigger(map, 'resize');", 600);
    
};


// Load map
function init(centre_lat, centre_lng, zoom_level) {
    
    //trace('Load map');

	resize_map();
            
    map = new google.maps.Map(document.getElementById("map"), {
		zoom: zoom_level,
        center: new google.maps.LatLng(centre_lat, centre_lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
		scaleControl: true,
		mapTypeControl: false,
        streetViewControl: false,
        maxZoom: zoom_max,
        minZoom: zoom_min,
		keyboardShortcuts: false
    });

	var businessStyles = [
	{
		featureType: "poi.business",
		stylers: [
		{ visibility: "off" }
		]
	}
	];

	map.setOptions({styles: [businessStyles]});
    
    // Put the red marker in the middle of the map & show it
    marker.setPosition(map.getCenter());
    marker.setMap(map);

	// Get the crimes!
	if(page == 'overview') {
		request_crimes(mode);
	} else {
		$('#mode_switch a[rel='+ mode +']').trigger('click');
	}
	

    
    // If the browser is resized then resize the map
	$(window).resize( function() {
        resize_map();
	});

	
	if(page == 'overview') {
		
		map.setOptions({
			disableDefaultUI: true,
			draggable: false,
			disableDoubleClickZoom: false,
			maxZoom: map.getZoom(),
	        minZoom: map.getZoom(),
			scaleControl: false,
			styles: [businessStyles]
		});
		
		google.maps.event.addListener(map, 'click', function() {
			
			window.location = $('#crime_link').attr('href');
			
		});
		
		google.maps.event.addListener(marker, 'click', function() {
			
			window.location = $('#crime_link').attr('href');
			
		});
		
	} else {
		
		$('#map').css('borderLeft', '1px solid #BDD4E1');
		
		// Events for the draggable red marker
	    google.maps.event.addListener(marker, 'dragend', function() {
	        refresh_crimes_street = true;
	        refresh_crimes_neighbourhood = true;
	        request_crimes(mode);
	    });

	    // If the zoom level has changed
	    google.maps.event.addListener(map, 'zoom_changed', function() {
	        remove('info_windows');
	    });
		
	};
	
    vtip(); // Tooltips
	
};


// Crimes ajax
function request_crimes(type) {
    
    //trace('Show crimes for: '+ type);
    
    mode = type;
    
    $('#loading').show();

    // Remove all the crimes & info windows from the map
    remove('markers');
    remove('info_windows');
        
    // Turn off the neighbourhood KML if it's showing
    if(kml_layer) {
        try {
            kml_layer.setMap(null);
        } catch(e) {}
    }

    if(type == 'neighbourhood') {
        
        // Turn off the red marker & circle
        //marker.setMap(null);
        circle.setMap(null);
		marker.setDraggable(false);
		        
        // Do we need to refresh the crimes or have we got it saved already?
        if(refresh_crimes_neighbourhood) {
            crimes_neighbourhood();
        } else {
	
			if(kml_layer) {
		        try {
		            kml_layer.setMap(map);
		        } catch(e) {}
		    }
		
            show_tab(mode);

        };
        
    } else {
        
        // Turn the red marker back on, but disable dragging until the crimes are showing
        //marker.setMap(map);
        marker.setDraggable(false);
        
        circle.setMap(map);
        circle.setCenter(marker.getPosition());
        
        // Do we need to refresh the crimes or have we got it saved already?
        if(refresh_crimes_street) {
            
            crimes_street();
            
        } else {

            if(mode == 'crimetypes') {
                
                show_markers(category);
                show_tab(mode);
                
            } else {
                
                // Set the current category to all crime & ASB
                $('#all-crime a').trigger('click');
                
                crimes_street_roads();
                show_markers(category);
                
            }
            
        };
        
    }
    
};


// Show specific left hand panel
function show_tab(t) {
    
    //trace('Showing tab');
    
    $('#panel_street').hide();
    $('#panel_neighbourhood').hide();
    $('#panel_street_roads').hide();
    $('#mode_switch').show();
    
    $('#panel').attr('class', t);

	// Marker re-center button
	$('#marker_control').show();
    
    if(t == 'crimetypes') {
        
        $('#panel_street').show();
                        
    } else if(t == 'streets') {
        
        $('#panel_street_roads').show();
                
    } else {
        
        $('#panel_neighbourhood').show();
        
    };
    
    // Make the red marker draggable again as long as we're not on the overview page
    if(page != 'overview') marker.setDraggable(true);
    
    $('#loading').hide();

    update_url_hash();
    
};


function show_no_location_crimes(cat) {
    if(cat == undefined){
        cat = category;
    }
    
    // Remove any existing no location data
    $('#no_location_crimes').remove();
    
    if(no_location_crimes[cat] != undefined && no_location_crimes[cat] > 0){
        // Show the message on the map
        var crime_type = categories[cat].charAt(0).toLowerCase() + categories[cat].slice(1);
        if (cat == 'all-crime') crime_type = 'crime and ASB';
        
        $('<div id="no_location_crimes" style="position:absolute;"><strong>'+ no_location_crimes[cat] +'</strong> incidents of '+ crime_type +' occurred in '+ force_name +' that could not be mapped to a specific location.</div>').appendTo('body');
        
        var posTop = parseInt($('#map').height() + 130) + 'px';
        if (parseInt($('#main').width()) < 980) {
            $('#no_location_crimes').css({'top': posTop, 'left': '531px', 'right': 'auto'});
        } else {
            $('#no_location_crimes').css({'top': posTop, 'left': 'auto', 'right': '26px'});
        }
    }
}

function display_crimes_street(date, url){
    $.ajax({
        type: "GET",
        dataType: "json",
        url: url,
        success: function(data) {
        
            $('.crimedate').each(function(){$(this).text(format_date(date))});
            current_date = date;
        
            // Crimes container
            current_crimes = new Object(); 
            
            // streets container
            streets = new Object();
            
            // Create an array for each crime category to hold the markers
            $.each(categories, function(i, c) {
                
                current_crimes[i] = [];
                
            });
            
            // Keeps a tally of every crime per category
            category_totals = new Object(); 
        
            all_total = 0;
        
            $.each(data, function(i, crime) {
                
                // Add the totals up as we go
                if(category_totals[crime.category]) {
                    
                    category_totals[crime.category] += 1;
                    
                } else {
                    
                    category_totals[crime.category] = 1;
                    
                }
                
                // Total crime counter
                all_total += 1; 
                
                // Add all the crimes to an array, we'll show the markers later
                current_crimes[crime.category].push(crime);
                
                if(typeof(streets[crime.location.street.id]) == "undefined") {
                    
                    var sd = new Object();
                    sd.details = crime.location.street;
                    sd.context = false;
                    sd.crimes = [];
                    sd.categories = [crime.category];
                    
                    streets[crime.location.street.id] = sd;
                    
                }
                
                if(crime.context) {
                    streets[crime.location.street.id].context = true;
                };
                
                // Add crime to the street array
                streets[crime.location.street.id].crimes.push(crime);
                
                // If the category isn't already in the streets array, add it
                if($.inArray(crime.category, streets[crime.location.street.id].categories) == -1) {
                    
                    streets[crime.location.street.id].categories.push(crime.category);
                    
                }
                
            });
            
            // Sort streets list into alphabetical order
            streets = sort_streets(streets);
                                    
            // Show relevant crimes for current crime category
            show_markers(category);
            
            // Update totals on left hand panel
            $('#info tr.crime_type th a span.total').html('0');
            $.each(category_totals, function(catid, total) {
                
                $('#'+ catid +' th a span.total').html(total);
                
            });
            
            // Update total crimes
            $('#all-crime span.total.total').html(all_total);
            
            // Remove existing street list
            $('#crime_table_body tr').remove();
            
            // If it's the streets list we're current on, refresh the list
            if(mode == 'streets') crimes_street_roads();
            
            refresh_crimes_street = false;
            
            show_tab(mode);
        
            $('#crime_data_loading').hide();
            show_no_location_crimes();
        }
        
    });
}

// Crimes by crime type
function crimes_street(date) {
    
    var centre = marker.getPosition();
        
    var radius = circle_radius/1609.344;

	if (typeof date == 'undefined'){
		date = current_date;
	}

    var url = '/crime/radius/'+ category +'?r='+ radius +'&lat='+ centre.lat() +'&lng='+ centre.lng() +'&q='+ q + '&date=' + date;
    
    //trace(url);
   
    $('#crime_data_loading').show();
    
    if (typeof force == 'undefined'){
        display_crimes_street(date, url);
    }else{
        $.ajax({
            type: "GET",
            dataType: "json",
            url: '/crimes-no-location/?force='+force+'&date='+date+'&category='+category,
            success: function(data) {
                no_location_crimes = {};
                
                all_crime_total = 0;
                
                $.each(data, function(i, crime){
                    if(no_location_crimes[crime.category] != undefined){
                        no_location_crimes[crime.category] += 1;
                    }else{
                        no_location_crimes[crime.category] = 1;
                    }
                    all_crime_total += 1;
                });
                
                no_location_crimes['all-crime'] = all_crime_total;
                
                $.ajax({
                    type: "GET",
                    dataType: "json",
                    url: '/crime-categories/?date='+date,
                    success: function(data) {
                
                        $('#crime_types tr.crime_type').hide();
                
                        $.each(data, function(i, cat) {
                            $('#crime_types tr.crime_type#'+cat.url).show();
                        });
                
                        if(!$('#crime_types tr.crime_type th.active').parent().is(':visible')){
                            $('#all-crime a').click();
                        }                
                        display_crimes_street(date, url);
                    }
                });
            }
        });
    }
}


// Crimes by street
function crimes_street_roads() {
    
    //trace(streets);
    
    var odd_even_count = 0;
    
    // Do we need to refresh the list of streets?
    if($('#crime_table_body tr').length == 0 || refresh_crimes_street) {
        
        var street_categories = new Object();

        var trs = [];
        
		// Are there any crimes in this area?
		if(streets.length > 0) {
			
			// For each street with crimes
	        $.each(streets, function(i, street) {

	            if(odd_even_count == 0) {
	                odd_even_count = 1
	                tdclass = ''
	            } else {
	                odd_even_count = 0
	                tdclass = ' odd'
	            }

	            var new_street = '<tr class="visible'+ tdclass +'" rel="'+ street.details.id +'"><td class="name"><a href="#">'+ street.details.name +'</a>';

	            if(street.context) {
	                new_street += ' <a href="#street_commentary" class="street_commentary" rel="'+ street.details.id +'"><img src="'+ media_url +'images/crime/bubble.png" /></a>';
	            };

	            new_street += '</td><td class="total">' + street.crimes.length + '</td></tr>';

	            // Append the street to the list
	            trs.push(new_street);
	
       		});

			// Remove existing street list
		    $('#crime_roads_table table').remove();

	        var x = trs.join('');

	        $('#crime_roads_table').append('<table>'+ x +'</table>');
	
			$('#crime_roads').show();
			$('#crime_roads_no_crime').hide();

	        vtip();
	
		} else {
			
			$('#crime_roads').hide();
			$('#crime_roads_no_crime').show();
			
		}
    };
        
	show_tab(mode);
    
};


// Street level commentary popup
function crimes_street_commentary(a) {
    
    //trace('Show commentary for street '+ a.attr('rel'));
    
    var street = streets[$.inArray(a.attr('rel').toString(), street_ids)];
    
    var cc = new Object();
    
    // Run through each crime on or near this street
    $.each(street.crimes, function(i, crime) {
        
        if(crime.context) {
            
            // Check to see if this category has already been loaded into the popup
            if(typeof(cc[crime.category]) == "undefined") {

                cc[crime.category] = [crime];

            } else {

                cc[crime.category].push(crime);

            }
            
        };
        
    });
    
    // Sort the categories so that they match the order in the left panel
    var sorted_categories = sort_categories(cc);
    
    var html = '<h2>'+ street.details.name +'</h2>';
    
    // For each street by crime category
    $.each(sorted_categories, function(cat, crimes) {
        
        html += '<div class="category"><h3><img src="'+ media_url +'images/crime/colours/'+ cat +'.png" alt="'+ categories[cat] +'"/> '+ categories[cat] +'</h3>';
        
        $.each(crimes, function(i, crime) {

			var commentary = '<p>'+ crime.context.replace('\n', '<br/>') +'</p>';
           
            html += '<div class="crime">'+ commentary +'</div>';
            
        });
        
        html += '</div>';
    });
    
    $.fancybox('<div id="street_commentary">'+ html +'</div>');

};


// Neighbourhood crimes
function crimes_neighbourhood() {
	
	var c = marker.getPosition();

    var url = '/crime/neighbourhood/get?lat='+ c.lat() +'&lng='+ c.lng();
    
    //trace(url);
    
    $.ajax({
        type: "GET",
        dataType: "json",
        url: url,
        success: function(data) {
			
			// Have we changed neighbourhood?
			if(data.neighbourhood_name) {
				
				var neighbourhood_text = gettext('Neighbourhood crimes and ASB for %(neighbourhood)s');
                var translated = interpolate(neighbourhood_text, { 'neighbourhood': data.neighbourhood_name }, true);
				
				$('#neighbourhood_name').html(translated);
			}
            
            // Is there commentary for this neighbourhood?
            if(data.commentary) {
                
				var commentary = data.commentary.replace(/\n/g, '<br/>');
                
                $('#commentary').html('<p>'+ commentary +'</p>').removeClass('visuallyhidden');
                
            } else {
				
				$('#commentary').addClass('visuallyhidden').html();
				
			}
                        
            if(data.crime_levels && !$.isEmptyObject(data.crime_levels)) {
	
				//console.log(data);
                
                var level_text = gettext('The level of crime and ASB in this area is %(level)s');
                var translated = interpolate(level_text, { 'level': crime_levels[data.crime_levels['all-crime']][language] }, true);

                $('#crime_level h4 span').html(translated);
                $('#crime_level h4').removeClass().addClass(data.crime_levels['all-crime']);
				
				var crime_list = [];
				
				$.each(data.crime_totals, function(i, crime) {
					
					var ds = crime.month.split('-');
					
					var d = new Date();
					d.setFullYear(parseInt(ds[0]), parseInt(ds[1]-1), 01);
														
					if(crime.category == 'all-crime') {
						crime_list.push('<tr><td class="month">'+ d.getMonthName() +' '+ ds[0] +'</td><td class="total">'+ crime.total +'</td><td class="rate">'+ data.crime_rates[i].total +'</td></tr>');
					}

				});
				
				$('#neighbourhood_stats').html('').append('<table>'+ crime_list.join('') +'</table>');
				
				$('#neighbourhood_crimes').show();
                $('#neighbourhood_no_crime').hide();
				
                
            } else {
                
                $('#neighbourhood_crimes').hide();
                $('#neighbourhood_no_crime').show();
                
            }

            var kml_url = media_url +'kmls/'+ crime_date +'/'+ data.force_id +'/'+ data.neighbourhood_id +'.kml';

            // Load the KML for the neighbourhood
            kml_layer = new google.maps.KmlLayer(kml_url, {
                map: map,
                suppressInfoWindows: true,
				preserveViewport: true
            });

            refresh_crimes_neighbourhood = false;
            
            show_tab(mode);
        
        }
        
    })
    
}


// Adds a crime marker internally
function add_marker(crime, total) {
    
    //trace('Total: '+ total);
    
    // A marker for the crime
    var m = new google.maps.Marker({
       position: new google.maps.LatLng(crime.location.latitude, crime.location.longitude),
       //map: map,
       icon: marker_icons_single[category]
    });
        
    // Track which street this marker is for, and the total crimes the street has
    $.data(m, 'street', crime.location.street.id.toString());
    $.data(m, 'total', total);

    markers.push(m);
   
}


// Switches the markers on the map & update left hand panel with the individual crimes
// IE7+ ONLY
function show_markers(new_category) {

    // IE7+ check
    if($.browser.msie && $.browser.version < 7) return;
    
    remove('markers');
    
    //trace('Show '+ new_category);
    
    var cats = $('#crime_types');
    
    var ctotals = new Object();
    
    total_crimes = 0;
    
    // If we're showing all crime and ASB
    if(new_category == 'all-crime') {
        
        // Loop through each category, then each crime in that category
        $.each(current_crimes, function(i, category) {

            $.each(category, function(i, crime) {
                
                // If we don't have a total for this street, start at 1
                if(typeof(ctotals[crime.location.street.id]) == "undefined") {
                    
                    c = new Object();
                    c.total = 1;
                    c.details = crime.location.street;

                    ctotals[crime.location.street.id] = c;
                
                } else {

                    ctotals[crime.location.street.id].total += 1;

                };
                
                total_crimes += 1;

            });

        });
    
    } else {
        
        // Loop through the crimes in a particular category        
        $.each(current_crimes[new_category], function(i, crime) {
            
            if(typeof(ctotals[crime.location.street.id]) == "undefined") {
                
                c = new Object();
                c.total = 1;
                c.details = crime.location.street;
                
                ctotals[crime.location.street.id] = c;
                
            } else {
                
                ctotals[crime.location.street.id].total += 1;
                
            }
            
            total_crimes += 1;
        
        });

    }
    
    // Create each crime marker internally
    $.each(ctotals, function(streetid, street) {
        
        var key = $.inArray(streetid, street_ids);
        
        //trace('KEY: '+ key +', '+ street.details.id);
        
        add_marker(streets[key].crimes[0], street.total);
    });
    
    // If we're already showing clusters, clear them so we don't double up
    if (cluster) cluster.clearMarkers();
    
    // Show the cluster markers
    cluster = new MarkerClusterer(map, markers, {
        maxZoom: zoom_max,
        gridSize: 40,
        styles: marker_icons[new_category]
    });
    
    show_no_location_crimes(new_category);
    
    // Resize the map (just in case)
    resize_map();   
    
    
};


// Removes markers or info windows from the map
function remove(what) {
    
    if(what == 'markers') {
        
        for(i in markers) {
            markers[i].setMap(null);
        }

        markers.length = 0;
        
        if (cluster) cluster.clearMarkers();
        
    } else if(what == 'info_windows') {
        
        // Un-highlight any street row on the left hand panel
        $('#crime_roads td').removeClass('highlight');
        
        //trace('Removing info windows');
        
        for(i in info_windows) {
            try {
                google.maps.event.clearInstanceListeners(info_windows[i]);
                info_windows[i].close();
            } catch(e) {}
        }

        info_windows.length = 0;
        
    }
    
};

// Updates the mode and current date in the URL
function update_url_hash() {
   if(page == 'crime') {
        window.location.hash = mode+'/'+current_date;
	
	// Track this click on Analytics
	analytics_track(window.location.href, 'Crime', 'Tab', mode);
    }
}

// Reads the current date and mode from the URL
function read_url_hash() {
    parts = window.location.hash.match(/(crimetypes|streets|neighbourhood)\/([0-9]{4}-[0-9]{2})/);

    if(parts != null) {
        mode = parts[1];
        // Check that date is in the list of dates for which there are data
        if($('#choose_date [value='+parts[2]+']').length == 1)
            current_date = parts[2];
    }
}

// Takes date (YYYY-MM) and looks up the user-visible value in the #choose_date dropdown
function format_date(date){
    return $('#choose_date [value='+date+']').text();
}

