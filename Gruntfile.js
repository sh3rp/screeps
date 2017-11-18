var prompt = require('prompt');

module.exports = function(grunt) {

    var password = '';
    prompt.start();
    prompt.get(['password'],function(err, result) {
        password = result.password; 
    });

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 's@kndl.org',
                password: password,
                branch: 'test',
                ptr: false
            },
            dist: {
                src: ['src/*.js']
            }
        }
    });
}
