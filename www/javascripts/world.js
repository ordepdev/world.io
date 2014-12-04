;(function () {

    var worldOptions = {
        scope: 'world',
        element: document.getElementById('world'),
        projection: 'mercator',

        fills: {
            defaultFill: '#0f2530',
            login: '#63ff00',
            action: '#ffea00',
            logout: '#ec0000'
        },

        geographyConfig: {
            dataUrl: null,
            hideAntarctica: true,
            borderWidth: 1,
            borderColor: '#0f2542',
            highlightOnHover: false,
            popupOnHover: false,
        }
    };

    var bubbleOptions = {
        borderWidth: 0,
        borderColor: '#fff',
        popupOnHover: true,
        popupTemplate: function(geography, data) {
        return '<div class="location-info">'  +
          '<strong> Event: </strong>'         + data.name       + '<br/>' +
          '<strong> IP: </strong>'            + data.ip         + '<br/>' +
          '<strong> Latitude: </strong>'      + data.latitude   + '<br/>' +
          '<strong> Longitude: </strong>'     + data.longitude  + '<br/>' +
          '<strong> Location: </strong>'      + data.where      + '<br/>' +
          '</div>';
        },
        fillOpacity: 0.75,
        highlightOnHover: false
    };

    var world = new Datamap(worldOptions);

    var socket = io.connect();

    socket.on('event-stream', function (data) {
      world.bubbles(data, bubbleOptions);
    });

})();
