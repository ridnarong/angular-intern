(function() {
  'use strict';

angular.module('componentController')
  .controller("myChartContainer", ['Device','$mdSidenav', function(Device,$mdSidenav) {
    var _this = this;
    this.devices = [];
        
      
    _this.toggleList   = toggleUsersList;
    
    this.enteredValue = null;

    this.findValue = function() {
      var searchStringContainDeviceName = false;
      _this.devices.forEach(function(device) {
        device.match = null; // Clear seach result in every key up
        _this.enteredValue.split("/").forEach(function(word) {
          var rex = new RegExp(word,"i");
          if(rex.test(device.name)/* Use Regular expression device.name against word is match?*/) {
            device.match = "matched";
            searchStringContainDeviceName = true;
          }
        });
        
        device.sensors.forEach(function(sensor) {
          if(typeof sensor.match == "undefined" || sensor.match == null || sensor.match == "matched") { //Seach only not left or right
            sensor.match = null; // Clear seach result in every key up
            if (searchStringContainDeviceName) {
              if(device.match == "matched") {
                _this.enteredValue.split("/").forEach(function(word) {
                  var rex = new RegExp(word,"i");
                  if(rex.test(sensor.name)) {
                    sensor.match = "matched";
                  } 
                });
              }
            } else {
              _this.enteredValue.split("/").forEach(function(word) {
                var rex = new RegExp(word,"i");
                if(rex.test(sensor.name)) {
                  sensor.match = "matched";
                  device.match = "matched";
                } 
              });
            }
          }
        });
      });
    };

    this.move = function(index1, index2, position) {
      _this.devices[index1].sensors[index2].match = position;
    }

    function toggleUsersList() {
      $mdSidenav('right').toggle();
    }
    
    var loadDevices = function() { 
      _this.myData = [];    
      var myData = Device.query();
      myData.$promise.then(function(data) {
        for(var i=0; i<data.length;i++){
          _this.devices.push(data[i]);
        }
      });
    };

      loadDevices();
  }]);
})();
 