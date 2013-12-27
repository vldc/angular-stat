'use strict';

angular.module('stat')
    .factory('percent', [
        function () {
            var Percent = function (prec) {
                var precision = prec || 0;
                var index = 0;
                this.values = [];
                this.sum = 0;
                this.percents = [];

                angular.extend(this, {
                    put: function (num, end) {
                        this.values[index] = num;
                        this.percents[index] = {
                            val: 0
                        };
                        this.sum += num;

                        !!end && this.calculate();

                        return this.percents[index++];
                    },

                    calculate: function () {
                        angular.forEach(this.values, function (num, label) {
                            this.percents[label].val = (num / this.sum * 100).toFixed(precision);
                        }, this);
                        precision === 0 && this.fill(2);

                        return this;
                    },

                    fill: function (precisionTo) {
                        var sum = this.percents.reduce(function (a, b) {
                            a = angular.isNumber(a) ? a : a.val;
                            return parseInt(a, 10) + parseInt(b.val, 10);
                        }, 0);
                        var diff;
                        var nonEmpty;
                        var fraction;

                        if (sum !== 100) {
                            diff = 100 - sum;
                            nonEmpty = this.percents.filter(function (percent) {
                                return percent.val != 0;
                            });
                            fraction = parseFloat((diff / nonEmpty.length).toFixed(precisionTo));

                            this.percents.forEach(function (percent) {
                                percent.val != 0 && (percent.val = parseFloat(percent.val) + fraction);
                            });
                        }
                    }

                });
            };

            return function (prec) {
                return new Percent(prec);
            };
        }
    ]);
