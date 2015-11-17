'use strict';

app.directive('reOrder', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('focusout', function(event) {
            	var val = element.val();
            	console.log(val);
	        	if (val && val > 0 && val <= scope.content.clone.length) {
		            var oldIndex = _.indexOf(scope.content.clone, scope.content.editValue);
		            var oldData = scope.content.clone[oldIndex];
		            console.log(oldIndex, oldData);
		            if (oldIndex+1 != val) {
		                scope.content.clone = _.without(scope.content.clone, scope.content.editValue);
		                scope.content.clone.splice(val-1, 0, oldData);
		                scope.content.editIndex = val-1;
		                scope.$apply();
		            }
		        } else {
		        	return false;
		        }
	        });
        }
    };
});