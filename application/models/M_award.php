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

  public function multiple_upload(){

    $dirname  = date('Y');
    $filename = "./assets/uploads/" . $dirname . "/";

    if (!file_exists($filename)) {
        mkdir("folder/" . $dirname, 0777);
        //echo "The directory $dirname was successfully created.";
        //exit;
    }

    //$pathaward = "./assets/uploads/". $dirname . "/";

	$this->load->library('upload');
  $number_of_files_uploaded = count($_FILES['files']['name']);

	// Faking upload calls to $_FILE
		for ($i = 0; $i < $number_of_files_uploaded; $i++) :
			$files_name[] = random_string('alnum',4).$_FILES['files']['name'][$i];
			$_FILES['userfile']['name']     = $_FILES['files']['name'][$i];
			$_FILES['userfile']['type']     = $_FILES['files']['type'][$i];
			$_FILES['userfile']['tmp_name'] = $_FILES['files']['tmp_name'][$i];
			$_FILES['userfile']['error']    = $_FILES['files']['error'][$i];
			$_FILES['userfile']['size']     = $_FILES['files']['size'][$i];

      $config = array(
			'file_name'     => $files_name[$i],
			'allowed_types' => 'jpg|jpeg|png|gif',
			'max_size'      => 1000000,
			'overwrite'     => FALSE,

			/* real path to upload folder ALWAYS */
			'upload_path' => './assets/uploads/'. $dirname .'/'
		  );

			$this->upload->initialize($config);

			if ( ! $this->upload->do_upload()) :
				$data['error'] = array('error' => $this->upload->display_errors());
				$data['cap_image'] = $this->_makecaptcha();
				$this->load->view('home', $data);
			else :
				$final_files_data[] = $this->upload->data();
				$id = $this->db->select_max('award_id')->get('award')->row_array();

				$data = array(
				'files' => serialize($files_name)
				);

				$this->db->where('award_id',$id['award_id']);
				$this->db->update('award',$data);
			endif;
		endfor;
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

  public function mailaward($name,$email,$body){

		$config['protocol'] = 'smtp';
		$config['smtp_host'] = 'mail.colorbond.id';
		$config['smtp_user'] = 'info@colorbond.id';
		$config['smtp_pass'] = 'colorbond2018';
		$config['smtp_port'] = 587;
		$config['mailtype'] = 'html';
		$config['charset'] = 'iso-8859-1';
		$config['wordwrap'] = TRUE;

		$this->email->initialize($config);

		$this->email->from($email, $name);
		//$this->email->to('andre.jatmika@bluescope.com');
    $this->email->to('tonny@3motion.co.id');
		//$this->email->cc('another@another-example.com');
		//$this->email->bcc('tonny@3motion.co.id');
		//$this->email->bcc('khadad@3motion.co');

		$this->email->subject('Submit Awards');
		$this->email->message($body);

		$attachment = $this->db->order_by('award_id','DESC')->where('email',$email)->get('award')->row_array();

		if(count(unserialize($attachment['files'])) > 0){
			foreach(unserialize($attachment['files']) as $pict){
				$this->email->attach('./assets/uploads/award/'.$pict);
			}
		}


		return $this->email->send();

	}
}
