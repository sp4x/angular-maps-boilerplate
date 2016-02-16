angular.module('esmapsApp')
  .service('PointSearch', function(esFactory, esConfig) {

    var client = esFactory(esConfig);

    var query_match_all = {
      "filtered": {
        "query": {
          "match_all": {}
        }
      }
    };

    function query(from, size) {
      return {
        "index": "us_large_cities",
        "body": {
          "from": from,
          "size": size,
          "query": query_match_all
        }
      }
    }


    function sort_by_distance(location) {
      return {
        "_geo_distance": {
          "location": {
            "lat": location.latitude,
            "lon": location.longitude
          },
          "order": "asc",
          "unit": "km"
        }
      };
    }

    function nearbyQuery(location, distance) {
      var q = query(0, 10);
      q.body.sort = [sort_by_distance(location)];
      q.body.query.filtered.filter = {
        "geo_distance": {
          "distance": distance,
          "location": {
            "lat": location.latitude,
            "lon": location.longitude
          }
        }
      }
      return q;
    };



    function boundingBoxQuery(bounds) {
      var q = query(0, 300);
      q.body.query.filtered.filter = {
        "geo_bounding_box": {
          "location": {
            "top_left": {
              lat: bounds.north,
              lon: bounds.west
            },
            "bottom_right": {
              lat: bounds.south,
              lon: bounds.east
            }
          }
        }
      }
      return q;
    };


    function transformResponse(response) {
      return response.hits.hits.map(function(item) {
        var obj = {
          title: item._source.city,
          location: {
            latitude: item._source.location.lat,
            longitude: item._source.location.lon,
          }
        };

        if (item.sort) {
          obj.distance = item.sort[0].toFixed(2) + " km";
        }

        return obj;

      });
    };


    return {

      nearby: function(location, distance) {
        return client.search(nearbyQuery(location, distance)).then(
          transformResponse);
      },

      boundingBox: function(bounds) {
        return client.search(boundingBoxQuery(bounds)).then(
          transformResponse);
      },

      all: function() {
        return client.search(query(0, 300)).then(transformResponse)
      }

    }


  });
