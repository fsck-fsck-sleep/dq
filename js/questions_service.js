'use strict';

dirtyQuestionsApp.factory('questions', function($rootScope, localStorage, $http) {
  var LOCAL_STORAGE_ID = 'dqQuestions',
      questionString = localStorage[LOCAL_STORAGE_ID];

  var questionsObject = {
    content: [],
    populateFromHttp: function () {
      $http.get('data/questions_LATCHES.json').success(function(data) {
        questionsObject.content = data;
      });
    }
  }, qContent = [];

  if (questionString && questionString != "[]") {
    questionsObject.content = JSON.parse(questionString);
  } else {
    questionsObject.populateFromHttp();
  }

  $rootScope.$watch(function() { return questionsObject; }, $.throttle(1000, function() {
    localStorage[LOCAL_STORAGE_ID] = JSON.stringify(questionsObject.content);
  }), true);

  angular.forEach(questionsObject.content, function(q) {
    if (q.done.indexOf(null) > -1) {
      q.done = q.done.map(function(i) { 
        var done = (i === null) ? false : i; 
        return done;
      });
    }
    this.push(q);
  }, qContent);

  questionsObject.content = qContent;

  return questionsObject;
});
