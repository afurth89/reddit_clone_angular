var app = angular.module("redditClone", ['angularMoment', 'ngAnimate']);

app.controller('MainController', function($scope) {
  $scope.view = {
    displayPostForm:false,
    predicate: '-votes',
    predicateDisplay: "Votes",
    reverseOrder: false,
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
        votes:1,
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
    // Convert string to lowercase, w/ non-letters removed
    str = $scope.searchQuery.text.toLowerCase().replace(/\W/g, "");
    // Iterate through postLog array
    for (var i=0; i < $scope.view.postLog.length; i++) {
        // Assume no match to start
        var match = false;
        // Iterate through each of the values in the object   
        for (var val in $scope.view.postLog[i]) {
            // Ensure only string values are being searched
            if (typeof $scope.view.postLog[i][val] === "string") {
                // Convert string to lowercase, w/ non-letters removed
                var textToSearch = $scope.view.postLog[i][val].toLowerCase().replace(/\W/g, "");
                // If search string is in post's content, 
                  // set match to true
                if (textToSearch.includes(str)) match = true;   
            }

        }
        // If match is true, display the post
        $scope.view.postLog[i].display = (!!match) ? true : false;
    }
  }
  $scope.sortBy = function(predicate, display) {
    $scope.view.predicate = predicate;
    $scope.view.predicateDisplay = display;
  }
  $scope.orderToggle = function() {
    $scope.view.reverseOrder = $scope.view.reverseOrder ? false : true;
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
    $scope.view.displayPostForm = false;
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