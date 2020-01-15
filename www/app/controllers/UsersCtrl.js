app.controller('DashCtrl', function($scope, $http,$ionicModal, $ionicPopup, $stateParams,$ionicPopover) {
    var ndate = $stateParams.ndate;
    var lang = $stateParams.lang;
    var actualDate=null;
    var dYear=2020;

    if(!ndate){
        var now = new Date();
        //actualDate = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2);
        actualDate = dYear + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2);
    }else{
        actualDate = ndate;
    }

    //Get week number from date==================
    Date.prototype.getWeekNumber = function(){
        var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
        var dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
    };
    //end===========================

    $http.get(lang+'.json').success(function(data){
        $scope.dataSet = data;
        $scope.appDate=actualDate
        $scope.langInfo=lang
        $scope.weekNumber=new Date($scope.appDate).getWeekNumber();

        //console.log('The current ISO week number is ' + $scope.weekNumber);


        /* get date from 1-52 weeks */
        function dateFromWeek(yearn, weekn){
            var d = (1 + (weekn - 1) * 7);
            return new Date(yearn, 0, d);
        }
        $scope.newDate = dateFromWeek(dYear, $scope.weekNumber);

        $scope.current = $scope.dataSet[$scope.weekNumber];
            $scope.next = function(){
                var i = $scope.getIndex($scope.current.id, 1);
                //console.log('New Day of year: ' + i);
                $scope.current = $scope.dataSet[i];
                $scope.newDate = dateFromWeek(dYear, i);
                $scope.weekNumber=i;
            },
            $scope.previous = function(){
                var i = $scope.getIndex($scope.current.id, -1);
                //console.log('New Day of year: ' + i);
                $scope.current = $scope.dataSet[i];
                $scope.newDate = dateFromWeek(dYear, i);
                $scope.weekNumber=i;
            },
            $scope.getIndex = function(currentIndex, shift){
                var len = $scope.dataSet.length;
                return (((currentIndex + shift) + len) % len)
            }

        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function(){
            $scope.modal.show();
        };
        $scope.closeModal = function(){
            $scope.modal.hide();
        };

        /*Increase/Decrease Font*/
        $scope.size = 15;
        $scope.fontSize = "font-size-" + $scope.size;

        $scope.increase = function(){
            //Higher limit
            if($scope.size < 20){
                $scope.size++;
                $scope.fontSize = "font-size-" + $scope.size;
            }
        };
        $scope.decrease = function(){
            //Lower limit
            if($scope.size > 15){
                $scope.size--;
                $scope.fontSize = "font-size-" + $scope.size;
            }
        };
    });





    $ionicPopover.fromTemplateUrl('popover.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function($event) {
        $scope.popover.show($event);
    };

    $scope.closePopover = function() {
        $scope.popover.hide();
    };

    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });

    // Execute action on hide popover
    $scope.$on('popover.hidden', function() {
        // Execute action
    });

    // Execute action on remove popover
    $scope.$on('popover.removed', function() {
        // Execute action
    });

    //var date = new Date();

});
