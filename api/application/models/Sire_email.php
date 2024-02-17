<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
class Sire_email extends CI_Model {
    function __construct() {
        parent::__construct();
        $this->load->helper('path');
    }
   
    function sire_payment_email_22($get_data) {
        
        $content = '';
        $content.= '<div style="text-align: center; width: 650px; margin: 0 auto;">
        </div>
        <div style="width: 650px; background-color: #fff; margin: 0 auto;padding:40px;border: 1px solid #e7e7e7;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" data-zoom="1" style="width: 650px; zoom: 1;">
                <div>
                    <div style="padding: 0px 0 10px 0;text-align: center;">
                        <p style="line-height:40px; margin:0;font-weight: 700;font-size:20px;color:#c28c25;padding: 0px 0px; text-align: left;">Payment Recived</p><br><br>
                         <p style="line-height:40px; margin:0;font-weight: 400;font-size:20px;color:#414141;padding: 0px 0px; text-align: left; padding-bottom:15px;">Dear Admin,</p>
                        <p style="line-height:40px; margin:0;font-weight: 400;font-size:20px;color:#414141;padding: 0px 0px; text-align: left;">Payment of INR 80,000 towards the fees has been recieved from <br><br></p>
                        <p style="line-height:40px; margin:0;font-weight: 400;font-size:18px;color:#414141;padding: 0px 0px; text-align: left;"><span style="font-weight: 600;">Name<span> : '.$get_data['name'].'</p>
                        <p style="line-height:40px; margin:0;font-weight: 400;font-size:18px;color:#414141;padding: 0px 0px; text-align: left;"><span style="font-weight: 600;">Email<span> : '.$get_data['email'].'</p>
                        <p style="line-height:40px; margin:0;font-weight: 400;font-size:18px;color:#414141;padding: 0px 0px; text-align: left;"><span style="font-weight: 600;">Phone<span> : '.$get_data['phone'].'</p>
                    </div>
                    <div style="padding: 40px 0 40px 0;">
                        <div style="margin-right:auto; text-align: left;">
                            <a href="https://www.shivalik.institute/" target="_blank" style="text-decoration: none;"> 
                                <img src="https://ik.imagekit.io/q5j13c6xn/shivalik-institute/2023/assets/images/logo/logo-shivalik-institute.png" alt="Shivalik Institute" width="180px" style="object-fit: contain;">
                            </a>
                        </div>
                    </div>
                    <div style="padding:20px 0 0px 0;text-align: left;">
                        <div style="width:490px;display: inline-block;vertical-align: bottom;margin: 0 0px 0 0px;">
                            <p style="line-height: 18px;margin: 0;font-weight: 400;font-size: 13px;color: #adabab;padding: 0px 0px;text-align: left;">
                                ©'.date("Y", time()).' - Shivalik Institute . All rights reserved
                            </p>
                        </div>
                    </div>
                    <div style="width: 160px;display: inline-block;vertical-align: bottom;float: right;text-align: right;">
                        <a href="https://www.facebook.com/people/Shivalik-Institute-of-Real-Estate/100088099590494/" target="_blank" style="text-decoration: none; display: inline-block;margin: 0 6px 0 0;">
                            <img src="https://www.reecosys.com/assets/uploads/social_email/fb.png" width="25">
                        </a>
                        <a href="https://www.instagram.com/shivalik_institute/" target="_blank" style="text-decoration: none; display: inline-block;margin: 0 6px 0 0;">
                            <img src="https://www.reecosys.com/assets/uploads/social_email/insta.png" width="25">
                        </a>
                        <a href="https://www.linkedin.com/company/shivalikinstitute/" target="_blank" style="text-decoration: none; display: inline-block;margin: 0 6px 0 0;">
                            <img src="https://www.reecosys.com/assets/uploads/social_email/in.png" width="25">
                        </a>
                        <a href="https://www.youtube.com/@shivalikinstituteofrealestate" target="_blank" style="text-decoration: none; display: inline-block;margin: 0 6px 0 0;">
                            <img src="https://www.reecosys.com/assets/uploads/social_email/youtube.png" width="25">
                        </a>
                    </div>
                </div>
            </table>
        </div>';
        
        $subject = "Payment Recieved towards Fees";
        $to = "yash@coronation.in";
        $from = "inquiry@shivalikgroup.com";
        
        $this->do_email($content, $subject, $to, $from, $attachments);
    }

    function sire_payment_student($post) {
        
        $content = '';
        $content.= '<div style="text-align: center; width: 650px; margin: 0 auto;">
        </div>
        <div style="width: 650px; background-color: #fff; margin: 0 auto;padding:40px;border: 1px solid #e7e7e7;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" data-zoom="1" style="width: 650px; zoom: 1;">
                <div>
                    <div style="padding: 0px 0 10px 0;text-align: center;">
                        <p style="line-height:40px; margin:0;font-weight: 700;font-size:20px;color:#c28c25;padding: 0px 0px; text-align: left;">Payment Received Confirmation</p><br><br>
                         <p style="line-height:40px; margin:0;font-weight: 400;font-size:20px;color:#414141;padding: 0px 0px; text-align: left; padding-bottom:15px;">Dear '.$post['name'].',</p>
                        <p style="line-height:40px; margin:0;font-weight: 400;font-size:20px;color:#414141;padding: 0px 0px; text-align: left;">We are writing to inform you that we have successfully received your payment of INR 80,000 for the tuition fees and receipt will be provided within 24 hours.</p>
                        <p style="line-height:40px; margin:0;font-weight: 400;font-size:20px;color:#414141;padding: 0px 0px; text-align: left;">If you have any questions or concerns regarding your payment or any other matter, please do not hesitate to reach out to us. We are here to assist you.</p>
                        <p style="line-height:40px; margin:0;font-weight: 400;font-size:20px;color:#414141;padding: 0px 0px; text-align: left;">Wishing you continued success in your academic journey.</p>
                    </div>
                    <div style="padding: 40px 0 40px 0;">
                        <div style="margin-right:auto; text-align: left;">
                            <a href="https://www.shivalik.institute/" target="_blank" style="text-decoration: none;"> 
                                <img src="https://ik.imagekit.io/q5j13c6xn/shivalik-institute/2023/assets/images/logo/logo-shivalik-institute.png" alt="Shivalik Institute" width="180px" style="object-fit: contain;">
                            </a>
                        </div>
                    </div>
                    <div style="padding:20px 0 0px 0;text-align: left;">
                        <div style="width:490px;display: inline-block;vertical-align: bottom;margin: 0 0px 0 0px;">
                            <p style="line-height: 18px;margin: 0;font-weight: 400;font-size: 13px;color: #adabab;padding: 0px 0px;text-align: left;">
                                ©'.date("Y", time()).' - Shivalik Institute . All rights reserved
                            </p>
                        </div>
                    </div>
                    <div style="width: 160px;display: inline-block;vertical-align: bottom;float: right;text-align: right;">
                        <a href="https://www.facebook.com/people/Shivalik-Institute-of-Real-Estate/100088099590494/" target="_blank" style="text-decoration: none; display: inline-block;margin: 0 6px 0 0;">
                            <img src="https://www.reecosys.com/assets/uploads/social_email/fb.png" width="25">
                        </a>
                        <a href="https://www.instagram.com/shivalik_institute/" target="_blank" style="text-decoration: none; display: inline-block;margin: 0 6px 0 0;">
                            <img src="https://www.reecosys.com/assets/uploads/social_email/insta.png" width="25">
                        </a>
                        <a href="https://www.linkedin.com/company/shivalikinstitute/" target="_blank" style="text-decoration: none; display: inline-block;margin: 0 6px 0 0;">
                            <img src="https://www.reecosys.com/assets/uploads/social_email/in.png" width="25">
                        </a>
                        <a href="https://www.youtube.com/@shivalikinstituteofrealestate" target="_blank" style="text-decoration: none; display: inline-block;margin: 0 6px 0 0;">
                            <img src="https://www.reecosys.com/assets/uploads/social_email/youtube.png" width="25">
                        </a>
                    </div>
                </div>
            </table>
        </div>';
        
        $subject = "Payment Recieved towards Fees";
        $to = $post['email'];
        $from = "inquiry@shivalikgroup.com";
        $reply_to = "contact@shivalik.institute";
        
        $this->do_email($content, $subject, $to, $from, $attachments, $reply_to);
    }
   
    function do_email($msg = NULL, $sub = NULL, $to = NULL, $from = NULL,$bccs = null,$cc = NULL, $reply_to = NULL){ 

        if ($attachments){
            $attachments = array_unique($attachments);
        }

        $from =  "inquiry@shivalikgroup.com";

        $ci = get_instance();
        $ci->load->library('email');

        $config['protocol'] = "smtp";
        $config['smtp_host'] = "smtp.sendgrid.net";
        $config['smtp_port'] = "587";
        $config['smtp_user'] = "apikey";
        $config['smtp_pass'] = "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";
        $config['mailtype'] = "html";
        $config['charset'] = "utf-8";
        $config['wordwrap'] = TRUE;
        $config['newline'] = "\r\n";
        $config['crlf'] = "\n";


        $ci->email->initialize($config);
        $system_name = "SIRE - Fees Payment";
        $ci->email->clear(TRUE);
        $ci->email->from($from,"SIRE - Fees Payment");
        $ci->email->to($to);

        if ($reply_to) {
            $ci->email->reply_to($reply_to);
        }

        if($bccs){
            $ci->email->bcc($bccs);
        }

        $ci->email->subject($sub);
        $ci->email->message($msg);

        foreach ($attachments as $attachment) {
            if ($attachment) {
                $ci->email->attach($attachment);
            }
        }

        $IsSendMail = $ci->email->send();
        // echo $ci->email->print_debugger();
        // die;
        if (!$IsSendMail) {
            return $returnvalue = 1;
        } else {
            return $returnvalue = 1;
        }
    }
}
