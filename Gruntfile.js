
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 's@kndl.org',
                password: process.env.SCREEPS_PASSWORD,
                branch: 'test',
                ptr: false
            },
            dist: {
                src: ['src/*.js']
            }
        }
    });
}
