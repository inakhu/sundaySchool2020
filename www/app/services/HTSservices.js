angular.module('htsApp.services', [])

  .factory("HTSServices", ['$http','APP_SERVER', function($http,APP_SERVER) {
  var AppBase = APP_SERVER.url;
  var service = {};
  service.HezecomGetInfo = function(durl,pagingInfo){
    return $http.get(AppBase +durl,{ params: pagingInfo });
  };
  service.HezecomGetOne = function(durl){
    return $http.get(AppBase +durl);
  };
  service.HezecomPostInfo = function (durl) {
    return $http.post(AppBase +durl).then(function (results) {
      return results;
    });
  };

  service.HezecomPostNewInfo = function (durl,pdata) {
    return ($http({
      method  : 'POST',
      url     : AppBase +durl,
      data    : pdata,
      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
    }))

  };

  service.HezecomUpdateInfo = function (durl) {
    return $http.put(AppBase +durl);
  };

 service.UsersAuth = function () {
   return localStorage.getItem("mytoken");

  };

  service.HezecomDeleteInfo = function (durl) {
    return $http.get(AppBase + durl);
  };

  service.htsDeleteMSG = function ($ionicPopup) {
    return $ionicPopup.confirm({
      title: 'Confirm Action',
      template: 'Are you sure you want to delete this?'
    });
  };

  service.htsConfirm = function ($ionicPopup) {
    return $ionicPopup.confirm({
      title: 'Confirm Action',
      template: 'Please confirm this action.'
    });
  };

  return service;
}]);

app.service('FeedList', function ($rootScope, FeedLoader, $q){
  this.get = function(feedSourceUrl) {
    var response = $q.defer();
    //num is the number of results to pull form the source
    FeedLoader.fetch({q: feedSourceUrl, num: 20}, {}, function (data){
      response.resolve(data.responseData);
    });
    return response.promise;
  };
});

//NotePad Factory Start===============================
app.factory('Todos', function($localStorage, $rootScope, $stateParams) {
    var Todos = $localStorage.todos;

    return{
        all: function(){
            return Todos;
        },
        one: function(id){
            var alltodos = Todos;
            var todo = _.first(_.filter(alltodos, {'id': id}));
            return todo;
        },
        saveList: function(list){
            list.id = $rootScope.randomId();
            Todos.push(list);
        },
        removeList: function(list) {
            Todos.splice(Todos.indexOf(list), 1);
        },
        saveTodo: function(id, todo){
            var lists = Todos;
            var list = _.first(_.filter(lists, {'id': id}));
            list.todos.push(todo);
        },
        isDone: function(idList, idTodo){
            var list = this.one(idList);
            var todo = _.first(_.filter(list.todos, {'id': idTodo}));
            console.log(list.todos);
            console.log(idTodo);
            console.log(todo);
        }
    }
});
app.factory('Notes', function($localStorage, $rootScope, $stateParams) {
    var Notes = $localStorage.notes;
    return{
        all: function(){
            return Notes;
        },
        one: function(id){
            var allnotes = Notes;
            var note = _.first(_.filter(allnotes, {'id': id}));
            return note;
        },
        addNote: function(note){
            note.id = $rootScope.randomId();
            Notes.push(note);
        },
        removeNote: function(note) {
            Notes.splice(Notes.indexOf(note), 1);
        },
        updateNote: function(note){
            Notes.splice(Notes.indexOf(note), 1);
            Notes.splice(Notes.indexOf(note), 0, note);

        }
    }
})
// create a new factory
    .factory ('StorageService', function ($localStorage) {

        $localStorage = $localStorage.$default({
            bookmarks: []
        });

        var _getAll = function () {
            return $localStorage.bookmarks;
        };

        var _add = function (bookmark) {
            $localStorage.bookmarks.push(bookmark);
        };

        var _remove = function (bookmark) {
            $localStorage.bookmarks.splice($localStorage.bookmarks.indexOf(bookmark), 1);
        };

        return {
            getAll: _getAll,
            add: _add,
            remove: _remove
        };
    })

    .factory('VideoControl', function ($rootScope, $document) {
        var _events = {
            onPause: 'onPause',
            onResume: 'onResume'
        };

        $document.bind('resume', function () {
            _publish(_events.onResume, null);
        });

        $document.bind('pause', function () {
            _publish(_events.onPause, null);
        });

        function _publish(eventName, data) {
            $rootScope.$broadcast(eventName, data)
        }
        return {
            events: _events
        }
    });
//NotePad Factory End===============================
