/**
 * jQuery mapKeys Plugin
 * Copyright 2011, Adrian Gheorghe
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Homepage: https://github.com/adrian-gheorghe/jQuery.mapKeys
 */
(function($) {

var keys = {
    8: "<Backspace>",
    9: "<Tab>",
    13: "<Enter>",
    27: "<Esc>",
    32: "<Space>",
    33: "<PgUp>",
    34: "<PgDn>",
    35: "<End>",
    36: "<Home>",
    37: '<Left>',
    38: '<Up>',
    39: '<Right>',
    40: '<Down>',
    45: "<Ins>",
    46: "<Del>",
    
    112: "<F1>",
    113: "<F2>",
    114: "<F3>",
    115: "<F4>",
    116: "<F5>",
    117: "<F6>",
    118: "<F7>",
    119: "<F8>",
    120: "<F9>",
    121: "<F10>",
    122: "<F11>",
    123: "<F12>",
    
    191: "?"
};
// 0-9
for (var i = 48, j = 0; i < 58; i++) {
    keys[i] = j++;
}
// A-Z
for (var i = 65; i < 91; i++) {
    keys[i] = String.fromCharCode(i);
}
// a-z
for (var i = 97; i < 123; i++) {
    keys[i] = String.fromCharCode(i);
}

/**
 * Checks if a given key combo matches the history of pressed keys, together
 * with modifiers.
 *
 * @return bool
 */
function shortcutMatches(shortcut, history, e) {
    var modifiers = {'Ctrl': 'ctrlKey', 'Alt': 'altKey', 'Shift': 'shiftKey'},
        parts = shortcut.split('+'),
        normal_keys = parts.pop();
    
    if (history.substr(history.length - normal_keys.length) == normal_keys) {
        // if keys match I check modifiers
        for (var i = 0, l = parts.length; i < l; i++) {
            if (! e[modifiers[parts[i]]]) {
                return false;
            }
        }
        
        return true;
    }
    
    return false;
}

var nodeTypeRegex = /textarea|select/i,
    inputTypeRegex = /text|password/i;

/**
 * Interprets key presses and if a combo matches it executes the handler.
 * The function will pass the event object to the handler and return
 * whatever the handler returns.
 */
function handleKeyEvents(e) {
    // Don't fire in text-accepting inputs that we didn't directly bind to
    if (this !== event.target &&
        (nodeTypeRegex.test(event.target.nodeName) ||
         inputTypeRegex.test(event.target.type))) {
        return;
    }
    
    // Keydown always reports the keyCode as the uppercase version of
    // the letter, so I need to check if the Shift modifier is pressed
    // or otherwise I store the lowercase version.
    if (e.which > 64 && e.which < 92) {
        var key = keys[e.shiftKey ? e.which : e.which + 32];
    } else {
        var key = keys[e.which];
        if (! key) {
            return;
        }
    }
    
    var history = e.data.history;
    history += key;
    
    if (history.length > 100) {
        history = history.substr(history.length - 100);
    }
    
    var handler = null;
    
    $.each(e.data.shortcutMap, function(shortcut, fn) {
        if (shortcutMatches(shortcut, history, e)) {
            /*
                After matching a shortcut I have to clear history, as otherwise having 2 shortcuts like:
                aa:
                ab:
                will match both when typing aab. Also, removing just the last matched sequence will allow
                previous keys to match next ones.
            */
            history = "";
            
            handler = fn;
            
            return false;
        }
    });
    
    e.data.history = history;
    
    if (handler) {
        return handler(e);
    }
}

function bindKeys(shortcutMap) {
    return this.each(function() {
        $(this).bind("keydown.mapKeys", {history: "", shortcutMap: shortcutMap}, handleKeyEvents);
    });
}

function unbindKeys() {
    return this.each(function() {
        $(this).unbind(".mapKeys");
    });
}

$.fn.mapKeys = function(shortcutMap) {
    var method = shortcutMap ? bindKeys : unbindKeys;
    method.apply(this, arguments);
};

$.fn.mapKeys.version = "1.0";

})(jQuery);
