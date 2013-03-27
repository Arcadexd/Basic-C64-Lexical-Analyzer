/* $Id: videoc.js,v 1.1.1.1 2000/06/26 14:37:09 xleroy Exp $
 * The JavaScript runtime library for VideoC.
 * <Christian.Queinnec@lip6.fr>

 * FUTURE adapt messages to the preferred language.
 * Make a hint popup above the nailed hints.
 * Make a popup with the usage if not used for some duration.
 */

window.videoc_version = 
  ' $Id: videoc.js,v 1.1.1.1 2000/06/26 14:37:09 xleroy Exp $ ';

// Check if the browser is known and at least at version 4 for Communicator and
// IExplorer. The results are stored in the window object.

{ 
  var ua = window.navigator.userAgent;
  // document.write("«" + ua + "»");

  // For IE4.0, this gives Mozilla/4.0(compatible; MSIE 4.0;Windows 95)
  // For Communicator 4 on Windows95: Mozilla/4.02 [en] (Win95; I)
  // and on linux: Mozilla/4.04 [en] (X11; I; Linux 2.0.30 i586) 
  // for Netscape on DECalpha: Mozilla/3.0 (X11; I; OSF1 V4.0 alpha)
  var tag = "MSIE ";
  var uai = ua.indexOf(tag);

  window.IExplorer = false;
  window.Mozilla = false;
  window.Konqueror = false ;
  if ( uai > 0 ) {
    window.IExplorer = true;
    // This is IExplorer, fetch version number:
    window.version = parseInt(ua.substring(uai+tag.length,
                                           ua.indexOf(".", uai)));
    // document.write("\n\n IExplorer " + window.version + "\n\n");
    // alert("\n\n IExplorer " + window.version + "\n\n");
  } else {
    tag = "ozilla";
    uai = ua.indexOf(tag);
    if ( uai > 0 ) {
      // This is Mozilla, fetch version number:
      window.Mozilla = true;
      window.version = parseInt(ua.substring(uai+tag.length+1, 
                                             ua.indexOf(".", uai)));
      // document.write("\n\n Mozilla " + window.version + "\n\n");
      // alert("\n\n Mozilla " + window.version + "\n\n");
      // it may be Konqueror saying Mozilla compatible
      if (ua.indexOf('onqueror') > 0) {
        window.Konqueror = true ;
      }
    } else {
      // Unknown browser
      alert("Votre butineur (" + ua +  ") m'est inconnu. "
            + "Ce document souffrira de ne pas être vu avec Communicator "
            + "ou IExplorer (version >= 4 tous les deux).");
    }
  }
}

//{{{
//                                                                MOCHE
// This height must be set up accordingly to the nav bar:

var navBarHeight = 130;

//}}}
//{{{ Common stuff

// To inspect an object: confirm(object_to_string(...))

function object_to_string(obj) {
  var result = "";
  for (var i in obj) {
    result += "[." + i + " = " + obj[i] + "]";
    if ( window.Mozilla ) {
      result += "\n";
    }
  }
  return result;
}

// It is possible to store information from page to page within the
// browser in the navigator object. All the information is stored in 
// an object.

if ( typeof navigator.VideoC == "undefined" ) {
  navigator.VideoC = new Object();
};

// This function should be called whenever a page containing a searched
// word is displayed and we want the word to be hightlighted.

function afterWordSearchSubmission() {
  alert("pre-ok");
  addHook("alert(\"post-ok\")");
}

function addHook(expression) {
  navigator.VideoC.hook = expression;
}

// This function toggles the state of all the hints of the page. It
// chooses at random some sensitive anchors and display their
// associated hints. This may be interesting when to make users aware
// of that possibility or to awake them.

function show_hints_at_random (delay) {
  if ( delay > 0 ) {
    // sleep delay seconds
  }
  var i = random(document.hints.length);
  var anchor = document.hints[i][0];
  // Create a pseudo event:                  use a method on hint instead ?
  var event = new Object;
  event.type = 'click';
  event.target = new Object;
  event.target.hint = anchor;
  event.srcElement = event.target;
  toggleHint(event);
}

// a simple random function (see Knuth vol2, section 3.2.1.2 ex 1)

var seed = 5772156648;

function random (n) {
  var a = 3141592621;
  var c = 2718281829;
  var m = 10000000000;
  seed = (a * seed + c)%m;
  return seed%n;
}

// Make a message appear in the status bar.

function showMessage (msg) {
  window.status = msg;
}

// Make a special message appear in the status bar. This is a
// specialized function since a call to it appears in every
// mouse-sensitive areas inserted by the annote tool.

function ctsm() {
  showMessage("Click to see more");
}

//}}} -------------------------------------------------------------------
//{{{ Netscape versions:

// Makes the hint pop up until the mouse leaves the sensitive area.
// A click makes the popup pinned down until another click. Show 
// the usage in the status zone of the window.

function nc_toggleHint (e) {
  //confirm ("Toggle hint!");
  //confirm("Received event " + object_to_string(e.hint)); 
  //confirm("Received event " + object_to_string(e.hint.style)); 
  // receive the anchor as the target of the event then 
  // retrieve the associated hint.
  var hint = e.hint;
  //confirm("Received event " + object_to_string(e.target.hint));       // DEBUG

  if ( e.type == 'click' ) {
     hint.permanent = ! hint.permanent;
  }
  
  // Toggle the state of the hint:
  if ( hint.style.visibility == 'hidden' || hint.style.visibility == 'hide' || hint.style.visibility == 'collapse') {
     // Needed by netscape to prevent a right-ragged layer:
    //hint.bgColor = '#f5f5dc'; 
     if ( ! hint.immotile ) {
       if (window.Konqueror) {
         hint.style.left = '66%';
	 hint.style.width = '66%';
	 hint.style.top = e.height+20;
	 hint.style.position='absolute';
       } else {
         var hintX = e.layerX/2;
         var hintY = e.layerY+20;
         //hint.moveTo(hintX, hintY);
         hint.style.left = hintX ;
         hint.style.top = hintY ;
         // another try :
         //hint.style.right = window.width;
         //hint.style.top = 0;
         //hint.style.position = 'fixed';
       }
     }
     hint.style.visibility = 'visible';
  } else {
     if (! hint.permanent ) {
        if (window.Konqueror) {
           hint.style.visibility = 'collapse' ;
	} else {
	   hint.style.visibility = 'hidden';
	}
     }
  }
  if ( hint.style.visibility == 'hidden' || hint.style.visibility == 'collapse' ) {
    showMessage (' ');
  } else {
    // strange: we have to inverse the test (Maxence, not a pro of javascript)
    if (!hint.permanent) {
      showMessage ('Click to remove the hint');
    } else {
      showMessage ('Click to nail the hint');
    }
  }
					
  // Don't let these links be followed, they're not real anchors:
  return true;
}

// Link the sensitive area (ie the hint) from the anchor. A hint
// may be reached from many anchors.

function nc_initializeHint(hintId) {
  var hint = document.getElementById('l__' + hintId);
  if ( hint == null ) return alert("Missing hint " + hintId);
  hint.style.visibility == 'hidden';
  hint.permanent = false;
  hint.immotile = false;
  hint.name = hintId;
  var matches = 0;
  for (var i = 0 ; i < document.links.length ; i++ ) {
    var anchor = document.links[i];
    //confirm("anchor[" + i + "]=" + object_to_string(anchor)); // DEBUG
    if (    anchor.protocol == 'javascript:' 
         && anchor.id.indexOf(hintId)>=0 ) {
      matches++;
      nc_initializeHintWithAnchor(hint, anchor);
    };
  }
  if ( matches == 0 ) {
    alert("No associated mouse-sensitive areas " + hintId);
  }
  return hint;
}

function nc_initializeHintWithAnchor(hint, anchor) {
  //confirm("hint= " + object_to_string(hint) + 
  //        ", anchor= " + object_to_string(anchor));
  if ( anchor == null ) return alert("Missing sensitive anchor " + hint.name);
  anchor.hint = hint;
  var arr = new Array(anchor);
  if ( typeof hint.anchors == "undefined" ) {
    hint.anchors = arr;
  } else {
    hint.anchors = hint.anchors.concat(arr);
  }
  anchor.onmouseover = function (e) {nc_toggleHint(anchor)};
  anchor.onmouseout  = function (e) {nc_toggleHint(anchor)};
  anchor.onclick     = function (e) {nc_toggleHint(anchor)};
  return hint;
}

// NOTE: Related, credits and wordsearch appear with different widths
// so I set their zIndexes with the smallest on top.

// Prepare an already existing layer so it can receive the page
// explaining related links (required/suggested). 

function nc_showRelated(url) {
  var layer = document.layers["RelatedLayer"];
  if ( layer.visibility == "visible" || layer.visibility == "show" ) {
    //alert("nc_hideRelated");              // DEBUG
    layer.visibility = "hidden";
    return false;
  } else {
    var newWidth = 2*getWindowWidth()/3;
    var xoffset = (getWindowWidth() - newWidth)/2;
    layer.moveToAbsolute(xoffset, navBarHeight);
    layer.clip.left = 2;
    layer.clip.top  = 2;
    layer.clip.width = newWidth-2;
    if ( ! layer.alreadyLoaded ) {
      //layer.src = url;
      layer.load(url, newWidth);
      layer.zIndex = 2;
      layer.alreadyLoaded = true;
      //document.NCwordSearchForm.onSubmit = afterWordSearchSubmission;
    }
    layer.visibility = "show";
    //alert(object_to_string(layer));       // DEBUG
    // Preempt the default href:
    return false;
  }
}

// Prepare an already existing layer so it can receive the page
// that contains the credits of the current page.

function nc_showCredits(url) {
  var layer = document.layers["CreditsLayer"];
  if ( layer.visibility == "visible" || layer.visibility == "show" ) {
    layer.visibility = "hidden";
    return false;
  } else {
    var newWidth = getWindowWidth()-40;
    var xoffset = (getWindowWidth() - newWidth)/2;
    layer.moveToAbsolute(xoffset, navBarHeight);
    layer.clip.left = 2;
    layer.clip.top  = 2;
    layer.clip.width = newWidth-2;
    if ( ! layer.alreadyLoaded ) {
      layer.load(url, newWidth);
      layer.zIndex = 1;
      layer.alreadyLoaded = true;
    }
    layer.visibility = "show";
    return false;
  }
}

// Prepare a layer to get a word and search for it.

function nc_getWordAndSearch() {
  var layer = document.layers["WordSearchLayer"];
  //confirm("nc_getWordAndSearch" + object_to_string(layer));          // DEBUG
  if ( layer.visibility == "visible" || layer.visibility == "show" ) {
    layer.visibility = "hidden";
    return false;
  } else {
    var newWidth = 300;
    var xoffset = (getWindowWidth() - newWidth)/2;
    layer.moveToAbsolute(xoffset, navBarHeight);
    layer.clip.left = 0;
    layer.clip.top  = 0;
    //layer.clip.width = newWidth;
    layer.visibility = "show";
    layer.zIndex = 3;
    //alert(object_to_string(layer));
    return false;
  }
}
  
//}}} -------------------------------------------------------------------
// {{{ Explorer versions: 

// Makes the hint pop up until the mouse leaves the sensitive area.
// A click makes the popup pinned down until another click. It seems 
// there is a race condition where hint.style is reported not to be an
// object !?

function ie_toggleHint () {
  // receive the anchor as target.
  var anchor = event.srcElement;
  while ( anchor && anchor.tagName != "A" ) {
    anchor = anchor.parentElement;
    //confirm("event on " + object_to_string(anchor)); // DEBUG
  }
  // Don't let these links be followed, they're not real anchors:
  event.cancelBubble = true;
  if ( anchor ) {
    //confirm("event on " + object_to_string(anchor)); // DEBUG
    var hint = anchor.hint;
    //confirm("event on " + object_to_string(hint)); // DEBUG
    //confirm("event on " + object_to_string(hint.style)); // DEBUG
    // Toggle the state of the hint:
    if (   hint.style.visibility == 'hidden' 
        || hint.style.visibility == "" ) {
      if ( ! hint.immotile ) {
        hint.style.pixelLeft = event.offsetX/2;
        hint.style.pixelTop  = event.offsetY + 20;
        //confirm("Event is " + object_to_string(event)); // DEBUG
      };
      hint.style.display = "block";
      hint.style.visibility = 'visible';
      hint.style.zIndex = 5;
      window.status = 'Click to nail the hint';
    } else {
      if ( hint.permanent ) {
        window.status = 'Click (at the same place) to remove the hint';
      } else {
        hint.style.visibility = 'hidden';
      }
    }
    // Click means: show/hide the hint permanently:
    if ( event.type == 'click' ) {
      hint.permanent = ! hint.permanent;
      if ( hint.permanent ) {
        window.status = 'Click to remove the hint';
      } else {
        window.status = 'Removed!';
      }
    }
    return false;
  } else {
    return false;
  }
}

// Link the mouse-sensitive areas to their hint.

function ie_initializeHint(hintId) {
  var hint = document.getElementById('d__' + hintId);
  if ( hint == null ) alert("Missing DIV " + hintId);
  hint.permanent = false;
  hint.immotile = false;
  hint.name = hintId;
  //hint.anchors = new Array();
  var matches = 0;
  for (var i = 0 ; i < document.links.length ; i++ ) {
    var anchor = document.links[i];
    // confirm("anchor[" + i + "]=" + object_to_string(anchor)); // DEBUG
    if ( anchor.id.indexOf(hintId)>=0 ) {
      //confirm("got anchor " + hintId); // DEBUG
      matches++;
      ie_initializeHintWithAnchor(hint, anchor);
    };
  }
  if ( matches == 0 ) {
    alert("No mouse-sensitive anchors for " + hintId);
  }
  return hint;
}

function ie_initializeHintWithAnchor(hint, anchor) {
  //confirm("hint= " + object_to_string(hint) + 
  //        ", anchor= " + object_to_string(anchor));
  if ( anchor == null ) alert("Missing ANCHOR " + hint.name);
  anchor.hint = hint;
  var arr = new Array(anchor);
  //KO: the next instruction makes IExplorer abort!?
  //KO: hint.anchors = hint.anchors.concat(arr);
  //confirm("hint= " + object_to_string(hint)); // DEBUG
  // Attention, don't write onMouseOver but onmouseover instead!
  anchor.onmouseover = ie_toggleHint;
  anchor.onmouseout  = ie_toggleHint;
  anchor.onclick     = ie_toggleHint;
  hint.className = 'hint';
  hint.style.display = 'none';
  return hint;
}

function ie_showRelated(url) {
  var newStyle = "status,resizable,scrollbars,height=" 
         + (getWindowHeight()*2/3)
	 + ",width=" + (getWindowWidth()*3/4);
  var newWindow = window.open(url, "relatedWindow", newStyle);
  newWindow.focus();
}

function ie_showCredits(url) {
  var newStyle = "status,resizable,scrollbars,height=" 
         + (getWindowHeight()/2)
	 + ",width=" + (getWindowWidth()*2/3);
  var newWindow = window.open(url, "creditsWindow", newStyle);
  newWindow.focus();
}

function ie_getWordAndSearch() {
  var frame = document.all.WordSearchFrame;
  //confirm(object_to_string(frame));      // DEBUG
  if ( event ) {
    event.returnValue = false;
  }
  if ( frame.style.display != "none" ) {
    frame.style.display = "none";
    return false;
  } else {
    // Center the <input> button:
    var width = document.wordSearchForm.children[0].clientWidth;
    var xoffset = (getWindowWidth() - width)/2;
    frame.style.left = xoffset;
    frame.style.top  = navBarHeight;
    frame.style.width = Math.max(width, 200);
    frame.style.display = "block";
    frame.className = "wordSearch";
    frame.zIndex = 3;
    return false;
  }
}

// }}} -------------------------------------------------------------------
// {{{ Final versions (independent of the browser):

// These untested functions propose to leave hooks in the persistent part
// of the runtime of javascript (persistent means visible from page to 
// page). A page may leave a function to be run by the next page to load.

function runPreHook () {
  if (    (typeof navigator.VideoC != "undefined") 
       && (typeof navigator.VideoC.preHook != "undefined") ) { 
    eval(navigator.VideoC.preHook);
    delete navigator.VideoC.preHook;
  };
}

function runPostHook () {
  if (    (typeof navigator.VideoC != "undefined")
       && (typeof navigator.VideoC.postHook != "undefined") ) { 
    eval(navigator.VideoC.postHook);                         
    delete navigator.VideoC.postHook;                        
  };
}

// This function was used to popup a small window, ask for a word and
// ask the VideoC server for pages containing that word.

function initializeJSforThatPage () {
  if ( window.IExplorer ) {
    // USELESS now:
    //var t = '<div id="WordSearchFrame" ';                      
    //t += '     style="position:absolute;display:none;">';      
    //t += "Mot à rechercher:";                                    
    //t += '<form name="wordSearchForm" method=get action="/clic/servlet/VideoC//search">'; 
    //t += '<input type=text name="word" maxlength=20>';         
    //t += "</form></div>";                                      
    //document.write(t);
  } else if ( window.Mozilla ) {
    // nothing
  } else {
    return alert("initializeJSforThatPage: brouteur inconnu");
  }
}

function initializeHint(hintId) {
  if ( window.Mozilla ) {
     return nc_initializeHint(hintId);
  } else if ( window.IExplorer ) {
     return ie_initializeHint(hintId);
  } else {
    return alert("initializeHint: Brouteur inconnu");
  }
}

function showRelated(url) {
  window.status = "Les pages en relation";
  if ( window.Mozilla ) {
     return nc_showRelated(url);
  } else if ( window.IExplorer ) {
     return ie_showRelated(url);
  } else {
    return alert("showRelated: Brouteur inconnu");
  }
}

function showCredits(url) {
  window.status = "Crédits";
  if ( window.Mozilla ) {
     return nc_showCredits(url);
  } else if ( window.IExplorer ) {
     return ie_showCredits(url);
  } else {
    return alert("showCredits: Brouteur inconnu");
  }
}

function getWindowWidth() {
  if ( window.Mozilla ) {
    return window.innerWidth;
  } else if ( window.IExplorer ) {
     return document.body.clientWidth;
  } else {
    return alert("getWindowWidth: Brouteur inconnu");
  }
}

function getWindowHeight() {
  if ( window.Mozilla ) {
    return window.innerHeight;
  } else if ( window.IExplorer ) {
     return document.body.clientHeight;
  } else {
    return alert("getWindowHeight: Brouteur inconnu");
  }
}

function getWordAndSearch() {
  if ( window.Mozilla ) {
    return nc_getWordAndSearch();
  } else if ( window.IExplorer ) {
     return ie_getWordAndSearch();
  } else {
    return alert("getWordAndSearch: Brouteur inconnu");
  }
}

// Netscape does not like </div> tag, it resets fonts, margins and
// many things. So now the generation of a layer or div tag is
// conditionalized over the kind of browser.

// Netscape does not like more than one document.write.
// Netscape does not execute instructions after a document.write.
// Netscape does not like a document.write opening a tag closed by
// another subsequent document.write. 
// Netscape does not like a document.write generating a <script> section.

function openPopUp(width, id, style) {
  var tmp = "";
  if ( window.IExplorer ) {
    tmp += '<div style="position:absolute;display:none;width:'
      + width + '" id="d__' + id + '">';
  } else if ( window.Mozilla ) { 
    return;
  } else {
    alert("openPopUp: Brouteur inconnu");
  }
  document.write(tmp);
}

var currentHintIds = new Array();

function closePopUp(id) {
  // record what should be done later:
  currentHintIds[currentHintIds.length] = id;
  var tmp = '';
  if ( window.IExplorer ) {
    tmp += '</div>';
  } else if ( window.Mozilla ) {
    return;
  } else {
    alert("closePopUp: Brouteur inconnu");
  }
  // This solution does not work:
  //setTimeout("initializeHint('" + id + "')", 1000);
  // Nor this one:
  //tmp += '<script language="javascript"> initializeHint("' + id + '");';
  //tmp += '</script>';
  document.write(tmp);
}

function initializePreviousHints() {
  //confirm("initializePreviousHints: " + currentHintIds.length); // DEBUG
  for ( var i=0 ; i<currentHintIds.length ; i++ ) {
    initializeHint(currentHintIds[i]);
  }
  currentHintIds = new Array();
}

// }}}

/* end of videoc.js */
