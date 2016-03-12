<?php
/**
 * Created by PhpStorm.
 * User: yash
 * Date: 3/8/16
 * Time: 12:21 PM
 */
?>
<html >
<head>
    <link href='http://fonts.googleapis.com/css?family=Titillium+Web:400,300,600' rel='stylesheet' type='text/css'>
    <link href="<?php echo base_url()?>files/style.css" rel="stylesheet">

</head>

<body>
<div class="form">
    <ul class="tab-group">
        <li class="tab active"><a href="#signup">Sign Up</a></li>
        <li class="tab"><a href="#login">Log In</a></li>
    </ul>

    <div class="tab-content">
        <div id="signup">
            <h1>Sign Up</h1>
            <form action="javascript:void(0)" method="post">
                <div class="top-row">
                    <div class="field-wrap">
                        <label>
                            First Name<span class="req">*</span>
                        </label>
                        <input id="fname" type="text" required autocomplete="off" />
                    </div>

                    <div class="field-wrap">
                        <label>
                            Last Name<span class="req">*</span>
                        </label>
                        <input id="lname" type="text"required autocomplete="off"/>
                    </div>
                </div>

                <div class="field-wrap">
                    <label>
                        Email Address<span class="req">*</span>
                    </label>
                    <input id="email" type="email"required autocomplete="off"/>
                </div>

                <div class="field-wrap">
                    <label>
                        Set A Password<span class="req">*</span>
                    </label>
                    <input id="pass" type="password"required autocomplete="off"/>
                </div>

                <button type="submit" class="button button-block"/>Register</button>

            </form>

        </div>

        <div id="login">
            <form action="javascript:void(0)" method="post">

                <div class="field-wrap">
                    <label>
                        Email Address<span class="req">*</span>
                    </label>
                    <input id="login-email" type="email"required autocomplete="off"/>
                </div>

                <div class="field-wrap">
                    <label>
                        Password<span class="req">*</span>
                    </label>
                    <input id="login-pass" type="password"required autocomplete="off"/>
                </div>

                <p class="forgot"><a href="#">Forgot Password?</a></p>

                <button type="submit" class="button button-block"/>Login</button>

            </form>

        </div>

    </div><!-- tab-content -->

</div> <!-- /form -->
<!--<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>-->

<script src="<?php echo base_url()?>files/index.js"></script>

</body>
</html>

