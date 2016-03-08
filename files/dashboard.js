/**
 * Created by yash on 3/3/16.
 */
$(document).ready(function() {
    function plot_temp_eff_graph() {
        var dps = []; // dataPoints
        var dps2 = [];

        var chart = new CanvasJS.Chart("chart1", {
            zoomEnabled: true,
            zoomType: "y",
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
                title: "Efficiency ",
                minimum: 11,
                maximum: 13
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

    var gaugeOptions = {

        chart: {
            type: 'solidgauge'
        },

        title: "",

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            title: {
                y: -50
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    $.ajax(
        {
            url: base+"data/get_average_temp/",
            type: "POST",
            success: function(data, status)
            {
                data = $.parseJSON(data);
                var min = parseFloat(data[0]['mindata']);

                console.log(parseInt(data[0]['mindata']));


                $('#avaragetemperature-box').highcharts(Highcharts.merge(gaugeOptions, {

                    yAxis: {
                        min: min,
                        max: parseFloat(data[0]['maxdata']),
                        title: {
                            text: 'Average Temperature'
                        }
                    },

                    credits: {
                        enabled: false
                    },

                    series: [{
                        name: 'Speed',
                        data: parseFloat(data[0]['avgdata']),
                        dataLabels: {
                            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                            ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                            '<span style="font-size:12px;color:silver">celsius</span></div>'
                        },
                        tooltip: {
                            valueSuffix: 'celsius'
                        }
                    }]

                }));


            },
            error: function(xhr, desc, err)
            {
                console.log(xhr);
                console.log(desc);
                console.log(err);
            }
        }
    )


    // The speed gauge

    // The RPM gauge
    $('#container-rpm').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 5,
            title: {
                text: 'RPM'
            }
        },

        series: [{
            name: 'RPM',
            data: [1],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                '<span style="font-size:12px;color:silver">* 1000 / min</span></div>'
            },
            tooltip: {
                valueSuffix: ' revolutions/min'
            }
        }]

    }));

    // Bring life to the dials
    setTimeout(function () {
        // Speed
        var chart = $('#container-speed').highcharts(),
            point,
            newVal,
            inc;

        if (chart) {
            point = chart.series[0].points[0];
            inc = Math.round((Math.random() - 0.5) * 100);
            newVal = point.y + inc;

            if (newVal < 0 || newVal > 200) {
                newVal = point.y - inc;
            }

            point.update(newVal);
        }

        // RPM
        chart = $('#container-rpm').highcharts();
        if (chart) {
            point = chart.series[0].points[0];
            inc = Math.random() - 0.5;
            newVal = point.y + inc;

            if (newVal < 0 || newVal > 5) {
                newVal = point.y - inc;
            }

            point.update(newVal);
        }
    }, 2000);




});