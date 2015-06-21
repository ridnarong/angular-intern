(function() {
  'use strict';
var leftData = [];
var rightData = [];
var myData = [];
var results = [];
angular.module('componentController')
  .controller("myDataContainer", ['Device','$mdSidenav', function(Device,$mdSidenav) {
    var _this = this;

      _this.found = true;
      _this.leftData  = [];
      _this.rightData = [];
      _this.mydata = [];
        
      
      _this.toggleList   = toggleUsersList;
      
      function toggleUsersList() {
            $mdSidenav('right').toggle();
        }
      
      function loadDevice () { 
          myData = Device.query();
          
          myData.$promise.then(function(data) {
              for(var i=0; i<data.length;i++){
                  _this.mydata.push(data[i]);
              }
          });
          _this.leftData = leftData;
        _this.rightData = rightData;
        }
      
      
      _this.prosearch = function(chek){
          _this.search = chek;
          if(chek == false){
            _this.found = false;
              _this.message = "";
              _this.results = [];
              _this.enteredValue = "";
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
      
      
      _this.findValue = function(){
          try {
          _this.results = [];
          
         // var separate;
          var res = _this.enteredValue.split("/");
              
          if(res.length == 2){
              
              if(_this.enteredValue != null){

                      if(_this.enteredValue.length > 2){
                          
                          if(isNumeric(res[0]) == true){
                          
                                    _this.mydata = myData;
                                      var total = 0;
                                      for(var i=0; i<_this.mydata.length;i++){
                                          var check = false;
                                          if(_this.mydata[i].name.match(res[0])){
                                              for(var j=0; j<_this.mydata[i].sensors.length;j++){
                                                  if(_this.mydata[i].sensors[j].name.match(res[1])){
                                                      check = true;
                                                  }
                                              }
                                          }
                                          if(check == true){
                                                 total = total+1;
                                              }
                                      }
                                      if(total>=1){
                                              for(var i=0; i<_this.mydata.length;i++){
                                                  var ine = 0;
                                                  var check = false;
                                              if(_this.mydata[i].name.match(res[0])){
                                                  
                                                  for(var j=0; j<_this.mydata[i].sensors.length;j++){
                                                      if(_this.mydata[i].sensors[j].name.match(res[1])){
                                                          ine = i;
                                                          check = true;
                                                      }
                                                  }
                                              }
                                                  if(check == true){
                                                    _this.results.push(_this.mydata[ine]);
                                                }
                                          }
                                          _this.found = true;
                                          _this.message = "";
                                      }else{
                                          _this.found = false;
                                          _this.message = "Not Found3";
                                      }
                          }else{
                              
                              _this.mydata = myData;
                                      var total = 0;
                                      for(var i=0; i<_this.mydata.length;i++){
                                          var check = false;
                                          for(var j=0; j<_this.mydata[i].sensors.length;j++){
                                              if(_this.mydata[i].sensors[j].name.match(res[0])){
                                                  if(_this.mydata[i].name.match(res[1])){
                                                    check = true;
                                                  }
                                              }
                                          }
                                          if(check == true){
                                             total = total+1;
                                          }
                                      }
                                      if(total>=1){
                                              for(var i=0; i<_this.mydata.length;i++){
                                                  var ine = 0;
                                                  var check = false;
                                                    for(var j=0; j<_this.mydata[i].sensors.length;j++){
                                                      if(_this.mydata[i].sensors[j].name.match(res[0])){
                                                          if(_this.mydata[i].name.match(res[1])){
                                                          ine = i;
                                                          check = true;
                                                      }
                                                  }
                                              }
                                                  if(check == true){
                                                    _this.results.push(_this.mydata[ine]);
                                                }
                                          }
                                          _this.found = true;
                                          _this.message = "";
                                      }else{
                                          _this.found = false;
                                          _this.message = "Not Found19";
                                      }
                              
                          }
                              }else{
                                  _this.found = false;
                                  _this.message = "Minimum 3 digit";
                              }
                  }else{
                    _this.found = false;
                  }
          }else{
                      if(_this.enteredValue != null){

                      if(_this.enteredValue.length > 2){
                          if(isNumeric(_this.enteredValue) == false){
                              _this.mydata = myData;
                                var total = 0;
                              for(var i=0; i<_this.mydata.length;i++){
                                  var check = false;
                                  for(var j=0; j<_this.mydata[i].sensors.length;j++){
                                      if(_this.mydata[i].sensors[j].name.match(_this.enteredValue)){
                                          check = true;
                                      }
                                  }
                                  if(check == true){
                                     total = total+1;
                                  }
                              }
                              console.log(total);
                              if(total>=1){
                                      for(var i=0; i<_this.mydata.length;i++){
                                          var ine = 0;
                                          var check = false;
                                          for(var j=0; j<_this.mydata[i].sensors.length;j++){
                                              if(_this.mydata[i].sensors[j].name.match(_this.enteredValue)){
                                                  ine = i;
                                                  check = true;
                                              }
                                          }
                                          if(check == true){
                                             _this.results.push(_this.mydata[ine]);
                                          }
                                          
                                      }
                                  _this.found = true;
                                  _this.message = "";
                              }else{
                                  _this.found = false;
                                  _this.message = "Not Found1";
                              }
                          }else{
                              _this.mydata = myData;
                          var total = 0;
                              for(var i=0; i<_this.mydata.length;i++){
                                  if(_this.mydata[i].name.match(_this.enteredValue)){
                                      //_this.results.push(_this.mydata[i]);
                                      total = total+1;
                                  }
                              }
                              if(total>=1){
                                      for(var i=0; i<_this.mydata.length;i++){
                                      if(_this.mydata[i].name.match(_this.enteredValue)){
                                          _this.results.push(_this.mydata[i]);
                                          //console.log(_this.mydata[i].sensors[1].name);
                                      }
                                  }
                                  _this.found = true;
                                  _this.message = "";
                              }else{
                                  _this.found = false;
                                  _this.message = "Not Found2";
                              }
                          }

                      }else{
                          _this.found = false;
                          _this.message = "Minimum 3 digit";
                      }
                  }else{
                    _this.found = false;
                     // _this.message = "Search Box is empty";
                  }
          }
          
          
          
          results = _this.results;
          console.log(results);
}catch(err) {
    console.log(err.message);
}
        //  console.log(_this.mydata[6].sensors.length);
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
      
      _this.move = function(index, position){
          var key = "";
          if(position == "left"){
            _this.leftData.push(_this.results[index]);
              key = _this.results[index].name;
          }else{
            _this.rightData.push(_this.results[index]);
              key = _this.results[index].name;
          }
          del(key);
          _this.results.splice(index,1);
          
          _this.enteredValue = "";
          _this.findValue(null);
          _this.prosearch(false);
     }
      
      
    _this.deleteData = function(index, position){
        if(position == "left"){
            myData.push(_this.leftData[index]);
            results.push(_this.leftData[index]);
            _this.leftData.splice(index,1);
            
        }else{
            myData.push(_this.rightData[index]);
            results.push(_this.rightData[index]);
            _this.rightData.splice(index,1);
        }
     }
          loadDevice();

      
  }]);
})();