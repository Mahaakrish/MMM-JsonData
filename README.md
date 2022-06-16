# MMM-JsonData

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

It was mainly developed to fetch data from a local .json file.

It fetches the key-value and display it in a table format.

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-JsonData',
	    position: 'top_left',
            config: {
                updateInterval: 1000,//Refresh every second
		fileName: "modules/MMM-JsonData/data.json"//Your json file path
            }
        }
    ]
}
```

## Configuration options

| Option           | Description
|----------------- |-----------
| `updateInterval` | Interval between updates (in millis)
| `fileName`       | Your json file path
