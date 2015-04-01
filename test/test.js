var should = require('chai').should();

require('../src/extensions.js');

var hldatetime = require('../src/datetime.js');
var hlcommon = require('../src/common.js');

describe('hlcommon', function() {  
    describe('getFriendlyName', function() {
        it('should change camel case names to capitalized and spaced words', function() {
            hlcommon.getFriendlyName('thisIsAFriendlyName').should.equal('This Is A Friendly Name');
        })
    })
    
    describe('isBlank', function () {
        it('should return true if value is undefined', function() {
            hlcommon.isBlank(void 0).should.equal(true);  
        })
        
        it('should return true if value is null', function() {
            hlcommon.isBlank(null).should.equal(true);  
        })
        
        it('should return true if value is a blank string', function() {
            hlcommon.isBlank('  ').should.equal(true);  
        })
    })
    
    describe('lookup', function () {
        
        var list = [
            { firstName: 'Wilma', lastName: 'Flintstone'},
            { firstName: 'Barney', lastName: 'Rubble'},
        ];
        
        it('should return matchValue if arguments are not valid', function() {
            hlcommon.lookup(void 0, void 0, void 0, 0).should.equal(0);
            hlcommon.lookup('', '', '', 0).should.equal(0);
            hlcommon.lookup('  ', list, '   ', 0).should.equal(0);
        })
        
        it('should return matchValue if no match is found', function() {
            hlcommon.lookup('lastName', list, 'firstName', 'Fred').should.equal('Fred');
        })
        
        it('should return matched lookup when a match is found', function() {
            hlcommon.lookup('lastName', list, 'firstName', 'Wilma').should.equal('Flintstone');
        })
    })
    
    describe('zeroToBlank', function () {
        
        it('should return empty string when 0 or \'0\'', function() {
            hlcommon.zeroToBlank(0).should.equal('');
            hlcommon.zeroToBlank('0').should.equal('');
            hlcommon.zeroToBlank(' 0 ').should.equal('');
        })
        
        it('should return value when not 0 or \'0\'', function() {
            hlcommon.zeroToBlank(' 2 ').should.equal(' 2 ');
            hlcommon.zeroToBlank(' ').should.equal(' ');
        })
    })
    
    describe('pluralize', function () {
        
        it('should prepend \'no \' and pluralize noun when count is 0', function() {
            hlcommon.pluralize('error', 0).should.equal('no errors');
        })
        
        it('should not pluralize noun when count is 1', function() {
            hlcommon.pluralize('error', 1).should.equal('error');
        })
        
        it('should pluralize noun when count is greater than 1', function() {
            hlcommon.pluralize('error', 2).should.equal('errors');
        })
        
        it('should pluralize nouns that end with \'y\' with \'ies\'', function() {
            hlcommon.pluralize('fairy', 2).should.equal('fairies');
        })
        
    })
})

describe('hldatetime', function() {  
    describe('daysOfWeek', function() {
        it('should exist', function() {
            should.exist(hldatetime.daysOfWeek)
        })

        it('should be an array', function() {
            hldatetime.daysOfWeek.should.be.a('Array')
        })
    })
})