'use strict';

angular.module('app', [
	'lobby',
  'nav',
  'chat',
	'whiteboard',
	'whiteboard.pens',
	'ui.router',
	'ngMaterial',
	'ngAnimate'
])

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('lobby', {
    url: '/lobby',
    templateUrl: 'components/lobby/lobby.html',
    controller: 'LobbyController'
  })
  .state('room', {
    url: '/room',
    templateUrl: 'components/room/room.html'
  })
  .state('room.id', {
    url: '/:id',
    views: {
    	'nav': {
    		templateUrl: 'components/nav/nav.html',
    		controller: 'NavController'
    	},
      'whiteboard': {
      	templateUrl: 'components/whiteboard/whiteboard.html'
      },
      'chat': {
      	templateUrl: 'components/chat/chat.html',
      	controller: 'ChatController'
      },
    }
  });

  $urlRouterProvider.otherwise('/lobby');

});