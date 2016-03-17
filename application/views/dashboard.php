<script src="<?php echo base_url()?>files/dashboard.js"></script>
<script src="http://canvasjs.com/assets/script/canvasjs.min.js"></script>
<!--<script src="http://code.highcharts.com/highcharts.js"></script>-->
<!--<script src="http://code.highcharts.com/highcharts-more.js"></script>-->
<!--<script src="http://code.highcharts.com/modules/solid-gauge.js"></script>-->
<script src="<?php echo base_url()?>files/justgage.js"></script>
<script src="<?php echo base_url()?>files/raphael-2.1.4.min.js"></script>
<script>
    var system_default = <?php echo $system  ?>;
</script>
<div class="container dash-body">
<!--    <div id="weather-box" class="col-md-2">-->
<!--        <a href="http://www.accuweather.com/en/us/santa-clara-ca/95050/weather-forecast/331977" class="aw-widget-legal">-->
<!--            <!---->
<!--            By accessing and/or using this code snippet, you agree to AccuWeather’s terms and conditions (in English) which can be found at http://www.accuweather.com/en/free-weather-widgets/terms and AccuWeather’s Privacy Statement (in English) which can be found at http://www.accuweather.com/en/privacy.-->
<!--            -->
<!--    </a><div id="awcc1457122637595" class="aw-widget-current"  data-locationkey="331977" data-unit="f" data-language="en-us" data-useip="false" data-uid="awcc1457122637595"></div><script type="text/javascript" src="http://oap.accuweather.com/launch.js"></script>-->
<!--    </div>-->
    <div id="bb1" class="col-md-4 box-big" style="">
<!--        <img src="--><?php //echo base_url();?><!--files/img/chart.png" style="height: 200px;width: 400px" alt=""/>-->
        <div id="chart1" style="height: 100%; width: 100%;"></div>
    </div>
    <div id="avgirr-box" style="padding: 0;" class="col-md-2 box-small"></div>
    <div id="avgtemp-box"  style="padding:0;" class="col-md-2 box-small"></div>
    <div id="avgeff-box" style="margin-top:15px;padding:0;" class="col-md-2 box-small"></div>
    <div id="avgpower-box" class="col-md-2 box-small" style="margin-top: 15px;padding:0;">
        <p>Power Generated</p>
       <span><span id="power">N/A</span>Wh</span>
    </div>
    <div id="bb2" class="col-md-4 box-big" style="margin-top: 15px">
        <div id="chart2" style="height: 100%; width: 100%;"></div>
    </div>
    <div id="sensor-switch-div" class="col-md-2 box-small" style="margin-top: 15px">
       <h3 style="margin-top: 0px">Sensor</h3><br/>
        <input type="checkbox" name="sensor-checkbox" class="switch" checked>
    </div>
    <div id="motor-switch-div" class="col-md-2 box-small" style="margin-top: 15px">
        <h3 style="margin-top: 0px">Water</h3><br/>
        <input type="checkbox" name="motor-checkbox" class="switch" checked>
    </div>
    <div id="weather-box" class="col-md-2 box-small" style="margin-top: 15px;">
        <b><p>Current Weather</p></b><br/>

    </div>
    <div id="sb1" class="col-md-2 box-small" style="margin-top: 15px">
        <b><p>Current Threshold</p></b><br/>
        <div class="col-lg-6">
            <div class="input-group">
                <input type="text" id="threshold" class="form-control" style="width: 70px" placeholder="Search for...">
                <span class="input-group-btn">
                <button class="btn btn-default" id="set-threshold" type="button">Set</button>
                </span>
            </div><!-- /input-group -->
        </div><!-- /.col-lg-6 -->
    </div><!-- /.row -->
    </div>
<!--<input type="text" id="sessiontime" class="form-control" style="width: 70px" placeholder="Search for...">-->
<!--    <div id="chart2" class="col-md-4 box-big" style="height: 300px; width: 500px;">-->
<!--        <img src="--><?php //echo base_url();?><!--files/img/chart.png" style="height: 200px;width: 400px" alt=""/>-->
<!--    </div>-->
</div>
<!--</div>-->