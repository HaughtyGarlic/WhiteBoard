'use strict';

angular.module('webRTC', [])

.service('webRTC', function (songQueue, audio) {

  var audioVar;

	var webrtc = new SimpleWebRTC({

	  localVideoEl: 'localVideo',
	  remoteVideosEl: 'remoteVideos',
	  autoRequestMedia: false,
	  receiveMedia: {
	      mandatory: {
	          OfferToReceiveAudio: false,
	          OfferToReceiveVideo: false
	      }
	  },
	  url: '104.131.154.76:8888'
	});

	webrtc.on('joinedRoom', function () {
    var peers = webrtc.getPeers();
    console.log(peers);
    if(peers.length === 0) {
      setInterval(this.updateTheKids, 5000);
    }
  }.bind(this));

  webrtc.connection.on('message', function(data) {  
    console.log(data);
    if(data.payload && data.payload.type === 'music_status') {
      // console.log(data);

      // console.log('player status: ', data.payload.paused);
      if(!data.payload.paused) {
        audioVar.play();
      } else if(data.payload.paused) {
        audioVar.pause();
      }
      songQueue.setSongQueue(data.payload.songQueue);
      if(audioVar.src !== audio.getTrackURL(data.payload.songQueue[0].stream_url)) {
        audio.setTrack(data.payload.songQueue[0].stream_url)
      }
      updatePlayerTime(data.payload);
    } else if (data.type === 'offer') {
      // setTimeout(updateTheKids,200);
      this.updateTheKids();
    }

  }.bind(this));

  var updatePlayerTime = function(data) {
    var transTime = Date.now() - data.msgTime;
    // console.log('webRTC msg trans time (ms): ',transTime);
    
    console.log('current audio src', audioVar.src);
    if(!audioVar.src) {
      audio.setTrack(data.songQueue[0].stream_url);
    }

    audioVar.currentTime = data.currentTime + transTime/1000;

  };

  var getMusicStatus = function() {

    return {
      type: 'music_status',
      currentTime: audioVar.currentTime,
      paused: audioVar.paused,
      msgTime: Date.now(),
      songQueue: songQueue.getSongQueue()
    };
  };

  this.updateTheKids = function() {
  	// console.log('updating the kids');
    // if(!audio.paused) {
      console.log('about to send update to the kids, hold tight');
      webrtc.sendToAll('wut?', getMusicStatus());
    // }
  };

  this.joinRoom = function (ioRoom) {

  	//at this point we should be in the room
  	//join the room based on the path we were redirected to
    console.log('joining webRTC room: ',ioRoom);
    webrtc.joinRoom(ioRoom);
    //set the audio element as a variable to be used in this service
    initAudio();
  };

  var initAudio = function() {
    
    audioVar = audio.initAudio();

    //should be moved to it's own service in the future
    audioVar.addEventListener('play', function(e) {
      console.log('im playing so funky ass shit');
      webrtc.sendToAll('wut?', getMusicStatus());
    });

    audioVar.addEventListener('pause', function(e) {
      console.log('hold up hold up, let me tie my shoe');
      webrtc.sendToAll('wut?', getMusicStatus());
    });

  };

})
;