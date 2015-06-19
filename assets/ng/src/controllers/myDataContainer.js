(function() {
  'use strict';
var leftData = [];
var rightData = [];
var myData = [];
var results = [];
angular.module('componentController')
  .controller("myDataContainer", ['$scope', 'Device','$mdSidenav', function($scope, Device,$mdSidenav) {
    var _this = this;

      $scope.found = true;
      $scope.leftData  = [];
      $scope.rightData = [];
      $scope.mydata = [];
        
      
      $scope.toggleList   = toggleUsersList;
      
      function toggleUsersList() {
            $mdSidenav('right').toggle();
        }
      
      function loadDevice () { 
          myData = Device.query();
          
          myData.$promise.then(function(data) {
              for(var i=0; i<data.length;i++){
                  $scope.mydata.push(data[i]);
              }
          });
          $scope.leftData = leftData;
        $scope.rightData = rightData;
        }
      
      
      $scope.prosearch = function(chek){
          $scope.search = chek;
          if(chek == false){
            $scope.found = false;
              $scope.message = "";
              $scope.results = [];
              $scope.enteredValue = "";
          }
      }
      
      function isNumeric(n) {
  if(!isNaN(n))
    {
     return true
    }
  else
   {
    return false
   }
}
      
      
      $scope.findValue = function(){
          try {
          $scope.results = [];
          
         // var separate;
          var res = $scope.enteredValue.split("/");
              
          if(res.length == 2){
              
              if($scope.enteredValue != null){

                      if($scope.enteredValue.length > 2){
                          
                          if(isNumeric(res[0]) == true){
                          
                                    $scope.mydata = myData;
                                      var total = 0;
                                      for(var i=0; i<$scope.mydata.length;i++){
                                          var check = false;
                                          if($scope.mydata[i].name.match(res[0])){
                                              for(var j=0; j<$scope.mydata[i].sensors.length;j++){
                                                  if($scope.mydata[i].sensors[j].name.match(res[1])){
                                                      check = true;
                                                  }
                                              }
                                          }
                                          if(check == true){
                                                 total = total+1;
                                              }
                                      }
                                      if(total>=1){
                                              for(var i=0; i<$scope.mydata.length;i++){
                                                  var ine = 0;
                                                  var check = false;
                                              if($scope.mydata[i].name.match(res[0])){
                                                  
                                                  for(var j=0; j<$scope.mydata[i].sensors.length;j++){
                                                      if($scope.mydata[i].sensors[j].name.match(res[1])){
                                                          ine = i;
                                                          check = true;
                                                      }
                                                  }
                                              }
                                                  if(check == true){
                                                    $scope.results.push($scope.mydata[ine]);
                                                }
                                          }
                                          $scope.found = true;
                                          $scope.message = "";
                                      }else{
                                          $scope.found = false;
                                          $scope.message = "Not Found3";
                                      }
                          }else{
                              
                              $scope.mydata = myData;
                                      var total = 0;
                                      for(var i=0; i<$scope.mydata.length;i++){
                                          var check = false;
                                          for(var j=0; j<$scope.mydata[i].sensors.length;j++){
                                              if($scope.mydata[i].sensors[j].name.match(res[0])){
                                                  if($scope.mydata[i].name.match(res[1])){
                                                    check = true;
                                                  }
                                              }
                                          }
                                          if(check == true){
                                             total = total+1;
                                          }
                                      }
                                      if(total>=1){
                                              for(var i=0; i<$scope.mydata.length;i++){
                                                  var ine = 0;
                                                  var check = false;
                                                    for(var j=0; j<$scope.mydata[i].sensors.length;j++){
                                                      if($scope.mydata[i].sensors[j].name.match(res[0])){
                                                          if($scope.mydata[i].name.match(res[1])){
                                                          ine = i;
                                                          check = true;
                                                      }
                                                  }
                                              }
                                                  if(check == true){
                                                    $scope.results.push($scope.mydata[ine]);
                                                }
                                          }
                                          $scope.found = true;
                                          $scope.message = "";
                                      }else{
                                          $scope.found = false;
                                          $scope.message = "Not Found19";
                                      }
                              
                          }
                              }else{
                                  $scope.found = false;
                                  $scope.message = "Minimum 3 digit";
                              }
                  }else{
                    $scope.found = false;
                  }
          }else{
                      if($scope.enteredValue != null){

                      if($scope.enteredValue.length > 2){
                          if(isNumeric($scope.enteredValue) == false){
                              $scope.mydata = myData;
                                var total = 0;
                              for(var i=0; i<$scope.mydata.length;i++){
                                  var check = false;
                                  for(var j=0; j<$scope.mydata[i].sensors.length;j++){
                                      if($scope.mydata[i].sensors[j].name.match($scope.enteredValue)){
                                          check = true;
                                      }
                                  }
                                  if(check == true){
                                     total = total+1;
                                  }
                              }
                              console.log(total);
                              if(total>=1){
                                      for(var i=0; i<$scope.mydata.length;i++){
                                          var ine = 0;
                                          var check = false;
                                          for(var j=0; j<$scope.mydata[i].sensors.length;j++){
                                              if($scope.mydata[i].sensors[j].name.match($scope.enteredValue)){
                                                  ine = i;
                                                  check = true;
                                              }
                                          }
                                          if(check == true){
                                             $scope.results.push($scope.mydata[ine]);
                                          }
                                          
                                      }
                                  $scope.found = true;
                                  $scope.message = "";
                              }else{
                                  $scope.found = false;
                                  $scope.message = "Not Found1";
                              }
                          }else{
                              $scope.mydata = myData;
                          var total = 0;
                              for(var i=0; i<$scope.mydata.length;i++){
                                  if($scope.mydata[i].name.match($scope.enteredValue)){
                                      //$scope.results.push($scope.mydata[i]);
                                      total = total+1;
                                  }
                              }
                              if(total>=1){
                                      for(var i=0; i<$scope.mydata.length;i++){
                                      if($scope.mydata[i].name.match($scope.enteredValue)){
                                          $scope.results.push($scope.mydata[i]);
                                          //console.log($scope.mydata[i].sensors[1].name);
                                      }
                                  }
                                  $scope.found = true;
                                  $scope.message = "";
                              }else{
                                  $scope.found = false;
                                  $scope.message = "Not Found2";
                              }
                          }

                      }else{
                          $scope.found = false;
                          $scope.message = "Minimum 3 digit";
                      }
                  }else{
                    $scope.found = false;
                     // $scope.message = "Search Box is empty";
                  }
          }
          
          
          
          results = $scope.results;
          console.log(results);
}catch(err) {
    console.log(err.message);
}
        //  console.log($scope.mydata[6].sensors.length);
      }
       
      function del(key){
          var temp = [];
          for(var i=0; i<myData.length;i++){
              if(myData[i].name != key){
                //delindex = i;
                  temp.push(myData[i]);
              }
          }
          myData = temp;
      }
      
      $scope.move = function(index, position){
          var key = "";
          if(position == "left"){
            $scope.leftData.push($scope.results[index]);
              key = $scope.results[index].name;
          }else{
            $scope.rightData.push($scope.results[index]);
              key = $scope.results[index].name;
          }
          del(key);
          $scope.results.splice(index,1);
          
          $scope.enteredValue = "";
          $scope.findValue(null);
          $scope.prosearch(false);
     }
      
      
    $scope.deleteData = function(index, position){
        if(position == "left"){
            myData.push($scope.leftData[index]);
            results.push($scope.leftData[index]);
            $scope.leftData.splice(index,1);
            
        }else{
            myData.push($scope.rightData[index]);
            results.push($scope.rightData[index]);
            $scope.rightData.splice(index,1);
        }
     }
          loadDevice();

      
  }]);
})();