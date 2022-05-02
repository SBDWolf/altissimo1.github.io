"use strict";

var wisp = true;
var unown = true;

updateImage();

function updateImage() {
	
	// Load in the .json with all the spawn data for Jubilife Village.
	
	fetch('json/jubilife.json')
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			appendIcons(data);
		})
		.catch(function (err) {
			console.log('error: ' + err);
		});
		
		// Draw the icons with the appendIcons function.
		
		function appendIcons(data) {
			var iconDisplayContainer = document.getElementById("display");
			iconDisplayContainer.innerHTML = "";
			
			// For each spawn point in the json data, show it if and only if all its "conditions" match the filters.
			
			for (var i = 0; i < data.length; i++) {
				var type = data[i].type;
				var point = data[i].tag;
				var cookieName = "jubilife" + type + point;
				var src = "../resources/legends_arceus/other_icons/Check.png";
				if (getCookie(cookieName) != "set") {
					src = data[i].icon;
				}
				var icon = document.createElement("img");
				icon.src = src;
				icon.className = type;
				icon.id = point;
				icon.setAttribute("onmouseover", "showDisplay(this.id)");
				icon.setAttribute("onmouseout", "hideDisplay()");
				icon.setAttribute("onclick", "swapIcon(this.id)");
				icon.style.top = data[i].iconTop;
				icon.style.left = data[i].iconLeft;
				iconDisplayContainer.appendChild(icon);
			}
		}
}

function showDisplay(tag) {
	
	hideDisplay();
	
	fetch('json/jubilife.json')
	.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			appendDisplay(data, tag);
		})
		.catch(function (err) {
			console.log('error: ' + err);
		});
		
	
	function appendDisplay(data, tag) {
		console.log("mouse on " + tag);
		var body = document.getElementById("hover-display");
		
		// Get the tag from the icon calling the function and use it to locate the data for that spawn in the json.
		
		var tag = data[parseInt(tag)];
		
		var detailContainer = document.createElement("img");
		detailContainer.id = "detail-image";
		
		// Set the location of the img. I try to make it so that this is icon + 3%.
			
		detailContainer.style.top = tag.displayTop;
		detailContainer.style.left = tag.displayLeft;
		detailContainer.src = tag.imgsrc;
		
		// Add the div to the body.
		body.appendChild(detailContainer);
						
	}
}

// To hide a display, simply remove the small-displays element.
	
function hideDisplay() {
	if (document.contains(document.getElementById("detail-image"))) {
		document.getElementById("detail-image").remove();
	}
}

// Show detail is called whenever the icon is clicked.
	    
function swapIcon(tag) {
	fetch('json/jubilife.json')
	.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			swap(data, tag);
		})
		.catch(function (err) {
			console.log('error: ' + err);
		});
	
	function swap(data, tag) {
		var img = document.getElementById(tag);
		console.log(tag);
		var type = data[parseInt(tag)].type;
		var cookieName = "jubilife" + type + tag;
		
		if (img.getAttribute("src") != "../resources/legends_arceus/other_icons/Check.png") {
			img.src = "../resources/legends_arceus/other_icons/Check.png";
			setCookie(cookieName, false);
			console.log(getCookie(cookieName));
			
		} else {
			img.src = data[parseInt(tag)].icon;
			setCookie(cookieName, true);
		}
	}
}

function setCookie(name, exp) {
	if (exp) {
		document.cookie = name + "=unset; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
	} else {
		document.cookie = name + "=set; path=/";
	}
}
	

function getCookie(cname) {
	let name = cname + "=";
	let ca = document.cookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function checkCookie(cname) {
	let cookie = getCookie(cname);
	if (cookie == "" || cookie == null) {
		return false;
	} else {
		return true;
	}
}
		
