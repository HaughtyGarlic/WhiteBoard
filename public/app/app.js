'use strict';

angular.module('app', [
	'lobby',
  'nav',
  'chat',
	'whiteboard',
  'whiteboard.broadcast',
	'whiteboard.pens',
  'webRTC',
  'audio',
  'socket',
  'apiServices',
	'ui.router',
	'ngMaterial',
	'ngAnimate'
])

.config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('grey');

  $stateProvider
  .state('lobby', {
    url: '/lobby',
    templateUrl: 'app/components/lobby/lobby.html',
    controller: 'LobbyController'
  })
  .state('room', {
    url: '/room',
    templateUrl: 'app/components/room/room.html'
  })
  .state('room.id', {
    url: '/:id',
    views: {
    	'nav': {
    		templateUrl: 'app/components/nav/nav.html',
    		controller: 'NavController'
    	},
      'whiteboard': {
      	templateUrl: 'app/components/whiteboard/whiteboard.html'
      },
      'chat': {
      	templateUrl: 'app/components/chat/chat.html',
      	controller: 'ChatController'
      }
    }
  });

  $urlRouterProvider.otherwise('/lobby');

});