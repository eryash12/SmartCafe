<?php
/**
 * Created by PhpStorm.
 * User: yash
 * Date: 2/15/16
 * Time: 7:15 PM
 */
class Home extends CI_Controller{
    function index()
    {
        $params['title'] = "Dashboard";
       $this->load->view('header',$params);
        $this->load->view('dashboard');
        $this->load->view('footer');


    }
    function dashboard(){

    }
    function publish(){

        $params["host"] = "m10.cloudmqtt.com";
        $params["port"] = 	15011;
        $username = "riffmwzz";
        $password = "tNsoqsOji4GO";
        $message = "publish succesfull";

        $params["client_id"] = "ClientID".rand();
        $this->load->library('phpMQTT',$params);

        if ($this->phpmqtt->connect(true,NULL,"pcrfytjr","6PYy_bKDFUyt")) {
//            while(true) {
            $this->phpmqtt->publish("topic", $message, 0);

//            }
            $this->phpmqtt->close();
        }else{
            echo "Fail or time out<br />";
        }
    }
    function send_data($temp,$irr,$eff,$power){


        $this->load->model('user_model');
        $this->user_model->write_data($temp,$irr,$eff,$power);

    }
    function get_data(){
        echo 1;
    }
    function main_page($a){
        $this->load->model('user_model');
        $params['name'] = $a;
        $params['last_name'] = "patil";
        $params['sensor_data'] = $this->user_model->get_data('outTopic');
        $this->load->view('main_page',$params);
    }
//    function test(){
//
//        echo unix_to_human($unix);
//    }

    function Mqttsub(){
        $params["host"] = "m10.cloudmqtt.com";
        $params["port"] = 	15011;
        $username = "riffmwzz";
        $password = "tNsoqsOji4GO";

        $params["client_id"] = "ClientID".rand();
        $this->load->library('PhpMQTT',$params);

        if(!$this->phpmqtt->connect(true,NULL,"riffmwzz","tNsoqsOji4GO")){
            echo "yes";
            exit(1);
        }

        //currently subscribed topics
        $topics['hello'] = array("qos"=>0, "function"=>"procmsg");

        $this->phpmqtt->subscribe($topics,0);
//        exit;
        while($this->phpmqtt->proc()){

        }

        $this->phpmqtt->close();
        function procmsg($topic,$msg){
            echo "Msg Recieved: $msg";

        }
    }

}
?>