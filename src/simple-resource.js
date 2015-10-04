'use strict';

var app = angular.module('ns.simple-resource', []);

function simpleResource ($q) {
  this.resource;
  this.loading;
  this.list;
  this.element;


  this.cget = function (query) {
    var deferred = $q.defer();
    if (!this.resource) {
      deferred.reject('Resource is not defined');

      return;
    }

    var self = this;
    self.loading = true;
    this.resource.query(query, function (list) {
      self.list = list;
      self.loading = false;
      deferred.resolve(list);
    }, function () {
      self.loading = false;
      deferred.reject('server error');
    });

    return deferred.promise;
  };

  this.get = function (params) {
    var deferred = $q.defer();
    if (!this.resource) {
      deferred.reject('Resource is not defined');

      return;
    }

    var self = this;
    self.loading = true;
    this.resource.get(params, function (element) {
      self.element = element;
      self.loading = false;
      deferred.resolve(element);
    }, function () {
      self.loading = false;
      deferred.reject('server error');
    });

    return deferred.promise;
  };

  this.save = function (params) {
    var deferred = $q.defer();
    if (!this.resource) {
      deferred.reject('Resource is not defined');

      return;
    }

    var self = this;
    self.loading = true;
    this.resource.save(params, function () {
      self.loading = false;
      deferred.resolve();
    }, function () {
      self.loading = false;
      deferred.reject('server error');
    });

    return deferred.promise;
  };

  this.delete = function (params) {
    var deferred = $q.defer();
    if (!this.resource) {
      deferred.reject('Resource is not defined');

      return;
    }

    var self = this;
    self.loading = true;
    this.resource.delete(params, function () {
      self.loading = false;
      deferred.resolve();
    }, function () {
      self.loading = false;
      deferred.reject('server error');
    });

    return deferred.promise;
  };
}

app
  .service('nsResource', simpleResource);

