'use strict';

dirtyQuestionsApp.controller("QuestionController", 
	function QuestionController($scope, questions){
		$scope.ratings = [
			{id: 0, label: 'never (hard limit)'},
			{id: 1, label:'if requested (soft limit)'},
			{id: 2, label:'maybe someday'},
			{id: 3, label:'mildly keen'},
			{id: 4, label:'enthusiastic'},
			{id: 5, label:'desperate ;)'},
			{id: '-', label:'n/a'},
			{id: '?', label:'not sure what this is..'}
		];

		$scope.questions = questions;

		$scope.questionFilterText = '';
		// separate scope variable for throttling
		$scope.questionFilterTextTmp = '';

		$scope.questionFilterNote = '';
		// separate scope variable for throttling
		$scope.questionFilterNoteTmp = '';
		
		$scope.questionFilterDone = '';
		$scope.questionFilterDoneAny = true;

		$scope.questionFilterRating = null;

		$scope.questionFilter = function(obj, i) {
			if (($scope.questionFilterText !== '') 
					&& (obj.text.toLowerCase().indexOf($scope.questionFilterText.toLowerCase()) == -1))
				return false;
			if (($scope.questionFilterNote !== '') 
					&& (obj.text.toLowerCase().indexOf($scope.questionFilterNote.toLowerCase()) == -1))
				return false;
			if (!$scope.questionFilterDoneAny
					&& (obj.done.indexOf($scope.questionFilterDone) == -1))
				return false;
			if (($scope.questionFilterRating !== null)
					&& (obj.rating.indexOf($scope.questionFilterRating) == -1)) {
				return false;
			}
			return true;
		};

		$scope.$watch('questionFilterTextTmp', $.throttle(250, function(newVal, oldVal){
			$scope.questionFilterText = newVal;
		}), true);
		$scope.$watch('questionFilterNoteTmp', $.throttle(250, function(newVal, oldVal){
			$scope.questionFilterNotes = newVal;
		}), true);

		$scope.$watch('questionFilterDone', function(newVal, oldVal){
			$scope.questionFilterDoneAny = !!(newVal === '');
		});

		$scope.cycle = function(v) {
			var choices = [true, false, ''],
					currIndex = choices.indexOf($scope[v]);

			$scope[v] = choices[(currIndex+1)%(choices.length)];

			console.log($scope[v]);
		}

		$scope.exportJSON = function() {
			return window.encodeURI(JSON.stringify($scope.questions.content));
		}

		$scope.exportCSV = function() {
			var output = "id,question,done (s),done (d),rating (s),rating (d),notes\r\n";
			questions.content.forEach(function(question) {
				output = output + [
					question.id, question.text, question.done[0], question.done[1],
					question.rating[0], question.rating[1], question.note
				].join(',') + "\r\n" ;
			});
			return window.encodeURI(output);
		};

		$scope.update_stats = function() {
			$scope.complete = 0;
			angular.forEach($scope.questions.content, function(question) {
				if (question.rating[0] !== null && question.rating[1] !== null) {
					$scope.complete += 1;
				}
			});

			$scope.ratings_freq = {};
			angular.forEach($scope.ratings, function(r) {
				$scope.ratings_freq[r.id] = 0;
			});

			$scope.questions.content.map(function(e) {
				if (e.rating[0] !== null && e.rating[0] !== '')
					$scope.ratings_freq[e.rating[0]]++;
				if (e.rating[1] !== null && e.rating[1] !== '')
					$scope.ratings_freq[e.rating[1]]++;
			});
		};

		$scope.complete_percent = function() {
			return $scope.complete / $scope.questions.content.length * 100;
		};

		$scope.$watch('questions', function(){
			$scope.update_stats();
		}, true);

	}
);

dirtyQuestionsApp.controller("ResetController", 
	function QuestionController($scope, $location, questions){
		$scope.questions = questions;

		$scope.reset = function() {
			$scope.questions.populateFromHttp();
			$location.url('/');
		};
	}
);
