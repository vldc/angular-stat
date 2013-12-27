'use strict';

angular.module('stat')
    .factory('distribution', [
        function () {
            var Distribution = function (intervalCount) {
                intervalCount = intervalCount || 1;
                this.result = {
                    arr: [],
                    obj: {}
                };

                angular.extend(this, {
                    maxVal: function () {
                        return Math.max.apply(null, this.values);
                    },

                    minVal: function () {
                        return Math.min.apply(null, this.values);
                    },

                    calculate: function (values) {
                        this.values = values;
                        var max = this.maxVal();
                        var min = this.minVal();
                        var interval = (max - min) / intervalCount;
                        var i = 0;

                        while (i < intervalCount && ++i) {
                            this.result.arr.push([]);
                        }

                        values.forEach(function (value) {
                            if (value === max) {
                                this.result.arr[intervalCount - 1].push(value);
                                this.result.obj[value] = intervalCount - 1;
                            } else {
                                this.result.arr[Math.floor((value - min) / interval)].push(value);
                                this.result.obj[value] = Math.floor((value - min) / interval);
                            }
                        }, this);
                    }
                });
            };

            return function (intervalCount) {
                return new Distribution(intervalCount);
            };
        }
    ]);
