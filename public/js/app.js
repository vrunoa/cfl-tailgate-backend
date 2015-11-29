var socket = io("http://localhost:3000");

angular.module("CFLTailgateApp", [])

.controller("PanelController", ['$scope', function($scope){
  $scope.launch = function(){
    socket.emit("launch");
    window.open("http://localhost:3000/challenge.html");
  }
  $scope.questions = [
    {"q": "How many teams are in the CFL?", a: [{"answer":6,"id":"Ux46LXCRC7"},{"answer":7,"id":"QBifKV318K"},{"answer":9,"id":"HNkwoDvgXY"},{"answer":13,"id":"8RZwXAvryk"}]},
    {q:"Which two teams played in the 100th Grey Cup?", a: [{"answer":"Winnipeg Blue Bombers & BC Lions","id":"47Jgj0x27V"},{"answer":"Toronto Argonauts & Calgary Stampeders","id":"8fJ7uXNbOx"},{"answer":"Hamilton Tiger-Cats & Saskatchewan Roughriders","id":"MjawCCuf7V"},{"answer":"Montreal Alouettes & Saskatchewan Roughriders","id":"jX4AuJVvxt"}]},
    {q:"How long is a CFL field (including the endzone)?", a: [{"answer":"150 yards","id":"96nZxkymCv"},{"answer":"100 yards","id":"pHcQ3Yl9fZ"},{"answer":"110 yards","id":"VT2pvhkX7o"},{"answer":"130 yards","id":"5Hq9zqVPyn"}]},
    {q:"Which CFL player holds the record for most touchdowns in his career?", a:[{"answer":"George Reed","id":"eSGvPdZAk7"},{"answer":"Geroy Simon","id":"77QyjhMaxp"},{"answer":"Allen Pitts","id":"XuF2JinrOu"},{"answer":"Milt Stegall","id":"OtWGkkVima"}]}
  ]
}])

.controller("ChallengeController", ['$scope', function($scope){
  
  $scope.state = "notavail";
  $scope.intervalId;
  $scope.interval;
  /*
  $scope.current =  {"q": "How many teams are in the CFL?", a: [{"answer":6,"id":"Ux46LXCRC7"},{"answer":7,"id":"QBifKV318K"},{"answer":9,"id":"HNkwoDvgXY"},{"answer":13,"id":"8RZwXAvryk"}]};
  $scope.a = {"answer":7,"id":"QBifKV318K"};
 
  */
  $scope.users = [
    {name:"KateOK",t:0.01}, 
    {name:"Willy", t:0.6}, 
    {name:"Pippa",t:0.4}
  ]

  socket.on("prepare", function(){
    $scope.$apply(function(){
      clearInterval($scope.intervalId);
      $scope.state = "prepare";
      $scope.interval = 3;
      $scope.intervalId = setInterval(function(){
        if($scope.interval == 0) {
          clearInterval($scope.intervalId);
          return;
        }
        $scope.$apply(function(){
          $scope.interval--;
        })
      }, 1000)
    });
  })
  
  socket.on("launch", function(){
    clearInterval($scope.intervalId);
    $scope.$apply(function(){
      $scope.state = "waiting";
      $scope.interval = 10;
      $scope.intervalId = setInterval(function(){
        if($scope.interval == 0) {
          clearInterval($scope.intervalId);
          return;
        }
        $scope.$apply(function(){
          $scope.interval--;
        })
      }, 1000)
    })
  })

  socket.on("show question", function(q){
    clearInterval($scope.intervalId);
    $scope.$apply(function(){
      $scope.current = q;
      $scope.state = "question";
      $scope.interval = 10;
      $scope.intervalId = setInterval(function(){
        if($scope.interval == 0) {
          clearInterval($scope.intervalId);
          return;
        }
        $scope.$apply(function(){
          $scope.interval--;
        })
      }, 1000)
    });
  })

  socket.on("finish question", function(r){
    clearInterval($scope.intervalId);
    $scope.$apply(function(){
      $scope.state = "results";
      $scope.a = {};
      for(var i=0;i<$scope.current.a.length;i++){
        var an = $scope.current.a[i];
        if(an.id = $scope.current.c) {
          $scope.a = an;
        }
      }
    });
  })

  socket.on("finish challenge", function(){
    clearInterval($scope.intervalId);
    console.log("finish challenge");
    $scope.$apply(function(){
      $scope.state = "finished"
    });
  })
}])
