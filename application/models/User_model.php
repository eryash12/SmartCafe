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
    }
    function get_data($topic){
        $this->db->select("value");
        $this->db->from("sensors_data");
        $this->db->where('topic',$topic);
        $result = $this->db->get();
        return $result->result_array();
    }
}