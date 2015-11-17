'use strict';

app.directive('reOrder', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('focusout', function(event) {
            	var val = element.val();
	        	if (val > 0 && val <= scope.content.clone.length) {
		            var oldIndex = _.indexOf(scope.content.clone, scope.content.editValue);
		            var oldData = scope.content.clone[oldIndex];
		            if (oldIndex+1 != val) {
		                scope.content.clone = _.without(scope.content.clone, scope.content.editValue);
		                scope.content.clone.splice(val-1, 0, oldData);
		                scope.content.editIndex = val-1;
		            }
		        }
	        });
        }
    };
});