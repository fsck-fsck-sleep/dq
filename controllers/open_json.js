'use strict';

dirtyQuestionsApp.controller("OpenJSONController", 
	function QuestionController($scope, $location, questions, fileReader){
		$scope.questions = questions;

		$scope.json_file = false;

		$scope.processing = false;

		$scope.$watch('json_file', function (newVal, oldVal){
			if (newVal) {
				$scope.processing = true;
				fileReader.readAsText(newVal[0], $scope)
					.then(function(result) {
						$scope.questions.content = JSON.parse(result);
						$location.url('/quiz');
					});
			}
		}, true);
	}
);
