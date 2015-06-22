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
      
      
      
      
      _this.loadDevice = function() { 
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
    _this.myData = myData;
          var blas = _this.enteredValue;
          var res = blas.split("/");
          if(res.length == 2){
            if(isNumeric(res[0]) == true){
                for(var i=0; i<myData.length;i++){
                    myData[i].match = 'null';
                    if(myData[i].name.match(res[0])){
                        for(var j=0; j<myData[i].sensors.length;j++){
                            myData[i].sensors[j].submatch = 'null';
                            if(myData[i].sensors[j].name.toLowerCase().match(res[1].toLowerCase()) && myData[i].sensors[j].position == 'null'){
                                myData[i].match = 'matched';
                                myData[i].sensors[j].submatch = 'matched';
                            }
                        }
                    }
                }
            }else{
                for(var i=0; i<myData.length;i++){
                    _this.myData[i].match = 'null';
                    for(var j=0; j<myData[i].sensors.length;j++){
                        myData[i].sensors[j].submatch = 'null';
                        if(myData[i].sensors[j].name.toLowerCase().match(res[0].toLowerCase()) && myData[i].sensors[j].position == 'null'){
                            if(myData[i].name.match(res[1])){
                                myData[i].match = 'matched';
                                myData[i].sensors[j].submatch = 'matched';
                            }
                        }
                     }
                }
            }
          }else{
          
              if(_this.enteredValue.length > 2){
                  if(isNumeric(_this.enteredValue) == true){
                        for(var i=0; i<myData.length;i++){
                            myData[i].match = 'null';
                            if(myData[i].name.match( _this.enteredValue)){
                              //console.log(this.myData[i]);
                              myData[i].match = 'matched';
                          }

                            for(var j=0; j<myData[i].sensors.length;j++){
                                if(myData[i].sensors[j].position == 'null'){
                                myData[i].sensors[j].submatch = 'matched';
                                }
                            }
                        }
                  }else{
                        for(var i=0; i<myData.length;i++){
                              myData[i].match = 'null';
                            for(var j=0; j<myData[i].sensors.length;j++){
                                    myData[i].sensors[j].submatch = 'null';
                                //var temp = _this.myData[i].sensors[j].name.toLowerCase();
                                if(myData[i].sensors[j].name.toLowerCase().match(res[0].toLowerCase()) && myData[i].sensors[j].position == 'null'){
                                    myData[i].sensors[j].submatch = 'matched';
                                    myData[i].match = 'matched';
                                }
                            }
                            //console.log(this.myData[i]);
                        }
                  }
               }else{
                   for(var i=0; i<myData.length;i++){
                            myData[i].match = 'null';
                            for(var j=0; j<myData[i].sensors.length;j++){
                                myData[i].sensors[j].submatch = 'null';
                            }
                        }
                //console.log(err.message);
               }
          
          }
    
}catch(err) {
//console.log(err.message);
}
      }
      
      
      
      _this.move = function(index1, index2, position){
            myData[index1].sensors[index2].position = position;
          _this.myData = myData;
        console.log(_this.myData);
          _this.enteredValue = "";
          _this.findValue(null);
     }
      
    _this.load = function(){
        //_this.myData = [];
        _this.myData = myData;
        console.log(_this.myData);
    }
    
     _this.deleteData = function(index1, index2){
         _this.findValue(null);
        myData[index1].sensors[index2].position = 'null';
        _this.myData = myData;
         
     }
      
    //_this.loadDevice();
      
     // _this.$watch(_this.move()
       //   );
      
         // loadDevice();

      
  }]);
})();