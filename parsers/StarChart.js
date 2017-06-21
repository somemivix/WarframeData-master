/**
 * Base of this parser was created by reimu#3856 and can be found here https://hastebin.com/jofinamili.js
 * Adapted, updated and fixed by Macdja38
 */
"use strict";
let fs = require('fs');
let stringify = require('json-stable-stringify');

let rawText = fs.readFileSync('StarChart.txt', "utf8");

function cleanUp(string) {
  let ret = string.split(": ");
  return ret[1];
}

let star_chart = {};

let info = rawText.split(/.*(?=\[.*?\])/g);
for (var idx = 0; idx < info.length; idx++) {
  let planet = info[idx].match(/\[.*?\]/g);
  let entries = info[idx].split(/(\[.*?\])?\n\n\s*/g); // split by 2 lines and as much whitespace as possible
  for (var idx2 = 0; idx2 < entries.length; idx2 += 2) {
    var name = entries[idx2].match(/Name: .*/g); // might accidentally be null
    if (name == null) continue;
    var faction = cleanUp(entries[idx2].match(/Faction: .*/g)[0]);
    var mt = cleanUp(entries[idx2].match(/MissionType: .*/g)[0]);
    var nt = cleanUp(entries[idx2].match(/NodeType: .*/g)[0]);
    var aw = cleanUp(entries[idx2].match(/ArchwingRequired: .*/g)[0]) === "Yes";
    var sw = cleanUp(entries[idx2].match(/IsSharkwing: .*/g)[0]) === "Yes";
    var node_id = cleanUp(entries[idx2].match(/Id: .*/g)[0]);
    name = cleanUp(name[0]);
    // console.log(name + node_id);
    star_chart[node_id] = {
      name: name + " " + planet,
      faction: faction,
      mission_type: mt,
      node_type: nt,
      archwing: aw,
      sharkwing: sw
    }
  }
}

fs.writeFileSync("JSON/StarChart.json", stringify(star_chart, {space: "  "}));
