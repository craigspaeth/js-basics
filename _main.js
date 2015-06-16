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

// Add xapp token to all calls
$.ajaxSettings.headers = { 'X-Xapp-Token': XAPP_TOKEN };

// Create artist and artwork models from scratch
// Add a `fetch` method that returns the $.ajax deferred and updates
// model when it's finished. Use node-style callbacks e.g. (err, artist)
var Artist = function (attributes) {
  _.extend(this, attributes);
}

Artist.prototype.fetch = function(callback) {
  var self = this;
  return $.ajax({
    url: API_URL + '/api/v1/artist/' + this.id,
    success: function(data) {
      _.extend(self, data);
      emitter.trigger('fetched', [self]);
      if (callback) callback(null, self);
    },
    error: function(err) {
      if (callback) callback(err);
    }
  });
}

$(function(){

  // Fetch the first 3 artists and render their joined names
  async.map(ARTIST_SLUGS.slice(3), function(slug, callback) {
    var artist = new Artist({ id: slug });
    artist.fetch(function(err, artist) {
      callback(err, artist);
    });
  }, function(err, artists) {
    $('#content').append(artists.map(function(artist) {
      return artist.name
    }));
  });

  // Fetch the next 3 artists, render their names one after another
  // using deferreds.
  var artist1 = new Artist({ id: ARTIST_SLUGS[2] });
  var artist2 = new Artist({ id: ARTIST_SLUGS[3] });
  var artist3 = new Artist({ id: ARTIST_SLUGS[4] });
  artist1.fetch().then(function() {
    return artist2.fetch();
  }).then(function() {
    return artist3.fetch();
  }).then(function() {
    $('#content').append([artist1,artist2,artist3].map(function(artist) {
      return artist.name;
    }));
  });

  // Using Q fetch the following 3 artists in parallel and render names
  // joined all at once.
  var artist1 = new Artist({ id: ARTIST_SLUGS[5] });
  var artist2 = new Artist({ id: ARTIST_SLUGS[6] });
  var artist3 = new Artist({ id: ARTIST_SLUGS[7] });
  Q.all([
    artist1.fetch(),
    artist2.fetch(),
    artist3.fetch(),
  ]).then(function() {
    $('#content').append([artist1,artist2,artist3].map(function(artist) {
      return artist.name;
    }));
  });

  // Trigger an event on `emitter` when an artist finishes fetching and use
  // events to render the following 3 artist names joined as they finish
  var slugs = ARTIST_SLUGS.slice(7, 10);
  slugs.forEach(function(slug) {
    new Artist({ id: slug }).fetch();
  });
  emitter.on('fetched', function(artist) {
    console.log(arguments);
    $('#content').append(artist.name);
  });
});
