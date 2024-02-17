app = angular.module("admin", ['ngRoute', /*'ngIdle',*/ 'base64', 'ngStorage', 'ngValidate', 'ngSanitize', 'ngFileUpload', /*'checklist-model',*/ "ui.bootstrap", /*"angular-google-analytics",*/ 'ksSwiper', /*'hl.sticky',*/ 'ui.swiper', 'ngMaterial', 'ckeditor', 'ngTagsInput', 'dndLists', 'bw.paging', 'daterangepicker' /*'ngMessages',*/, 'socialbase.sweetAlert', /*'rzModule',*/ /*'socialLogin',*/ /*'angular-nicescroll',*/ /*'ui.bootstrap.datetimepicker',*/ /*'angular-progress-arc'*/]);
/*ngImgCrop*/

app.$inject = ['SweetAlert'];

var frontUrl = 'http://192.168.50.15/1888/';
var rootUrl = 'http://192.168.50.15/1888/admin/';
var apiUrl = 'http://192.168.50.15/1888/api/';

app.config(['$locationProvider', '$routeProvider', '$validatorProvider', /*'AnalyticsProvider',*/ /*'socialProvider',*/
	function ($locationProvider, $routeProvider, $validatorProvider /*AnalyticsProvider,*/ /*socialProvider*/) {

		// /** Adding validation method for password **/
		// $validatorProvider.addMethod("pwcheck", function(value, element, param) {
		// 	return (/[A-Z]/.test(value) && /\d/.test(value) && /[$@$!%*#?&]/.test(value));
		// }, 'Password must contain 1 special character, 1 Capital letter and 1 Digit!');

		/** Adding validation method for letters only **/
		// $validatorProvider.addMethod("lettersonly", function(value, element) {
		// 	return this.optional(element) || /^[a-z]+$/i.test(value);
		// }, "Special characters and numbers are not allowed!");

		// /** Adding validation method for letters only **/
		// $validatorProvider.addMethod("alphaonly", function(value, element) {
		// 	return this.optional(element) || /^[a-zA-Z\s]+$/i.test(value);
		// }, "Special characters and numbers are not allowed!");

		$locationProvider.hashPrefix('');

		$validatorProvider.addMethod('notEqualTo', function (value, element, param) {
			var target = $(param);
			if (this.settings.onfocusout && target.not(".validate-equalTo-blur").length) {
				target.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function () {
					$(element).valid();
				});
			}
			return value !== target.val();
		}, 'Please enter other string, string should be diffrent.');

		$validatorProvider.addMethod('validate_name', function (value, element) {
			/*return this.optional(element) || /^http:\/\/mydomain.com/.test(value);*/
			return (/^[A-Za-z]?[A-Za-z ]*$/.test(value));
			// has a digit
		}, 'Please enter valid name.');

		$validatorProvider.addMethod('floating_val', function (value, element) {
			/*return this.optional(element) || /^http:\/\/mydomain.com/.test(value);*/
			return (/^\d{1,5}([\.](\d{1,4})?)?$/.test(value));
			// has a digit
		}, 'Please enter valid value.');

		$routeProvider.when("/", {
			templateUrl: "templates/dashbord.html?ver=25-05-2023",
			controller: "dashbordController",
			page_title: "Home",
		})

		$routeProvider.when("/login", {
			templateUrl: "templates/login.html?ver=25-05-2023",
			controller: "LoginController",
			page_title: "Login",
		})

		$routeProvider.when("/profile", {
			templateUrl: "templates/profile.html?ver=25-05-2023",
			controller: "profileController",
			page_title: "Profile",
		})

			.otherwise({
				redirectTo: "/"
			});

		$locationProvider.html5Mode(true);
	}
]);

app.run(function ($timeout, $rootScope, $location, $localStorage, $http, $window, $routeParams, $filter) {
	$rootScope.$on('$routeChangeStart', function (evt, current, previous, $filter, next) {
		// $rootScope.page_title = "";

		$rootScope.page_load_start = true;
		$rootScope.load_start = true;
		// $rootScope.loading_bar_fun();

		// angular.element(".loading_body").class("opacity": "0");

		$rootScope.rootUrl = rootUrl;
		$rootScope.screenWidth = screen.width;
		$rootScope.activePath = $location.path();
		$rootScope.pageContent = "";
		$rootScope.category_get = "";
		$rootScope.dropdown_category_get = "";
		$window.scrollTo(0, 0);
		$rootScope.page_title = current.$$route.page_title ? current.$$route.page_title : "";
		$rootScope.page_description = current.$$route.page_description ? current.$$route.page_description : "";

		$rootScope.page_flag = current.$$route.page_flag;

	});

	$rootScope.$on('$routeChangeSuccess', function (evt, current, previous) {
		$timeout(function () {
			$window.scrollTo(0, 0);
		}, 1000);
		$rootScope.open_contact_slide = false;
	});

	$rootScope.$on('$locationChangeStart', function (event, next, current) {
		if (next.indexOf('/uploads/') > 0) {
			event.preventDefault();
		}
	});

});

app.directive('ngEnter', function () {
	return function (scope, element, attrs) {
		element.bind("keydown keypress", function (event) {
			if (event.which === 13) {
				scope.$apply(function () {
					scope.$eval(attrs.ngEnter, {
						'event': event
					});
				});
				event.preventDefault();
			}
		});
	};
});

app.directive('numbersOnly', function () {
	return {
		require: 'ngModel',
		link: function (scope, element, attr, ngModelCtrl) {
			function fromUser(text) {
				if (text) {
					var transformedInput = text.replace(/[^0-9]/g, '');

					if (transformedInput !== text) {
						ngModelCtrl.$setViewValue(transformedInput);
						ngModelCtrl.$render();
					}
					return transformedInput;
				}
				return undefined;
			}
			ngModelCtrl.$parsers.push(fromUser);
		}
	};
});

app.filter('replace', [function () {

	return function (input, from, to) {

		if (input === undefined) {
			return;
		}

		var regex = new RegExp(from, 'g');
		return input.replace(regex, to);

	};

}]);

app.directive('lettersOnly', function () {
	return {
		require: 'ngModel',
		link: function (scope, element, attr, ngModelCtrl) {
			function fromUser(text) {
				if (text) {
					var transformedInput = text.replace(/[^a-zA-Z ]/g, '');

					if (transformedInput !== text) {
						ngModelCtrl.$setViewValue(transformedInput);
						ngModelCtrl.$render();
					}
					return transformedInput;
				}
				return undefined;
			}
			ngModelCtrl.$parsers.push(fromUser);
		}
	};
});

app.directive('hires', function () {
	return {
		restrict: 'A',
		scope: {
			hires: '@'
		},
		link: function (scope, element, attrs) {
			element.addClass("lazyLoad_loadd");
			element.one('load', function () {
				setTimeout(function () {
					element.attr('src', scope.hires);
					element.removeClass("lazyLoad_loadd");
					element.addClass("lazyLoad_load");
				}, 500)
			});
		}
	};
});

app.directive("limitTo", [function () {
	return {
		restrict: "A",
		link: function (scope, elem, attrs) {
			var limit = parseInt(attrs.limitTo);
			angular.element(elem).on("keypress", function (e) {
				if (this.value.length == limit) e.preventDefault();
			});
		}
	}
}]);

app.directive("limitTo2", [function () {
	return {
		restrict: "C",
		link: function (scope, elem, attrs) {
			var limit = parseInt(attrs.limitTo);
			angular.element(elem).on("keypress", function (e) {
				if (this.value.length == limit) e.preventDefault();
			});
		}
	}
}]);

app.directive('ngSpace', function () {
	return function (scope, element, attrs) {
		element.bind("keydown keypress", function (event) {
			if (event.which === 32) {
				scope.$apply(function () {
					scope.$eval(attrs.ngSpace, {
						'event': event
					});
				});
				event.preventDefault();
			}
		});
	};
});

app.directive('scrollOnClick', function () {
	return {
		restrict: 'EA',
		template: '<a title="Scroll to Top" class="scrollup">Scroll</a>',
		link: function (scope, $elm) {
			$(window).scroll(function () {
				if ($(this).scrollTop() > 300) {
					$('.scrollup').fadeIn();
				} else {
					$('.scrollup').fadeOut();
				}
			});
			$elm.on('click', function () {
				$("html,body").animate({
					scrollTop: '0px'
				}, "slow");
			});
		}
	}
});

app.directive('ngEscape', function () {
	return function (scope, element, attrs) {
		element.bind("keydown keypress", function (event) {
			if (event.which === 27) {
				scope.$apply(function () {
					scope.$eval(attrs.ngEscape, {
						'event': event
					});
				});
				event.preventDefault();
			}
		});
	};
});

app.directive('focusClass', function () {
	return {
		link: function (scope, elem, attrs) {
			elem.find('input').on('focus', function () {
				elem.toggleClass(attrs.focusClass);
			}).on('blur', function () {
				elem.toggleClass(attrs.focusClass);
			});
		}
	}
});

app.directive('ngFile', ['$parse',
	function ($parse) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				element.bind('change', function () {
					$parse(attrs.ngFile).assign(scope, element[0].files)
					scope.$apply();
				});
			}
		};
	}
]);

app.directive('ngFileModel', ['$parse', function ($parse) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var model = $parse(attrs.ngFileModel);
			var isMultiple = attrs.multiple;
			var modelSetter = model.assign;
			element.bind('change', function () {
				var values = [];
				angular.forEach(element[0].files, function (item) {
					var value = {
						name: item.name,
						size: item.size,
						extension: item.name.substring(item.name.lastIndexOf('.') + 1, item.name.length),
						url: URL.createObjectURL(item),
						_file: item
					};
					values.push(value);
				});
				scope.$apply(function () {
					if (isMultiple) {
						modelSetter(scope, values);
					} else {
						modelSetter(scope, values[0]);
					}
				});
			});
		}
	};
}]);

app.filter("trustUrl", ['$sce',
	function ($sce) {
		return function (recordingUrl) {
			return $sce.trustAsResourceUrl(recordingUrl);
		};
	}
]);

app.filter('sanitizer', ['$sce',
	function ($sce) {
		return function (url) {
			return $sce.trustAsHtml(url);
		};
	}
]);

app.filter('dateSuffix', function ($filter) {
	var suffixes = ["th", "st", "nd", "rd"];
	return function (input) {
		var dtfilter = $filter('date')(input, 'EEE, MMM dd');
		var day = parseInt(dtfilter.slice(-2));
		var relevantDigits = (day < 30) ? day % 20 : day % 30;
		var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
		return dtfilter + suffix;
	};
});

app.directive('accordion', function () {
	return {
		restrict: 'ACE',
		link: function (scope, element, attributes) {
			var ele = angular.element(element)
			angular.element('#accordion .accordion_click.active').next('.content_accordian').show();
			ele.bind('click', function () {
				ele.toggleClass('active');
				ele.next('.content_accordian').stop().slideToggle();
				ele.parents('.career_position_list').siblings().find('.content_accordian').slideUp();
				return false;
			});
		},
	}
});

app.directive('readMore', ['$compile', function ($compile) {
	return {
		restrict: 'A',
		scope: true,
		link: function (scope, element, attrs) {

			scope.collapsed = false;

			scope.toggle = function () {
				scope.collapsed = !scope.collapsed;
			};

			attrs.$observe('ddTextCollapseText', function (text) {

				var maxLength = scope.$eval(attrs.ddTextCollapseMaxLength);

				if (text.length > maxLength) {
					var firstPart = String(text).substring(0, maxLength);
					var secondPart = String(text).substring(maxLength, text.length);

					var firstSpan = $compile('<span>' + firstPart + '</span>')(scope);
					var secondSpan = $compile('<span ng-if="collapsed">' + secondPart + '</span>')(scope);
					var moreIndicatorSpan = $compile('<span ng-if="!collapsed">... </span>')(scope);
					var lineBreak = $compile('<br ng-if="collapsed" class="readmore_para">')(scope);
					var toggleButton = $compile('<span class="readmore_click" ng-click="toggle();">{{collapsed ? "read less" : "read more"}}</span>')(scope);

					element.empty();
					element.append(firstSpan);
					element.append(secondSpan);
					element.append(moreIndicatorSpan);
					element.append(lineBreak);
					element.append(toggleButton);
				} else {
					element.empty();
					element.append(text);
				}
			});
		}
	};
}]);

app.directive('starRating', function () {
	return {
		restrict: 'A',
		template: '<ul class="rating" ng-class="{readonly: readonly}">'
			+ '    <li  ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)" ng-mouseover="toggle($index)">'
			+ '<i class="fa fa-star" aria-hidden="true"></i>'
			+ '</li>'
			+ '</ul>',
		scope: {
			readonly: '=',
			ratingValue: '=',
			max: '=',
			onRatingSelected: '&'
		},
		link: function (scope, elem, attrs) {
			var updateStars = function () {
				scope.stars = [];
				for (var i = 0; i < scope.max; i++) {
					scope.stars.push({
						filled: i < scope.ratingValue
					});
				}
			};

			scope.toggle = function (index) {
				if (scope.readonly == undefined || scope.readonly === false) {
					scope.ratingValue = index + 1;
					scope.onRatingSelected({
						rating: index + 1
					});
				}
			};

			scope.$watch('ratingValue',
				function (oldVal, newVal) {
					if (newVal) {
						updateStars();
					}
				}
			);
		}
	};
});

app.directive('forSlug', function () {
	return {
		require: 'ngModel',
		link: function (scope, element, attr, ngModelCtrl) {
			function fromUser(text) {
				if (text) {
					var replacedInput = text.replace(/[^a-zA-Z\-?]/g, '-');
					var transformedInput = replacedInput.replace(/--+/g, '-');

					if (transformedInput !== text) {
						ngModelCtrl.$setViewValue(transformedInput);
						ngModelCtrl.$render();
					}
					return transformedInput;
				}
				return undefined;
			}
			ngModelCtrl.$parsers.push(fromUser);
		}
	};
});

app.controller("MainController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {

	$rootScope.year = new Date().getFullYear();

	$rootScope.MaxDate = new Date();

	$rootScope.toSlug = function (string) {
		string = string.trim();
		var newstring = string.replace(/[^a-zA-Z\-]/g, '-');
		newstring = newstring.toLowerCase();
		return newstring;
	}

	$scope.rootUrl = rootUrl;
	$rootScope.$storage = $localStorage.$default({
		admin_id: null,
	});
	$rootScope.admin_data = {};

	$rootScope.toBase64 = function (string) {
		return $base64.encode(unescape(encodeURIComponent(string)));
	}
	$rootScope.fromBase64 = function (string) {
		return decodeURIComponent(escape($base64.decode(string)));
	}

	$scope.logout = function () {
		$rootScope.$storage.admin_id = null;
		$window.location.href = rootUrl;
	}


	window.onkeyup = function (event) {
		if (event.keyCode == '27') {
			$timeout(function () {
				$scope.view_profile_f = false;
				$rootScope.open_contact_slide = false;
			}, 100);
		}
	}


	$scope.view_profile_f = false;
	$scope.view_profile = function () {
		$scope.view_profile_f = true;
	}

	$scope.view_profile_false = function () {
		$scope.view_profile_f = false;
	}

	$rootScope.getAdminById = function () {

		$http({
			method: 'POST',
			url: apiUrl + 'admin/profile/detail',
			data: {
				from_app: true,
				admin_id: $rootScope.$storage.admin_id
			}
		}).then(function successCallback(response) {
			response = response.data;
			if (response.success == 1) {
				$rootScope.admin_data = response.profile;
			} else {
				$mdToast.show({
					template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
					hideDelay: 4000,
					position: 'bottom right'
				});
			}

		}, function errorCallback(response) {
		});
	}
	if ($rootScope.$storage.admin_id) {
		$rootScope.getAdminById();
	}

	$rootScope.filterObjInquiry = {};
	$rootScope.filterObjInquiry.date = {};
	$rootScope.filterObjInquiry.date.startDate = null;
	$rootScope.filterObjInquiry.date.endDate = null;

	$rootScope.date_show_all_inquiry = {};
	$rootScope.date_show_all_inquiry.start_date = "";
	$rootScope.date_show_all_inquiry.end_date = "";
	$rootScope.date_label = "All";

	$rootScope.options_date_all_inquiry = {
		applyClass: 'btn-green',

		locale: {
			applyLabel: "Apply",
			fromLabel: "From",
			format: "DD-MM-YYYY",
			toLabel: "To",
			cancelLabel: 'Cancel',
			customRangeLabel: 'Custom range',
			maxDate: $rootScope.MaxDate,
		},

		ranges: {
			'All': [31516200, moment().subtract('days').endOf('day')],
			'Today': [moment().subtract(0, 'days').startOf('day'), moment().subtract('days').endOf('day')],
			// 'Tomorrow': [moment().add(1, 'days').startOf('day'), moment().add(1, 'days').endOf('day')],
			'Yesterday': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
			'Last 7 Days': [moment().subtract(6, 'days'), moment()],
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],
			'This Month': [moment().startOf('month'), moment().endOf('month')],
			'Last Month': [moment().subtract(1, 'months').startOf('month'), moment().subtract(1, 'months').endOf('month')]
		},

		eventHandlers: {
			'apply.daterangepicker': function (ev, picker) {
				if (localStorage.getItem('date_label') == "Today") {
					$rootScope.date_label = "As On Today";
				} else {
					$rootScope.date_label = localStorage.getItem('date_label');
				}
				$rootScope.date_show_all_inquiry.start_date = $rootScope.filterObjInquiry.date.startDate ? moment($rootScope.filterObjInquiry.date.startDate).format("DD MMM, YYYY") : "";
				$rootScope.date_show_all_inquiry.end_date = $rootScope.filterObjInquiry.date.endDate ? moment($rootScope.filterObjInquiry.date.endDate).format("DD MMM, YYYY") : "";
				if ($rootScope.date_show_all_inquiry.start_date && $rootScope.date_show_all_inquiry.end_date) {
					if ($rootScope.activePath != '/') {
						$rootScope.load_all_data();
					}
					$rootScope.load_all_inquires(0);
				}
			}
		}
	}

})

app.controller("dashbordController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {

	if ($rootScope.$storage.admin_id == null) {
		$location.path('/login/');
	}

	$scope.type_list = [];
	$scope.type_loading = false;
	$rootScope.load_inquiry_type = function () {
		if ($rootScope.$storage.admin_id) {
			$scope.type_loading = true;
			$http({
				method: 'POST',
				url: apiUrl + 'admin/inquiry_type/list',
				data: {
					from_app: true,
				}
			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {
					$scope.type_list = response.types;
				} else {
					$mdToast.show({
						template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
						hideDelay: 4000,
						position: 'bottom right'
					});
				}
				$scope.type_loading = false;

			}, function errorCallback(response) {
				$scope.type_loading = false;
			});
		}
	}
	$rootScope.load_inquiry_type();


	$scope.all_inquires_list = [];
	$scope.currentPage = 0;
	$scope.pagelimit = 10;
	$scope.totalRecords = 0;
	$scope.search_obj = {};
	$scope.search_obj = { "search_str": "" };
	$scope.isDataLoading = false;
	$scope.inquiry_type = "";
	$rootScope.load_all_inquires = function (page, type_get) {
		$scope.isDataLoading = true;

		if ($rootScope.$storage.admin_id) {

			var type = "";
			if(type_get) {
				type = type_get;
			} else {
				var type = "";
			}
			console.log(type_get);

			$http({
				method: 'POST',
				url: apiUrl + 'admin/inquiry/list',
				data: {
					from_app: true,
					page: page,
					type: type,
					limit: $scope.pagelimit,
					search: $scope.search_obj.search_str,
					from_date: $rootScope.date_label != "All" && $rootScope.filterObjInquiry.date.startDate ? moment($rootScope.filterObjInquiry.date.startDate).format("YYYY-MM-DD") : "",
					to_date: $rootScope.date_label != "All" && $rootScope.filterObjInquiry.date.endDate ? moment($rootScope.filterObjInquiry.date.endDate).format("YYYY-MM-DD") : "",
				},
				headers: {
					'Authorization': $rootScope.$storage.api_token
				},
			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {
					$scope.all_inquires_list = response.list;

					$scope.totalRecords = response.total_records;
					if ($scope.totalRecords > $scope.pagelimit) {
						$scope.currentPage = page + 1;
					}

				} else {
					$scope.all_inquires_list = [];
				}
				$scope.isDataLoading = false;
			}, function errorCallback(response) {
				$scope.isDataLoading = false;
			});
		}
	}
	$rootScope.load_all_inquires(0);

	$rootScope.open_contact_slide = false;
	$scope.slide_contact_detail = "";
	$scope.open_contact_detail = function (data) {
		$scope.slide_contact_detail = data;
		$rootScope.open_contact_slide = true;
	}

	$scope.close_contact_detail = function () {
		$rootScope.open_contact_slide = false;
		$scope.slide_contact_detail = "";
	}

})

app.controller("LoginController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {

	if ($rootScope.$storage.admin_id) {
		$location.path('/');
	}

	$scope.password_show_f = "password";
	$scope.password_show = function () {
		if ($scope.password_show_f == "password") {
			$scope.password_show_f = "text";
		} else {
			$scope.password_show_f = "password";
		}
	}

	$scope.validateLoginForm = {
		onkeyup: function (element) {
			this.element(element);
		},
		rules: {
			email_id: {
				required: true,
				email: true
			},
			password: {
				required: true
			}
		},
		messages: {
			email_id: {
				required: "Email address can not be blank.",
				email: "Enter a valid email address."
			},
			password: {
				required: "Password can not be blank."
			}
		}
	}


	$scope.admindata = {};
	$scope.loginResponse = {};
	$scope.isSubmitting = false;
	$scope.LoginText = "Login";
	$scope.admindata.remember_password = $rootScope.$storage.logged_in_admin_remember_password ? $rootScope.$storage.logged_in_admin_remember_password : false;
	if ($rootScope.$storage.logged_in_admin_remember_password) {
		$scope.admindata.email_id = $rootScope.$storage.logged_in_admin_user_name ? $rootScope.$storage.logged_in_admin_user_name : "";
		$scope.admindata.password = $rootScope.$storage.logged_in_admin_password ? $rootScope.fromBase64($rootScope.$storage.logged_in_admin_password) : "";
	}
	$scope.submitLogin = function (form) {
		if (form.validate()) {
			$scope.isSubmitting = true;
			$scope.loginResponse = {};
			$scope.admindata.from_app = true;
			$scope.LoginText = "Logging in...";

			$rootScope.$storage.logged_in_admin_remember_password = $scope.admindata.remember_password;
			$rootScope.$storage.logged_in_admin_user_name = $scope.admindata.email_id;
			$rootScope.$storage.logged_in_admin_password = $rootScope.toBase64($scope.admindata.password);

			$http({
				method: 'POST',
				url: apiUrl + 'admin/login',
				data: $scope.admindata
			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {
					$rootScope.$storage.admin_id = response.admin.admin_id;
					$location.path("/");
					$rootScope.getAdminById();
				}
				$mdToast.show({
					template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
					hideDelay: 2000,
					position: 'bottom right'
				});
				$scope.isSubmitting = false;
				$scope.LoginText = "Login";
				$scope.loginResponse.success = response.success;
				$scope.loginResponse.message = response.message;
			}, function errorCallback(response) {
			});
		}
	}

})

app.controller("productslistController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {

	if ($rootScope.$storage.admin_id == null) {
		$location.path('/login/');
	}

	$scope.productList = [];
	$scope.currentPage = 0;
	$scope.category_type = 'all';
	$scope.pagelimit = 10;
	$scope.totalRecords = 0;
	$scope.search_obj = {};
	$scope.search_obj = { "search_str": "" };
	$scope.isDataLoading = false;
	$rootScope.load_Products = function (page) {
		$scope.isDataLoading = true;
		if ($rootScope.$storage.admin_id) {

			var category = "";
			if ($scope.category_type != 'all') {
				category = $scope.category_type;
			}

			$http({
				method: 'POST',
				url: apiUrl + 'admin/products/list',
				data: {
					from_app: true,
					page: page,
					limit: $scope.pagelimit,
					search: $scope.search_obj.search_str,
					cateory_id: category
				}
			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {
					$scope.productList = response.list;

					$scope.totalRecords = response.total_records;
					if ($scope.totalRecords > $scope.pagelimit) {
						$scope.currentPage = page + 1;
					}

				} else {
					$scope.productList = [];
				}
				$scope.isDataLoading = false;
			}, function errorCallback(response) {
				$scope.isDataLoading = false;
			});
		}
	}
	$rootScope.load_Products(0);

	$scope.categories_list = [];
	$scope.load_categories = function (page) {
		$scope.isDataLoading = true;
		if ($rootScope.$storage.admin_id) {

			$http({
				method: 'POST',
				url: apiUrl + 'admin/category/list',
				data: {
					from_app: true,
				},
				headers: {
					'Authorization': $rootScope.$storage.api_token
				},
			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {
					$scope.categories_list = response.list;

				} else {
					$scope.categories_list = [];
				}
				$scope.isDataLoading = false;
			}, function errorCallback(response) {
				$scope.isDataLoading = false;
			});
		}
	}
	$scope.load_categories(0);

	// $scope.set_proj_seq = [];
	// $scope.issequence_loading = false;
	// $scope.callSorting = function () {

	// 	if (!$scope.issequence_loading) {

	// 		$scope.issequence_loading = true;
	// 		$scope.projectList;

	// 		angular.forEach($scope.projectList, function (val, key) {
	// 			var obj = {
	// 				project_id : val.project_id,
	// 				sort_id: val.index
	// 				// sort : key + 1
	// 			}
	// 			$scope.set_proj_seq.push(obj);
	// 		});

	// 		$http({
	// 			method: 'POST',
	// 			url: apiUrl + 'admin/projects/project_sequence_set',
	// 			data: {
	// 				from_app: true,
	// 				sequence: $scope.set_proj_seq,
	// 			}
	// 		}).then(function successCallback(response) {

	// 			response = response.data;
	// 			$scope.set_proj_seq = [];

	// 			$mdToast.show({
	// 				template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
	// 				hideDelay: 2000,
	// 				position: 'bottom right'
	// 			});
	// 			$scope.issequence_loading = false;
	// 		}, function errorCallback(response) {
	// 			$scope.issequence_loading = false;
	// 		});
	// 	}
	// }

})

app.controller("productsController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {

	if ($rootScope.$storage.admin_id == null) {
		$location.path('/login/');
	}

	$scope.product_id = "";
	if ($routeParams.product_id) {
		$scope.product_id = $rootScope.fromBase64($routeParams.product_id);
	}

	$scope.options_description = {
		removeButtons: 'Print,Preview,NewPage,Save,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,SelectAll,Scayt,Checkbox,TextField,Textarea,Radio,Form,Select,Button,HiddenField,Replace,CopyFormatting,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,About,FontSize,Undo,Redo,Subscript,Superscript,RemoveFormat,Insert/RemoveNumberedList,Insert/RemoveBulletedList,AlignLeft,Center,Align Right,Justify,Image,FormattingStyles,FontName,ShowBlocks,Strikethrough,ImageButton,Underline,Unlink,ParagraphFormat,TextColor,BackgroundColor,Show Blocks,ImageButton,Italic,Strikethrough,Insert/Remove Numbered List,Insert/Remove Bulleted List,Align Left,Center,Align Right,Justify,Formatting Styles,Paragraph Format,Background Color',
		allowedContent: true,
	};

	$scope.product_obj = {};
	$scope.product_obj.features_array = [];
	$scope.product_obj_videos = {};
	$scope.product_obj.videos_array = [];
	$scope.isLoading = false;
	$scope.product_get = function () {
		$scope.isLoading = true;
		$http({
			method: 'POST',
			url: apiUrl + 'admin/products/detail',
			data: {
				from_app: true,
				product_id: $scope.product_id,
			}
		}).then(function successCallback(response) {
			response = response.data;
			if (response.success == 1) {
				$scope.product_obj = response.data;
				// console.log($scope.product_obj);
			} else {
				$scope.product_obj = {};
			}
			$scope.isLoading = false;
		}, function errorCallback(response) {
			$scope.isLoading = false;
		});
	}
	if ($scope.product_id) {
		$scope.product_get();
	}


	$scope.categories_list = [];
	$scope.load_categories = function (page) {
		$scope.isDataLoading = true;
		if ($rootScope.$storage.admin_id) {

			$http({
				method: 'POST',
				url: apiUrl + 'admin/category/list',
				data: {
					from_app: true,
				},
				headers: {
					'Authorization': $rootScope.$storage.api_token
				},
			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {
					$scope.categories_list = response.list;

				} else {
					$scope.categories_list = [];
				}
				$scope.isDataLoading = false;
			}, function errorCallback(response) {
				$scope.isDataLoading = false;
			});
		}
	}
	$scope.load_categories(0);



	$scope.product_sequence_get = function () {
		$scope.isLoading = true;
		$http({
			method: 'POST',
			url: apiUrl + 'admin/products/product_sequence_get',
			data: {
				from_app: true,
			}
		}).then(function successCallback(response) {
			response = response.data;
			if (response.success == 1) {
				$scope.product_obj.sort_id = response.sort_id;
			}
			$scope.isLoading = false;
		}, function errorCallback(response) {
			$scope.isLoading = false;
		});
	}
	if ($rootScope.activePath == '/products/add') {
		$scope.product_sequence_get();
	}


	$scope.product_validate = {
		rules: {
			product_name: {
				required: true,
			},
			category_id: {
				required: true,
			},
		},
		messages: {
			product_name: {
				required: "Product name can not be blank.",
			},
			category_id: {
				required: "Category can not be blank.",
			},
		}
	}

	$scope.add_features = function () {
		var Obj = {
			'name': "",
			'tag_line': ""
		};
		if (!$scope.product_obj.features_array) {
			$scope.product_obj.features_array = [];
		}
		$scope.product_obj.features_array.push(Obj);
	}

	$scope.remove_all_features = function () {
		$scope.product_obj.features_array = [];
	}

	$scope.add_videos = function (video) {
		var obj = {
			"text": video
		}
		$scope.product_obj.videos_array.push(obj);
		console.log($scope.product_obj.videos_array);
		$scope.product_obj_videos.value = "";
	}

	$scope.remove_all_videos = function () {
		$scope.product_obj.videos_array = [];
	}


	// gallery
	$scope.add_gallery = function (images) {
		if (!$scope.product_obj.gallery_array_show || $scope.product_obj.gallery_array_show == undefined) {
			$scope.product_obj.gallery_array_show = [];
		}

		if (images.length > 0) {

			var size = images[0].size;

			$scope.imageGallery_2mb_get = 0;
			angular.forEach(images, function (image, key) {
				if (image) {
					var size = image.size
					if (size < 2000000) {
						$scope.product_obj.gallery_array_show.push(image);
					} else {
						$scope.imageGallery_2mb_get = 1;
					}
				}
			});
			if ($scope.imageGallery_2mb_get == 1) {
				$scope.imageGallery_2mb_get = 0;
				swal({
					text: "Whoops! You can upload image size upto 2MB",
					icon: 'warning',
					cancelButton: true,
				})
			}
		}
	}
	$scope.remove_post_gallery_image = function (index) {
		$scope.product_obj.gallery_array_show.splice(index, 1);
	}


	// layout
	$scope.add_layout = function (images) {
		if (!$scope.product_obj.layout_array_show || $scope.product_obj.layout_array_show == undefined) {
			$scope.product_obj.layout_array_show = [];
		}

		if (images.length > 0) {

			var size = images[0].size;

			$scope.imagelayout_5mb_get = 0;
			angular.forEach(images, function (image, key) {
				if (image) {
					var size = image.size
					if (size < 5000000) {
						$scope.product_obj.layout_array_show.push(image);
					} else {
						$scope.imagelayout_5mb_get = 1;
					}
				}
			});
			if ($scope.imagelayout_5mb_get == 1) {
				$scope.imagelayout_5mb_get = 0;
				swal({
					text: "Whoops! You can upload image size upto 5MB",
					icon: 'warning',
					cancelButton: true,
				})
			}
		}
	}
	$scope.remove_post_layout_image = function (index) {
		$scope.product_obj.layout_array_show.splice(index, 1);
	}



	// 
	$scope.isSubmitting = false;
	$scope.save_product = function (form) {
		if (form.validate() && !$scope.isSubmitting) {
			$scope.isSubmitting = true;

			var formdata = new FormData();

			angular.forEach($scope.product_obj, function (val, key) {
				if (key == "tags") {
					angular.forEach(val, function (val_2, key_2) {
						if (key_2 === "$$hashKey") {

						} else {
							formdata.append('tags[' + key_2 + ']', val_2["text"]);
						}
					})
				} else if (key == "gallery_array_show") {
					angular.forEach(val, function (val_2, key_2) {
						if (key_2 === "$$hashKey") {

						} else {
							formdata.append('gallery_array_show[' + key_2 + '][image]', val_2);
							formdata.append('gallery_array_show[' + key_2 + '][title]', val_2.title);
						}
					})
				} else if (key == "gallery_array") {
					angular.forEach(val, function (val_2, key_2) {
						angular.forEach(val_2, function (val_3, key_3) {
							if (key_2 === "$$hashKey") {

							} else {
								formdata.append('gallery_array[' + key_2 + '][' + key_3 + ']', val_3);
							}
						})
					})
				} else if (key == "layout_array_show") {
					angular.forEach(val, function (val_2, key_2) {
						if (key_2 === "$$hashKey") {

						} else {
							formdata.append('layout_array_show[' + key_2 + '][image]', val_2);
						}
					})
				} else if (key == "layout_array") {
					angular.forEach(val, function (val_2, key_2) {
						angular.forEach(val_2, function (val_3, key_3) {
							if (key_2 === "$$hashKey") {

							} else {
								formdata.append('layout_array[' + key_2 + '][' + key_3 + ']', val_3);
							}
						})
					})
				} else if (key == "features_array") {
					angular.forEach(val, function (val_2, key_2) {
						angular.forEach(val_2, function (val_3, key_3) {
							if (key_2 === "$$hashKey") {

							} else {
								formdata.append('features_array[' + key_2 + '][' + key_3 + ']', val_3);
							}
						})
					})
				} else if (key == "videos_array") {
					angular.forEach(val, function (val_2, key_2) {
						if (key_2 === "$$hashKey") {

						} else {
							formdata.append('videos_array[' + key_2 + '][text]', val_2["text"]);
						}
					})
				} else {
					formdata.append(key, val);
				}

			});

			$http({
				method: 'POST',
				url: apiUrl + 'admin/products/save',
				data: formdata,
				headers: {
					'Content-Type': undefined,
				}

			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {

					if (response.product_id) {
						$location.path("/products/seo/" + $rootScope.toBase64(response.product_id));
					}
					$scope.product_obj = {};
				}
				$mdToast.show({
					template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
					hideDelay: 2000,
					position: 'bottom right'
				});
				$scope.isSubmitting = false;
			}, function errorCallback(response) {
				$scope.isSubmitting = false;
			});
		}
	}


	$scope.delete_product = function (product_id) {
		swal({
			text: "Are you sure, You want to perform this operation?",
			type: 'warning',
			showCancelButton: true,
			cancelButtonColor: '#f44336',
			confirmButtonColor: '#e20612',
			confirmButtonText: 'Yes'
		}).then(function () {
			$http({
				method: 'POST',
				url: apiUrl + 'admin/products/remove',
				data: {
					product_id: product_id,
				}
			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {
					$mdToast.show({
						template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
						hideDelay: 2000,
						position: 'bottom right'
					});
					$location.path("/products");
				}
			}, function errorCallback(response) { });
		});
	}

})

app.controller("products_seoController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {

	if ($rootScope.$storage.admin_id == null) {
		$location.path('/login/');
	}

	if ($routeParams.product_id) {
		$scope.product_id = $rootScope.fromBase64($routeParams.product_id);
	}

	$scope.product_obj = {};
	$scope.isLoading = false;
	$scope.product_get = function () {
		$scope.isLoading = true;
		$http({
			method: 'POST',
			url: apiUrl + 'admin/products/list_product_seo',
			data: {
				from_app: true,
				product_id: $scope.product_id,
			}
		}).then(function successCallback(response) {
			response = response.data;
			if (response.success == 1) {
				$scope.product_obj = response.data;
			} else {
				$scope.product_obj = {};
			}
			$scope.isLoading = false;
		}, function errorCallback(response) {
			$scope.isLoading = false;
		});
	}
	if ($scope.product_id) {
		$scope.product_get();
	}

	// 
	$scope.isSubmitting = false;
	$scope.save_product_seo = function (form) {
		if (!$scope.isSubmitting) {
			$scope.isSubmitting = true;

			var formdata = new FormData();

			angular.forEach($scope.product_obj, function (val, key) {
				formdata.append(key, val);
			});

			$http({
				method: 'POST',
				url: apiUrl + 'admin/products/save_product_seo',
				data: formdata,
				headers: {
					'Content-Type': undefined,
				}
			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {

					$location.path("/products");
					$scope.product_obj = {};
				}
				$mdToast.show({
					template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
					hideDelay: 2000,
					position: 'bottom right'
				});
				$scope.isSubmitting = false;
			}, function errorCallback(response) {
				$scope.isSubmitting = false;
			});
		}
	}

	$scope.delete_product = function (product_id) {
		swal({
			text: "Are you sure, You want to perform this operation?",
			type: 'warning',
			showCancelButton: true,
			cancelButtonColor: '#f44336',
			confirmButtonColor: '#e20612',
			confirmButtonText: 'Yes'
		}).then(function () {
			$http({
				method: 'POST',
				url: apiUrl + 'admin/products/remove',
				data: {
					product_id: product_id,
				}
			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {
					$mdToast.show({
						template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
						hideDelay: 2000,
						position: 'bottom right'
					});
					$location.path("/products");
				}
			}, function errorCallback(response) { });
		});
	}
})

app.controller("applicationslistController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {

	if ($rootScope.$storage.admin_id == null) {
		$location.path('/login/');
	}

	$scope.applicationList = [];
	$scope.currentPage = 0;
	$scope.pagelimit = 10;
	$scope.totalRecords = 0;
	$scope.search_obj = {};
	$scope.search_obj = { "search_str": "" };
	$scope.isDataLoading = false;
	$rootScope.load_Application = function (page) {
		$scope.isDataLoading = true;
		if ($rootScope.$storage.admin_id) {

			$http({
				method: 'POST',
				url: apiUrl + 'admin/applications/list',
				data: {
					from_app: true,
					page: page,
					limit: $scope.pagelimit,
					search: $scope.search_obj.search_str,
				}
			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {
					$scope.applicationList = response.list;

					$scope.totalRecords = response.total_records;
					if ($scope.totalRecords > $scope.pagelimit) {
						$scope.currentPage = page + 1;
					}

				} else {
					$scope.applicationList = [];
				}
				$scope.isDataLoading = false;
			}, function errorCallback(response) {
				$scope.isDataLoading = false;
			});
		}
	}
	$rootScope.load_Application(0);

	$scope.delete_Application = function (application_id) {
		swal({
			text: "Are you sure, You want to perform this operation?",
			type: 'warning',
			showCancelButton: true,
			cancelButtonColor: '#f44336',
			confirmButtonColor: '#e20612',
			confirmButtonText: 'Yes'
		}).then(function () {
			$http({
				method: 'POST',
				url: apiUrl + 'admin/applications/remove',
				data: {
					application_id: application_id,
				}
			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {
					$rootScope.load_Application(0);
				}
				$mdToast.show({
					template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
					hideDelay: 2000,
					position: 'bottom right'
				});
			}, function errorCallback(response) { });
		});
	}

})

app.controller("applicationsController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {

	if ($rootScope.$storage.admin_id == null) {
		$location.path('/login/');
	}

	$scope.application_id = "";
	if ($routeParams.application_id) {
		$scope.application_id = $rootScope.fromBase64($routeParams.application_id);
	}

	$scope.application_obj = {};
	$scope.application_obj_videos = {};
	$scope.application_obj.application_array = [];
	$scope.isLoading = false;
	$scope.project_get = function () {
		$scope.isLoading = true;
		$http({
			method: 'POST',
			url: apiUrl + 'admin/applications/detail',
			data: {
				from_app: true,
				application_id: $scope.application_id,
			}
		}).then(function successCallback(response) {
			response = response.data;
			if (response.success == 1) {
				$scope.application_obj = response.data;
				// console.log($scope.application_obj);
			} else {
				$scope.application_obj = {};
			}
			$scope.isLoading = false;
		}, function errorCallback(response) {
			$scope.isLoading = false;
		});
	}
	if ($rootScope.activePath != '/applications/add') {
		$scope.project_get();
	}


	$scope.application_validate = {
		rules: {
			name: {
				required: true,
			},
			category: {
				required: true,
			},
			intro: {
				required: true,
			},
			project_link: {
				required: true,
			}
		},
		messages: {
			name: {
				required: "Name can not be blank.",
			},
			category: {
				required: "Category can not be blank.",
			},
			intro: {
				required: "Introduction can not be blank.",
			},
			project_link: {
				required: "Project Link can not be blank.",
			},
		}
	}



	// gallery
	$scope.add_gallery = function (images) {
		if (!$scope.application_obj.gallery_array_show || $scope.application_obj.gallery_array_show == undefined) {
			$scope.application_obj.gallery_array_show = [];
		}

		if (images.length > 0) {

			var size = images[0].size;

			$scope.imageGallery_2mb_get = 0;
			angular.forEach(images, function (image, key) {
				if (image) {
					var size = image.size
					if (size < 2000000) {
						$scope.application_obj.gallery_array_show.push(image);
					} else {
						$scope.imageGallery_2mb_get = 1;
					}
				}
			});
			if ($scope.imageGallery_2mb_get == 1) {
				$scope.imageGallery_2mb_get = 0;
				swal({
					text: "Whoops! You can upload file size upto 2MB",
					icon: 'warning',
					cancelButton: true,
				})
			}
		}
	}

	$scope.remove_post_gallery_image = function (index) {
		$scope.application_obj.gallery_array_show.splice(index, 1);
	}

	$scope.add_new_application = function (video) {
		var obj = {
			"name": video
		}
		$scope.application_obj.application_array.push(obj);
		$scope.application_obj_videos.value = "";
	}

	$scope.remove_all_application = function () {
		$scope.application_obj.application_array = [];
	}


	// $scope.add_new_application = function () {
	// 	var Obj = {
	// 		'name': ""
	// 	};
	// 	if (!$scope.application_obj.application_array) {
	// 		$scope.application_obj.application_array = [];
	// 	}
	// 	$scope.application_obj.application_array.push(Obj);
	// }
	// if($scope.application_obj.application_array.length == 0) {
	// 	$scope.add_new_application();
	// }


	// 
	$scope.isSubmitting = false;
	$scope.save_application = function (form) {
		if (form.validate() && !$scope.isSubmitting) {
			$scope.isSubmitting = true;

			var formdata = new FormData();

			angular.forEach($scope.application_obj, function (val, key) {
				if (key == "gallery_array_show") {
					angular.forEach(val, function (val_2, key_2) {
						if (key_2 === "$$hashKey") {

						} else {
							formdata.append('gallery_array_show[' + key_2 + '][image]', val_2);
						}
					})
				} else if (key == "gallery_array") {
					angular.forEach(val, function (val_2, key_2) {
						angular.forEach(val_2, function (val_3, key_3) {
							if (key_2 === "$$hashKey") {

							} else {
								formdata.append('gallery_array[' + key_2 + '][' + key_3 + ']', val_3);
							}
						})
					})
				} else if (key == "application_array") {
					angular.forEach(val, function (val_2, key_2) {
						angular.forEach(val_2, function (val_3, key_3) {
							if (key_2 === "$$hashKey") {

							} else {
								formdata.append('application_array[' + key_2 + '][' + key_3 + ']', val_3);
							}
						})
					})
				} else {
					formdata.append(key, val);
				}

			});

			$http({
				method: 'POST',
				url: apiUrl + 'admin/applications/save',
				data: formdata,
				headers: {
					'Content-Type': undefined,
				}

			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {

					if (response.application_id) {
						$location.path("/applications");
					}
					$scope.application_obj = {};
				}
				$mdToast.show({
					template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
					hideDelay: 2000,
					position: 'bottom right'
				});
				$scope.isSubmitting = false;
			}, function errorCallback(response) {
				$scope.isSubmitting = false;
			});
		}
	}




})

app.controller("blogslistController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {

	if ($rootScope.$storage.admin_id == null) {
		$location.path('/login/');
	}

	$scope.blogList = [];
	$scope.currentPage = 0;
	$scope.pagelimit = 10;
	$scope.totalRecords = 0;
	$scope.search_obj = {};
	$scope.search_obj = { "search_str": "" };
	$scope.isDataLoading = false;
	$rootScope.load_Blogs = function (page) {
		$scope.isDataLoading = true;

		if ($rootScope.$storage.admin_id) {

			$http({
				method: 'POST',
				url: apiUrl + 'admin/blogs/list',
				data: {
					from_app: true,
					page: page,
					limit: $scope.pagelimit,
					search: $scope.search_obj.search_str,
				},

			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {
					$scope.blogList = response.list;

					$scope.totalRecords = response.total_records;
					if ($scope.totalRecords > $scope.pagelimit) {
						$scope.currentPage = page + 1;
					}

				} else {
					$scope.blogList = [];
				}
				$scope.isDataLoading = false;
			}, function errorCallback(response) {
				$scope.isDataLoading = false;
			});
		}
	}
	$rootScope.load_Blogs(0);

})

app.controller("blogsController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {

	if ($rootScope.$storage.admin_id == null) {
		$location.path('/login/');
	}

	$scope.blog_id = "";
	if ($routeParams.blog_id) {
		$scope.blog_id = $rootScope.fromBase64($routeParams.blog_id);
	}

	$scope.options_description = {
		removeButtons: 'Print,Preview,NewPage,Save,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,SelectAll,Scayt,Checkbox,TextField,Textarea,Radio,Form,Select,Button,HiddenField,Replace,CopyFormatting,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Maximize,About,Source,Undo,Redo,Subscript,Superscript,RemoveFormat,Insert/RemoveumberedList,Insert/RemoveBulletedList,AlignLeft,Center,Align Right,Justify,Image,FormattingStyles,FontName,ShowBlocks,Italic,Strikethrough',
		/*ImageButton*/
		allowedContent: true,
		filebrowserUploadUrl: apiUrl + 'admin/blog_image_upload',
	};


	$scope.blog_obj = {};
	$scope.blog_obj.is_active = "1";
	$scope.isLoading = false;
	$scope.blog_get = function () {
		$scope.isLoading = true;

		$http({
			method: 'POST',
			url: apiUrl + 'admin/blogs/blog_detail',
			data: {
				from_app: true,
				blog_id: $scope.blog_id,
			},

		}).then(function successCallback(response) {
			response = response.data;
			if (response.success == 1) {
				$scope.blog_obj = response.data;
				$scope.blog_obj.published_date = new Date($scope.blog_obj.published_date * 1000);

			} else {
				$scope.blog_obj = {};
			}
			$scope.isLoading = false;
		}, function errorCallback(response) {
			$scope.isLoading = false;
		});
	}
	if ($scope.blog_id) {
		$scope.blog_get();
	}


	$scope.blog_validate = {
		rules: {
			banner_title: {
				required: true,
			},
			title: {
				required: true,
			},
			published_date: {
				required: true,
			},
			description: {
				required: true,
			}
		},
		messages: {
			banner_title: {
				required: "Banner title can not be blank.",
			},
			title: {
				required: "Title can not be blank.",
			},
			published_date: {
				required: "Published date can not be blank.",
			},
			description: {
				required: "Description can not be blank.",
			}
		}
	}

	$scope.blog_obj.published_date = $rootScope.MaxDate;
	// $scope.on_blur_publishdate = function (value) {
	// 	if (value) {
	// 		$scope.blog_obj.published_date = moment(value).format("DD MMM, YYYY");
	// 	}
	// }

	// 
	$scope.isSubmitting = false;
	$scope.save_blog = function (form) {
		if (form.validate() && !$scope.isSubmitting) {
			$scope.isSubmitting = true;

			if (!$scope.blog_obj.published_date) {
				$scope.blog_obj.published_date = moment($scope.blog_obj.published_date).format('X');
			}

			var formdata = new FormData();

			angular.forEach($scope.blog_obj, function (val, key) {
				formdata.append(key, val);
			});

			$http({
				method: 'POST',
				url: apiUrl + 'admin/blogs/save',
				data: formdata,
				headers: {
					'Content-Type': undefined,
					'Authorization': $rootScope.$storage.api_token
				}
			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {

					if (response.blog_id) {
						$location.path("/blogs/seo/" + $rootScope.toBase64(response.blog_id));
					}

					$scope.blog_obj = {};
				}
				$mdToast.show({
					template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
					hideDelay: 2000,
					position: 'bottom right'
				});
				$scope.isSubmitting = false;
			}, function errorCallback(response) {
				$scope.isSubmitting = false;
			});
		}
	}



	$scope.delete_blog = function (blog_id) {
		swal({
			text: "Are you sure, You want to perform this operation?",
			type: 'warning',
			showCancelButton: true,
			cancelButtonColor: '#f44336',
			confirmButtonColor: '#e20612',
			confirmButtonText: 'Yes'
		}).then(function () {
			$http({
				method: 'POST',
				url: apiUrl + 'admin/blogs/delete',
				data: {
					blog_id: blog_id,
				},

			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {
					$mdToast.show({
						template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
						hideDelay: 2000,
						position: 'bottom right'
					});
					$location.path("/blogs");
				}
			}, function errorCallback(response) { });
		});
	}

})

app.controller("blogs_seoController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {

	if ($rootScope.$storage.admin_id == null) {
		$location.path('/login/');
	}

	$scope.blog_id = "";
	if ($routeParams.blog_id) {
		$scope.blog_id = $rootScope.fromBase64($routeParams.blog_id);
	}


	$scope.blog_seo_obj = {};
	$scope.isLoading = false;
	$scope.blog_get = function () {
		$scope.isLoading = true;
		$http({
			method: 'POST',
			url: apiUrl + 'admin/blogs/list_blog_seo',
			data: {
				from_app: true,
				blog_id: $scope.blog_id,
			},

		}).then(function successCallback(response) {
			response = response.data;
			if (response.success == 1) {
				$scope.blog_seo_obj = response.data;
			} else {
				$scope.blog_seo_obj = {};
			}
			$scope.isLoading = false;
		}, function errorCallback(response) {
			$scope.isLoading = false;
		});
	}
	$scope.blog_get();


	// 
	$scope.isSubmitting = false;
	$scope.save_blog_seo = function (form) {
		if (!$scope.isSubmitting) {
			$scope.isSubmitting = true;

			var formdata = new FormData();

			angular.forEach($scope.blog_seo_obj, function (val, key) {
				formdata.append(key, val);
			});

			$http({
				method: 'POST',
				url: apiUrl + 'admin/blogs/save_blog_seo',
				data: formdata,
				headers: {
					'Content-Type': undefined,
				},

			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {

					$location.path("/blogs");
					$scope.blog_seo_obj = {};
				}
				$mdToast.show({
					template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
					hideDelay: 2000,
					position: 'bottom right'
				});
				$scope.isSubmitting = false;
			}, function errorCallback(response) {
				$scope.isSubmitting = false;
			});
		}
	}


	$scope.delete_blog = function (blog_id) {
		swal({
			text: "Are you sure, You want to perform this operation?",
			type: 'warning',
			showCancelButton: true,
			cancelButtonColor: '#f44336',
			confirmButtonColor: '#e20612',
			confirmButtonText: 'Yes'
		}).then(function () {
			$http({
				method: 'POST',
				url: apiUrl + 'admin/blogs/delete',
				data: {
					blog_id: blog_id,
				},

			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {
					$mdToast.show({
						template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
						hideDelay: 2000,
						position: 'bottom right'
					});
					$location.path("/blogs");
				}
			}, function errorCallback(response) { });
		});
	}
})

app.controller("careerController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {

	if ($rootScope.$storage.admin_id == null) {
		$location.path('/login/');
	}

	$scope.career_list = [];
	$scope.currentPage = 0;
	$scope.pagelimit = 10;
	$scope.totalRecords = 0;
	$scope.search_obj = {};
	$scope.search_obj = { "search_str": "" };
	$scope.isLoading = false;
	$scope.load_career = function (page) {
		$scope.isLoading = true;
		$http({
			method: 'POST',
			url: apiUrl + 'admin/career/inquiry_list',
			data: {
				from_app: true,
				type: "career",
				page: page,
				limit: $scope.pagelimit,
				search: $scope.search_obj.search_str,
				from_date: $rootScope.date_label != "All" && $rootScope.filterObjInquiry.date.startDate ? moment($rootScope.filterObjInquiry.date.startDate).format("YYYY-MM-DD") : "",
				to_date: $rootScope.date_label != "All" && $rootScope.filterObjInquiry.date.endDate ? moment($rootScope.filterObjInquiry.date.endDate).format("YYYY-MM-DD") : "",
			},
			headers: {
				'Authorization': $rootScope.$storage.api_token
			},
		}).then(function successCallback(response) {
			response = response.data;
			if (response.success == 1) {
				$scope.career_list = response.list;

				$scope.totalRecords = response.total_records;
				if ($scope.totalRecords > $scope.pagelimit) {
					$scope.currentPage = page + 1;
				}

			} else {
				$scope.career_list = [];
			}
			$scope.isLoading = false;
		}, function errorCallback(response) {
			$scope.isLoading = false;
		});
	}
	$scope.load_career(0);

	$rootScope.load_all_data = function () {
		$scope.load_career(0);
	}

	$rootScope.open_contact_slide = false;
	$scope.slide_contact_detail = "";
	$scope.open_contact_detail = function (data) {
		$scope.slide_contact_detail = data;
		$rootScope.open_contact_slide = true;
	}

	$scope.close_contact_detail = function () {
		$rootScope.open_contact_slide = false;
		$scope.slide_contact_detail = "";
	}

})

app.controller("careerlistController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {

	if ($rootScope.$storage.admin_id == null) {
		$location.path('/login/');
	}

	$scope.job_list = [];
	$scope.currentPage = 0;
	$scope.pagelimit = 10;
	$scope.totalRecords = 0;
	$scope.search_obj = {};
	$scope.search_obj = { "search_str": "" };
	$scope.isLoading = false;
	$scope.load_jobs = function (page) {
		$scope.isLoading = true;
		$http({
			method: 'POST',
			url: apiUrl + 'admin/career/list',
			data: {
				from_app: true,
				page: page,
				limit: $scope.pagelimit,
				search: $scope.search_obj.search_str,
			},

		}).then(function successCallback(response) {
			response = response.data;
			if (response.success == 1) {
				$scope.job_list = response.career_list;

				$scope.totalRecords = response.total_records;
				if ($scope.totalRecords > $scope.pagelimit) {
					$scope.currentPage = page + 1;
				}

			} else {
				$scope.job_list = [];
			}
			$scope.isLoading = false;
		}, function errorCallback(response) {
			$scope.isLoading = false;
		});
	}
	$scope.load_jobs(0);

})

app.controller("career_detailController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {

	if ($rootScope.$storage.admin_id == null) {
		$location.path('/login/');
	}

	$scope.id = "";
	if ($routeParams.id) {
		$scope.id = $rootScope.fromBase64($routeParams.id);
	}

	$scope.options_description = {
		removeButtons: 'Print,Preview,NewPage,Save,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,SelectAll,Scayt,Checkbox,TextField,Textarea,Radio,Form,Select,Button,HiddenField,Replace,CopyFormatting,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,About,FontSize,Undo,Redo,Subscript,Superscript,RemoveFormat,Insert/RemoveNumberedList,Insert/RemoveBulletedList,AlignLeft,Center,Align Right,Justify,Image,FormattingStyles,FontName,ShowBlocks,Strikethrough,ImageButton,Underline,Unlink,ParagraphFormat,TextColor,BackgroundColor,Show Blocks,ImageButton,Source,Italic,Strikethrough,Insert/Remove Numbered List,Insert/Remove Bulleted List,Align Left,Center,Align Right,Justify,Formatting Styles,Paragraph Format,Background Color',
		allowedContent: true,
	};


	$scope.career_obj = {};
	$scope.isLoading = false;
	$scope.career_get = function () {
		$scope.isLoading = true;

		$http({
			method: 'POST',
			url: apiUrl + 'admin/career/career_detail',
			data: {
				from_app: true,
				id: $scope.id,
			},

		}).then(function successCallback(response) {
			response = response.data;
			if (response.success == 1) {
				$scope.career_obj = response.career_list;

			} else {
				$scope.career_obj = {};
			}
			$scope.isLoading = false;
		}, function errorCallback(response) {
			$scope.isLoading = false;
		});
	}
	if ($scope.id) {
		$scope.career_get();
	}

	$scope.career_validate = {
		rules: {
			position: {
				required: true,
			},
			position_require: {
				required: true,
			},
			exp_years: {
				required: true,
			},
			description: {
				required: true,
			}
		},
		messages: {
			position: {
				required: "Position can not be blank.",
			},
			position_require: {
				required: "Position require can not be blank.",
			},
			exp_years: {
				required: "Experience years can not be blank.",
			},
			description: {
				required: "Job Description can not be blank.",
			}
		}
	}

	// 
	$scope.isSubmitting = false;
	$scope.save_career = function (form) {
		if (form.validate() && !$scope.isSubmitting) {
			$scope.isSubmitting = true;

			$http({
				method: 'POST',
				url: apiUrl + 'admin/career/save',
				data: $scope.career_obj,
				headers: {
					'Authorization': $rootScope.$storage.api_token
				},
			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {

					if (response.id) {
						$location.path("/career_list");
					}

					$scope.career_obj = {};
				}
				$mdToast.show({
					template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
					hideDelay: 2000,
					position: 'bottom right'
				});
				$scope.isSubmitting = false;
			}, function errorCallback(response) {
				$scope.isSubmitting = false;
			});
		}
	}



	$scope.delete_job = function (id) {
		swal({
			text: "Are you sure, You want to perform this operation?",
			type: 'warning',
			showCancelButton: true,
			cancelButtonColor: '#f44336',
			confirmButtonColor: '#e20612',
			confirmButtonText: 'Yes'

		}).then(function () {
			$http({
				method: 'POST',
				url: apiUrl + 'admin/career/delete',
				data: {
					id: id,
				},

			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {
					$mdToast.show({
						template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
						hideDelay: 2000,
						position: 'bottom right'
					});
					$location.path("/career_list");
				}
			}, function errorCallback(response) { });
		});
	}

})

app.controller("contactController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {

	if ($rootScope.$storage.admin_id == null) {
		$location.path('/login/');
	}

	$scope.contactList = [];
	$scope.currentPage = 0;
	$scope.pagelimit = 10;
	$scope.totalRecords = 0;
	$scope.search_obj = {};
	$scope.search_obj = { "search_str": "" };
	$scope.isDataLoading = false;
	$scope.load_contact = function (page) {
		$scope.isDataLoading = true;
		if ($rootScope.$storage.admin_id) {

			$http({
				method: 'POST',
				url: apiUrl + 'admin/inquiry/list',
				data: {
					from_app: true,
					type: "contact",
					page: page,
					limit: $scope.pagelimit,
					search: $scope.search_obj.search_str,
					from_date: $rootScope.date_label != "All" && $rootScope.filterObjInquiry.date.startDate ? moment($rootScope.filterObjInquiry.date.startDate).format("YYYY-MM-DD") : "",
					to_date: $rootScope.date_label != "All" && $rootScope.filterObjInquiry.date.endDate ? moment($rootScope.filterObjInquiry.date.endDate).format("YYYY-MM-DD") : "",
				},
				headers: {
					'Authorization': $rootScope.$storage.api_token
				},
			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {
					$scope.contactList = response.list;

					$scope.totalRecords = response.total_records;
					if ($scope.totalRecords > $scope.pagelimit) {
						$scope.currentPage = page + 1;
					}

				} else {
					$scope.contactList = [];
				}
				$scope.isDataLoading = false;
			}, function errorCallback(response) {
				$scope.isDataLoading = false;
			});
		}
	}
	$scope.load_contact(0);

	$rootScope.load_all_data = function () {
		$scope.load_contact(0);
	}


	$rootScope.open_contact_slide = false;
	$scope.slide_contact_detail = "";
	$scope.open_contact_detail = function (data) {
		$scope.slide_contact_detail = data;
		$rootScope.open_contact_slide = true;
	}

	$scope.close_contact_detail = function () {
		$rootScope.open_contact_slide = false;
		$scope.slide_contact_detail = "";
	}


})

app.controller("feedbackController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {

	if ($rootScope.$storage.admin_id == null) {
		$location.path('/login/');
	}

	$scope.feedback_list = [];
	$scope.currentPage = 0;
	$scope.pagelimit = 10;
	$scope.totalRecords = 0;
	$scope.search_obj = {};
	$scope.search_obj = { "search_str": "" };
	$scope.isDataLoading = false;
	$scope.load_feedback = function (page) {
		$scope.isDataLoading = true;
		if ($rootScope.$storage.admin_id) {

			$http({
				method: 'POST',
				url: apiUrl + 'admin/feedback/list',
				data: {
					from_app: true,
					type: "contact",
					page: page,
					limit: $scope.pagelimit,
					search: $scope.search_obj.search_str,
					from_date: $rootScope.date_label != "All" && $rootScope.filterObjInquiry.date.startDate ? moment($rootScope.filterObjInquiry.date.startDate).format("YYYY-MM-DD") : "",
					to_date: $rootScope.date_label != "All" && $rootScope.filterObjInquiry.date.endDate ? moment($rootScope.filterObjInquiry.date.endDate).format("YYYY-MM-DD") : "",
				},
				headers: {
					'Authorization': $rootScope.$storage.api_token
				},
			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {
					$scope.feedback_list = response.list;

					$scope.totalRecords = response.total_records;
					if ($scope.totalRecords > $scope.pagelimit) {
						$scope.currentPage = page + 1;
					}

				} else {
					$scope.feedback_list = [];
				}
				$scope.isDataLoading = false;
			}, function errorCallback(response) {
				$scope.isDataLoading = false;
			});
		}
	}
	$scope.load_feedback(0);

	$rootScope.load_all_data = function () {
		$scope.load_feedback(0);
	}


	$rootScope.open_contact_slide = false;
	$scope.slide_contact_detail = "";
	$scope.open_contact_detail = function (data) {
		$scope.slide_contact_detail = data;
		$rootScope.open_contact_slide = true;
	}

	$scope.close_contact_detail = function () {
		$rootScope.open_contact_slide = false;
		$scope.slide_contact_detail = "";
	}


})

app.controller("subscribeController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {

	if ($rootScope.$storage.admin_id == null) {
		$location.path('/login/');
	}

	$scope.subscribe_list = [];
	$scope.currentPage = 0;
	$scope.pagelimit = 10;
	$scope.totalRecords = 0;
	$scope.search_obj = {};
	$scope.search_obj = { "search_str": "" };
	$scope.isDataLoading = false;
	$scope.load_subscribe = function (page) {
		$scope.isDataLoading = true;
		$http({
			method: 'POST',
			url: apiUrl + 'admin/subscribe/list',
			data: {
				from_app: true,
				page: page,
				limit: $scope.pagelimit,
				search: $scope.search_obj.search_str,
			},
			headers: {
				'Authorization': $rootScope.$storage.api_token
			},
		}).then(function successCallback(response) {
			response = response.data;
			if (response.success == 1) {
				$scope.subscribe_list = response.list;

				$scope.totalRecords = response.total_records;
				if ($scope.totalRecords > $scope.pagelimit) {
					$scope.currentPage = page + 1;
				}

			} else {
				$scope.subscribe_list = [];
			}
			$scope.isDataLoading = false;
		}, function errorCallback(response) {
			$scope.isDataLoading = false;
		});
	}
	$scope.load_subscribe();
})


app.controller("videolistController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {


	if ($rootScope.$storage.admin_id == null) {
		$location.path('/login/');
	}

	$scope.videos_list = [];
	$scope.currentPage = 0;
	$scope.pagelimit = 10;
	$scope.totalRecords = 0;
	$scope.search_obj = {};
	$scope.search_obj = { "search_str": "" };
	$scope.isDataLoading = false;
	$scope.load_video = function (page) {
		$scope.isDataLoading = true;
		if ($rootScope.$storage.admin_id) {

			$http({
				method: 'POST',
				url: apiUrl + 'admin/manage_video/list',
				data: {
					from_app: true,
					page: page,
					limit: $scope.pagelimit,
					search: $scope.search_obj.search_str,
				},
				headers: {
					'Authorization': $rootScope.$storage.api_token
				},
			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {
					$scope.videos_list = response.list;

					$scope.totalRecords = response.total_records;
					if ($scope.totalRecords > $scope.pagelimit) {
						$scope.currentPage = page + 1;
					}

				} else {
					$scope.videos_list = [];
				}
				$scope.isDataLoading = false;
			}, function errorCallback(response) {
				$scope.isDataLoading = false;
			});
		}
	}
	$scope.load_video(0);

	$scope.delete_video = function (id) {
		swal({
			text: "Are you sure, You want to perform this operation?",
			type: 'warning',
			showCancelButton: true,
			cancelButtonColor: '#f44336',
			confirmButtonColor: '#e20612',
			confirmButtonText: 'Yes'
		}).then(function () {

			$http({
				method: 'POST',
				url: apiUrl + 'admin/manage_video/remove',
				data: {
					id: id,
				}
			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {
					$scope.load_video(0);
					$mdToast.show({
						template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
						hideDelay: 2000,
						position: 'bottom right'
					});
				}
			}, function errorCallback(response) { });
		});
	}


})

app.controller("videoController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {

	if ($rootScope.$storage.admin_id == null) {
		$location.path('/login/');
	}

	$scope.id = "";
	if ($routeParams.id) {
		$scope.id = $rootScope.fromBase64($routeParams.id);
	}

	$scope.video_obj = {};
	$scope.isLoading = false;
	$scope.video_get = function () {
		$scope.isLoading = true;
		$http({
			method: 'POST',
			url: apiUrl + 'admin/manage_video/detail',
			data: {
				from_app: true,
				id: $scope.id,
			}
		}).then(function successCallback(response) {
			response = response.data;
			if (response.success == 1) {
				$scope.video_obj = response.data;
				console.log($scope.video_obj);
			} else {
				$scope.video_obj = {};
			}
			$scope.isLoading = false;
		}, function errorCallback(response) {
			$scope.isLoading = false;
		});
	}
	$scope.video_get();


	$scope.video_validate = {
		rules: {
			link: {
				required: true,
			}
		},
		messages: {
			link: {
				required: "Link can not be blank.",
			}
		}
	}


	// 
	$scope.isSubmitting = false;
	$scope.save_video = function (form) {

		if (form.validate() && !$scope.isSubmitting) {

			$scope.isSubmitting = true;

			$http({
				method: 'POST',
				url: apiUrl + 'admin/manage_video/save',
				data: $scope.video_obj,

			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {

					if (response.id) {
						$location.path("/videos");
					}
					$scope.video_obj = {};
				}
				$mdToast.show({
					template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
					hideDelay: 2000,
					position: 'bottom right'
				});
				$scope.isSubmitting = false;
			}, function errorCallback(response) {
				$scope.isSubmitting = false;
			});
		}
	}

})


app.controller("accessorieController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {

	if ($rootScope.$storage.admin_id == null) {
		$location.path('/login/');
	}

	$scope.accessories_obj = {};


	$scope.load_accessories = function () {
		$scope.isDataLoading = true;
		if ($rootScope.$storage.admin_id) {

			$http({
				method: 'POST',
				url: apiUrl + 'admin/accessories/list',
				data: {
					from_app: true,
				},
				headers: {
					'Authorization': $rootScope.$storage.api_token
				},
			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {

					$scope.accessories_obj = response.list;

				} else {
					$scope.accessories_obj = {};
				}
				$scope.isDataLoading = false;
			}, function errorCallback(response) {
				$scope.isDataLoading = false;
			});
		}
	}
	$scope.load_accessories();




	$scope.add_gallery = function (images) {
		if (!$scope.accessories_obj.accessories_array_show || $scope.accessories_obj.accessories_array_show == undefined) {
			$scope.accessories_obj.accessories_array_show = [];
		}

		if (images.length > 0) {

			var size = images[0].size;

			$scope.imageGallery_2mb_get = 0;
			angular.forEach(images, function (image, key) {
				if (image) {
					var size = image.size
					if (size < 2000000) {
						$scope.accessories_obj.accessories_array_show.push(image);
					} else {
						$scope.imageGallery_2mb_get = 1;
					}
				}
			});
			if ($scope.imageGallery_2mb_get == 1) {
				$scope.imageGallery_2mb_get = 0;
				swal({
					text: "Whoops! You can upload image size upto 2MB",
					icon: 'warning',
					cancelButton: true,
				})
			}
		}
	}
	$scope.remove_post_accessories_image = function (index) {
		$scope.accessories_obj.accessories_array_show.splice(index, 1);
	}

	$scope.remove_get_accessories_image = function (index) {
		if ($scope.accessories_obj.accessories_array.length == 1) {
			swal({
				text: "Are you sure, You want to perform this operation?",
				type: 'warning',
				showCancelButton: true,
				cancelButtonColor: '#f44336',
				confirmButtonColor: '#e20612',
				confirmButtonText: 'Yes'
			}).then(function () {
				$scope.accessories_obj.accessories_array.splice(index, 1);
				$scope.save_accessories();
			});
		} else {
			$scope.accessories_obj.accessories_array.splice(index, 1);
		}
	}


	$scope.video_validate = {
		rules: {
			link: {
				required: true,
			}
		},
		messages: {
			link: {
				required: "Link can not be blank.",
			}
		}
	}


	// 
	$scope.isSubmitting = false;
	$scope.save_accessories = function (form) {

		if (!$scope.isSubmitting) {

			$scope.isSubmitting = true;

			var formdata = new FormData();

			angular.forEach($scope.accessories_obj, function (val, key) {
				if (key == "accessories_array_show") {
					angular.forEach(val, function (val_2, key_2) {
						if (key_2 === "$$hashKey") {

						} else {
							formdata.append('accessories_array_show[' + key_2 + '][image]', val_2);
							formdata.append('accessories_array_show[' + key_2 + '][title]', val_2.title);
						}
					})
				} else if (key == "accessories_array") {
					angular.forEach(val, function (val_2, key_2) {
						angular.forEach(val_2, function (val_3, key_3) {
							if (key_2 === "$$hashKey") {

							} else {
								formdata.append('accessories_array[' + key_2 + '][' + key_3 + ']', val_3);
							}
						})
					})
				} else {
					formdata.append(key, val);
				}

			});

			$http({
				method: 'POST',
				url: apiUrl + 'admin/accessories/save',
				data: formdata,
				headers: {
					'Content-Type': undefined,
				}

			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {

					$scope.accessories_obj = {};
					$scope.load_accessories();
				}
				$mdToast.show({
					template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
					hideDelay: 2000,
					position: 'bottom right'
				});
				$scope.isSubmitting = false;
			}, function errorCallback(response) {
				$scope.isSubmitting = false;
			});
		}
	}

})

app.controller("profileController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {

	if ($rootScope.$storage.admin_id == null) {
		$location.path('/login/');
	}

	var admin_id = "";
	if ($routeParams.admin_id) {
		admin_id = $rootScope.fromBase64($routeParams.admin_id)
	} else {
		admin_id = $rootScope.$storage.admin_id
	}

	$scope.admin_obj = {};
	$scope.getAdminById = function () {

		$http({
			method: 'POST',
			url: apiUrl + 'admin/profile/detail',
			data: {
				from_app: true,
				admin_id: admin_id,
			}
		}).then(function successCallback(response) {
			response = response.data;
			if (response.success == 1) {
				$scope.admin_obj = response.profile;
			} else {
				$mdToast.show({
					template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
					hideDelay: 4000,
					position: 'bottom right'
				});
				$scope.bulk_operations = "";
			}

		}, function errorCallback(response) {
		});
	}
	if ($rootScope.activePath != '/profile/add') {
		$scope.getAdminById();
	}

	$scope.profile_validate = {
		rules: {
			name: {
				required: true,
			},
			user_name: {
				required: true,
			},
			email_id: {
				required: true,
				email: true
			},
			contact_no: {
				required: true,
			}
		},
		messages: {
			name: {
				required: "Name can not be blank.",
			},
			user_name: {
				required: "User Name can not be blank.",
			},
			email_id: {
				required: "Email can not be blank.",
			},
			contact_no: {
				required: "Contact no Link can not be blank.",
			},
		}
	}

	$scope.isSubmitting = false;
	$scope.save_profile = function (form) {
		if (form.validate() && !$scope.isSubmitting) {

			$scope.isSubmitting = true;
			$scope.admin_obj.from_app = true;
			$scope.admin_obj.password = $rootScope.fromBase64($rootScope.$storage.logged_in_admin_password);
			$scope.admin_obj.login_role = $rootScope.$storage.login_role;

			$scope.admin_obj.admin_id = $rootScope.$storage.admin_id;

			var formData = new FormData();
			angular.forEach($scope.admin_obj, function (val, key) {
				formData.append(key, val);
			});

			$http({
				method: 'POST',
				url: apiUrl + 'admin/profile/save',
				data: formData,
				headers: { 'Content-Type': undefined }
			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {
					$scope.admin_obj = {};
					$rootScope.getAdminById();
					$location.path("/");
				}
				$mdToast.show({
					template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
					hideDelay: 2000,
					position: 'bottom right'
				});
				$scope.isSubmitting = false;
			}, function errorCallback(response) {
				$scope.isSubmitting = false;
			});
		}
	}
})

app.controller("categorieslistController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {


	if ($rootScope.$storage.admin_id == null) {
		$location.path('/login/');
	}

	$scope.categories_list = [];
	$scope.currentPage = 0;
	$scope.pagelimit = 10;
	$scope.totalRecords = 0;
	$scope.search_obj = {};
	$scope.search_obj = { "search_str": "" };
	$scope.isDataLoading = false;
	$scope.load_categories = function (page) {
		$scope.isDataLoading = true;
		if ($rootScope.$storage.admin_id) {

			$http({
				method: 'POST',
				url: apiUrl + 'admin/category/list',
				data: {
					from_app: true,
					page: page,
					limit: $scope.pagelimit,
					search: $scope.search_obj.search_str,
				},
				headers: {
					'Authorization': $rootScope.$storage.api_token
				},
			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {
					$scope.categories_list = response.list;

					$scope.totalRecords = response.total_records;
					if ($scope.totalRecords > $scope.pagelimit) {
						$scope.currentPage = page + 1;
					}

				} else {
					$scope.categories_list = [];
				}
				$scope.isDataLoading = false;
			}, function errorCallback(response) {
				$scope.isDataLoading = false;
			});
		}
	}
	$scope.load_categories(0);

	$scope.delete_categories = function (category_id) {
		swal({
			text: "Are you sure, You want to perform this operation?",
			type: 'warning',
			showCancelButton: true,
			cancelButtonColor: '#f44336',
			confirmButtonColor: '#e20612',
			confirmButtonText: 'Yes'
		}).then(function () {

			$http({
				method: 'POST',
				url: apiUrl + 'admin/category/remove',
				data: {
					category_id: category_id,
				}
			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {
					$scope.load_categories(0);
					$mdToast.show({
						template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
						hideDelay: 2000,
						position: 'bottom right'
					});
				}
			}, function errorCallback(response) { });
		});
	}


})

app.controller("categoriesController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {

	if ($rootScope.$storage.admin_id == null) {
		$location.path('/login/');
	}

	$scope.category_id = "";
	if ($routeParams.category_id) {
		$scope.category_id = $rootScope.fromBase64($routeParams.category_id);
	}

	$scope.cat_obj = {};
	$scope.isLoading = false;
	$scope.cat_get = function () {
		$scope.isLoading = true;
		$http({
			method: 'POST',
			url: apiUrl + 'admin/category/detail',
			data: {
				from_app: true,
				category_id: $scope.category_id,
			}
		}).then(function successCallback(response) {
			response = response.data;
			if (response.success == 1) {
				$scope.cat_obj = response.data;
				console.log($scope.cat_obj);
			} else {
				$scope.cat_obj = {};
			}
			$scope.isLoading = false;
		}, function errorCallback(response) {
			$scope.isLoading = false;
		});
	}
	$scope.cat_get();


	$scope.categories_validate = {
		rules: {
			category_name: {
				required: true,
			}
		},
		messages: {
			category_name: {
				required: "category name can not be blank.",
			}
		}
	}


	// 
	$scope.isSubmitting = false;
	$scope.save_categories = function (form) {

		if (form.validate() && !$scope.isSubmitting) {

			$scope.isSubmitting = true;

			$http({
				method: 'POST',
				url: apiUrl + 'admin/category/save',
				data: $scope.cat_obj,

			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {

					if (response.category_id) {
						$location.path("/categories");
					}
					$scope.cat_obj = {};
				}
				$mdToast.show({
					template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
					hideDelay: 2000,
					position: 'bottom right'
				});
				$scope.isSubmitting = false;
			}, function errorCallback(response) {
				$scope.isSubmitting = false;
			});
		}
	}

})


app.controller("contact_pageController", function ($scope, $location, $rootScope, $timeout, $http, $localStorage, $routeParams, $window, $route, $base64, $timeout, $sce, $mdToast, $filter, $interval) {

	if ($rootScope.$storage.admin_id == null) {
		$location.path('/login/');
	}

	$scope.options_description = {
		removeButtons: 'Print,Preview,NewPage,Save,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,SelectAll,Scayt,Checkbox,TextField,Textarea,Radio,Form,Select,Button,HiddenField,Replace,CopyFormatting,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,About,FontSize,Undo,Redo,Subscript,Superscript,RemoveFormat,Insert/RemoveNumberedList,Insert/RemoveBulletedList,AlignLeft,Center,Align Right,Justify,Image,FormattingStyles,FontName,ShowBlocks,Strikethrough,ImageButton,Underline,Unlink,ParagraphFormat,TextColor,BackgroundColor,Show Blocks,ImageButton,Source,Italic,Strikethrough,Insert/Remove Numbered List,Insert/Remove Bulleted List,Align Left,Center,Align Right,Justify,Formatting Styles,Paragraph Format,Background Color',
		allowedContent: true,
	};

	$scope.contat_details = [];
	$scope.load_contact = function () {
		$scope.isDataLoading = true;
		if ($rootScope.$storage.admin_id) {

			$http({
				method: 'POST',
				url: apiUrl + 'admin/contact_details/list',
				data: {
					from_app: true,
				},
				headers: {
					'Authorization': $rootScope.$storage.api_token
				},
			}).then(function successCallback(response) {
				response = response.data;
				if (response.success == 1) {
					$scope.contat_details = response.list;

				} else {
					$scope.contat_details = [];
				}
				$scope.isDataLoading = false;
			}, function errorCallback(response) {
				$scope.isDataLoading = false;
			});
		}
	}
	$scope.load_contact();

	// 
	$scope.contact_detail = {};
	$scope.isSubmitting = false;
	$scope.save_contact = function (data) {

		$scope.isSubmitting = true;

		$scope.contact_detail.id = data.id;
		$scope.contact_detail.name = data.name;
		$scope.contact_detail.content = data.content;
		// console.log($scope.contact_detail);
		// return false;

		$http({
			method: 'POST',
			url: apiUrl + 'admin/contact_details/save',
			data: $scope.contact_detail,
			headers: {
				'Authorization': $rootScope.$storage.api_token
			},
		}).then(function successCallback(response) {
			response = response.data;
			if (response.success == 1) {

				$scope.load_contact();
				$scope.contact_detail = {};

			}
			$mdToast.show({
				template: '<md-toast class="md-toast error">' + response.message + '</md-toast>',
				hideDelay: 2000,
				position: 'bottom right'
			});
			$scope.isSubmitting = false;
		}, function errorCallback(response) {
			$scope.isSubmitting = false;
		});
	}

})