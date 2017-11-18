var prompt = require('prompt');

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-prompt');

    grunt.initConfig({
        screeps: {
            options: {
                email: 's@kndl.org',
                branch: 'test',
                ptr: false
            },
            dist: {
                src: ['src/*.js']
            }
        },
        prompt: {
            target: {
                options: {
                    questions: [
                        {
                            config: 'screeps.options.password',
                            type: 'password',
                            message: 'Screeps password:',
                            default: ''
                        }
                    ]
                }
            }
        }
    });
}
