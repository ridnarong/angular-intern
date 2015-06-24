(function() {
  'use strict';
var myData = [];
angular.module('componentController')
  .controller("myDataContainer", ['Device','$mdSidenav', function(Device,$mdSidenav) {
    var _this = this;
        
      
      _this.toggleList   = toggleUsersList;
      
      function toggleUsersList() {
            $mdSidenav('right').toggle();
        }
      
      
      
      
      /*_this.loadDevice = function() { 
        _this.myData = [];    
          myData = Device.query();
           myData.$promise.then(function(data) {
              for(var i=0; i<data.length;i++){
                  for(var j=0; j<data[i].sensors.length;j++){
                    data[i].sensors[j].position = 'null';
                  }
                  _this.myData.push(data[i]);
              }
          });
        }*/
      
      _this.loadDevice = function() { 
        _this.myData = [];    
          myData = Device.query();
           myData.$promise.then(function(data) {
              for(var i=0; i<data.length;i++){
                  for(var j=0; j<data[i].sensors.length;j++){
                    data[i].sensors[j].position = null;
                  }
                  _this.myData.push(data[i]);
              }
          });
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
      
      this.findValue = function() {
          _this.myData = myData;
    var blas = _this.enteredValue;
    var res = blas.split("/");
    if(isNumeric(res[0])){
    
        var searchStringContainDeviceName = false;
          _this.myData.forEach(function(device) {
              if(_this.enteredValue == ''){
                  device.match = null;
                    device.sensors.forEach(function(sensor) {
                                sensor.submatch = null;
                    });
              }else{
                  device.match = null;
                  _this.enteredValue.split("/").forEach(function(word) {
                      var rex = new RegExp(word,"i");
                      if(rex.test(device.name)) {
                        device.match = "matched";
                          searchStringContainDeviceName = true;
                          device.sensors.forEach(function(sensor) {
                                sensor.submatch =  null;
                                if (searchStringContainDeviceName) { 
                                    _this.enteredValue.split("/").forEach(function(word) {
                                      var rex = new RegExp(word,"i");
                                      if(rex.test(sensor.name) && sensor.position == null) {
                                        sensor.submatch = "matched";
                                      }
                                    });
                                }
                          });
                      }
                                                 
                    });
              }
              
          });
          
    }else{
        
        var searchStringContainDeviceName = false;
      _this.myData.forEach(function(device) {
          var searchStringContainsensorName = false;
        device.match = null; // Clear seach result in every key up
        _this.enteredValue.split("/").forEach(function(word) {
            console.log(word);
          var rex = new RegExp(word,"i");
          if(rex.test(device.name)) {
            device.match = "matched";
            searchStringContainDeviceName = true;
          }
        });

        device.sensors.forEach(function(sensor) {
          if(typeof sensor.submatch == "undefined" || sensor.submatch == null || sensor.submatch == "matched") { //Seach only not left or right
            sensor.submatch = null; // Clear seach result in every key up
            if (searchStringContainDeviceName) {
              if(device.match == "matched") {
                _this.enteredValue.split("/").forEach(function(word) {
                  var rex = new RegExp(word,"i");
                  if(rex.test(sensor.name)) {
                    sensor.submatch = "matched";
                  } 
                });
              }
            } else {
              _this.enteredValue.split("/").forEach(function(word) {
                var rex = new RegExp(word,"i");
                if(rex.test(sensor.name)) {
                  sensor.submatch = "matched";
                    searchStringContainsensorName = true;
                } 
              });
            }
          }
        });
          
          if (searchStringContainsensorName) {
            device.match = "matched";
          }
      });
        
    }
    };
      
      
      _this.move = function(index1, index2, position){
            myData[index1].sensors[index2].position = position;
          _this.myData = myData;
        console.log(_this.myData);
          _this.enteredValue = "";
          _this.findValue();
     }
      
    _this.load = function(){
        //_this.myData = [];
        _this.myData = myData;
        console.log(_this.myData);
    }
    
     _this.deleteData = function(index1, index2){
         _this.enteredValue = "";
         _this.findValue();
        myData[index1].sensors[index2].position = null;
        _this.myData = myData;
         
     }
      
    //_this.loadDevice();
      
     // _this.$watch(_this.move()
       //   );
      
         // loadDevice();

      
  }]);
})();