<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Common_model extends CI_Model

{

   function __construct()

   {

      parent::__construct();

      $this->load->helper('path');

   }



   public function checkjson(&$json)

   {

      $json = json_decode($json);

      return (json_last_error() === JSON_ERROR_NONE);

   }

}