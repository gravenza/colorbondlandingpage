<?php

/**
 *
 */
class Home extends CI_Controller
{

  public function __construct()
  {
    parent::__construct();
    $this->load->library('email');
    $this->load->model('m_award');
  }

  public function index(){
    $data['captcha'] = $this->m_award->_makecaptcha();
    $this->load->view('include/header');
    $this->load->view('home',$data);
    $this->load->view('include/footer');
  }

  public function dosubmit(){

    $expiration = time() - 7200; // Two hour limit
    $this->db->where('captcha_time < ', $expiration)->delete('captcha');

    // Then see if a captcha exists:
    $sql = 'SELECT COUNT(*) AS count FROM captcha WHERE word = ? AND ip_address = ? AND captcha_time > ?';
    $binds = array($_POST['captcha'], $this->input->ip_address(), $expiration);
    $query = $this->db->query($sql, $binds);
    $row = $query->row();

    if ($row->count == 0) {
      echo '<script language="javascript">';
      echo 'alert("You must submit the word that appears in the image.")';
      echo '</script>';
    } else {

      $name = $this->input->post('name',true);
      $category = $this->input->post('category',true);
      $message = $this->input->post('message',true);
      $email = $this->input->post('email',true);
      $phone = $this->input->post('phone',true);
      $occupation = $this->input->post('occupation') == '' ? $this->input->post('occupation',true) : '';
      $company = $this->input->post('company',true);

      $thebody = "Name :".$name."<br />";
      $thebody .= "Category :".$category."<br />";
      $thebody .= "Comment :".$message."<br />";
      $thebody .= "Phone :".$phone."<br />";
      $thebody .= "Job Title :".$occupation."<br />";
      $thebody .= "Company :".$company."<br />";

      $file = count($_FILES['files']['name']);

      for($no=0; $no < $file; $no++){
        $file_upload[] = $_FILES['files']['name'][$no];
      }

      $files = serialize($file_upload);

      $data = array(
      'name' => $name,
      'category' => $category,
      'message' => $message,
      'email' => $email,
      'phone' => $phone,
      'occupation' => $occupation,
      'company' => $company,
      'files' => $files,
      'posting_date' => date('Y-m-d')
      );

      $sql = $this->db->insert('award',$data);
      $this->m_award->multiple_upload();

      if($sql){

        $this->m_award->mailaward($name,$email,$thebody);
        //redirect('awards/success');
        echo '<script language="javascript">';
        echo 'alert("Submit Award Success.")';
        echo '</script>';

      }

    }
  }

  public function testemail(){
    $name = "Tonny Wibowo";
    $email = "toniewibowo@gmail.com";
    $thebody = "Name : Toni Wibowo <br />";
    $thebody .= "Category : Contractor <br />";
    $thebody .= "Comment : Testing <br />";
    $thebody .= "Phone :081210109469 <br />";
    $thebody .= "Job Title : <br />";
    $thebody .= "Company : Gravenza <br />";

    $this->mailaward($name,$email,$thebody);

  }

}
