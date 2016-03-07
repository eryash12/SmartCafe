/**
 * Created by yash on 3/3/16.
 */
$(document).ready(function() {

    var dps = []; // dataPoints

    var chart = new CanvasJS.Chart("chart1",{
        title :{
            text: "Live Random Data"
        },
        data: [{
            type: "line",
            dataPoints: dps
        }]
    });

    var xVal = 0;
    var yVal = 100;
    var updateInterval = 100;
    var dataLength = 500; // number of dataPoints visible at any point

    var updateChart = function (count) {
        count = count || 1;
        // count is number of times loop runs to generate random dataPoints.

        for (var j = 0; j < count; j++) {
            yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
            dps.push({
                x: xVal,
                y: yVal
            });
            xVal++;
        };
        if (dps.length > dataLength)
        {
            dps.shift();
        }

        chart.render();

    };

    // generates first set of dataPoints
    updateChart(dataLength);

    // update chart after specified time.
    setInterval(function(){updateChart()}, updateInterval);

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