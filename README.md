# Magic Mirror Module Advent

This module for the [MagicMirror](https://github.com/MichMich/MagicMirror) shows a candle, which burns turn towards a specified date (e.g. as an advent candle).

![Three example candles](/.examples/example.png?raw=true)

## Installation

  1\. Execute the following commands to install the module:

```bash
cd ~/MagicMirror/modules # navigate to module folder
git clone https://github.com/Jopyth/MMM-Advent.git # clone this repository
```

  2\. Then, add the following into the `modules` section of your `config/config.js` file:

````javascript
{
    module: 'MMM-Advent',
    position: 'bottom_center', // This can be any of the regions, best results in center regions
    config: {
        // See 'Configuration options' for more information.
    }
},
````

  3\. *(Optional)* You can customize your candle with the `custom.css` stylesheet, e.g. add background images.

## Configuration options

The following properties can be configured:

| option | description |
| ------------- | ------------- |
| `updateInterval` | time between updates in ms, default is `10 * 60 * 1000` (10 minutes) |
| `marks` | number of marks on the candle, default is `24` |
| `height` | height of the (whole) candle in pixel, default is `420` |
| `showFlameBeforeStart` | whether to show the flame before the start time, default is `false` |
| `start` | date and time as a string, when the candle should start burning (down), format is `YYYY-MM-DD HH-MM-SS`, default is `"2016-12-01 08:00:00"` |
| `end` | date and time as a string, when the candle should stop burning (down), format is `YYYY-MM-DD HH-MM-SS`, default is `"2016-12-24 22:00:00"` |
