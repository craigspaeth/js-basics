
// Constants and helpful stuff
var API_URL = 'https://api.artsy.net'
var XAPP_TOKEN = 'JvTPWe4WsQO-xqX6Bts49lofsdTOrcRnB_NxTIpFlU4U5mwZslclB6YODeS5vayfxtlbUbTqvtvSDuYWiisz-9AUmnb1A6mlU0B9aJ3Ip8ZMMWRsmSHuBZ1-HlExjaZz-JZkS7ITTvyz1Yu0aoXqpnQ0Kdu66T8pnYlGsVcUngYf1oz9jENJJWD7RFGI02y8VBAM9C1zyDTKfF_JaWCNJrOjPbCEnrUTgMP51N46EeE=';
var ARTIST_SLUGS = [
  'andy-warhol',
  'damien-hirst',
  'tracey-emin',
  'robert-longo',
  'jenny-holzer',
  'julia-colavita',
  'damon-zucconi',
  'keith-haring',
  'feng-mengbo',
  'cory-arcangel',
  'simon-denny',
  'tabor-robak',
  'jon-rafman',
  'jeff-koons'
];
var emitter = new EventEmitter();
$.ajaxSettings.headers = { 'X-Xapp-Token': XAPP_TOKEN };

// Create artist and artwork models from scratch
// Add a `fetch` method that returns the $.ajax deferred and updates
// model when it's finished. Use node-style callbacks e.g. (err, artist)

$(function(){

  // Fetch the first 3 artists and render their joined names


  // Fetch the next 3 artists, render their names one after another
  // using deferreds.


  // Using Q fetch the following 3 artists in parallel and render names
  // joined all at once.


  // Trigger an event on `emitter` when an artist finishes fetching and use
  // events to render the following 3 artist names joined as they finish

});
