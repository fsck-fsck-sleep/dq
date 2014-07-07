'use strict';

var dirtyQuestionsApp = angular.module('dirtyQuestionsApp', ['ngRoute']);

dirtyQuestionsApp.value('localStorage', window.localStorage);

dirtyQuestionsApp.config(function($compileProvider) {
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|data):/);
});

dirtyQuestionsApp.config(function($routeProvider) {
  $routeProvider.
      when('/', {
        controller: 'QuestionController',
        templateUrl: 'templates/questions.html'
      }).
      when('/open-json', {
        controller: 'OpenJSONController',
        templateUrl: 'templates/open_json.html'
      }).
      when('/reset', {
        controller: 'ResetController',
        templateUrl: 'templates/reset.html'
      });
});
