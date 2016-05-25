var app = angular.module("redditClone", []);

app.controller('MainController', function($scope) {
  $scope.view = {
    displayForm:false,
    postLog: [
      {
        title:"Hodor is the greatest",
        author:"George R.R. Martin",
        imgURL:"http://static.independent.co.uk/s3fs-public/styles/article_large/public/thumbnails/image/2016/05/24/08/hodor.jpg",
        description:"We LOVE YOU HODOR. We LOVE YOU HODOR. We LOVE YOU HODOR. We LOVE YOU HODOR. We LOVE YOU HODOR. We LOVE YOU HODOR. We LOVE YOU HODOR. We LOVE YOU HODOR. We LOVE YOU HODOR.",
        votes:0
      }, {
        title:"Ramsey is the worst",
        author:"George R.R. Martin",
        imgURL:"https://patricksponaugle.files.wordpress.com/2015/10/unarmoredramsay.jpg",
        description:"Seriously, screw Ramsey. He's gonna get what's coming to him. Seriously, screw Ramsey. He's gonna get what's coming to him. Seriously, screw Ramsey. He's gonna get what's coming to him.",
        votes:0
      }
    ]
  }
});

app.controller('newPostForm', function($rootScope, $scope) {
  $scope.formData = {};
  $scope.submitPost = function() {
    $scope.formData.votes = 0;
    $scope.view.postLog.push($scope.formData);
    $scope.formData = {};
    $scope.newPostForm.$setPristine();
  }
})

app.controller('postsDisplay', function($rootScope, $scope) {
  $scope.vote = function(val,title) {
    for (var i=0; i<$scope.view.postLog.length; i++) {
      // Find post obj by matching title
      if ($scope.view.postLog[i].title === title) {
        // Check is up vote or down vote
        if (val === 1) {
          $scope.view.postLog[i].votes++;
        } else {
          $scope.view.postLog[i].votes--;
        }
      }
    }
  }
});