/**
 * Created by yash on 3/3/16.
 */
$(document).ready(function() {
    if(system_default === 1 ) {
        var startTimeStamp = Math.floor(Date.now() / 1000);;
    }
    else{
        var startTimeStamp = 0;
    }
    var currentTimeStamp = 0;
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
                title: "Time(Seconds)"
            },
            axisY: {
                title: "Temperature(C)"
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
                title: "Irradiance(W/m^2)"
            },
            axisY2: {
                title: "Power(Wh) "
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
        var flag = 0 ;
        if(state) {
            flag = 1;
            startTimeStamp =  Math.floor(Date.now() / 1000);
        }

        $.ajax(
            {
                url: base + "data/set_current_value/system/"+flag,
                type: "POST",
                success: function (data, status) {
                    //if (data !== 'success')
                    //{
                    //    alert("Error Contacting the server");
                    //}


                },
                error: function (xhr, desc, err) {
                    console.log(xhr);
                    console.log(desc);
                    console.log(err);
                }
            }
        )




    });
     $("[name='motor-checkbox']").bootstrapSwitch();
    $('input[name="motor-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
        console.log(this); // DOM element
        console.log(event); // jQuery event
        console.log(state); // true | false
        var flag = 0 ;
        if(state) {
            flag = 1;
        }

        $.ajax(
            {
                url: base + "data/set_current_value/valve/"+flag,
                type: "POST",
                success: function (data, status) {
                    //if (data !== 'success')
                    //{
                    //    alert("Error Contacting the server");
                    //}


                },
                error: function (xhr, desc, err) {
                    console.log(xhr);
                    console.log(desc);
                    console.log(err);
                }
            }
        )
    });
    function toCelsius(f) {
        return (5/9) * (f-32);
    }
    $.simpleWeather({
        location: 'Santa Clara,CA',
        woeid: '',
        unit: 'c',
        success: function(weather) {
            html = '<p><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</p>';
            html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
            html += '<li class="currently">'+weather.currently+'</li>';
            html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';

            $("#weather-box").append(html);
        },
        error: function(error) {
            $("#weather").append('<p>'+error+'</p>');
        }
    });

var system,valve,threshold;
function change_avg_values() {
    $.ajax(
        {
            url: base + "data/get_all_current_values",
            type: "POST",
            success: function (data, status) {
                data = $.parseJSON(data);
                console.log(data);
                for(var i = 0; i < data.length ; ++i ){
                    if(data[i]["tag"] === 'system'){
                        system = data[i]["value"];
                    }
                    if(data[i]["tag"] === 'valve'){
                        valve = data[i]["value"];
                    }
                    if(data[i]["tag"] === 'threshold'){
                        threshold = data[i]["value"];
                    }

                }
                if(system === '1'){
                    $("[name='sensor-checkbox']").bootstrapSwitch('state', true,true);
                }
                else{
                    $("[name='sensor-checkbox']").bootstrapSwitch('state', false,true);
                }
                if(valve === '1'){
                    $("[name='motor-checkbox']").bootstrapSwitch('state', true,true);
                }
                else{
                    $("[name='motor-checkbox']").bootstrapSwitch('state', false,true);
                }
                $("#threshold").val(threshold);

            },
            error: function (xhr, desc, err) {
                console.log(xhr);
                console.log(desc);
                console.log(err);
            }
        }
    )
    $.ajax(
        {
            url: base + "data/get_average_value/irradiance",
            type: "POST",
            success: function (data, status) {
                data = $.parseJSON(data);
                var min = parseFloat(data[0]['mindata']).toFixed(2);
                var max = parseFloat(data[0]['maxdata']).toFixed(2);
                var avg = parseFloat(data[0]['avgdata']).toFixed(2);
                console.log(parseInt(data[0]['mindata']));

                $("#avgirr-box").empty();
                var avgTemp = new JustGage({
                    id: "avgirr-box",
                    value: avg,
                    min: min,
                    max: max,
                    title: "Average Irradiance"
                });


            },
            error: function (xhr, desc, err) {
                console.log(xhr);
                console.log(desc);
                console.log(err);
            }
        }
    )
    $.ajax(
        {
            url: base + "data/get_average_value/temperature",
            type: "POST",
            success: function (data, status) {
                data = $.parseJSON(data);
                var min = parseFloat(data[0]['mindata']).toFixed(2);
                var max = parseFloat(data[0]['maxdata']).toFixed(2);
                var avg = parseFloat(data[0]['avgdata']).toFixed(2);
                console.log(parseInt(data[0]['mindata']));

                $("#avgtemp-box").empty();
                var avgTemp = new JustGage({
                    id: "avgtemp-box",
                    value: avg,
                    min: min,
                    max: max,
                    title: "Average Temperature"
                });


            },
            error: function (xhr, desc, err) {
                console.log(xhr);
                console.log(desc);
                console.log(err);
            }
        }
    )
    $.ajax(
        {
            url: base + "data/get_average_value/efficiency",
            type: "POST",
            success: function (data, status) {
                data = $.parseJSON(data);
                var min = parseFloat(data[0]['mindata']).toFixed(2);
                var max = parseFloat(data[0]['maxdata']).toFixed(2);
                var avg = parseFloat(data[0]['avgdata']).toFixed(2);
                console.log(parseInt(data[0]['mindata']));

                $("#avgeff-box").empty();
                var avgEff = new JustGage({
                    id: "avgeff-box",
                    value: avg,
                    min: min,
                    max: max,
                    title: "Average Efficiency"
                });


            },
            error: function (xhr, desc, err) {
                console.log(xhr);
                console.log(desc);
                console.log(err);
            }
        }
    )

    $.ajax(
        {
            url: base + "data/get_average_value/power",
            type: "POST",
            success: function (data, status) {
                data = $.parseJSON(data);
                currentTimeStamp =  Math.floor(Date.now() / 1000);
                var timediff = currentTimeStamp-startTimeStamp;

                console.log(timediff);

                var min = parseFloat(data[0]['mindata']).toFixed(2);
                var max = parseFloat(data[0]['maxdata']).toFixed(2);
                var avg = parseFloat(data[0]['avgdata']).toFixed(2);
                console.log(parseInt(data[0]['mindata']));
                timediff = timediff/3600;
                var totalPower = avg*timediff;
                parseFloat(totalPower).toFixed(1);
                $("#power").html(totalPower);
                //$("#avgpower-box").empty();
                //var g = new JustGage({
                //    id: "avgpower-box",
                //    value: avg,
                //    min: min,
                //    max: max,
                //    title: "Average power"
                //});


            },
            error: function (xhr, desc, err) {
                console.log(xhr);
                console.log(desc);
                console.log(err);
            }
        }

    )
    $.ajax(
        {
            url: base + "data/get_average_value/efficiency",
            type: "POST",
            success: function (data, status) {
                data = $.parseJSON(data);
                var min = parseFloat(data[0]['mindata']).toFixed(2);
                var max = parseFloat(data[0]['maxdata']).toFixed(2);
                var avg = parseFloat(data[0]['avgdata']).toFixed(2);
                console.log(parseInt(data[0]['mindata']));

                $("#avgeff-box").empty();
                var avgEff = new JustGage({
                    id: "avgeff-box",
                    value: avg,
                    min: min,
                    max: max,
                    title: "Average Efficiency"
                });


            },
            error: function (xhr, desc, err) {
                console.log(xhr);
                console.log(desc);
                console.log(err);
            }
        }
    )

}   var avgTemp,avgEff,avgPower;
    change_avg_values();
    setInterval(function(){ change_avg_values()}, 10000);
    // The speed gauge

    // The RPM gauge


    $('#set-threshold').on('click',function(e){
        var temp = $('#threshold').val();
        $.ajax(
            {
                url: base + "data/set_current_value/threshold/"+temp,
                type: "POST",
                success: function (data, status) {
                    alert("Threshold set");
                    //if (data !== 'success')
                    //{
                    //    alert("Error Contacting the server");
                    //}


                },
                error: function (xhr, desc, err) {
                    console.log(xhr);
                    console.log(desc);
                    console.log(err);
                }
            }
        )
    });


});