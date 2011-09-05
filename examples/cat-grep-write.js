exports.modules = [
	{
		"module": "shell.cat",
		"config": {
			"filename": "./examples/cat-grep-write.js"
		}
	},

	{
		"module": "shell.grep",
		"config": {
			"pattern": "module",
			"invert_match": true
		}
	},

	{
		"module": "shell.writeToFile",
		"config": {
			"filename": "./tmp/out.txt"
		}
	},

	{
		"module": "std.stdout"
	}
];