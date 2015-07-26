app.directive('sfMultiselect', function () {

        return {
            restrict: 'E',
            require:'^ngModel',
            scope: {
                items: '=',       //array of objects to be shown in the list
                textField: '@',   //label attribute in the object
                valueField: '@',  //value attribute in the object
                ngModel:'='       //models for selected attributes
            },
            templateUrl: 'src/dropdownTemplate.html',
            link: function (scope, element, attrs, ngModelCtrl) {

              scope.$watch('ngModel',function(v){

                // do something when the model is updated
              },true);

                var valueField = scope.valueField.toString().trim(); //remove spaces from both ends of the string
                var textField = scope.textField.toString().trim();
                var modelIsValid = false;
                var selectedItemIsValid = false;
                scope.checkAll = false;                              // all choices checked
                scope.unCheckAll = false;                            // all choices unchecked

                /** this function is called when checkAll checkbox is clicked */
                scope.selectAllCheckbox = function () {
                  return scope.checkAll;
                };

                /** this function is called when unCheckAll checkbox is clicked */
                scope.unSelectAllCheckbox = function () {
                  return scope.unCheckAll;
                };

                /** called when selectAll checkbox is true, will add all the items to ngModel */
                scope.selectAll = function() {

                  scope.ngModel = [];

                  if(scope.checkAll) {
                    scope.checkAll = false;
                  }
                  else {
                    scope.checkAll = true;
                    scope.unCheckAll = false;
                    angular.copy(scope.items, scope.ngModel);
                  }
                };

                /** called when unSelectAll checkbox is true, will remove all the items from ngModel */
                scope.unSelectAll = function() {

                  if(scope.unCheckAll) {
                    scope.unCheckAll = false;
                  }
                  else {
                    scope.ngModel = [];
                    scope.unCheckAll = true;
                    scope.checkAll = false;
                  }
                };

                /** checks if the model is valid or not */
                scope.isModelValid = function (items) {
                   if(typeof(items) == "undefined" || !items) { return false; }
                   if(items.length < 1) { return false; }
                   return true;
                };

                modelIsValid = scope.isModelValid(scope.ngModel);

                scope.isSelectedItemValid = function (item) {
                    if(!item) { return false; }
                    if(!item[valueField]) { return false; }
                    if(!item[valueField].toString().trim()) { return false; }
                    return true;
                };

                /** return the item name */
                scope.getItemName = function (item) {
                    return item[textField];
                };

                /** this function can be used to dynamically set the label on the button */
                scope.setMultiselectLabel = function() {
                  scope.currentItemLabel = attrs.defaultText;
                };

                scope.setMultiselectLabel();

                scope.setCheckboxChecked = function (itemParameter) {
                    var found = false;
                    angular.forEach(scope.ngModel, function (item) {
                        if (!found) {
                            if (itemParameter[valueField].toString() === item[valueField].toString()) {
                                found=true;
                            }
                        }
                    });
                    return found;
                };

                /** add/remove the selected element to/from the ngModel */
                scope.selectVal = function (itemParameter) {

                  scope.checkAll = false;
                  scope.unCheckAll = false;

                  if(typeof(scope.ngModel) != "undefined" && scope.ngModel) {
                      for(var i = 0; i < scope.ngModel.length; i++) {
                          if(!found) {
                              if (itemParameter[valueField].toString() === scope.ngModel[i][valueField].toString()) {
                                  found = true;
                                  var index = scope.ngModel.indexOf(scope.ngModel[i]);
                                  scope.ngModel.splice(index, 1);
                              }
                          }
                      }
                    } else {
                      scope.ngModel = [];
                    }
                    if(!found) {
                      scope.ngModel.push(itemParameter);
                    }

                    modelIsValid = scope.isModelValid(scope.ngModel);
                    selectedItemIsValid = scope.isSelectedItemValid(itemParameter);
                    scope.setMultiselectLabel();
                };

                scope.cancelClose = function($event) {
                    $event.stopPropagation();
                };
            }
        };
    });
