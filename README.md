#Usage:

    // mapping shortcuts
    $(document).mapKeys({
        "aa": fn,
        "3d": fn,
        "<Left><Left><Up>": fn,
        "Ctrl+b": fn,
        "Alt+Ctrl+MM": fn
    });
    // unmapping shortcuts
    $(document).mapKeys();

##Keys that can be mapped

0-9, a-z, A-Z, ? and the following, which must be written between
angle brackets (&lt;Key&gt;):
"Backspace", "Tab", "Enter", "Esc", "Space", "PgUp", "PgDn", "End",
"Home", 'Left', 'Up', 'Right', 'Down', "Ins", "Del", "F1", "F2",
"F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"

##Limitations and/or quirks:
- order of modifiers (Ctrl, Alt, Shift) doesn't matter, while order of
  all other keys matters.
- combinations of modifiers only are not supported. I could add them, but
  I doubt anybody would use them.
- typing in a textbox will not trigger the shortcuts, unless you bind
  directly to it.

