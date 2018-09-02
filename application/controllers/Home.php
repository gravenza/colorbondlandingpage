<?php

/**
 *
 */
class Home extends CI_Controller
{

  public function __construct()
  {
    parent::__construct();
    $this->load->model('m_award');
  }

  public function index(){
    $data['captcha'] = $this->m_award->_makecaptcha();
    $this->load->view('include/header');
    $this->load->view('home',$data);
    $this->load->view('include/footer');
  }

  public function dosubmit(){

    $name = $this->input->post('name',true);
    $category = $this->input->post('category',true);
    $message = $this->input->post('message',true);
    $email = $this->input->post('email',true);
    $phone = $this->input->post('phone',true);
    $occupation = $this->input->post('occupation',true);
    $company = $this->input->post('company',true);

    $file = count($_FILES['files']['name']);

    for($no=0; $no < $file; $no++){
      $file_upload[] = $_FILES['files']['name'][$no];
    }

    $files = serialize($file_upload);




    echo $filesize;
  }
}
