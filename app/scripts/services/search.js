angular.module('esmapsApp')
  .service('PointSearch', function(esFactory) {

    var client = esFactory({
      host: 'localhost:9200',
      apiVersion: '1.2'
    });

    var nearbyQuery = function(location, distance) {
      return {
        "index": "us_large_cities",
        "body": {
          "from": 0,
          "size": 10,
          "sort": [{
            "_geo_distance": {
              "location": {
                "lat": location.latitude,
                "lon": location.longitude
              },
              "order": "asc",
              "unit": "km"
            }
          }],
          "query": {
            "filtered": {
              "query": {
                "match_all": {}
              },
              "filter": {
                "geo_distance": {
                  "distance": "20km",
                  "location": {
                    "lat": location.latitude,
                    "lon": location.longitude
                  }
                }
              }
            }
          }
        }
      };
    };

    var matchAllQuery = {
      "index": "us_large_cities",
      "body": {
        "from": 0,
        "size": 300,
        "query": {
          "filtered": {
            "query": {
              "match_all": {}
            }
          }
        }
      }
    };

    var formatResult = function(result) {
      return result.hits.hits.map(function(item) {
        var obj = {
          title: item._source.city,
          location: {
            latitude: item._source.location.lat,
            longitude: item._source.location.lon,
          }
        };

        if (item.sort) {
          obj['distance'] = item.sort[0].toFixed(2) + " km";
        }

        return obj;

      });
    };


    var boundingBoxQuery = function(top_left, bottom_right) {
      return {
        "index": "us_large_cities",
        "body": {
          "from": 0,
          "size": 300,
          "query": {
            "filtered": {
              "query": {
                "match_all": {}
              },
              "filter": {
                "geo_bounding_box": {
                  "location": {
                    "top_left": top_left,
                    "bottom_right": bottom_right
                  }
                }
              }
            }
          }
        }
      };
    };


    return {

      nearby: function(location, distance) {
        return client.search(nearbyQuery(location, distance)).then(
          formatResult);
      },

      boundingBox: function(top_left, bottom_right) {
        return client.search(boundingBoxQuery(top_left, bottom_right)).then(
          formatResult);
      },

      all: function() {
        return client.search(matchAllQuery).then(formatResult)
      }

    }


  });
