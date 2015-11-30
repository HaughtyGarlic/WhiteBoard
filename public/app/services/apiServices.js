'use strict';

angular.module('apiServices', [])

.service('Lobby', function ($http) {

  this.newRoom = function (name) {

    return $http({
      method: 'POST',
      url: '/new',
      data: {name: name}
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

  this.getActiveRooms = function () {

    return $http({
      method: 'GET',
      url: '/active'
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

.service('Room', function ($http) {

  this.getRoom = function (path) {

    return $http({
      method: 'GET',
      url: path
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

.service('songQueue', function(audio) {

  //storing the song queue in memory
  this._songQueue = [];

  this.addToQueue = function(song) {
    this._songQueue.push(song);
  };

  this.removeFromQueue = function(index) {
    this._songQueue.splice(index,1);
    if(index === 0) {
      this.queueNext();
    }
  };

  this.getSongQueue = function() {
    return this._songQueue;
  };

  this.setSongQueue = function(songQueue) {
    this._songQueue = songQueue;
  };

  this.updatePlaylist = function(callback) {
    callback(this._songQueue);
  };

  this.queueNext = function() {
    if(this._songQueue.length) {
      audio.setTrack(this._songQueue[0]);
    } else {
      audio.setTrack();
    }
    audio.getAudio().play();
  };

  if(!audio.getAudio()) {
    audio.initAudio();
  }

  //if the current song playing ends, try to play the next song in the queue
  audio.getAudio().addEventListener('ended', function() {
    console.log('current song has ended, checking to see if there is another song in the queue')
    console.log(this._songQueue);
    this._songQueue.shift();
    console.log(this._songQueue);
    this.queueNext();
  }.bind(this));

  

})

;
