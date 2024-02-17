<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
class Email_model extends CI_Model {
    function __construct() {
        parent::__construct();
        $this->load->helper('path');
    }
   
    function contactus_enquiry($data) {

    $type = $data["type"]    ;
    $name = $data["name"];
    $contact_no = $data["contact_no"];
    $email = $data["email"];
    $state = $data["state"];
    $city = $data["city"];
    $pincode = $data["pincode"];
    $company_name = $data["company_name"];
    $occupation = $data["occupation"];
    $preferred_location = $data["preferred_location"];
    $why_invest = $data["why_invest"];
    $remarks = $data["remarks"];
    $investment = $data["investment"];
        
        $content = '<div style="padding: 30px 0;">
            <div style="max-width: 850px;color:#004d6c;margin: 0 auto;border: 1px solid #e5e5e5;background-color:#fff;">
                <table cellpadding="0" cellspacing="0" width="850" align="center"
                    style="background:#fff; box-shadow:0 6px 20px rgba(0,0,0,0.1);" border="0">
                    <tr>
                        <td style="padding:28px 30px 27px 30px; border-bottom:1px dashed #E0E0E0;">
                            <table cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tr>
                                    <td valign="bottom">
                                        <p><img style="width:28%;text-align:center;display:block;margin-top:0;margin-left:auto; margin-right: auto; margin-bottom:0;height:80;"
                                                src="https://www.1888ev.com/assets/images/logo/logo.png"></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:0px 0px 20px 0px" ;>
                                        <h2
                                            style="padding: 0 0 10px; margin: 0; font-size:18px; color:#1A1818; font-family: Rubik, sans-serif; font-weight:400;">
                                            Dear Admin,</h2>
                                        <p
                                            style="padding: 0; margin: 0; font-size:14px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:400;">
                                            Please check below inquiry made for <strong
                                                style="color:#1A1818; font-family: Rubik, sans-serif; font-weight:500;">' .
                                                $type . '</strong></p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>';

                $content .=  '<table style="width:100%;padding:20px;max-width: 850px;">
                    <tr>
                        <td
                            style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:500; padding:11px 0px; margin:0px; border-bottom:1px solid #E0E0E0;">
                            Person Name</td>
                        <td
                            style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:400; padding:11px 0px 11px 10px; margin:0px; border-bottom:1px solid #E0E0E0;">
                            ' . $name . '</td>
                    </tr>
                    <tr>
                        <td
                            style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:500; padding:11px 0px; margin:0px; border-bottom:1px solid #E0E0E0;">
                            Email Address</td>
                        <td
                            style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:400; padding:11px 0px 11px 10px; margin:0px; border-bottom:1px solid #E0E0E0;">
                            ' . $email . '</td>
                    </tr>
                    <tr>
                        <td
                            style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:500; padding:11px 0px; margin:0px; border-bottom:1px solid #E0E0E0;">
                            Contact Number</td>
                        <td
                            style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:400; padding:11px 0px 11px 10px; margin:0px; border-bottom:1px solid #E0E0E0;">
                            ' . $contact_no . '</td>
                    </tr>';
                    if($city) {
                        $content .= '<tr>
                            <td
                                style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:500; padding:11px 0px; margin:0px; border-bottom:1px solid #E0E0E0;">
                                City</td>
                            <td
                                style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:400; padding:11px 0px 11px 10px; margin:0px; border-bottom:1px solid #E0E0E0;">
                                ' . $city . '</td>
                        </tr>';
                    }
                    if($state) {
                        $content .= '<tr>
                            <td
                                style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:500; padding:11px 0px; margin:0px; border-bottom:1px solid #E0E0E0;">
                                State</td>
                            <td
                                style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:400; padding:11px 0px 11px 10px; margin:0px; border-bottom:1px solid #E0E0E0;">
                                ' . $state . '</td>
                        </tr>';
                    }
                    if($zipcode) {
                        $content .= '<tr>
                            <td
                                style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:500; padding:11px 0px; margin:0px; border-bottom:1px solid #E0E0E0;">
                                Zipcode</td>
                            <td
                                style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:400; padding:11px 0px 11px 10px; margin:0px; border-bottom:1px solid #E0E0E0;">
                                ' . $zipcode . '</td>
                        </tr>';
                    }
                    if($company_name) {
                        $content .= '<tr>
                            <td
                                style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:500; padding:11px 0px; margin:0px; border-bottom:1px solid #E0E0E0;">
                                Company Name</td>
                            <td
                                style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:400; padding:11px 0px 11px 10px; margin:0px; border-bottom:1px solid #E0E0E0;">
                                ' . $company_name . '</td>
                        </tr>';
                    }
                    if($occupation) {
                        $content .= '<tr>
                            <td
                                style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:500; padding:11px 0px; margin:0px; border-bottom:1px solid #E0E0E0;">
                                Occupation</td>
                            <td
                                style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:400; padding:11px 0px 11px 10px; margin:0px; border-bottom:1px solid #E0E0E0;">
                                ' . $occupation . '</td>
                        </tr>';
                    }
                    if($preferred_location) {
                        $content .= '<tr>
                            <td
                                style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:500; padding:11px 0px; margin:0px; border-bottom:1px solid #E0E0E0;">
                                Prefered Location</td>
                            <td
                                style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:400; padding:11px 0px 11px 10px; margin:0px; border-bottom:1px solid #E0E0E0;">
                                ' . $preferred_location . '</td>
                        </tr>';
                    }
                if($why_invest) {
                    $content .= '<tr>
                        <td
                            style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:500; padding:11px 0px; margin:0px; border-bottom:1px solid #E0E0E0;">
                            Why Investing</td>
                        <td
                            style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:400; padding:11px 0px 11px 10px; margin:0px; border-bottom:1px solid #E0E0E0;">
                            ' . $why_invest . '</td>
                    </tr>';
                }
                if($investment) {
                    $content .= '<tr>
                        <td
                            style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:500; padding:11px 0px; margin:0px; border-bottom:1px solid #E0E0E0;">
                            Investment Amount</td>
                        <td
                            style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:400; padding:11px 0px 11px 10px; margin:0px; border-bottom:1px solid #E0E0E0;">
                            ' . $investment . '</td>
                    </tr>';
                }
                if($remarks) {
                    $content .= '<tr>
                        <td
                            style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:500; padding:11px 0px; margin:0px; border-bottom:1px solid #E0E0E0;">
                            Remarks</td>
                        <td
                            style="max-width: 425px; width:425px; font-size:13px; line-height:20px; color:#5C5B5B; font-family: Rubik, sans-serif; font-weight:400; padding:11px 0px 11px 10px; margin:0px; border-bottom:1px solid #E0E0E0;">
                            ' . $remarks . '</td>
                    </tr>';
                }

                $content .= '</table>

                <table
                    style="max-width: 850px; padding: 30px 10px; background:#F4F4F4; border-top:1px solid #E5E5E5;width:100%;"
                    cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                    <tr>
                        <td width="850">
                            <p
                                style="padding: 0px 0 6px; margin: 0px; font-size:13px; color:#5D5C5C; font-family: Rubik, sans-serif; font-weight:500;">
                                Thanks & Regards,</p>
                            <h3
                                style="padding:0px; margin:0px; font-size:16px; color:#1A1818; font-family: Rubik, sans-serif; font-weight:500;">
                                Team 1888ev.</h3>
                        </td>
                    </tr>
                </table>
            </div>
        </div>';

        $subject = "Contact Enquiry from " . $data['name'];
        $to = "jay.g@coronation.in";
        $from = "sales@1888ev.com";
        
        $this->do_email($content, $subject, $to, $from);
    }

   
    function do_email($msg = NULL, $sub = NULL, $to = NULL, $from = NULL,$attachments = NULL){ 
        
        if ($attachments){
            $attachments = array_unique($attachments);
        }

        $from =  "sales@1888ev.com";

        $ci = get_instance();
        $ci->load->library('email');

        $config['protocol'] = "smtp";
        $config['smtp_host'] = "smtp.sendgrid.net";
        $config['smtp_port'] = "587";
        // $config['smtp_user'] = $from;
        $config['smtp_user'] = "apikey";
        $config['smtp_pass'] = "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";
        $config['mailtype'] = "html";
        $config['charset'] = "utf-8";
        $config['wordwrap'] = TRUE;
        $config['newline'] = "\r\n";
        $config['crlf'] = "\n";


        $ci->email->initialize($config);
        $system_name = "1888ev";
        $ci->email->clear(TRUE);
        $ci->email->from($from,"1888ev");
        $ci->email->to($to);

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
        // echo $this->email->print_debugger();
        // die;
        if (!$IsSendMail) {
            return $returnvalue = 1;
        } else {
            return $returnvalue = 1;
        }
    }
}
