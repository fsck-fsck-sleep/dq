dirtyQuestionsApp.directive('dqVisualisation', function () {
	// constants
	var margin = 20,
		width = 220,
		height = 500 - .5 - margin,
		color = d3.interpolateRgb("#f77", "#77f");

	var x = d3.scale.ordinal()
		.rangeRoundBands([0, width], .1);
	var y = d3.scale.linear()
		.range([height, 0]);

	var colors = d3.scale.category10();

	return {
		restrict: 'E',
		scope: {
			val: '=',
		},
		link: function (scope, element, attrs) {

			// set up initial svg object
			var vis = d3.select(element[0])
				.append("svg")
					.attr("width", width)
					.attr("height", height + margin + 100);

			scope.$watch('val', function (newVal, oldVal) {
				// clear the elements inside of the directive
				vis.selectAll('*').remove();

				// if 'val' is undefined, exit
				if (!newVal) {
					return;
				}

				var data = d3.entries(newVal);

				x.domain(data.map(function(d) { return d.key; }));
				y.domain([0, d3.max(data, function(d) { return d.value; })]);

				vis.selectAll("line")
					.data(data)
				.enter().append("line")
					.attr("x1", function(d) { return x(d.key) + x.rangeBand() / 2; })
					.attr("x2", function(d) { return x(d.key) + x.rangeBand() / 2;  })
					.attr("y1", 0)
					.attr("y2", height)
					.style("stroke", "#444");

				vis.selectAll(".bar")
					.data(data)
				.enter().append('rect')
					.attr('class', 'bar')
					.attr('x', function(d) { return x(d.key) })
					.attr('y', function(d) { return y(d.value) })
					.attr('height', function(d) { return height - y(d.value); })
					.attr('width', function(d) { return x.rangeBand(); })
					.attr('fill', function(d) { return colors(d.key); });

				vis.selectAll(".groups")
					.data(data)
				.enter().append("text")
					.attr('class', 'groups')
					.attr("x", function(d) { return x(d.key) + x.rangeBand() / 2; })
					.attr('y', height + margin)
					.attr("text-anchor", "end") // text-align: right
					.text(function(d) { return String(d.key); });

				vis.selectAll(".values")
					.data(data)
				.enter().append("text")
					.attr('class', 'values')
					.attr("x", function(d) { return x(d.key) + x.rangeBand() / 2; })
					.attr('y', function(d) { return Math.min(height-20, y(d.value))})
					.attr('dy', 15)
					.attr("text-anchor", "middle")
					.text(function(d) { return String(d.value); });
			});
		}
	}
});

dirtyQuestionsApp.directive('filelistBind', function() {
	return function( scope, elm, attrs ) {
		elm.bind('change', function( evt ) {
			scope.$apply(function() {
				scope[attrs.name] = evt.target.files;
			});
		});
	};
});

dirtyQuestionsApp.directive('uiIndeterminate', [
  function () {
    return {
      compile: function(tElm, tAttrs) {
        if (!tAttrs.type || tAttrs.type.toLowerCase() !== 'checkbox') {
          return angular.noop;
        }

        return function ($scope, elm, attrs) {
          $scope.$watch(attrs.uiIndeterminate, function(newVal, oldVal) {
            elm[0].indeterminate = !!newVal;
          });
        };
      }
    };
  }]);
