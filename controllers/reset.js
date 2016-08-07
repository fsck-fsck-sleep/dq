dirtyQuestionsApp.controller("ResetController", 
	function ResetController($scope, $location, questions){
		$scope.questions = questions;

		$scope.reset = function() {
			$scope.questions.populateFromHttp();
			$location.url('/');
		};
	}
);
