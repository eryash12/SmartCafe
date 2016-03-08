/**
 * Created by yash on 3/3/16.
 */
$(document).ready(function() {
    function plot_temp_eff_graph() {
        var dps = []; // dataPoints
        var dps2 = [];

        var chart = new CanvasJS.Chart("chart1", {
            title: {
                text: "Live Temperature(Blue) and Efficiency(Red) vs Time Graph "
            },
            axisX: {
                title: "Time (Seconds)"
            },
            axisY: {
                title: "Temperature (Celsius)"
            },
            axisY2: {
                title: "Efficiency "
            },
            data: [{
                type: "line",
                dataPoints: dps
            }, {
                type: "line",
                axisYType: "secondary",
                dataPoints: dps2
            }]


        });

        var xVal = 0;
        var yVal = 0;
        var updateInterval = 1000;
        var dataLength = 50; // number of dataPoints visible at any point

        var updateChart = function (count) {


        $.ajax(
                {
                    url: base + "data/get_temp_and_eff/",
                    type: "POST",
                    success: function (data, status) {
                        //if (status == 'success')
                        //{
                        data = $.parseJSON(data);
                        var temp = parseFloat(data['temp']);
                        var eff = parseFloat(data['eff']);


                        dps.push({
                            x: xVal,
                            y: temp
                        });
                        dps2.push({
                            x: xVal,
                            y: eff
                        });
                        if (dps.length > dataLength) {
                            dps.shift();
                        }
                        if (dps2.length > dataLength) {
                            dps2.shift();
                        }
                        chart.render();
                        xVal++;
                        //}
                    },
                    error: function (xhr, desc, err) {
                        console.log(xhr);
                        console.log(desc);
                        console.log(err);
                    }
                }
            )


        };

        // generates first set of dataPoints
        updateChart(dataLength);

        // update chart after specified time.
        setInterval(function () {
            updateChart()
        }, updateInterval);
    }
    plot_temp_eff_graph();

    function plot_irr_pow_graph() {
        var dps = []; // dataPoints
        var dps2 = [];

        var chart = new CanvasJS.Chart("chart2", {
            title: {
                text: "Live Irradiance(Blue) and Power(Red) vs Time Graph "
            },
            axisX: {
                title: "Time (Seconds)"
            },
            axisY: {
                title: "Irradiance"
            },
            axisY2: {
                title: "Power "
            },
            data: [{
                type: "line",
                dataPoints: dps
            }, {
                type: "line",
                axisYType: "secondary",
                dataPoints: dps2
            }]


        });

        var xVal = 0;
        var yVal = 0;
        var updateInterval = 1000;
        var dataLength = 50; // number of dataPoints visible at any point

        var updateChart = function (count) {


            $.ajax(
                {
                    url: base + "data/get_irr_and_pow/",
                    type: "POST",
                    success: function (data, status) {
                        //if (status == 'success')
                        //{
                        data = $.parseJSON(data);
                        var irr = parseFloat(data['irr']);
                        var pow = parseFloat(data['pow']);


                        dps.push({
                            x: xVal,
                            y: irr
                        });
                        dps2.push({
                            x: xVal,
                            y: pow
                        });
                        if (dps.length > dataLength) {
                            dps.shift();
                        }
                        if (dps2.length > dataLength) {
                            dps2.shift();
                        }
                        chart.render();
                        xVal++;
                        //}
                    },
                    error: function (xhr, desc, err) {
                        console.log(xhr);
                        console.log(desc);
                        console.log(err);
                    }
                }
            )


        };

        // generates first set of dataPoints
        updateChart(dataLength);

        // update chart after specified time.
        setInterval(function () {
            updateChart()
        }, updateInterval);
    }
    plot_irr_pow_graph();
    $("[name='sensor-checkbox']").bootstrapSwitch();
    $('input[name="sensor-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
        console.log(this); // DOM element
        console.log(event); // jQuery event
        console.log(state); // true | false
    });
    $("[name='motor-checkbox']").bootstrapSwitch();
    $('input[name="motor-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
        console.log(this); // DOM element
        console.log(event); // jQuery event
        console.log(state); // true | false
    });
    $.simpleWeather({
        location: 'Santa Clara,CA',
        woeid: '',
        unit: 'f',
        success: function(weather) {
            html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
            html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
            html += '<li class="currently">'+weather.currently+'</li>';
            html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';

            $("#weather-box").html(html);
        },
        error: function(error) {
            $("#weather").html('<p>'+error+'</p>');
        }
    });


});