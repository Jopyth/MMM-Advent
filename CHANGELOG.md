# MMM Advent Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.0.1] - 2016-11-22
### Added
- Configuration options:
    - `enableAnimation` - set to `false` to disable flame animation, default is `true`
    - `fontCSS` - link to a custom font stylesheet, default is `https://fonts.googleapis.com/css?family=Dosis`
    - `fontColor` - the color of the marks on the candle, default is `#000000` (black)
    - `candleColor` - the color of the candle, default is `#FFFFFF` (white)
    - `font` - the font used (probably depends on the `fontCSS` option, default is `'Dosis', sans-serif`

### Changed
- Value are applied through a `css` stylesheet
- Default font is a **bold** version of `Dosis`
- Default candle height is 425

### Fixed
- If flame is shown before the start time, it does no longer hover way above the candle

### Removed
- Loading of pumpkin font

## [1.0.0] - 2016-11-20
### Initial release of the Advent module.
