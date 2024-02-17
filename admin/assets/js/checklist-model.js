angular.module('checklist-model',[]).directive('checklistModel',['$parse','$compile',function($parse,$compile){function contains(arr,item,comparator){if(angular.isArray(arr)){for(var i=arr.length;i--;){if(comparator(arr[i],item)){return true;}}}return false;}function add(arr,item,comparator){arr=angular.isArray(arr)?arr:[];if(!contains(arr,item,comparator)){arr.push(item);}return arr;}function remove(arr,item,comparator){if(angular.isArray(arr)){for(var i=arr.length;i--;){if(comparator(arr[i],item)){arr.splice(i,1);break;}}}return arr;}function postLinkFn(scope,elem,attrs){var checklistModel=attrs.checklistModel;attrs.$set("checklistModel",null);$compile(elem)(scope);attrs.$set("checklistModel",checklistModel);var checklistModelGetter=$parse(checklistModel);var checklistChange=$parse(attrs.checklistChange);var checklistBeforeChange=$parse(attrs.checklistBeforeChange);var ngModelGetter=$parse(attrs.ngModel);var comparator=angular.equals;if(attrs.hasOwnProperty('checklistComparator')){if(attrs.checklistComparator[0]=='.'){var comparatorExpression=attrs.checklistComparator.substring(1);comparator=function(a,b){return a[comparatorExpression]===b[comparatorExpression];};}else{comparator=$parse(attrs.checklistComparator)(scope.$parent);}}scope.$watch(attrs.ngModel,function(newValue,oldValue){if(newValue===oldValue){return;}if(checklistBeforeChange&&(checklistBeforeChange(scope)===false)){ngModelGetter.assign(scope,contains(checklistModelGetter(scope.$parent),getChecklistValue(),comparator));return;}setValueInChecklistModel(getChecklistValue(),newValue);if(checklistChange){checklistChange(scope);}});scope.$watch(getChecklistValue,function(newValue,oldValue){if(newValue!=oldValue&&angular.isDefined(oldValue)&&scope[attrs.ngModel]===true){var current=checklistModelGetter(scope.$parent);checklistModelGetter.assign(scope.$parent,remove(current,oldValue,comparator));checklistModelGetter.assign(scope.$parent,add(current,newValue,comparator));}});function getChecklistValue(){return attrs.checklistValue?$parse(attrs.checklistValue)(scope.$parent):attrs.value;}function setValueInChecklistModel(value,checked){var current=checklistModelGetter(scope.$parent);if(angular.isFunction(checklistModelGetter.assign)){if(checked===true){checklistModelGetter.assign(scope.$parent,add(current,value,comparator));}else{checklistModelGetter.assign(scope.$parent,remove(current,value,comparator));}}}function setChecked(newArr,oldArr){if(checklistBeforeChange&&(checklistBeforeChange(scope)===false)){setValueInChecklistModel(getChecklistValue(),ngModelGetter(scope));return;}ngModelGetter.assign(scope,contains(newArr,getChecklistValue(),comparator));}if(angular.isFunction(scope.$parent.$watchCollection)){scope.$parent.$watchCollection(checklistModel,setChecked);}else{scope.$parent.$watch(checklistModel,setChecked,true);}}return{restrict:'A',priority:1000,terminal:true,scope:true,compile:function(tElement,tAttrs){if(!tAttrs.checklistValue&&!tAttrs.value){throw'You should provide `value` or `checklist-value`.';}if(!tAttrs.ngModel){tAttrs.$set("ngModel","checked");}return postLinkFn;}};}]);