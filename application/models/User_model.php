<?php

class User_model extends CI_Model
{

    function __construct()
    {
        // Call the Model constructor
        parent::__construct();

    }
    function write_data($temp,$irr,$eff,$power){
//        $data['firstname'] = json_encode($a);
        $data['temperature'] = $temp;
        $data['irradiance'] = $irr;
        $data['efficiency'] = $eff;
        $data['power']= $power;
        $this->load->helper('date');
        $unix =  now('PST');
        $data['timestamp'] = $unix;

        $this->db->insert("sensors_data", $data);


        $this->db->query("UPDATE current_values SET value = $temp where tag = 'temperature'");
        $this->db->query("UPDATE current_values SET value = $irr where tag = 'irradiance'");
        $this->db->query("UPDATE current_values SET value = $eff where tag = 'efficiency'");
        $this->db->query("UPDATE current_values SET value = $power where tag = 'power'");



    }
    function write_current_data($temp,$irr,$eff,$power){
//        $data['firstname'] = json_encode($a);



        $this->db->query("UPDATE current_values SET value = $temp where tag = 'temperature'");
        $this->db->query("UPDATE current_values SET value = $irr where tag = 'irradiance'");
        $this->db->query("UPDATE current_values SET value = $eff where tag = 'efficiency'");
        $this->db->query("UPDATE current_values SET value = $power where tag = 'power'");



    }

    function get_current_value($topic){
        $this->db->select("value");
        $this->db->from("current_values");
        $this->db->where('tag',$topic);
        $result = $this->db->get();
        return $result->result_array();
    }
    function get_temp(){
        $this->db->select("temperature,timestamp");
        $this->db->from("sensors_data");
//        $this->db->limit("10");
        $this->db->order_by("timestamp DESC");
        $result = $this->db->get();
        return $result->result_array();
    }
    function get_avg_value($type){
       $result =  $this->db->query("select MIN($type) as mindata,MAX($type) as maxdata ,AVG($type) as avgdata from sensors_data");
        return $result->result_array();
    }
    function set_current_value($topic,$value){
        $this->db->query("UPDATE current_values SET value = $value where tag = '$topic'");
    }
    function signup_user($fname,$lname,$email,$password){
//        $email = $data->email;
        $check =  $this->db->query("select email from users where email = '$email'");
//        $fname = $data->fname;
//        $lname = $data->lname;
//        $password = $data->pass;
        if($check->num_rows() > 0){
            return "duplicate";
        }
        else{
            $this->db->query("INSERT INTO SmartCafe_db.users (fname, lname, password,email) VALUES ('$fname', '$lname', '$password' , '$email')");
            return "success";
        }
        return "null";
    }
    function login_user($data){
        $email = $data->email;
        $password = $data->pass;
        $check =  $this->db->query("select password from users where email = '$email'");
        if($check->num_rows() > 0){
            $obj = $check->result_array();
            $pass = $obj[0]["password"];
            if($pass == $password){
                return "success";
            }
            else{
                return "wrong-pass";
            }
        }
        else{
            echo "fail";
        }
    }
    function get_all_current_values(){

            $this->db->select("*");
            $this->db->from("current_values");
//            $this->db->where('tag',$topic);
            $result = $this->db->get();
            return $result->result_array();

    }
    function delete_log(){
        $this->db->query("DELETE FROM sensors_data WHERE 1");
    }
}