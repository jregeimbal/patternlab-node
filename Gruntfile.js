module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['./public/patterns'],
		concat: {
			options: {
				stripBanners: true,
				banner: '/* \n * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> \n * \n * <%= pkg.author %>, and the web community.\n * Licensed under the <%= pkg.license %> license. \n * \n * Many thanks to Brad Frost and Dave Olsen for inspiration, encouragement, and advice. \n *\n */\n\n'
			},
			dist: {
				src: './builder/patternlab.js',
				dest: './builder/patternlab.js'
			}
		},
		copy: {
			main: {
				files: [
					{ expand: true, cwd: './source/js/', src: '*', dest: './public/js/'},
					{ expand: true, cwd: './source/css/', src: '*', dest: './public/css/' },
					{ expand: true, cwd: './source/images/', src: ['*.png', '*.jpg', '*.gif', '*.jpeg'], dest: './public/images/' },
					{ expand: true, cwd: './source/images/sample/', src: ['*.png', '*.jpg', '*.gif', '*.jpeg'], dest: './public/images/sample/'},
					{ expand: true, cwd: './source/fonts/', src: '*', dest: './public/fonts/'},
					{ expand: true, cwd: './source/_data/', src: 'annotations.js', dest: './public/data/' },
          { expand: true, cwd: './../src/components/fonts', src: ['**/*.{eot,ttf,woff,svg,otf}'], dest: './public/css/fonts/'},
          { expand: true, cwd: './../bootstrap/fonts', src: ['**/*.{eot,ttf,woff,svg,otf}'], dest: './public/css/fonts/' },
          { expand: true, cwd: './../src/patternlab/images/', src: ['*.png', '*.jpg', '*.gif', '*.jpeg'], dest: './public/images/'}
          
        ]
			}
		},
		jshint: {
			options: {
				"curly": true,
				"eqnull": true,
				"eqeqeq": true,
				"undef": true,
				"forin": true,
				//"unused": true,
				"node": true
			},
			patternlab: ['Gruntfile.js', './builder/lib/patternlab.js']
		},
		watch: {
			// scss: { //scss can be watched if you like
			// 	files: ['source/css/**/*.scss', 'public/styleguide/css/*.scss'],
			// 	tasks: ['default']
			// },
			mustache: {
				files: ['source/_patterns/**/*.mustache'],
				tasks: ['default']
			},
			data: {
				files: ['source/_patterns/**/*.json', 'source/_data/*.json'],
				tasks: ['default']
			}
		},
		sass: {
			build: {
				options: {
					style: 'expanded',
					precision: 8
				},
				files: {
					// './source/css/style.css': './source/css/style.scss',
					'./public/styleguide/css/static.css': './public/styleguide/css/static.scss',
					'./public/styleguide/css/styleguide.css': './public/styleguide/css/styleguide.scss'
				}
			}
		},
    less: {
      build: {
        options: {
          paths: [
            '../src/themes/srm/less',
            '../src/themes/primer_flex/less',
            '../src/themes/primer/less',
            '../src/themes/flatware/less',
            '../bootstrap/less',
            '../docs/less'
          ]
        },
        files: {
          // 'source/css/style.css':     '../src/themes/primer_flex/less/custom-bootstrap.less',
          'public/css/srm.css':    '../src/themes/srm/less/custom-bootstrap.less',
          'public/css/primer.css':    '../src/themes/primer_flex/less/custom-bootstrap.less',
          'public/css/flatware.css':  '../src/themes/flatware/less/custom-bootstrap.less',
          'public/css/bootstrap.css': '../bootstrap/less/bootstrap.less'
        }
      }
    },
		qunit: {
			all:{
				options:{
					urls: ['./test/tests.html']
				}
			}
		}
	});

	// load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	//load the patternlab task
	grunt.task.loadTasks('./builder/');

	//if you choose to use scss, or any preprocessor, you can add it here
	grunt.registerTask('default', ['clean', 'concat', 'patternlab', 'less', 'copy']);

	//travis CI task
	grunt.registerTask('travis', ['clean', 'concat', 'patternlab', /*'sass',*/ 'copy', 'qunit']);
};