<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
class Admin_model extends CI_Model
{
   function __construct()
   {
      parent::__construct();
      $this->load->helper('path');
   }

   public function profile($master_user_id){

      $admin = $this->db->get_where("admin", array("master_user_id" => $master_user_id))->row_array();

      if(!empty($admin)){

         $result['success'] = 1;
         $result['message'] = "Admin found";
         $result['profile']['master'] = $admin['master'] ? $admin['master'] : "";
         $result['profile']['master_user_id'] = $admin['master_user_id'] ? $admin['master_user_id'] : "";
         $result['profile']['name'] = $admin['name'] ? $admin['name'] : "";
         $result['profile']['user_name'] = $admin['user_name'] ? $admin['user_name'] : "";
         $result['profile']['email_id'] = $admin['email_id'] ? $admin['email_id'] : "";
         $result['profile']['contact_no'] = $admin['contact_no'] ? $admin['contact_no'] : "";
         $result['profile']['profile_image'] = $admin['profile_image'] ? $admin['profile_image'] : "";

      }
      else{
         $result['success'] = 0;
         $result['message'] = "Admin Not found";
      }

      return $result;
   }
   
}