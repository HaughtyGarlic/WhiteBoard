'use strict';

angular.module('apiServices', [])

.service('Lobby', function ($http) {

  this.newRoom = function () {

    return $http({
      method: 'GET',
      url: '/new'
    })
    .then(function (res) {
      console.log(res)
      return res.data;
    })
    .catch(function (err) {
      console.error(err);
    })
    ;

  };

})

.service('soundCloud', function($http) {
  this.getSongs = function(query) {
    var url = 'https://api.soundcloud.com/tracks?q='+query+'&client_id=9e3abdceafbd5ef113b3430508a34c92&limit=10'
    console.log(query,' - ',url);
    return $http({
      method: 'GET',
      url: url
    })
    .then(function (resp) {
      return resp.data;
    });
  };
})

.service('songQueue', function() {

  //storing the song queue in memory
  var _songQueue = [];

  this.getSongQueue = function() {
    return _songQueue;
  };

})

;
