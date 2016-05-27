var app = angular.module("redditClone", ['angularMoment']);

app.controller('MainController', function($scope) {
  $scope.view = {
    displayPostForm:false,
    postLog: [
      {
        title:"Hodor is the greatest",
        author:"George R.R. Martin",
        imgURL:"http://static.independent.co.uk/s3fs-public/styles/article_large/public/thumbnails/image/2016/05/24/08/hodor.jpg",
        description:"We LOVE YOU HODOR. We LOVE YOU HODOR. We LOVE YOU HODOR. We LOVE YOU HODOR. We LOVE YOU HODOR. We LOVE YOU HODOR. We LOVE YOU HODOR. We LOVE YOU HODOR. We LOVE YOU HODOR.",
        votes:0,
        datePosted:Date.now(),
        comments: [
          {
            author: "John",
            text: "I agree!"
          }
        ],
        display: true
      }, {
        title:"Ramsey is the worst",
        author:"George R.R. Martin",
        imgURL:"https://patricksponaugle.files.wordpress.com/2015/10/unarmoredramsay.jpg",
        description:"Seriously, screw Ramsey. He's gonna get what's coming to him. Seriously, screw Ramsey. He's gonna get what's coming to him. Seriously, screw Ramsey. He's gonna get what's coming to him.",
        votes:0,
        datePosted:Date.now(),
        comments: [
          {
            author: "Tammy",
            text: "He's pretty cute though..."
          }
        ],
        display: true
      }
    ]
  }
});

app.controller('navBar', function($rootScope, $scope) {
  $scope.togglePostForm = function() {
    $scope.view.displayPostForm = $scope.view.displayPostForm === true ? false : true;
  }
  $scope.searchQuery = {}
  $scope.search = function() {
    // Iterate through the postLog

    // Check if the text from the searchQuery is included
      // in any of the values of the posts
    // If not, set it's display property to false
  }
})

app.controller('newPostForm', function($rootScope, $scope) {
  $scope.formData = {};
  $scope.submitPost = function() {
    $scope.formData.votes = 0;
    $scope.formData.datePosted = Date.now();
    $scope.formData.comments = [];
    $scope.formData.display = true;
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

app.controller('newCommentForm', function($rootScope, $scope) {
  $scope.newComment = {};
  $scope.displayCommentForm = false;
  $scope.displayComments = false;
  $scope.toggleCommentForm = function() {
    $scope.displayCommentForm = $scope.displayCommentForm === true ? false : true;
  }
  $scope.submitComment = function(post) {
    post.comments.push($scope.newComment);
    $scope.newCommentForm.$setPristine();
    $scope.displayCommentForm = false;
    $scope.displayComments = true;
  }
  $scope.toggleCommentsDisplay = function() {
    $scope.displayComments = $scope.displayComments === true ? false : true;
  }
})