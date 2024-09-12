var thissite = 'http://www.ukcrimestats.com/';
var geocoder;   
var map;  
var infoWindow;
var geoXml;
var globalmap;
var globalheatmap;
var heatmap_radius = 0;
var map_loaded = false;
var heatmap_process = false;
var heatmap_delayed = false;
var globalCircle;
var circleFeature;
var timerInterval = 0;

String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

// ------------------------------------------------------------------------------------
// This function gets called when the end-user clicks on some date.
function selected(cal, date) {
  cal.sel.value = date; // just update the date in the input field.
  if (cal.sel.id == "sel1" || cal.sel.id == "sel3")
    // if we add this call we close the calendar on single-click.
    // just to exemplify both cases, we are using this only for the 1st
    // and the 3rd field, while 2nd and 4th will still require double-click.
    cal.callCloseHandler();
}

// ------------------------------------------------------------------------------------
// And this gets called when the end-user clicks on the _selected_ date,
// or clicks on the "Close" button.  It just hides the calendar without
// destroying it.
function closeHandler(cal) {
  cal.hide();                        // hide the calendar
}

// ------------------------------------------------------------------------------------
// This function shows the calendar under the element having the given id.
// It takes care of catching "mousedown" signals on document and hiding the
// calendar if the click was outside.
function showCalendar(id, format) {
  var el = document.getElementById(id);
  if (calendar != null) {
    // we already have some calendar created
    calendar.hide();                 // so we hide it first.
  } else {
    // first-time call, create the calendar.
    var cal = new Calendar(false, null, selected, closeHandler);
    // uncomment the following line to hide the week numbers
    // cal.weekNumbers = false;
    calendar = cal;                  // remember it in the global var
    cal.setRange(1900, 2070);        // min/max year allowed.
    cal.create();
  }
  calendar.setDateFormat(format);    // set the specified date format
  calendar.parseDate(el.value);      // try to parse the text in field
  calendar.sel = el;                 // inform it what input field we use
  calendar.showAtElement(el);        // show the calendar below it

  return false;
}

var MINUTE = 60 * 1000;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
var WEEK = 7 * DAY;

// ------------------------------------------------------------------------------------
// If this handler returns true then the "date" given as
// parameter will be disabled.  In this example we enable
// only days within a range of 10 days from the current
// date.
// You can use the functions date.getFullYear() -- returns the year
// as 4 digit number, date.getMonth() -- returns the month as 0..11,
// and date.getDate() -- returns the date of the month as 1..31, to
// make heavy calculations here.  However, beware that this function
// should be very fast, as it is called for each day in a month when
// the calendar is (re)constructed.
function isDisabled(date) {
  var today = new Date();
  return (Math.abs(date.getTime() - today.getTime()) / DAY) > 10;
}

// ------------------------------------------------------------------------------------
function flatSelected(cal, date) {
  var el = document.getElementById("preview");
  el.innerHTML = date;
}

// ------------------------------------------------------------------------------------
function showFlatCalendar() {
  var parent = document.getElementById("display");

  // construct a calendar giving only the "selected" handler.
  var cal = new Calendar(false, null, flatSelected);

  // hide week numbers
  cal.weekNumbers = false;

  // We want some dates to be disabled; see function isDisabled above
  cal.weekNumbers = false;

  // We want some dates to be disabled; see function isDisabled above
  cal.setDisabledHandler(isDisabled);
  cal.setDateFormat("DD, M d");

  // this call must be the last as it might use data initialized above; if
  // we specify a parent, as opposite to the "showCalendar" function above,
  // then we create a flat calendar -- not popup.  Hidden, though, but...
  cal.create(parent);

  // ... we can show it here.
  cal.show();
}


// ----------------------------------------------------------	
function showHideNeighbourhoods(chkboxname, chkboxidx, divid1, divid2, policeid) {
	
	var chkbox = document.theform[chkboxname][chkboxidx];
	var neighbourhood_implode = document.theform.neighbourhood_implode.value;
	var browser = navigator.appName; 
	var headerdiv = document.getElementById(divid1);
	var resultsdiv = document.getElementById(divid2);
		
	if (chkbox.checked) {
				
		if(browser == "Microsoft Internet Explorer"){
			var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}else{
			/* Create the object using other browser's method */
			var xmlhttp = new XMLHttpRequest();
		}
		
		var myURL = thissite + 'system/ajax_getneighbourhoodsbypoliceid.php?policeid=' + policeid + '&nbchecked=' + neighbourhood_implode;
												
		xmlhttp.open("GET", myURL, true);
		xmlhttp.onreadystatechange=function() {
			if (xmlhttp.readyState == 4) { 
				var response = xmlhttp.responseText;						
				
				resultsdiv.innerHTML = response;
				resultsdiv.className = "Hide";
				headerdiv.className = "Show";
															
			}
		}
	
		xmlhttp.send(null);
			
	} else {
		resultsdiv.innerHTML = '';
		resultsdiv.className = "Hide";
		headerdiv.className = "Hide";
		
	}

}
	
// ----------------------------------------------------------
function ShowHideDiv_n(div1, div2) {
	
	var divid1 = document.getElementById(div1);
	var divid2 = document.getElementById(div2);
	
	if (divid1!=null) {
			
		if (divid2.className == "Hide") {
			divid2.className = "Show";
		} else {
			divid2.className = "Hide";
		}
				
	}
}		
	
// ----------------------------------------------------------
function showHideDiv(divname) {
	
	var divid = document.getElementById(divname);
					
	//if (divid!="undefined") {
	if (undefined != divid) {	
			
		if (divid.className == "Hide") {
			divid.className = "Show";
		} else {
			divid.className = "Hide";
		}
				
	}
}	

// ----------------------------------------------------------
function crimedb_init() {

	// Loop through all checked Police Forces and check neighbourhoods
	var browser = navigator.appName; 
	
	var police_implode = document.theform.police_implode.value;
	var neighbourhood_implode = document.theform.neighbourhood_implode.value;
	var policearr = police_implode.split(',');
	
	if (neighbourhood_implode.length>0) {
		for (i=0;i<=policearr.length;i++) {
			if (policearr[i]>0) {
				getNeighbourhoodsByForceID( policearr[i], neighbourhood_implode );		
			}
		}
	}	
	
}

// ----------------------------------------------------------
function getNeighbourhoodsByForceID( forceid, nbchecked ) {
	
	var browser = navigator.appName; 
	
	var div1 = 'chkPoliceForces_' + forceid.toString() + '_2';
	var div2 = 'chkPoliceForces_' + forceid.toString() + '_3';
	var headerdiv = document.getElementById(div1);
	var resultsdiv = document.getElementById(div2);
	
	if(browser == "Microsoft Internet Explorer"){
		var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}else{
		/* Create the object using other browser's method */
		var xmlhttp = new XMLHttpRequest();
	}
	
	var myURL = thissite + 'system/ajax_getneighbourhoodsbypoliceid.php?policeid=' + forceid + '&nbchecked=' + nbchecked;
																
	xmlhttp.open("GET", myURL, true);
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState == 4) { 
			var response = xmlhttp.responseText;						
			resultsdiv.innerHTML = response;
			resultsdiv.className = "Show";
			headerdiv.className = "Show";
														
		}
	}

	xmlhttp.send(null);
	
}

// ----------------------------------------------------------
function checkAll(field) {
	var checkBoxes = document.theform.elements[field];
	for (i = 0; i < checkBoxes.length; i++){
      checkBoxes[i].checked = true;
  }
}

// ----------------------------------------------------------
function uncheckAll(field) {
	var checkBoxes = document.theform.elements[field];
	for (i = 0; i < checkBoxes.length; i++){
      checkBoxes[i].checked = false;
  }
}

// ----------------------------------------------------------
function neighbourhood_init() {     
	create_map('cmap', 'neighbourhoodform');
}

// ----------------------------------------------------------
function streetcrime_init() {     
	create_map("map", "streetcrimeform", 10);	

}

// ----------------------------------------------------------
function street_init() {     
	create_map("map","streetform",0,17)
	
}

// ----------------------------------------------------------
function homepage_init() {     
	
	geocoder = new google.maps.Geocoder();     
	
	var f = document.forms[0];
	var address = document.getElementById("postcode").value;  
		
	var myOptions = {       
			zoom: 14,       
			scrollwheel: false,       
			mapTypeId: google.maps.MapTypeId.ROADMAP     
	}     
	
	map = new google.maps.Map(document.getElementById("map"), myOptions); 
	
	// Close InfoWindow when clicking anywhere on the map.
  infoWindow = new google.maps.InfoWindow();
  google.maps.event.addListener(map, 'click', function() {
    infoWindow.close();
  });
	
	// Set center to Postcode's Lat/Lng  
	if (address.length>0) {
			geocoder.geocode( { 'address': address}, function(results, status) {       
			if (status == google.maps.GeocoderStatus.OK) {         
				map.setCenter(results[0].geometry.location);    
				var marker = new google.maps.Marker({             
					map: map,             
					position: results[0].geometry.location         
				});       
				
				iconFile = 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png';
				marker.setIcon(iconFile);
				
				// Add circle overlay and bind to marker
				var circle = new google.maps.Circle({
				  map: map,
				  radius: 1609,    // 1 miles in metres
				  fillColor: '#5eb1ff',
				  strokeWeight: 1,
				  strokeColor: '#DDDDDD'
				});
				circle.bindTo('center', marker, 'position');

					
			} else {         
				alert("Oops - check your Post Code");
			}    
		});   
	}		
	
	// Map crime markers on map
	var f = document.forms['theform'];
	var markersarray_implode = f.markersarray.value;
	var markerarray = markersarray_implode.split(',');
	
	if (markersarray_implode.length>0) {
		for (i=0;i<=markerarray.length;i++) {
			
			if (markerarray[i].length>0) {
			
			var markerproperties = markerarray[i].split('~');
			setMarker(markerproperties[0], 
					markerproperties[1], 
					markerproperties[2], 
					markerproperties[3], 
					markerproperties[4],
					markerproperties[5],
					markerproperties[6],
					i
					);

			}
			
		}
	}	
	
}

// ----------------------------------------------------------
function advertise_init() {     
	
	geocoder = new google.maps.Geocoder();     
	
	var f = document.forms['adform'];
	//var address = f.ad_postcode.value;
	var lat = f.ad_lat.value;
	var lng = f.ad_lng.value;
	var miles = f.ad_miles.options[f.ad_miles.selectedIndex].value;
	var gmapzoom = 8;
	
	if (miles<5) {
		gmapzoom = 11;		
	} else if (miles>=5 && miles<=10) {
		gmapzoom = 10;
	}
	
	// Set center to Postcode's Lat/Lng  
	if (lat>0) {
			
			geocoder = new google.maps.Geocoder();     
			
			var latlng = new google.maps.LatLng(lat,lng);   
			var myOptions = {       
					zoom: gmapzoom,       
					center: latlng, 
					scrollwheel: false,       
					mapTypeId: google.maps.MapTypeId.ROADMAP     
			}  
			
			map = new google.maps.Map(document.getElementById("map"), myOptions); 
	
			// Close InfoWindow when clicking anywhere on the map.
		  infoWindow = new google.maps.InfoWindow();
		  google.maps.event.addListener(map, 'click', function() {
		    infoWindow.close();
		  });
	
			// Put center marker
			var marker = new google.maps.Marker({             
				map: map,             
				position: latlng         
			});       
			
			iconFile = 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png';
			marker.setIcon(iconFile);
			
			// Add circle overlay and bind to marker
			var circle = new google.maps.Circle({
			  map: map,
			  radius: 1609*miles,    // 1 miles in metres
			  fillColor: '#5eb1ff',
			  fillOpacity: 0.26,
    		strokeWeight: 2,
    		strokeColor: '#4e6c89',
    		strokeOpacity: 0.2,
			});
			circle.bindTo('center', marker, 'position');
			
					
	} else {         
		// do nothing
	}    
		
	
}

// ----------------------------------------------------------
function constituency_init(conid, maxtotal, heatmapdata) {     
	
	var myOptions = {       
			zoom: 8,       
			scrollwheel: false,       
			mapTypeId: google.maps.MapTypeId.ROADMAP     
	}   
		
	var map = new google.maps.Map(document.getElementById("heatmapArea"), myOptions);		
	globalmap = map;
	
	// Overlay Constituency Boundary
  // Don't use the MapIt api anymore to get the boundary
	
	var heatmap = new HeatmapOverlay(map, {"radius":12, "visible":true, "opacity":60});
	globalheatmap = heatmap;	
		
	var myData={
		max: maxtotal,
		data: heatmapdata
	};
	
	// this is important, because if you set the data set too early, the latlng/pixel projection doesn't work
	google.maps.event.addListenerOnce(map, "idle", function(){
		heatmap.setDataSet(myData);
	});
		
	
}

// ----------------------------------------------------------
function subdivision_init(conid, maxtotal, heatmapdata) {     
	
	var myOptions = {       
			zoom: 14,       
			scrollwheel: false,       
			mapTypeId: google.maps.MapTypeId.ROADMAP     
	}   
		
	var map = new google.maps.Map(document.getElementById("heatmapArea"), myOptions);		
	globalmap = map;
	
	// Overlay Constituency Boundary
  // Don't use the mapit API anymore.
	
	var heatmap = new HeatmapOverlay(map, {"radius":12, "visible":true, "opacity":60});
	globalheatmap = heatmap;	
		
	var myData={
		max: maxtotal,
		data: heatmapdata
	};
	
	// this is important, because if you set the data set too early, the latlng/pixel projection doesn't work
	google.maps.event.addListenerOnce(map, "idle", function(){
		heatmap.setDataSet(myData);
	});
		
	
}


// ----------------------------------------------------------
function postcodedistrict_init(maxtotal, heatmapdata) {     
	
	var f = document.forms['postcodedistrictform'];
	var formlat = f.formlat.value;
	var formlng = f.formlng.value;
	
	if (formlat>0) {
		
		geocoder = new google.maps.Geocoder();     
			
		var latlng = new google.maps.LatLng(formlat,formlng);   
		var myOptions = {       
				zoom: 12,       
				center: latlng, 
				scrollwheel: false,       
				mapTypeId: google.maps.MapTypeId.ROADMAP     
		}     
		
		map = new google.maps.Map(document.getElementById("heatmapArea"), myOptions); 
		globalmap = map;
		
		// Close InfoWindow when clicking anywhere on the map.
	  infoWindow = new google.maps.InfoWindow();
	  google.maps.event.addListener(map, 'click', function() {
	    infoWindow.close();
	  });
		  
		// Put center marker
		var marker = new google.maps.Marker({             
			map: map,             
			position: latlng         
		});       
		
		iconFile = 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png';
		marker.setIcon(iconFile);
			
		// Overlay circle boundary
//		var circle = new google.maps.Circle({
//		  map: map,
//		  radius: 1609*2,    // 1 miles in metres
//		  fillColor: '#00AAFF',
//		  strokeWeight: 1,
//		  strokeColor: '#DDDDDD'
//		});
//		circle.bindTo('center', marker, 'position');
	
		var heatmap = new HeatmapOverlay(map, {"radius":20, "visible":true, "opacity":60});
		globalheatmap = heatmap;	
		
		var myData={
			max: maxtotal,
			data: heatmapdata
		};
		
		// this is important, because if you set the data set too early, the latlng/pixel projection doesn't work
		google.maps.event.addListenerOnce(map, "idle", function(){
			heatmap.setDataSet(myData);
		});
		
	}
		
	
}
	

// ----------------------------------------------------------
function heatmap_display_change(heatmapdata) {
		
	var maxcount = document.getElementById('slider_maxcount');
	
	var newData={
		max: maxcount.value,
		data: heatmapdata
	};
		
	globalheatmap.setDataSet(newData);
	newData = null;
			
};

// ------------------------------------------------------------
function automateHeatMapFn() {
	if (heatmap_process) {
		heatmap_delayed = true;
		return;
	}	
	heatmap_delayed = false;	
	var times = montharr_val.length;
	var sliderval = document.getElementById('slider_val');
	var slidertext = document.getElementById('slider_text');
	
	if (sliderval.value == (times-1))
	{
		sliderval.value = 0;
	}
	else
	{
		sliderval.value = parseInt(sliderval.value)+1;	
	}
	
	// Alter crime year text
	slidertext.value = montharr_title[sliderval.value];
	
	// Move scroll bar across
	$( "#slider" ).slider({ value: sliderval.value });
	heatmap_process = true	
	// Display new heat map
	heatmap_display_change(heatmapArr[sliderval.value]);
	heatmap_process = false
	if (heatmap_delayed)
		automateHeatMapFn()
}


// ----------------------------------------------------------
function setMarker(lat, lng, cat, txt, tmonth, nbid, crimeid, uid) {
	
	var tImage;
	
	if (nbid=='1') {
		tImage = 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png';	
		
	} else {
		
		if (cat=='Anti-social behaviour') {
			tImage = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
		} else  if (cat=='Burglary') {
			tImage = 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png';
		} else  if (cat=='Other crime') {
			tImage = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
		} else  if (cat=='Robbery') {
			tImage = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
		} else  if (cat=='Vehicle crime') {
			tImage = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
		} else  if (cat=='Violent crime') {
			tImage = 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png';
		} else {
			tImage = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';	
		}
			
	}
	
	var tLatLng = new google.maps.LatLng(lat,lng);    
		
	var marker = new google.maps.Marker({             
		map: map,             
		position: tLatLng,
		icon: tImage
	});       
		
	// Register a click listener on each marker created.
  google.maps.event.addListener(marker, 'click', (function(markerArg, index) {
    return function() {
      infoWindow.setContent('<div style="text-align:left;"><font style="font-size:12px;"><b>Crime ID: ' + crimeid.toString() + '</b><br><i>' + cat + '</i><br>' + txt + '<br><a title=\"This link will open in a separate window\" target=\"ukcrimestats\" href="' + thissite + 'Street_Crime/' + crimeid.toString() + '/">More detail</a></font><br><br><font style="font-size:12px;"><b>Can you help?</b><ul><li><a target=\"new\" href=\"https://secure.crimestoppers-uk.org/ams.form.anonymous.asp"\">Give information on CrimeStoppers</a></li><li><a href=\"#team\">Contact Neighbourhood Police</a></li><li><a target=\"new\" href=\"http://twitter.com/home?status=UKCrimeStats.com+CrimeID:+' + crimeid.toString() + '+' + thissite + 'Street_Crime/' + crimeid.toString() + '/\">Tweet about this crime</a></font></li></ul><font style=\"font-size:10px;color:#B1B1B1\">To protect privacy, crimes are mapped to points<br>on or near the road where they occurred.</font></div>');
      infoWindow.open(map, markerArg);
    };
  })(marker, uid));
  
}


// ----------------------------------------------------------
function setMarkerPoliceStation(lat, lng, address, uid) {
	
	if (undefined!=lat) {
		
		var tImage = thissite + 'img/icons/police.png';		
		var tLatLng = new google.maps.LatLng(lat,lng);    
			
		var marker = new google.maps.Marker({             
			map: map,             
			position: tLatLng,
			icon: tImage, 
			title: 'Police Station'
		});       
			
		// Register a click listener on each marker created.
	  google.maps.event.addListener(marker, 'click', (function(markerArg, index) {
	    return function() {
	      infoWindow.setContent('<div style="text-align:left;width:200px;"><font style="font-size:12px;">' + address + '</font></div>');
	      infoWindow.open(map, markerArg);
	    };
	  })(marker, uid));
  
			
	}
	
}

// ----------------------------------------------------------
function setMarkerRiot2011(lat, lng, markertext, piclink, uid) {
	
	if (undefined!=lat) {
				
		var textarr = markertext.split('@@');
		var markertext = '<b>' + textarr[0] + '</b><br><br>' + textarr[1] + ': ' + textarr[2] + '<br><br>' + '<a href=\"' + thissite + '/Neighbourhood/' + textarr[4] + '\">' + textarr[3] + '</a>';
		
		var tImage = thissite + 'img/icons/red-dot.png';		
		var tLatLng = new google.maps.LatLng(lat,lng);    
			
		var marker = new google.maps.Marker({             
			map: map,             
			position: tLatLng,
			icon: tImage, 
			title: '2011 Riot Event'
		});       
			
		// Register a click listener on each marker created.
	  google.maps.event.addListener(marker, 'click', (function(markerArg, index) {
	    return function() {
	      infoWindow.setContent('<div style="text-align:left;width:200px;"><font style="font-size:12px;">' + markertext + '</font></div>');
	      infoWindow.open(map, markerArg);
	    };
	  })(marker, uid));
  
			
	}
	
}

// ----------------------------------------------------------
function setMarkerMissingLocation(lat, lng, markertext, uid) {
	
	if (undefined!=lat) {
				
		var textarr = markertext.split('@@');
		var markertext = '<b>' + textarr[0] + '</b><br>' + textarr[1] + '<br>' + textarr[2];
		
		var tImage = thissite + 'img/icons/red-dot.png';		
		var tLatLng = new google.maps.LatLng(lat,lng);    
			
		var marker = new google.maps.Marker({             
			map: map,             
			position: tLatLng,
			icon: tImage, 
			title: 'Missing location'
		});       
			
		// Register a click listener on each marker created.
	  google.maps.event.addListener(marker, 'click', (function(markerArg, index) {
	    return function() {
	      infoWindow.setContent('<div style="text-align:left;width:200px;"><font style="font-size:12px;">' + markertext + '</font></div>');
	      infoWindow.open(map, markerArg);
	    };
	  })(marker, uid));
  
			
	}
	
}

// ----------------------------------------------------------
function setMarkerMessage(lat, lng, markertext, uid) {
	
	if (undefined!=lat) {
		
		var tImage = thissite + 'img/icons/pink-dot.png';	
		var tLatLng = new google.maps.LatLng(lat,lng);    
			
		var marker = new google.maps.Marker({             
			map: map,             
			position: tLatLng,
			icon: tImage, 
			title: markertext
		});       
			
		// Register a click listener on each marker created.
	  google.maps.event.addListener(marker, 'click', (function(markerArg, index) {
	    return function() {
	      infoWindow.setContent('<div style="text-align:left;width:200px;"><font style="font-size:12px;">' + markertext + '</font></div>');
	      infoWindow.open(map, markerArg);
	    };
	  })(marker, uid));
  
			
	}
	
}

// ----------------------------------------------------------
function deleteForm(buttonname) {

	if (confirm('Are you sure you wish to delete this record?')) {
		document.theform[buttonname].click();
	}

}

// ----------------------------------------------------------
function cancelForm(formname, permakey) {

	if (confirm('Are you sure you wish to cancel your changes?')) {
		document.location.href = thissite + formname + '?id=' + permakey;
	}

}

// ----------------------------------------------------------
function cancelNew(formname) {

	if (confirm('Are you sure you wish to cancel your changes?')) {
		document.location.href = thissite + formname.replace('detail', 'summary');
	}

}

// ----------------------------------------------------------
function cancelURL(turl) {

	if (confirm('Are you sure you wish to cancel your changes?')) {
		document.location.href = thissite + turl;
	}

}

// ----------------------------------------------------------
function blankOutValue(formname, fieldname, default_text) {
		
	var f = document.forms[formname];
	var e = f[fieldname];
	
	if (e!='undefined') {
		if (e.value == default_text) {
			e.value = '';
		} else if (e.value == '') {
			e.value = default_text;
		}
	}
	
	
}

// ----------------------------------------------------------
function ucase(object) {
  object.value=object.value.toUpperCase();
} 


// ------------------------------------------------------------
function automateHeatMap(dec) {
	
	if (dec==0)
	{
		timerInterval = window.clearInterval(timerInterval);	
	}
	else if (dec==1)
	{
		timerInterval = window.setInterval( "automateHeatMapFn()", 800 );	
	}	
		
}

// ------------------------------------------------------------
function policeforce_init() {
	console.log("policeforce_init");
/*	
	var f = document.forms['policestationform'];
		
	var myOptions = {       
			zoom: 10,       
			center: new google.maps.LatLng(0, 0),
			scrollwheel: false,       
			mapTypeId: google.maps.MapTypeId.ROADMAP     
	}     
	
	var map2 = new google.maps.Map(document.getElementById("map"), myOptions); 
	
	// Close InfoWindow when clicking anywhere on the map.
  infoWindow = new google.maps.InfoWindow();
  google.maps.event.addListener(map2, 'click', function() {
    infoWindow.close();
  });
		
	// Map police stations on map	
	var markersarray_implode = f.markersarray.value;
	var markerarray = markersarray_implode.split(',');
	
	if (markersarray_implode.length>0) {
		
		var bounds = new google.maps.LatLngBounds();
				
		for (i=0;i<=markerarray.length;i++) {
			
			if (undefined != markerarray) {
				if (undefined != markerarray[i]) {
					
					if (markerarray[i].length>0) {
					
						var markerproperties = markerarray[i].split('~');
						var myLatLng = new google.maps.LatLng(markerproperties[1], markerproperties[2]);
																								
						setMarkerPoliceStation(markerproperties[1], 
								markerproperties[2], 
								markerproperties[3],
								markerproperties[0]
						);
						
						bounds.extend(myLatLng);
													
					}
				}
			}
			
		}
		
		map2.fitBounds(bounds);
		
	}
*/
	var f2 = document.forms["policeform"];	
	create_map("map", "policeform");
	//var map2 = new google.maps.Map(document.getElementById("map2"), myOptions); 
	//var kmlLayer = new google.maps.KmlLayer(f2.kmlpath.value); 
	//			kmlLayer.setMap(map2);
}
//-----------------------------------------------------------
function map_init(){
	console.log("map_init");
	create_map("map", "mapform");
}
//-----------------------------------------------------------
function create_map(mapid, formid, circle_radius, zoom) {	

	//google chrome lika the putanseco

	var f = document.forms[formid];	
	var lat = 0;
	var lng = 0;
	if (typeof f.formlat != "undefined"){
	    lat = parseFloat(f.formlat.value);
	    lng = parseFloat(f.formlng.value);
	}
	var no_marker = 0;
	if (typeof f.no_marker != "undefined"){
	    no_marker = 1;
	}
	thesource = new ol.source.OSM()
        thesource.on('tileloadend', function ()  { map_loaded=true })
	tile_layer = new ol.layer.Tile({
            source: thesource
	})
	layers = [tile_layer];
	snapto = false;
	var vector = false;
	var pixelRatio = 1;
	var icon = 'https://ukcrimestats.com/img/icons/pink-dot.png';
 	/*if (typeof f.iconFile != "undefined"){
		icon = f.iconFile.value
		console.log(icon)	
	}*/
	if (typeof f.pixelRatio != "undefined") {
		pixelRatio = 2;
	}
	var zoomLevel = 13;
	if (typeof zoom != "undefined"){
		zoomLevel = zoom;
	}
	if (typeof f.kmlpath != "undefined"){
        //    var kmlLayer = new google.maps.KmlLayer(f.kmlpath.value);
        //    kmlLayer.setMap(map);
       //console.log(f.kmlpath.value.replace('www.ukcrimestats.com', '54.170.248.220')); 
	vector = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: f.kmlpath.value,    //'http://54.170.248.220/kml/policeforce/test.php',
          format: new ol.format.KML()
        })
      });
      snapto = vector;
	}
	if (typeof circle_radius != "undefined"){
	snapto = false;
	
	}
	if (snapto){
        var listenerKey = vector.getSource().on('change', function(e) {
    if (vector.getSource().getState() == 'ready') {
	try {
        map.getView().fit((vector.getSource().getFeatures()[0].getGeometry().getExtent()), map.getSize(), {padding: [20,20,20,20]});
	}
	catch (error) {
		vector = null;
		no_marker = false;
		console.log(error)
        }
    }
     });
layers[1] = vector;
}
if (!vector && (lat + lng) && !no_marker){
	var iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lng,lat]))
      });
    
      var iconStyle = new ol.style.Style({
        image: new ol.style.Icon(({
          src: icon //'https://ukcrimestats.com/img/icons/pink-dot.png'
        }))
      });

      iconFeature.setStyle(iconStyle);

      var vectorSource = new ol.source.Vector({
        features: [iconFeature]
      });

      var vectorLayer = new ol.layer.Vector({
        source: vectorSource
      });
	layers.push(vectorLayer);
}

	var view = new ol.View({center: ol.proj.fromLonLat([lng,lat]),
          zoom: zoomLevel}); 
	$('#'+mapid).html("");
        map = new ol.Map({
        target: mapid,
        layers: layers,
        view: view,
	pixelRatio : pixelRatio
      });
if (typeof circle_radius != "undefined" && circle_radius){
	map.addLayer(getCircle(lat, lng, circle_radius));
	if (vector) map.addLayer(vector);	
}

if (typeof f.markersarray != "undefined"){
	var markersarray_implode = f.markersarray.value;
       // var markerarray = markersarray_implode.split(',');

        if (markersarray_implode.length>0) {
                map.addLayer(getMarkers(markersarray_implode));
		map.on('pointermove', function(e) { 
			cursorStyle = testFeature(e) ? "pointer" : "default";
			document.body.style.cursor = cursorStyle;
			//console.log(cursorStyle);
		});
		map.on('singleclick', function(e) {
			$("#crimepop").remove()
			crimepoints = testFeature(e);
			if (crimepoints) {
				showCrimePopup(crimepoints, e);
			}
			crimepoints = null;
		});
                //console.log('q');
        }
}
globalmap = map;
}
testFeature = function(e){
	onePoint = false;
	globalmap.forEachFeatureAtPixel(e.pixel, function(f) {
		if ( typeof f.get('features') != "undefined" ) {
			thing = f.get('features');
			lastName = "";
			onePoint = thing;
			for ( i = 0; i < thing.length; i++) {
				name = thing[i].get('name');
				if (lastName != "" && name != lastName){
					onePoint = false;
				}	
				lastName = name;
			}
		}
	}
	);
	return onePoint;
}
function showCrimePopup(crimePoints, e){
	var coordinate = e.coordinate;
		crimetext = "<p><b>"+crimePoints[0].get('name')+"</b></p>";
		if (crimePoints.length == 1){
			crimetext += crimePoints[0].get('crimeData')[2];
		}
		else {
			crimetotals = {}
			crimetypes = []
			for (i = 0; i < crimepoints.length; i++){
				crime = crimePoints[i].get('crimeData')[2]
				if (crimetypes.indexOf(crime) == -1){
					crimetypes.push(crime);
					crimetotals[crime] = 1;
				}	
				else
					crimetotals[crime] ++;
			}
			for (i = 0; i < crimetypes.length; i++)
				crimetext += crimetypes[i] + ": " +crimetotals[crimetypes[i]]+ "<br>";
		}
	        $("body").prepend("<div id='crimepop' style='visiblity:hidden; text-align:left; width:250px; background-color:white; box-shadow: 0 1px 4px rgba(0,0,0,0.2); border-radius: 5px; padding:3px 12px 12px 12px' ><div style ='text-align:right'><a style='color:black' href='javascript:void(0)' onclick='$(\"#crimepop\").remove()'>X</a></div>"+crimetext+"</div>");
	offset_y = -30 - $('#crimepop').height();
	marker = new ol.Overlay({
        		position: undefined,
			autoPan: true,
  			autoPanAnimation: {
    				duration: 250
  			},
                        offset: [-125, offset_y],
			element: document.getElementById('crimepop')
      			}); 
	globalmap.addOverlay(marker);
	$('#crimepop').show()
	marker.setPosition(coordinate);
}
function getCircle(lat, lng, circle_radius){
	var circle = globalCircle = new ol.geom.Circle(ol.proj.fromLonLat([lng,lat]), circle_radius);
        circleFeature = new ol.Feature(circle);
        circleFeature.setStyle(new ol.style.Style({fill: new ol.style.Fill({color: 'rgba(0, 0, 0, 0)'}), stroke: new ol.style.Stroke({color: 'rgba(55, 55, 255, 255)'})}));
        // Source and vector layer
        var vectorSource = new ol.source.Vector({
            projection: 'EPSG:4326'
        });
        vectorSource.addFeature(circleFeature);
        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });
	return vectorLayer;
        //map.addLayer(vectorLayer);
}
//-----------------------------------------------------------
function getMarkers(markersarray_implode){
                var markerarray = markersarray_implode.split(',');
                var markers = [];
		var cannary = 0;            
                for (i=0;i<=markerarray.length;i++) {
                        
                        if (undefined != markerarray) {
                        
                                if (undefined != markerarray[i]) {
                        
                                        if (markerarray[i].length>0) {
                                        
                                                var markerproperties = markerarray[i].split('~');
                                                //if (true){ cannary++; console.log(markerproperties[1]+" "+parseInt(markerproperties[0]));}
                                               // var latLng = new google.maps.LatLng(markerproperties[0],markerproperties[1]);
                   //                             var contentString = '<div style="text-align:left;"><font style="font-size:12px;"><b>Crime ID: ' + markerproperties[6] + '</b><br><i>' + markerproperties[2] + '</i><br>' + markerproperties[3] + '<br><a title=\"This link will open in a separate window\" target=\"ukcrimestats\" href="' + thissite + 'Street_Crime/' + markerproperties[6] + '/">More detail</a></font><br><br><font style="font-size:12px;"><b>Can you help?</b><ul><li><a target=\"new\" href=\"https://secure.crimestoppers-uk.org/ams.form.anonymous.asp"\">Give information on CrimeStoppers</a></li><li><a href=\"#team\">Contact Neighbourhood Police</a></li><li><a target=\"new\" href=\"http://twitter.com/home?status=UKCrimeStats.com+CrimeID:+' + markerproperties[6] + '+' + thissite + 'Street_Crime/' + markerproperties[6] + '/\">Tweet about this crime</a></font></li></ul><font style=\"font-size:10px;color:#B1B1B1\">To protect privacy, crimes are mapped to points<br>on or near the road where they occurred.</font></div>';
                 // attachIWindow(contentString, marker);
                                                //setMarker(markerproperties[0],markerproperties[1],markerproperties[2],markerproperties[3],markerproperties[4],markerproperties[5],markerproperties[6],(i+1));                                 
                                                markers.push(new ol.Feature({ geometry: new ol.geom.Point(ol.proj.fromLonLat([markerproperties[1],parseFloat(markerproperties[0])])), name: markerproperties[3], crimeData: markerproperties }));
								   }
								}}}
var source = new ol.source.Vector({
        features: markers
      });

      var clusterSource = new ol.source.Cluster({
        distance: 55,
        source: source
      });

      var styleCache = {};
      var clusters = new ol.layer.Vector({
        source: clusterSource,
        style: function(feature) {
          var size = feature.get('features').length;
          var style = styleCache[size];
        if (size > 99) color = "#ff0000";
	else if (size > 9) color = "#ffcc00";
	else color = "#0099ff";  
	if (!style) {
            style = new ol.style.Style({
              image: new ol.style.Circle({
                radius: 12,
                stroke: new ol.style.Stroke({
                  color: '#fff'
                }),
                fill: new ol.style.Fill({
                  color: color
                })
              }),
              text: new ol.style.Text({
                text: size.toString(),
                fill: new ol.style.Fill({
                  color: '#000'
                })
              })
            });
            styleCache[size] = style;
          }
          return style;
        }
      });
return clusters;
}
// ----------------------------------------------------------
function riots2011_init() {     
	
	var f = document.forms['riotform'];
	var formlat = 52.968492126813985;
	var formlng = -1.812744140625;
	var gmapzoom = 7;
		
	geocoder = new google.maps.Geocoder();     
		
	var latlng = new google.maps.LatLng(formlat,formlng);   
	var myOptions = {       
			zoom: gmapzoom,       
			center: latlng, 
			scrollwheel: true,       
			mapTypeId: google.maps.MapTypeId.ROADMAP     
	}     
	
	map = new google.maps.Map(document.getElementById("map"), myOptions); 
	
	// Close InfoWindow when clicking anywhere on the map.
  infoWindow = new google.maps.InfoWindow();
  google.maps.event.addListener(map, 'click', function() {
    infoWindow.close();
  });
	
	// Map crime markers on map
	var markersarray_implode = f.markersarray.value;
	var markerarray = markersarray_implode.split('##@##');
	
	if (markersarray_implode.length>0) {
		for (i=0;i<=markerarray.length;i++) {
			
			if (undefined != markerarray) {
			
				if (undefined != markerarray[i]) {
			
					if (markerarray[i].length>0) {
					
						var markerproperties = markerarray[i].split('~');
												
						setMarkerRiot2011(markerproperties[1], 
								markerproperties[2], 
								markerproperties[3],
								markerproperties[4],
								markerproperties[0]
								);
		
					}
				}
			}
			
		}
	}	
	
	
}


// ----------------------------------------------------------
function missinglocations_init() {     
	
	var f = document.forms['missinglocationsform'];
	var formlat = 52.968492126813985;
	var formlng = -1.812744140625;
	var gmapzoom = 7;
		
	geocoder = new google.maps.Geocoder();     
		
	var latlng = new google.maps.LatLng(formlat,formlng);   
	var myOptions = {       
			zoom: gmapzoom,       
			center: latlng, 
			scrollwheel: true,       
			mapTypeId: google.maps.MapTypeId.ROADMAP     
	}     
	
	map = new google.maps.Map(document.getElementById("map"), myOptions); 
	
	// Close InfoWindow when clicking anywhere on the map.
  infoWindow = new google.maps.InfoWindow();
  google.maps.event.addListener(map, 'click', function() {
    infoWindow.close();
  });
	
	// Map crime markers on map
	var markersarray_implode = f.markersarray.value;
	var markerarray = markersarray_implode.split('##@##');
	
	if (markersarray_implode.length>0) {
		for (i=0;i<=markerarray.length;i++) {
			
			if (undefined != markerarray) {
			
				if (undefined != markerarray[i]) {
			
					if (markerarray[i].length>0) {
					
						var markerproperties = markerarray[i].split('~');
												
						setMarkerMissingLocation(markerproperties[1], 
								markerproperties[2], 
								markerproperties[3],							
								markerproperties[0]
						);
		
					}
				}
			}
			
		}
	}	
	
	
}

// ----------------------------------------------------------
function crimeheatmap_init(miles, maxtotal, heatmapdata) {     
	
	var f = document.forms['crimeheatmapform'];
	var formlat = f.formlat.value;
	var formlng = f.formlng.value;
	
	var latlng = new google.maps.LatLng(formlat,formlng);   
	var zoomLevel;
	
	if (miles==1) {
		zoomLevel = 14;
	} else if (miles==2) {
		zoomLevel = 13;
	} else if (miles==3) {
		zoomLevel = 12;
	} else if (miles==4) {
		zoomLevel = 12;
	} else if (miles==5) {
		zoomLevel = 11;
	} else if (miles==0.5){
		zoomLevel = 15
	} else {
		zoomLevel = 16;
	}
	if (window.innerWidth < 600)
		--zoomLevel;			
	var myOptions = {
	  zoom: zoomLevel,
	  center: latlng,
	  mapTypeId: google.maps.MapTypeId.ROADMAP,
	  disableDefaultUI: false,
	  scrollwheel: false,
	  draggable: true,
	  navigationControl: true,
	  mapTypeControl: false,
	  scaleControl: true,
	  disableDoubleClickZoom: false
	};
	
	var map = new google.maps.Map(document.getElementById("heatmapArea"), myOptions);	
	globalmap = map;
	
	// Put center marker
	var marker = new google.maps.Marker({             
		map: map,             
		position: latlng         
	});       
	
	iconFile = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
	marker.setIcon(iconFile);
	
	var circle = new google.maps.Circle({
	  map: map,
	  radius: (1609 * miles),    // 1 miles in metres
	  fillColor: '#5eb1ff',
	  fillOpacity: 0.26,
    strokeWeight: 2,
    strokeColor: '#4e6c89',
    strokeOpacity: 0.2,
	});
	circle.bindTo('center', marker, 'position');
	//create_map("heatmapArea", "crimeheatmapform", 2800);	
	if (!heatmap_radius)
		heatmap_radius = 10;
	var heatmap = new HeatmapOverlay(globalmap, {"radius":heatmap_radius, "visible":true, "opacity":60});
	globalheatmap = heatmap;	
		
	var myData={
		max: maxtotal,
		data: heatmapdata
	};
	
		google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
    		// do something only the first time the map is loaded
		heatmap_display_change(heatmapArr[0]);
		});
		//heatmap_display_change(heatmapArr[0]);
		//automateHeatMap(0); 
	
	//	globalheatmap.setDataSet(heatmapArr[0]);
	console.log("quach");			
	
}
function heatmap_init_shape (maxtotal, heatmapdata){
	var f = document.forms["mapform"];	
	var myOptions = {       
			scrollwheel: false,       
			mapTypeId: google.maps.MapTypeId.ROADMAP     
	}     	
	var map = new google.maps.Map(document.getElementById("heatmapArea"), myOptions); 
	globalmap = map;
	if (typeof f.kmlpath != "undefined"){
	    var kmlLayer = new google.maps.KmlLayer(f.kmlpath.value); 
	    kmlLayer.setMap(map);
	}
	if (!heatmap_radius)
                heatmap_radius = 10;
	var heatmap = new HeatmapOverlay(globalmap, {"radius":heatmap_radius, "visible":true, "opacity":60});
	globalheatmap = heatmap;

        var myData={
                max: maxtotal,
                data: heatmapdata
        };
        if (1) {//static_heatmap){
                google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
                // do something only the first time the map is loaded
                heatmap_display_change(heatmapArr[0]);
                });
                //heatmap_display_change(heatmapArr[0]);
                //automateHeatMap(0); 
        }
        //      globalheatmap.setDataSet(heatmapArr[0]);
        console.log("quach");

}
// ----------------------------------------------------------
function nationalpicture_init() {     
	
	var f = document.forms['postcodedistrictform'];
	var formlat = 52.968492126813985;
	var formlng = -1.812744140625;
	var gmapzoom = 6;
		
	geocoder = new google.maps.Geocoder();     
		
	var latlng = new google.maps.LatLng(formlat,formlng);   
	var myOptions = {       
			zoom: gmapzoom,       
			center: latlng, 
			scrollwheel: true,       
			mapTypeId: google.maps.MapTypeId.ROADMAP     
	}     
	
	map = new google.maps.Map(document.getElementById("postcodemap"), myOptions); 
	
	// Close InfoWindow when clicking anywhere on the map.
  infoWindow = new google.maps.InfoWindow();
  google.maps.event.addListener(map, 'click', function() {
    infoWindow.close();
  });
	
	// Map crime markers on map
	var markersarray_implode = f.markersarray.value;
	var markerarray = markersarray_implode.split('##@##');
	
	if (markersarray_implode.length>0) {
		for (i=0;i<=markerarray.length;i++) {
			
			if (undefined != markerarray) {
			
				if (undefined != markerarray[i]) {
			
					if (markerarray[i].length>0) {
					
						var markerproperties = markerarray[i].split('~');
												
						setPostcodeDistrictMapMarker(markerproperties[1], 
								markerproperties[2], 
								markerproperties[3],
								markerproperties[0]
								);
		
					}
				}
			}
			
		}
	}	
	
}

// ----------------------------------------------------------
function setPostcodeDistrictMapMarker(lat, lng, markertext, uid) {
	
	if (undefined!=lat) {
				
		var textarr = markertext.split('@@');
		var markertext = textarr[3] + '<br><b>' + textarr[0] + ' (' + textarr[1] + ')</b><br>' + textarr[2] + '<br><br>' + '<a href=\"' + thissite + 'Postcode_District/' + textarr[0] + '/\">More detail...</a>';
		
		var tImage = thissite + 'img/icons/red-dot.png';		
		var tLatLng = new google.maps.LatLng(lat,lng);    
			
		var marker = new google.maps.Marker({             
			map: map,             
			position: tLatLng,
			icon: tImage, 
			title: 'Highest Crimes by Postcode'
		});       
			
		// Register a click listener on each marker created.
	  google.maps.event.addListener(marker, 'click', (function(markerArg, index) {
	    return function() {
	      infoWindow.setContent('<div style="text-align:left;width:200px;"><font style="font-size:12px;">' + markertext + '</font></div>');
	      infoWindow.open(map, markerArg);
	    };
	  })(marker, uid));
  
			
	}
	
}

// ----------------------------------------------------------
function attachIWindow(content, marker){

  var infowindow = new google.maps.InfoWindow({
      content: content,

  });
  google.maps.event.addListener(marker, 'click', function(){
      infowindow.open(map, marker);
  });
  
}

// ----------------------------------------------------------
function postcode_init(maxtotal, heatmapdata) {     
	
	var f = document.forms['postcodeform'];
	var formlat = f.formlat.value;
	var formlng = f.formlng.value;
	
	if (formlat>0) {
		
		geocoder = new google.maps.Geocoder();     
			
		var latlng = new google.maps.LatLng(formlat,formlng);   
		var myOptions = {       
				zoom: 15,       
				center: latlng, 
				scrollwheel: false,       
				mapTypeId: google.maps.MapTypeId.ROADMAP     
		}     
		
		map = new google.maps.Map(document.getElementById("heatmapArea"), myOptions); 
		globalmap = map;
		
		// Close InfoWindow when clicking anywhere on the map.
	  infoWindow = new google.maps.InfoWindow();
	  google.maps.event.addListener(map, 'click', function() {
	    infoWindow.close();
	  });
		  
		// Put center marker
		var marker = new google.maps.Marker({             
			map: map,             
			position: latlng         
		});       
		
		iconFile = 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png';
		marker.setIcon(iconFile);
	
		var heatmap = new HeatmapOverlay(map, {"radius":20, "visible":true, "opacity":60});
		globalheatmap = heatmap;	
		
		var myData={
			max: maxtotal,
			data: heatmapdata
		};
		
		// this is important, because if you set the data set too early, the latlng/pixel projection doesn't work
		google.maps.event.addListenerOnce(map, "idle", function(){
			heatmap.setDataSet(myData);
		});
		
	}
		
	
}
//console.log('7');
var processSearch = function(inputboxid, formname){
	var result = null;
	var search = $("#"+inputboxid).val();
	$.ajaxSetup( { "async": false } );
	if (search){
		$.getJSON("/testPostcode.php", {"search" : search}, function(data) {result = data });
		if (result.is_postcode){
			window.location = "https://www.ukcrimestats.com/Postcode/"+search.replace(" ", "");	
			return false;
		}
		else if (result.is_oa){
	   		window.location = "https://www.ukcrimestats.com/"+result.oa_type+"/"+result.oa_code;
	    		return false;
		}

	}
		navigator.geolocation.getCurrentPosition(
			function(position) {
				if (position.coords.latitude && position.coords.longitude){
				if (!search) {
					window.location = 'https://www.ukcrimestats.com/location_search.php?lat='+position.coords.latitude+'&lng='+position.coords.longitude
					return false;
				}
				document.forms[formname].elements.lat.value=position.coords.latitude
				document.forms[formname].elements.lng.value=position.coords.longitude
				//alert($("#slat").val())
				document.forms[formname].submit()
				}
				//document.forms[0].submit()
			}
		);
	
	//document.forms[0].submit()
}

function membershipform_init(){
    $(".memberfield").click(function(){
                            this.style.color = black;
                            this.value = "";
                            });
}


