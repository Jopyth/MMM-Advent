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
        height: 425, // in pixel
        showFlameBeforeStart: false,
        start: "2016-12-01 08:00:00", // YYYY-MM-DD HH-MM-SS
        end: "2016-12-24 22:00:00", // YYYY-MM-DD HH-MM-SS
        enableAnimation: true,
        fontCSS: "https://fonts.googleapis.com/css?family=Dosis:700", // css of font
        fontColor: "#000000", // black
        candleColor: "#FFFFFF", // white
        font: "'Dosis', sans-serif"
    },

    // Define start sequence.
    start: function() {
        var self = this;

        Log.info("Starting module: " + this.name);

        this.offset = -0.01;

        var head = document.getElementsByTagName('head')[0];

        if (this.config.fontCSS) {
            var font = document.createElement("link");
            font.rel = "stylesheet";
            font.href = this.config.fontCSS;
            head.appendChild(font);
        }

        if (this.config.candleColor || this.config.font || this.config.fontColor) {
            var configValues = document.createElement("style");
            configValues.type = "text/css";
            configValues.innerHTML = "";
            if (this.config.candleColor) {
                configValues.innerHTML += ".candle-body { background-color: " + this.config.candleColor + "; }\n";
            }
            if (this.config.font) {
                configValues.innerHTML += ".mark { font-family: " + this.config.font + "; }\n";
            }
            if (this.config.fontColor) {
                configValues.innerHTML += ".mark { color: " + this.config.fontColor + "; }\n";
            }
            head.appendChild(configValues);
        }

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

    getCandleDom(start, end) {
        var now = new Date();

        this.offset = (now - start) / (end - start);

        if (this.offset >= 1.0) {
            this.offset = 1.0;
        }
        if (this.offset <= -0.01) {
            this.offset = -0.01;
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

            if (!this.config.enableAnimation) {
                flameContainer.style.animationName = "none";
            }

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

    // Override dom generator.
    getDom: function() {
        var startConfig = this.config.start;
        var endConfig = this.config.end;

        if (Array.isArray(startConfig) && Array.isArray(endConfig))
        {
            var table = document.createElement("table");
            var tr = document.createElement("tr");

            for (var i = 0; i < startConfig.length && i < endConfig.length; i++)
            {
                var td = document.createElement("td");

                var start = new Date(startConfig[i]);
                var end = new Date(endConfig[i]);

                td.appendChild(this.getCandleDom(start, end));
                tr.appendChild(td);
            }

            table.appendChild(tr);
            return table;
        }
        else
        {
            var start = new Date(startConfig);
            var end = new Date(endConfig);

            return this.getCandleDom(start, end);
        }
    }
});
