'use strict';

angular.module('audio', [])

.service('audio', function () {

	var _audio;

	this.initAudio = function() {
    
    _audio = angular.element('audio')[0];

    return _audio;

  };

  this.getAudio = function(){

  	return _audio;

  };

  this.setTrack = function(trackUrl) {
    if(!trackUrl) {
      _audio.src = '';
    } else {
      var url = this.getTrackURL(trackUrl);
      console.log(url);
    	_audio.src = url;
    }

  };

  this.getTrackURL = function(trackUrl) {
    return trackUrl+'?client_id=9e3abdceafbd5ef113b3430508a34c92';
  };

  this.isPaused = function() {
  	return _audio.paused
  };

});