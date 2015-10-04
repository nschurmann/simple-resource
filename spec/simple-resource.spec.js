'use strict';


var nsResource, child, mockQ = {}, deferred, resourceMock = {};

var list = [
  {id: 1, name: 'John'},
  {id: 2, name: 'Peter'},
  {id: 3, name: 'Juan'}
];

var element = {id: 1, name: 'John'};

describe('simple-resource.js', function () {

  // load the service's module
  beforeEach(module('ns.simple-resource'));

  // instantiate service

  beforeEach(function () {
    deferred = jasmine.createSpyObj('deferred', ['resolve', 'reject']);
    deferred.promise = 'Promise';
    mockQ.defer = function () {
      return deferred;
    };

    nsResource = new simpleResource(mockQ);

    resourceMock = {
      error: false,
      query: function (query, cb, err) {
        if (!this.error) {cb(list);}else{err();}
      },
      get: function (params, cb, err) {
        if (!this.error) {cb(element);}else{err();}
      },
      save: function (params, cb, err) {
        if (!this.error) {cb(element);}else{err();}
      },
      delete: function (params, cb, err) {
        if (!this.error) {cb(element);}else{err();}
      }
    };

    child = {
      cget: function () {
         return nsResource.cget.apply(this, arguments);
      },
      get: function () {
        return nsResource.get.apply(this, arguments);
      },
      save: function () {
        return nsResource.save.apply(this, arguments);
      },
      delete: function () {
        return nsResource.delete.apply(this, arguments);
      }
    };

    spyOn(resourceMock, 'query').and.callThrough();
    spyOn(resourceMock, 'get').and.callThrough();
    spyOn(resourceMock, 'save').and.callThrough();
    spyOn(resourceMock, 'delete').and.callThrough();


  });

  // mock child service


  describe('Method: CGET', function () {

    it('returns a promise when resource is defined', function () {
      child.resource = resourceMock;
      expect(child.cget()).toBe('Promise');
      expect(resourceMock.query).toHaveBeenCalled();
    });

    it('rejects the promise on undefined resource', function () {
      child.cget();
      expect(deferred.reject).toHaveBeenCalled();
    });

    it('populates list attribute', function () {
      child.resource = resourceMock;
      child.cget();
      expect(child.list.length).toBe(3);
    });

    it('reject promise on server error', function () {
      resourceMock.error = true;
      child.resource = resourceMock;
      child.cget();
      expect(deferred.reject).toHaveBeenCalled();
    });

  });

  describe('Method: GET', function () {

    it('returns a promise when resource is defined', function () {
      child.resource = resourceMock;

      expect(child.get()).toBe('Promise');
      expect(child.element).toEqual(element);
      expect(resourceMock.get).toHaveBeenCalled();
    });

    it('reject the promise on undefined resource', function () {
      child.get();
      expect(deferred.reject).toHaveBeenCalled();
    });

    it('populates element attribute', function () {
      child.resource = resourceMock;
      child.get();
      expect(Object.keys(child.element).length > 0).toBe(true);
    });

    it('reject promise on server error', function () {
      resourceMock.error = true;
      child.resource = resourceMock;
      child.get();
      expect(deferred.reject).toHaveBeenCalled();
    });

  });

  describe('Method: SAVE', function () {

    it('returns a promise when resource is defined', function () {
      child.resource = resourceMock;
      expect(child.save()).toBe('Promise');
      expect(deferred.resolve).toHaveBeenCalled();
      expect(resourceMock.save).toHaveBeenCalled();
    });

    it('reject the promise on undefined resource', function () {
      child.save();
      expect(deferred.reject).toHaveBeenCalled();
    });

    it('reject promise on server error', function () {
      resourceMock.error = true;
      child.resource = resourceMock;
      child.save();
      expect(deferred.reject).toHaveBeenCalled();
    });

  });

  describe('Method: DELETE', function () {

    it('returns a promise when resource is defined', function () {
      child.resource = resourceMock;
      expect(child.delete()).toBe('Promise');
      expect(deferred.resolve).toHaveBeenCalled();
      expect(resourceMock.delete).toHaveBeenCalled();
    });

    it('reject the promise on undefined resource', function () {
      child.delete();
      expect(deferred.reject).toHaveBeenCalled();
    });

    it('reject promise on server error', function () {
      resourceMock.error = true;
      child.resource = resourceMock;
      child.delete();
      expect(deferred.reject).toHaveBeenCalled();
    });

  });


});