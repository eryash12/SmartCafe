<?php
/**
 * Created by PhpStorm.
 * User: yash
 * Date: 3/6/16
 * Time: 5:33 PM
 */
class Data extends CI_Controller{
    public function __construct()
    {    header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        parent::__construct();

    }
   function get_temp_and_eff(){
       $this->output->set_header('HTTP/1.0 200 OK');
       $this->load->model('user_model');
        $temp = $this->user_model->get_current_value('temperature');
       $eff = $this->user_model->get_current_value('efficiency');
//       foreach ($temp as $v){
//           echo $v["temperature"];
//           echo "<br>";
//           echo unix_to_human($v["timestamp"]);
////           echo unix_to_human(gmt_to_local($v["timestamp"],"UM8",FALSE));
//           echo "<br>";
//
//       }
        $data['temp'] = $temp[0]["value"];
       $data['eff'] = $eff[0]["value"];
       echo json_encode($data);
   }
    function get_irr_and_pow(){
        $this->output->set_header('HTTP/1.0 200 OK');
        $this->load->model('user_model');
        $irr = $this->user_model->get_current_value('irradiance');
        $pow = $this->user_model->get_current_value('power');
//       foreach ($temp as $v){
//           echo $v["temperature"];
//           echo "<br>";
//           echo unix_to_human($v["timestamp"]);
////           echo unix_to_human(gmt_to_local($v["timestamp"],"UM8",FALSE));
//           echo "<br>";
//
//       }
        $data['irr'] = $irr[0]["value"];
        $data['pow'] = $pow[0]["value"];
        echo json_encode($data);
    }

   function get_average_value($value){
       $this->output->set_header('HTTP/1.0 200 OK');
       $this->load->model('user_model');

       $temp = $this->user_model->get_avg_value($value);
       echo json_encode($temp);
   }
    function set_current_value($topic,$value){
        $this->load->model('user_model');
        $this->user_model->set_current_value($topic,$value);
        if($topic == "system" && $value == "0"){
            $this->user_model->delete_log();
        }
        $this->output->set_header('HTTP/1.0 200 OK');
        echo "success";
    }
    function get_all_current_values(){
        $this->output->set_header('HTTP/1.0 200 OK');
        $this->load->model('user_model');
        $data = $this->user_model->get_all_current_values();
        echo json_encode($data);

    }
    function sign_up_user(){
        $this->output->set_header('HTTP/1.0 200 OK');
        $data = $this->input->post('abcd');

        $data = json_decode($data);
//        echo $data->fname;

        $this->load->model('user_model');
        $status = $this->user_model->signup_user($data);
        echo $status;
    }
    function user_login(){
        $data = $this->input->post('abcd');

        $data = json_decode($data);


        $this->load->model('user_model');
        $status = $this->user_model->login_user($data);
        echo $status;
    }

}
?>