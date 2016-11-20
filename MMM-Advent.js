/* global Module */

/* Magic Mirror
 * Module: Advent
 *
 * By Joseph Bethge
 * MIT Licensed.
 */

// flame animation based on: https://codepen.io/dazulu/pen/fGFyj

Module.register("MMM-Advent", {

    // Default module config.
    defaults: {
        updateInterval: 10 * 60 * 1000, // 10 minutes
        marks: 24,
        height: 420, // in pixel
        showFlameBeforeStart: false,
        start: "2016-12-01 08:00:00", // YYYY-MM-DD HH-MM-SS
        end: "2016-12-24 22:00:00" // YYYY-MM-DD HH-MM-SS
    },

    // Define start sequence.
    start: function() {
        var self = this;

        Log.info("Starting module: " + this.name);

        this.offset = -0.01;

        var head = document.getElementsByTagName('head')[0];

        var pumpkinFont = document.createElement("link");
        pumpkinFont.rel = "stylesheet";
        pumpkinFont.media = "screen";
        pumpkinFont.href = "https://fontlibrary.org/face/pumpkin";
        pumpkinFont.type = "text/css";
        head.appendChild(pumpkinFont);

        if (this.config.updateInterval < 10 * 1000) {
            // 10 seconds minimum update interval
            this.config.updateInterval = 10 * 1000;
        }
        setInterval(function() {
            self.updateDom();
        }, this.config.updateInterval);
    },

    // Define required styles
    getStyles: function () {
        return ["MMM-Advent.css", "custom.css"];
    },

    // Override dom generator.
    getDom: function() {
        var now = new Date();
        var start = new Date(this.config.start);
        var end = new Date(this.config.end);

        this.offset = (now - start) / (end - start);

        if (this.offset >= 1.0) {
            this.offset = 1.0;
        }

        // define magic numbers
        var flameSpace = 35;
        var candleStart = 62;
        var candleEnd = 12; // padding of numbers towards bottom end
        var candleTopSpace = 60;

        var wrapper = document.createElement("div");
        wrapper.className = "candle-container";
        wrapper.style.height = (this.config.height + 1) + "px";

        var candleBody = document.createElement("div");
        candleBody.className = "candle-body";
        candleBody.style.background = this.config.candleColor;
        candleBody.style.height = (this.config.height - candleTopSpace + 1) + "px";
        wrapper.appendChild(candleBody);

        for (var i = 0; i < this.config.marks; i++) {
            var mark = document.createElement("span");
            mark.className = "mark";
            mark.innerHTML = i + 1;
            mark.style.top = candleStart + (i / (this.config.marks - 1)) * (this.config.height - (candleStart + candleEnd)) + "px";
            wrapper.appendChild(mark);
        }

        var candleTop = document.createElement("div");
        candleTop.className = "candle-top-shape";
        wrapper.appendChild(candleTop);
        candleTop.style.height = (candleTopSpace + Math.round(this.offset * (this.config.height - candleTopSpace))) + "px";

        if (this.config.showFlameBeforeStart || this.offset >= 0.0) {
            // flame on
            var flameContainer = document.createElement("div");
            flameContainer.className = "flame-container";
            wrapper.appendChild(flameContainer);

            var components = [
                "red flame",
                "orange flame",
                "yellow flame",
                "white flame"
            ];

            for (var i = 0; i < components.length; i++) {
                var element = document.createElement("div");
                element.className = components[i]; 
                flameContainer.appendChild(element);
            }

            flameContainer.style.top = (flameSpace + Math.round(this.offset * (this.config.height - candleTopSpace))) + "px";
        }

        return wrapper;
    },
});
