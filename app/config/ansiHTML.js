'use strict';

var Anser = require('anser');
var base01 = 'f5f5f5';
var base03 = '969896';
var base05 = '333333';
var base08 = 'ed6a43';
var base0B = '183691';
var base0C = '183691';
var base0E = 'a71d5d';
var colors = {
  reset: [base05, 'transparent'],
  black: base05,
  red: base08 /* marker, bg-invalid */,
  green: base0B /* string */,
  yellow: base08 /* capitalized, jsx_tag, punctuator */,
  blue: base0C,
  magenta: base0C /* regex */,
  cyan: base0E /* keyword */,
  gray: base03 /* comment, gutter */,
  lightgrey: base01,
  darkgrey: base03,
};

var anserMap = {
  'ansi-bright-black': 'black',
  'ansi-bright-yellow': 'yellow',
  'ansi-yellow': 'yellow',
  'ansi-bright-green': 'green',
  'ansi-green': 'green',
  'ansi-bright-cyan': 'cyan',
  'ansi-cyan': 'cyan',
  'ansi-bright-red': 'red',
  'ansi-red': 'red',
  'ansi-bright-magenta': 'magenta',
  'ansi-magenta': 'magenta',
};

function ansiHTML(txt) {
  var arr = new Anser().ansiToJson(txt, {
    use_classes: true,
  });

  var result = '';
  var open = false;
  for (var index = 0; index < arr.length; ++index) {
    var c = arr[index];
    var content = c.content, fg = c.fg;

    var contentParts = content.split('\n');
    for (var _index = 0; _index < contentParts.length; ++_index) {
      if (!open) {
        result += '<span data-ansi-line="true">';
        open = true;
      }
      var part = contentParts[_index].replace('\r', '');
      var color = colors[anserMap[fg]];
      if (color != null) {
        result += '<span style="color: #' + color + ';">' + part + '</span>';
      } else {
        if (fg != null) console.log('Missing color mapping: ', fg);
        result += '<span>' + part + '</span>';
      }
      if (_index < contentParts.length - 1) {
        result += '</span>';
        open = false;
        result += '<br/>';
      }
    }
  }
  if (open) {
    result += '</span>';
    open = false;
  }
  return result;
}

module.exports = ansiHTML;
