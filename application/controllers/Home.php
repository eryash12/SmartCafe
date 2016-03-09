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
        $this->load->view('dashboard');
        $this->load->view('footer');


    }
    function login(){
        $this->output->set_header("Access-Control-Allow-Origin: *");
        $this->output->set_header("Access-Control-Expose-Headers: Access-Control-Allow-Origin");
        $params['title'] = "Dashboard";
        $this->load->view('header', $params);
        $this->load->view('login');
        $this->load->view('footer');
    }
    function dashboard()
    {

    }

    function send_data($temp, $irr, $eff, $power)
    {


        $this->load->model('user_model');
        $this->user_model->write_data($temp, $irr, $eff, $power);
        $system = $this->user_model->get_current_value('system');
        $valve = $this->user_model->get_current_value('valve');

        $system = $system[0]["value"];
        $valve = $valve[0]["value"];

        $data["system"] = $system;
        $data["valve"] = $valve;
        $data["threshold"]=0;
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