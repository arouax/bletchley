// stores key-value pairs of characters assigned by user to characters in
// original encoded line: if user inputs 'a' to a box under letter 'c'
// function updateSubs() gets a pair Subs['a'] = 'c'
var Subs = {};

// Returns true if an item is in Object
function contains(needle) {
	var findNaN = needle !== needle;
	var indexOf;
	if ( !findNaN && typeof Array.prototype.indexOf === 'function') {
		indexOf = Array.prototype.indexOf;
	} else {
		indexOf = function(needle) {
			var i = -1, index = -1;
			for ( i = 0; i < this.length; i++ ) {
				var item = this[i];
				if ( (findNaN && item !== item) || item === needle ) {
					index = i;
					break;
				}
			}
			return index;
		};
	}
	return indexOf.call(this, needle) > -1;
}

// Updates Subs object with letters assigned to each box
// Is called procedurally on box input
// Takes two args: box number and box character
function updateSubs(boxNum, boxChar) {
	var boxId = "inLet" + boxNum;
	var boxContent = document.getElementById(boxId).value;
	var classAfter = boxChar + "-after";
	var list1 = document.getElementsByClassName(classAfter);
	for (n = 0; n <  list1.length; n++) {
		list1[n].value = boxContent;
	Subs[boxChar] = boxContent;
	}
}

// Returns a string with the letter(s) with the highest occurency numeber
// in quotes.
function countFrequency(val) {
	var freq = {};
	for ( var i = 0; i < val.length; i++ ) {
		if ( typeof freq[val.charAt(i)] != 'undefined' ) {
			freq[val.charAt(i)]++;
		} else {
			freq[val.charAt(i)] = 1;
		}
	}
	var freqVal = [];
	for (var key in freq) {
		<!--console.log(key, freq[key]);-->
		if ( contains.call(freqVal, freq[key]) ) {
		} else {
			freqVal.push(freq[key]);
		}
	}
	if (freqVal.length > 0 ) {
		var max_of_array = Math.max.apply(Math, freqVal);
	} else {
		var max_of_array = 0;
	};
	var letters = '';
	if ( max_of_array > 0 ) {
		for ( var i in freq ) {
			if ( freq[i] == max_of_array ) {
				if ( letters.length > 0 ) {
					letters += ', "' + i + '"';
				} else {
					letters = '"' + i + '"';
				}
			}
		}
	}
	return letters;
}

// Main function:
// Displays the substitution table on text input
// Is activated on any input in text input field with id="cp"
function displayTable() {
	var x = document.getElementById("cp").value;
	var frequentLetters = countFrequency(x);
	if ( frequentLetters.length > 0 ) {
		if (frequentLetters.length > 3 ) {
			var freqText = "The most frequent letters in here are: ";
		} else {
			var freqText = "The most frequent letter in here is ";
		}
		document.getElementById("result").innerHTML = "There's your table:";
		document.getElementById("letters").innerHTML = freqText
		+ frequentLetters + '.';
	} else {
		document.getElementById("result").innerHTML = '';
		document.getElementById("letters").innerHTML = '';
	}
	document.getElementById("res2").innerHTML = "";
	for ( var i = 0; i < x.length; i++ ) {
		var p = x.charAt(i);
		if (typeof Subs[p] != 'undefined') {
			var res2 = '<div class="wrap1"><span class="box txt">' + p
				+ '</span><input id="inLet' + i + '" type="text" maxlength="1"'
				+ ' class="box-input ' + p + '-after" oninput="updateSubs(' + i
				+ ', &quot;' + p + '&quot;)" value="' + Subs[p] + '"></div>';
		} else {
			var res2 = '<div class="wrap1"><span class="box txt">' + p
				+ '</span><input id="inLet' + i + '" type="text" maxlength="1"'
				+ ' class="box-input ' + p + '-after" oninput="updateSubs('+ i
				+ ', &quot;' + p + '&quot;)"></div>';
		}
		document.getElementById("res2").innerHTML += res2
	}
}


// hides no-js message, displays main content and howto span
function onLoad() {
	document.getElementsByTagName("main")[0].style.display = "block";
	document.getElementById("nojs").style.display = "none";
	document.getElementById("howto").style.display = "inline-block";
}

window.onload = onLoad();
