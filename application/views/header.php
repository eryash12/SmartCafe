<!DOCTYPE html>
<html lang = "en">
<head>
    <?php
    $this->output->set_header('Access-Control-Allow-Origin: *');?>
    <script>var base = "<?php echo base_url();?>"</script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="<?php echo base_url()?>files/jquery.simpleWeather.js"></script>
    <link href="<?php echo base_url()?>files/bootstrap-switch.min.css" rel="stylesheet">


    <script src="<?php echo base_url()?>files/bootstrap-switch.min.js"></script>




<!--    <link rel="icon" type="image/png" href="--><?php //echo base_url()?><!--files/pics/bartlogo.png" />-->
    <!--            Bootstrap-->
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="<?php echo base_url()?>files/styles.css">

</head>
<title>
    <?php echo $title?>
</title>

<body id="body" style="z-index: 0">
<header id="header">
    <nav class="navbar ">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="<?php echo base_url()?>">
<!--                    <img alt="Brand" src="--><?php //echo base_url()?><!--files/pics/bartlogo.png" height = "30px" width="50px">-->
                </a>
            </div>
        </div>
    </nav>
</header>
