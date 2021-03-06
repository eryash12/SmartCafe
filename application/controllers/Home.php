<?php
class Home extends CI_Controller
{
    public function __construct()
    {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        parent::__construct();

    }

    function index()
    {
        $this->output->set_header("Access-Control-Allow-Origin: *");
        $this->output->set_header("Access-Control-Expose-Headers: Access-Control-Allow-Origin");
        $params['title'] = "Dashboard";
        $this->load->view('header', $params);
        $this->load->view('login');
        $this->load->view('footer');

    }

    function login(){

    }
    function dashboard()
    {
        $this->load->model('user_model');
        $this->output->set_header("Access-Control-Allow-Origin: *");
        $this->output->set_header("Access-Control-Expose-Headers: Access-Control-Allow-Origin");
        $params['title'] = "Dashboard";
        $system = $this->user_model->get_current_value('system');

        $system = $system[0]["value"];
        if($system == '1'){
            $start = $this->user_model->get_current_value('start');
            $start = $start[0]["value"];
        }
        else{
            $start = 0;
        }

        $dashdata['system'] = $system;
        $dashdata['start'] = $start;
        $this->load->view('header', $params);
        $this->load->view('dashboard',$dashdata);
        $this->load->view('footer');
    }

    function send_data($temp, $irr, $eff, $power)
    {   $this->load->model('user_model');
        $system = $this->user_model->get_current_value('system');
        $valve = $this->user_model->get_current_value('valve');
        $threshold = $this->user_model->get_current_value('threshold');
        $system = $system[0]["value"];
        $valve = $valve[0]["value"];
        $threshold = $threshold[0]["value"];
//        && ($temp!= "0" && $irr!="0" && $eff!="0" && $power!="0")
        if($system == "1"  )
        {$this->user_model->write_data($temp, $irr, $eff, $power);}
        else{
            $this->user_model->write_current_data(0,0,0,0);
        }
//        $system = $this->user_model->get_current_value('system');
//        $valve = $this->user_model->get_current_value('valve');
//        $threshold = $this->user_model->get_current_value('threshold');

//        $system = $system[0]["value"];
//        $valve = $valve[0]["value"];
//        $threshold = $threshold[0]["value"];
        $data["system"] = intval($system);
        $data["valve"] = intval($valve);
        $data["threshold"]=intval($threshold);
        echo json_encode($data);
//        echo addslashes(json_encode($data));
//        echo "system=$system\rvalve=$valve\r";

    }

    function get_data()
    {
        echo 1;
    }

    function main_page($a)
    {
        $this->load->model('user_model');
        $params['name'] = $a;
        $params['last_name'] = "patil";
        $params['sensor_data'] = $this->user_model->get_data('outTopic');
        $this->load->view('main_page', $params);
    }
//    function test(){
//
//        echo unix_to_human($unix);
//    }

}
?>