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
        $unix =  now('UM8');
        $data['timestamp'] = $unix;
        $this->db->insert("sensors_data", $data);
    }
    function get_data($topic){
        $this->db->select("value");
        $this->db->from("sensors_data");
        $this->db->where('topic',$topic);
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
}