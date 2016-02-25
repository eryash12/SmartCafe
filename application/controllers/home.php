<?php
/**
 * Created by PhpStorm.
 * User: yash
 * Date: 2/15/16
 * Time: 7:15 PM
 */
class home extends CI_Controller{
    function index()
    {

        $params["host"] = "m10.cloudmqtt.com";
        $params["port"] = 11740;
        $username = "pcrfytjr";
        $password = "6PYy_bKDFUyt";

        $params["client_id"] = "ClientID".rand();
        $this->load->library('phpMQTT',$params);

        if(!$this->phpmqtt->connect(true,NULL,"pcrfytjr","6PYy_bKDFUyt")){
            echo "yes";
            exit(1);
        }

        //currently subscribed topics
        $topics['outTopic'] = array("qos"=>0, "function"=>"procmsg");

        $this->phpmqtt->subscribe($topics,0);
        exit;
        while($this->phpmqtt->proc()){

        }

        $this->phpmqtt->close();
        function procmsg($topic,$msg){
            echo "Msg Recieved: $msg";
        }


    }
    function publish(){

        $params["host"] = "m10.cloudmqtt.com";
        $params["port"] = 11740;
        $username = "pcrfytjr";
        $password = "6PYy_bKDFUyt";
        $message = "publish succesfull";

        $params["client_id"] = "ClientID".rand();
        $this->load->library('phpMQTT',$params);

        if ($this->phpmqtt->connect(true,NULL,"pcrfytjr","6PYy_bKDFUyt")) {
            $this->phpmqtt->publish("topic",$message, 0);
            $this->phpmqtt->close();
        }else{
            echo "Fail or time out<br />";
        }
    }


}
?>