<?php defined('BASEPATH') OR exit('No direct script access allowed');

/**
 *
 */
class M_award extends CI_Model
{

  function __construct()
  {
    parent::__construct();
    $this->load->library('email');
    $this->load->helper(array('captcha','string'));
  }

  public function dosubmit(){

  }

  function cek_file_size(){

    $filesize = $_FILES['files']['size'][$key];

  }

  function _makecaptcha(){

		$vals = array(
        //'word'          => random_string('alnum',4),
        'img_path'      => './captcha/',
        'img_url'       => base_url().'captcha/',
        'font_path'     => FCPATH.'system/fonts/texb.ttf',
        'img_width'     => '150',
        'img_height'    => 30,
        'expiration'    => 7200,
        'word_length'   => 4,
        'font_size'     => 16,
        'img_id'        => 'Imageid',
        'pool'          => '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',

        // White background and border, black text and red grid
        'colors'        => array(
                'background' => array(255, 255, 255),
                'border' => array(255, 255, 255),
                'text' => array(0, 0, 0),
                'grid' => array(221, 221, 221)
        )
		);

		$cap = create_captcha($vals);

		if($cap){
			$data = array(
			'captcha_time'  => $cap['time'],
			'ip_address'    => $this->input->ip_address(),
			'word'          => $cap['word']
			);

			$query = $this->db->insert_string('captcha', $data);
			$this->db->query($query);
		}else{
			return "Chapcha not working";

		}
		return $cap['image'];
	}
}
