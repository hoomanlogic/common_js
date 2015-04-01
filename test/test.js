var should = require("chai").should();
global.$ = require("jquery");

var ext = require("../src/extensions.js");
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
        it('should change camel case names to capitalized and spaced words', function() {
            cm.hl.common.getFriendlyName('thisIsAFriendlyName').should.equal('This Is A Friendly Name');
        })
    })
    
    describe('isBlank', function () {
        it('should return true if value is undefined', function() {
            cm.hl.common.isBlank(void 0).should.equal(true);  
        })
        
        it('should return true if value is null', function() {
            cm.hl.common.isBlank(null).should.equal(true);  
        })
        
        it('should return true if value is a blank string', function() {
            cm.hl.common.isBlank('  ').should.equal(true);  
        })
    })
    
    describe('lookup', function () {
        
        var list = [
            { firstName: 'Wilma', lastName: 'Flintstone'},
            { firstName: 'Barney', lastName: 'Rubble'},
        ];
        
        it('should return matchValue if arguments are not valid', function() {
            cm.hl.common.lookup(void 0, void 0, void 0, 0).should.equal(0);
            cm.hl.common.lookup('', '', '', 0).should.equal(0);
            cm.hl.common.lookup('  ', list, '   ', 0).should.equal(0);
        })
        
        it('should return matchValue if no match is found', function() {
            cm.hl.common.lookup('lastName', list, 'firstName', 'Fred').should.equal('Fred');
        })
        
        it('should return matched lookup when a match is found', function() {
            cm.hl.common.lookup('lastName', list, 'firstName', 'Wilma').should.equal('Flintstone');
        })
    })
    
    describe('zeroToBlank', function () {
        
        it('should return empty string when 0 or \'0\'', function() {
            cm.hl.common.zeroToBlank(0).should.equal('');
            cm.hl.common.zeroToBlank('0').should.equal('');
            cm.hl.common.zeroToBlank(' 0 ').should.equal('');
        })
        
        it('should return value when not 0 or \'0\'', function() {
            cm.hl.common.zeroToBlank(' 2 ').should.equal(' 2 ');
            cm.hl.common.zeroToBlank(' ').should.equal(' ');
        })
    })
    
    describe('pluralize', function () {
        
        it('should prepend \'no \' and pluralize noun when count is 0', function() {
            cm.hl.common.pluralize('error', 0).should.equal('no errors');
        })
        
        it('should not pluralize noun when count is 1', function() {
            cm.hl.common.pluralize('error', 1).should.equal('error');
        })
        
        it('should pluralize noun when count is greater than 1', function() {
            cm.hl.common.pluralize('error', 2).should.equal('errors');
        })
        
        it('should pluralize nouns that end with \'y\' with \'ies\'', function() {
            cm.hl.common.pluralize('fairy', 2).should.equal('fairies');
        })
        
    })
})