var app = angular.module("redditClone", []);

app.controller('MainController', function($scope) {
  $scope.view = {
    displayForm:false,
    postLog: []
  }
});

app.controller('newPostForm', function($rootScope, $scope) {
  $scope.formData = {};
  $scope.submitPost = function() {
    $scope.view.postLog.push($scope.formData);
    $scope.formData = {};
  }
})

app.controller('postsDisplay', function($rootScope, $scope) {
  
});