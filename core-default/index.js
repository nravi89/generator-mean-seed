/**
@todo
- once forminput, etc. are fixed on Angular 1.2.0, update bower.json to no longer be 1.2.0-rc.3
- remove the need to check this.optSubGenerators in EVERY function (i.e. find a way to NOT call this generator AT ALL if sub generator is wrong, but hookFor doesn't seem to be able to be conditionally called based on prompts..?)

@toc
1. askFor

NOTE: uses Yeoman this.spawnCommand call to run commands (since need to handle Windows/different operating systems and can't use 'exec' since that doesn't show (live) output)
*/

'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

// var exec = require('child_process').exec;
// var spawn = require('child_process').spawn;

var CoreDefaultGenerator = module.exports = function CoreDefaultGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	//copy over prompt options to 'this' scope for templating
	var xx;
	for(xx in this.options.props) {
		this[xx] =this.options.props[xx];
		// console.log(xx+': '+this[xx]);
	}
};

util.inherits(CoreDefaultGenerator, yeoman.generators.NamedBase);

/**
@toc 1.
@method askFor
*/
CoreDefaultGenerator.prototype.askFor = function askFor() {
if(this.optSubGenerators.indexOf('core-default') >-1) {

if(!this.optConfigFile) {		//only prompt if don't have config file
	var cb = this.async();

	var prompts = [
		{
			name: 'optAppName',
			message: 'Application name',
			default: 'myproject'
		},
		{
			name: 'optAppTitle',
			message: 'Application title',
			default: 'My Project'
		},
		{
			name: 'optAppDescription',
			message: 'Application description',
			default: 'My really cool app!'
		},
		{
			name: 'optAppKeywords',
			message: 'Application (NPM/Bower) keywords, space separated',
			default: 'mean-seed javascript angular node myproject app'
		},
		{
			name: 'optGithubName',
			message: 'Github User or Organization Name'
		},
		{
			name: 'optAuthorName',
			message: 'Author name and email (i.e. John Smith <johnsmith@email.com>)'
		},
		//should not be a prompt, just force set the value
		// {
			// name: 'optCssPreprocessor',
			// message: 'CSS Pre-processor',
			// choices: [
				// 'less',
				// 'scss'
			// ],
			// default: 'less'
		// },
		{
			type: 'list',
			name: 'optOperatingSystem',
			message: 'Operating system',
			choices: [
				'mac',
				'linux',
				'windows'
			],
			default: 'mac'
		},
		{
			name: 'optServerPort',
			message: 'What port to run the application on?',
			default: 3000
		},
		{
			name: 'optSocketPort',
			message: 'What port to run any socket connections on?',
			default: 3001
		},
		{
			name: 'optTestServerPort',
			message: 'What port to run the TESTS on?',
			default: 3005
		},
		{
			name: 'optTestSocketPort',
			message: 'What port to run any socket connections for TESTS on?',
			default: 3006
		},
		{
			name: 'optTestDatabase',
			message: 'What (MongoDB) database to use for the TESTS?',
			default: 'test_temp'
		},
		{
			type: 'list',
			name: 'optNpmInstall',
			message: 'Run npm install (if skipped, you will have to run yourself after Yeoman completes)?',
			choices: [
				'0',
				'1'
			],
			default: '1'
		},
		{
			type: 'list',
			name: 'optBowerInstall',
			message: 'Run bower install (if skipped, you will have to run yourself after Yeoman completes)?',
			choices: [
				'0',
				'1'
			],
			default: '1'
		},
		{
			type: 'list',
			name: 'optSeleniumInstall',
			message: 'Run selenium (for protractor tests) install (if skipped, you will have to run yourself after Yeoman completes)? NOTE: this may not work on Windows so you may have to install yourself anyway - see the README for more info.',
			choices: [
				'0',
				'1'
			],
			default: '1'
		},
		{
			type: 'list',
			name: 'optGruntQ',
			message: 'Run Grunt (if skipped, you will have to run yourself after Yeoman completes)?',
			choices: [
				'0',
				'1'
			],
			default: '1'
		}
	];

	this.prompt(prompts, function (props) {
		var ii, jj, kk, skip, curName;
		var skipKeys =['optAppKeywords'];
		var toInt =['optNpmInstall', 'optBowerInstall', 'optSeleniumInstall', 'optGruntQ'];
		for(ii =0; ii<prompts.length; ii++) {
			curName =prompts[ii].name;
			skip =false;
			for(jj =0; jj<skipKeys.length; jj++) {
				if(curName ==skipKeys[jj]) {
					skip =true;
					break;
				}
			}
			if(!skip) {		//copy over
				//convert to integer (from string) if necessary
				for(kk =0; kk<toInt.length; kk++) {
					if(curName ==toInt[kk]) {
						props[curName] =parseInt(props[curName], 10);
					}
				}
				
				this.options.props[curName] =this[curName] =props[curName];
			}
		}
		
		//handle some special ones (the skipKeys from above)
		this.options.props.optAppKeywords =this.optAppKeywords = props.optAppKeywords.split(' ');
		
		this.options.props.optCssPreprocessor =this.optCssPreprocessor ='less';

		cb();
	}.bind(this));
}

//have to set this either way
this.options.props.optCssPreprocessor =this.optCssPreprocessor ='less';

}
};