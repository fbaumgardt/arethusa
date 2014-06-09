"use strict";

describe('MainCtrl', function() {
  beforeEach(module('arethusa'));

  it('sets scope values', inject(function($controller, $rootScope) {
    var scope = $rootScope.$new();
    var mystate = {
      init: function() {},
      allLoaded: false
    };
    var notifier = {
      init: function() {}
    };
    var ctrl = $controller('MainCtrl', {$scope:scope, state:mystate, notifier:notifier, configurator: {
      configurationFor: function(name) {
        return { plugins: {}, template: "template"};
      }
    }});

    expect(scope.state).toBe(mystate);
    expect(scope.plugins).toBeUndefined();
    expect(scope.template).toBe("template");
  }));
});
