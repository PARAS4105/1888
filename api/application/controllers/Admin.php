<?php
defined('BASEPATH') or exit('No direct script access allowed');
// header("Access-Control-Allow-Headers: Authorization, Content-Type");
// header("Access-Control-Allow-Origin: *");
// header('content-type: application/json; charset=utf-8');


header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Authorization, Access-Token, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");


include 'src/Cloudinary.php';
include 'src/Uploader.php';


// \Cloudinary::config(array(
// 	"cloud_name" => "dedhftvvm",
// 	"api_key"    => "242185158155281",
// 	"api_secret" => "W9BheY0TXN6KFquV4pUwmBtOlAk",
// 	"secure" => true
// ));

class Admin extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */

	function __construct() {
		parent::__construct();
		$postJson = file_get_contents("php://input");
		
		/* Checking if Request is in Json Format */
		if ($this->common_model->checkjson($postJson)) {
			/** Skipping Json Decode Request if from_app is true **/
			if (isset($_POST["from_app"]) && $_POST["from_app"] == "true") {
			} else {
				$_POST = json_decode(file_get_contents("php://input"), true);
			}
		}

		/** Setting up timezone for India **/
		date_default_timezone_set('Asia/Kolkata');
		$this->db->query('SET SESSION time_zone = "+05:30"');

		/** Setting up sql_mode **/
		$this->db->query("SET SESSION sql_mode = 'NO_ENGINE_SUBSTITUTION'");
	}


	// public function cloudUpload($tmp_name) {
	// 	$cloudinaryImage = Cloudinary\Uploader::upload($tmp_name, array("resource_type" => "auto"));
	// 	return $cloudinaryImage;
	// }


	function login() {

		$post = $this->input->post();

		if (isset($post["email_id"]) && $post["email_id"] != "") {
			if (isset($post["password"]) && $post["password"] != "") {

				$check = $this->db->get_where("admin", array("email_id" => $post["email_id"], "password" => $post["password"]))->row_array();

				if (!empty($check)) {
					$response["success"] = 1;
					$response["message"] = "Successfully Logged In";
					$response["admin"]["admin_id"] = $check["admin_id"];
				} else {
					$response["success"] = 0;
					$response["message"] = "Incorrect email or password.";
				}
			} else {
				$response["success"] = 0;
				$response["message"] = "Password Can not be blank";
			}
		} else {
			$response["success"] = 0;
			$response["message"] = "Email address can not be blank.";
		}
		echo json_encode($response);
	}


	function profile($action){

		$post = $this->input->post();
		$actions = array("detail", "save");
		
		if(in_array($action, $actions)){

			if($action == "save") { 
				
				if(isset($post["name"]) && $post["name"] != "") {
					if(isset($post["email_id"]) && $post["email_id"] != "") {
									
						$data["name"] = $post["name"];
						$data["email_id"] = $post["email_id"];
						$data["contact_no"] = $post["contact_no"] ? $post["contact_no"] : "";
						$data["password"] = $post["password"] ? $post["password"] : "";
					
						if($_FILES["profile_image"]['tmp_name']){
							$path = FC_PATH."images/";
							
							$extension = pathinfo($_FILES["profile_image"]['name'], PATHINFO_EXTENSION);
							$file_name = "profile_image_".time().'_'.rand(1,100).'.'.$extension;                        
							$move = move_uploaded_file($_FILES["profile_image"]['tmp_name'], $path.$file_name);
							if($move){
								$data['profile_image'] = $file_name;
							}
						}

						if(isset($post["admin_id"]) && $post["admin_id"] != "") {

							$data["updated_at"] = time();
							$this->db->where("admin_id", $post["admin_id"]);
							$admin_updated = $this->db->update("admin", $data);
							$admin_id = $post["admin_id"];

							if ($admin_updated) {
								$response["success"] = 1;
								$response["message"] = "admin has been updated";
								$response["admin_id"] = $admin_id;
							} else {
								$response["success"] = 0;
								$response["message"] = "Opps.. Something went wrong.";
							}

						} else {
							$data["created_at"] = time();
							$admin_added = $this->db->insert("admin", $data);
							$admin_id = $this->db->insert_id();

							if ($admin_added) {
								$response["success"] = 1;
								$response["message"] = "Admin has been added";
								$response["admin_id"] = $admin_id;
							} else {
								$response["success"] = 0;
								$response["message"] = "Opps.. Something went wrong.";
							}
						}

					} else {
						$response["sucess"] = 0;
						$response["message"] = "Email can not be blank";
					}
				} else {
					$response["sucess"] = 0;
					$response["message"] = "Name can not be blank";
				}
			}

			if($action == "detail") {

				if ($post["admin_id"] != "") {

					$admin = $this->db->query("select * from admin where admin_id = ".$post["admin_id"])->row_array();

					if(!empty($admin)){

						$response['profile']['name'] = $admin['name'] ? $admin['name'] : "";
						$response['profile']['email_id'] = $admin['email_id'] ? $admin['email_id'] : "";
						$response['profile']['contact_no'] = $admin['contact_no'] ? $admin['contact_no'] : "";
						$response['profile']['profile_image'] = $admin['profile_image'] ? BASE_URL."assets/images/".$admin['profile_image'] : "";

						$response['success'] = 1;
						$response['message'] = "Admin found";
					} else {
						$response['success'] = 0;
						$response['message'] = "Admin Not found";
					}
				} else {
					$response['success'] = 0;
					$response['message'] = "required field can not be blank!";
				}
			}
		}

		echo json_encode($response);
		die;
	}


	public function inquiry($action) {

		$actions = array("save", "list");
		$post = $this->input->post();

		if (in_array($action, $actions)) {

			if ($action == "save") {

				if (isset($post["type"]) && $post["type"] != "") {
					if (isset($post["name"]) && $post["name"] != "") {
						if (isset($post["contact_no"]) && $post["contact_no"] != "") {
							if (isset($post["email"]) && $post["email"] != "") {
										
								$data["type"] = $post["type"];
								$data["name"] = $post["name"];
								$data["contact_no"] = $post["contact_no"];
								$data["email"] = $post["email"];
								$data["city_id"] = $post["city"] ? $post["city"] : null;
								$data["state_id"] = $post["state"] ? $post["state"] : null;
								$data["pincode"] = $post["pincode"] ? $post["pincode"] : null;
								$data["company_name"] = $post["company_name"] ? $post["company_name"] : null;
								if($post["other_occupation"]) {
									$data["occupation"] = $post["other_occupation"];
								} else {
									$data["occupation"] = $post["occupation"] ? $post["occupation"] : null;
								}
								$data["preferred_location"] = $post["preferred_location"] ? $post["preferred_location"] : null;
								$data["why_invest"] = $post["why_invest"] ? $post["why_invest"] : null;
								$data["remarks"] = $post["remarks"] ? $post["remarks"] : null;
								$data["investment"] = $post["investment"] ? $post["investment"] : null;
								$data["created_at"] = time();

								$inquiry = $this->db->insert('inquiry', $data);

								$state_name = "";
								if($post["state"]) {
									$state_name = $this->db->query("select name from states where id = ".$post["state"])->row()->name;
								}
								
								$city_name = "";
								if($post["city"]) {
									$city_name = $this->db->query("select name from cities where id = ".$post["city"])->row()->name;
								}

								$data["state"] = $state_name ? $state_name : "";
								$data["city"] = $city_name ? $city_name : "";

								$this->email_model->contactus_enquiry($data);

								if ($inquiry) {
									$response["success"] = 1;
									$response["message"] = "Your inquiry has been Submitted Sucessfully..";
								} else {
									$response["success"] = 0;
									$response["message"] = "Opps.. Something went wrong.";
								}
							} else {
								$response["success"] = 0;
								$response["message"] = "email can not be blank";
							}
						} else {
							$response["success"] = 0;
							$response["message"] = "contact can not be blank";
						}
					} else {
						$response["success"] = 0;
						$response["message"] = "name can not be blank";
					}
				} else {
					$response["success"] = 0;
					$response["message"] = "required field can not be blank";
				}

			}

			if ($action == "list") {

				$cond = "";
				$search_q = "";
				$searchColumns = array('name', 'contact_no', 'email');
				if (isset($post["search"]) && $post["search"] != "") {
					$searchTerms = [$post["search"]];
					foreach ($searchTerms as $searchTerm) {
						foreach ($searchColumns as $searchColumn) {
							if ($search_q == "") {
								$search_q .= " and (" . $searchColumn . " like '%" . $searchTerm . "%'";
							} else {
								$search_q .= " or " . $searchColumn . " like '%" . $searchTerm . "%'";
							}
						}
					}
					$search_q .= ")";
				}

				$limit_q = "";
				if (($post["page"] || $post["page"] == "0") && $post["limit"]) {
					$limit_q = " limit " . ((int)($post["page"]) * (int)($post["limit"])) . ", " . $post["limit"];
				}

				if($post["from_date"] && $post["to_date"]) {
					$from_date =  strtotime(date($post["from_date"]."00:00:00"));
					$to_date =  strtotime(date($post["to_date"]."23:59:59"));

					$cond .= " and created_at between ".$from_date." and ".$to_date;
				}

				if($post["type"]) {
					$cond .= " and type = '".$post["type"]."'";
				}

				$inquiry_list = $this->db->query("select * from inquiry where 1 = 1". $search_q . $cond . " order by created_at desc " . $limit_q)->result_array();

				$total_inquiry_get = $this->db->query("select * from inquiry where 1 = 1". $search_q . $cond)->num_rows();

				if (!empty($inquiry_list)) {
					$i = 0;
					foreach ($inquiry_list as $list) {

						$response["list"][$i]["type"] = $list["type"];
						$response["list"][$i]["id"] = $list["id"];
						$response["list"][$i]["name"] = $list["name"];
						$response["list"][$i]["contact_no"] = $list["contact_no"];
						$response["list"][$i]["email"] = $list["email"];						
						$response["list"][$i]["pincode"] = $list["pincode"] ? $list["pincode"] : "";
						$response["list"][$i]["company_name"] = $list["company_name"] ? $list["company_name"] : "";
						$response["list"][$i]["occupation"] = $list["occupation"] ? $list["occupation"] : "";
						$response["list"][$i]["preferred_location"] = $list["preferred_location"] ? $list["preferred_location"] : "";
						$response["list"][$i]["why_invest"] = $list["why_invest"] ? $list["why_invest"] : "";
						$response["list"][$i]["remarks"] = $list["remarks"] ? $list["remarks"] : "";
						$response["list"][$i]["investment"] = $list["investment"] ? $list["investment"] : "";

						$state_name = "";
						if($list["state_id"]) {
							$state_name = $this->db->query("select name from states where id = ".$list["state_id"])->row()->name;
						}
						
						$city_name = "";
						if($list["city_id"]) {
							$city_name = $this->db->query("select name from cities where id = ".$list["city_id"])->row()->name;
						}

						$response["list"][$i]["state"] = $state_name ? $state_name : "";
						$response["list"][$i]["city"] = $city_name ? $city_name : "";
						$response["list"][$i]["date"] = date("d/m/Y", $list["created_at"]);
						$response["list"][$i]["time"] = date("h:i", $list["created_at"]);
						$response["list"][$i]["format"] = date("a", $list["created_at"]);
						$response["list"][$i]["created_at"] = date("d/m/Y", $list["created_at"]) . " " . date("h:i", $list["created_at"]) . " " . date("a", $list["created_at"]);

						$i++;
					}

					$response["message"] = "";
					$response["success"] = 1;
					$response["total_records"] = $total_inquiry_get;
				} else {
					$response["message"] = "No inquiry found";
					$response["success"] = 0;
				}

			}
		}

		echo json_encode($response);
		die;
	}

	public function inquiry_type($action) {

		$actions = array("list");
		$post = $this->input->post();

		if (in_array($action, $actions)) {

			if($action == "list") {
				
				$types = $this->db->query("select type from inquiry where type is not null group by type")->result_array();

				if (!empty($types)) {
						
					foreach ($types as $value) {
						$types_get[] = $value['type'] ? array("type" => $value['type']) : "";
					}

					$response["types"] = $types_get;
					$response["success"] = 1;
					$response["message"] = "Records found.";
				} else {
					$response["message"] = "Records not found.";
					$response["total_records"] = 0;
				}
			}
		}
		echo json_encode($response);
		die;
	}


	public function country($action) {
        $actions = array("list");
        $post = $this->input->post();
        if (in_array($action, $actions)) {
            if ($action == "list") {

				$results = $this->db->query("select SQL_CALC_FOUND_ROWS * from country where 1=1")->result_array();
				$queryNew = $this->db->query('SELECT FOUND_ROWS() as myCounter');
				$total_records = $queryNew->row()->myCounter;
				if (empty($results)) {
					$response["success"] = 0;
					$response["message"] = "Records not found.";
				} else {
					$i = 0;
					foreach ($results as $value) {
						$response["data"][$i]["id"] = $value["id"];
						$response["data"][$i]["iso"] = $value["iso"] ? $value["iso"] : "";
						$response["data"][$i]["flag"] = "https://flagcdn.com/w40/" . $value["iso"] . ".webp";
						$response["data"][$i]["name"] = $value["name"] ? $value["name"] : "";
						$response["data"][$i]["nicename"] = $value["nicename"] ? $value["nicename"] : "";
						$response["data"][$i]["iso3"] = $value["iso3"] ? $value["iso3"] : "";
						$response["data"][$i]["numcode"] = $value["numcode"] ? $value["numcode"] : "";
						$response["data"][$i]["phonecode"] = $value["phonecode"] ? $value["phonecode"] : "";
						$response["data"][$i]["sort"] = $value["sort"] ? $value["sort"] : "";
						$i++;
					}
					$response["success"] = 1;
					$response["total_records"] = intval($total_records);
					$response["message"] = "Records found.";
				}

            }
        } else {
            $response["success"] = 0;
            $response["message"] = "Invalid Operation.";
        }
        echo json_encode($response);
        die;
    }


	public function states(){
        $post = $this->input->post();
        if($post['country_id'] != ""){
            $states = $this->db->get_where('states',array('country_id'=>$post['country_id']))->result_array();
            if(!empty($states)){
                $response['states'] = $states;
                $response['success'] = 1;   
                $response['message'] = "States found";
            } else {    
                $response['success'] = 0;
                $response['message'] = "No States found";
            } 
        } else {
            $response['success'] = 0;
            $response['message'] = "Please provide country id";
        }
        echo json_encode($response);
    }
    

    public function city(){
        $post = $this->input->post();
        if($post['state_id'] != ""){
            $cities = $this->db->get_where('cities',array('state_id'=>$post['state_id']))->result_array();
            if(!empty($cities)){
                $response['cities'] = $cities;
                $response['success'] = 1;   
                $response['message'] = "Cities found";
            } else {    
                $response['success'] = 0;
                $response['message'] = "No Cities found";
            } 
        } else {
            $response['success'] = 0;
            $response['message'] = "Please provide state id";
        }
        echo json_encode($response);
    }


	// others
	function clean_slug($term) {
		$term = preg_replace('/[^A-Za-z0-9\-]/', ' ', $term);
	
		$term = str_replace(' ', '-', $term);

		$term = preg_replace('/-+/', '-', $term);
	
		$term = strtolower($term);
	
		return $term;
	}

}
