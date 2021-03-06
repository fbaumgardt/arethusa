"use strict";

describe("urlParser", function() {
  var urlParser;

  beforeEach(function() {
    module("arethusa.core");
    inject(function(_urlParser_) {
      urlParser = _urlParser_;
    });

  });

  var url1 = "http://www.test.com?x=1";
  var url2 = "http://www.test.com?x=1&y=2";
  var url3 = "http://www.test.com?x=1&y=2&y=3";
  var url4 = "http://www.test.com?x=1&y";

  describe('takes an url and parses it', function() {
    it('returns an object with the url', function() {
      var res = urlParser(url1);
      expect(res.url).toEqual(url1);
    });

    describe('parses the search part of an uri to an object', function() {
      it('with a single param', function() {
        var obj = urlParser(url1);
        var res = { x: '1' };

        expect(obj.params).toEqual(res);
      });

      it('with multiple params', function() {
        var obj = urlParser(url2);
        var res = { x: '1', y: '2' };

        expect(obj.params).toEqual(res);
      });

      it('with array like params', function() {
        var obj = urlParser(url3);
        var res = { x: '1', y: ['2', '3'] };

        expect(obj.params).toEqual(res);
      });

      it('with true params', function() {
        var obj = urlParser(url4);
        var res = { x: '1', y: true };

        expect(obj.params).toEqual(res);
      });
    });
  });

  describe('this.set()', function() {
    it('takes two params - key and value - to update the params', function() {
      var obj = urlParser(url1);
      expect(obj.params.x).toEqual('1');
      obj.set('x', '2');
      expect(obj.params.x).toEqual('2');
    });

    it('also updates the url', function() {
      var obj = urlParser(url1);
      obj.set('x', '2');
      var newUrl = "http://www.test.com?x=2";
      expect(obj.url).toEqual(newUrl);
    });

    it('can also update with array params', function() {
      var obj = urlParser(url1);
      obj.set('x', ['1', '2']);
      var newUrl = "http://www.test.com?x=1&x=2";
    });
  });
});
