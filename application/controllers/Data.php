<?php
/**
 * Created by PhpStorm.
 * User: yash
 * Date: 3/6/16
 * Time: 5:33 PM
 */
class Data extends CI_Controller{
    public function __construct()
    {
        parent::__construct();

    }
   function get_temp(){
       $this->output->set_header('HTTP/1.0 200 OK');
       $this->load->model('user_model');
       $temp = $this->user_model->get_current_value('temperature');
//       foreach ($temp as $v){
//           echo $v["temperature"];
//           echo "<br>";
//           echo unix_to_human($v["timestamp"]);
////           echo unix_to_human(gmt_to_local($v["timestamp"],"UM8",FALSE));
//           echo "<br>";
//
//       }

       echo json_encode($temp[0]["value"]);
   }
}
?>