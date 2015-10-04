# simple-resource
Add a layer over angular resource. Simplifies querying and add meta attributes to services for easy implementations.

**simple-resource** simplifies the http requests by making the requests, defer the promises, change loading status,
add the gathered elements in a property and one element retrieved by get in a property.
It requires $resource to work.

There are mainly 4 methods that you can extend in your own services.

    function myService (nsResource, myResource) {
      this.resource = myResource;

      this.cget = function (query) {
             return nsResource.cget.apply(this, query);
          },
      this.get = function () {
            return nsResource.get.apply(this, arguments);
          },
      this.save = function (objectToSave) {
            return nsResource.save.apply(this, objectToSave);
          },
      this.delete = function () {
            return nsResource.delete.apply(this, arguments);
          }
    }

    angular.module('myapp')
      .service('MyService', MyService);

All 4 methods return promises.

This implementation will add 3 properties to MyService:

- Loading
- List
- Element

**Loading** is a boolean that will change it status every time that is trying to reach the server to true.
By default is always false.

**List** contains an array of all the queryed objects with the cget method. You can iterate them like:

    function MyController ($scope, myService) {
      myService.cget();
      $scope.myService = myService;
    }

    angular.module('myapp')
      .controller('MyController', MyController);

And the view:

    <div ng-repeat="item in myService.list">
      {{ item.property }}
    </div>


Add to your app module:

    angular.module('myApp', ['ns.simple-resource']);

and to your html:

    <script src="bower_components/simple-resource/src/simple-resource.js"></script>