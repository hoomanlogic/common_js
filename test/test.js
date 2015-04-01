var should = require("chai").should();
global.$ = require("jquery");

var dt = require("../src/datetime.js");
var cm = require("../src/common.js");

describe('hl.datetime', function() {  
  describe('daysOfWeek', function() {
    it('should exist', function() {
      should.exist(dt.hl.datetime.daysOfWeek)
    })
	
	it('should be an array', function() {
      dt.hl.datetime.daysOfWeek.should.be.a('Array')
    })
  })
})

describe('hl.common', function() {  
  describe('getFriendlyName', function() {
    it('should return Friendly', function() {
      cm.hl.common.getFriendlyName('friendly').should.equal('Friendly');
    })
	
	it('should return Friendly Name', function() {
      cm.hl.common.getFriendlyName('friendlyName').should.equal('Friendly Name');
    })
	
	it('should return This Is A Friendly Name', function() {
      cm.hl.common.getFriendlyName('thisIsAFriendlyName').should.equal('This Is A Friendly Name');
    })
  })
})



