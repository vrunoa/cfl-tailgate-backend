var socket = io("http://localhost:3000");

angular.module("CFLTailgateApp", [])

.controller("PanelController", ['$scope', function($scope){
  $scope.launch = function(){
    socket.emit("launch");
  }
  $scope.questions = [
    {"q": "How many teams are in the CFL?", a: [{"answer":6,"id":"Ux46LXCRC7"},{"answer":7,"id":"QBifKV318K"},{"answer":9,"id":"HNkwoDvgXY"},{"answer":13,"id":"8RZwXAvryk"}]},
    {q:"Which two teams played in the 100th Grey Cup?", a: [{"answer":"Winnipeg Blue Bombers & BC Lions","id":"47Jgj0x27V"},{"answer":"Toronto Argonauts & Calgary Stampeders","id":"8fJ7uXNbOx"},{"answer":"Hamilton Tiger-Cats & Saskatchewan Roughriders","id":"MjawCCuf7V"},{"answer":"Montreal Alouettes & Saskatchewan Roughriders","id":"jX4AuJVvxt"}]},
    {q:"How long is a CFL field (including the endzone)?", a: [{"answer":"150 yards","id":"96nZxkymCv"},{"answer":"100 yards","id":"pHcQ3Yl9fZ"},{"answer":"110 yards","id":"VT2pvhkX7o"},{"answer":"130 yards","id":"5Hq9zqVPyn"}]},
    {q:"Which CFL player holds the record for most touchdowns in his career?", a:[{"answer":"George Reed","id":"eSGvPdZAk7"},{"answer":"Geroy Simon","id":"77QyjhMaxp"},{"answer":"Allen Pitts","id":"XuF2JinrOu"},{"answer":"Milt Stegall","id":"OtWGkkVima"}]}
  ]
}])

.controller("ChallengeController", ['$scope', function($scope){
   
}])
