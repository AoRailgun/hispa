<?php
// src/AppBundle/Controller/AgentController.php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class AgentController extends Controller
{
    /**
     * @Route("/agent/", name="agent")
     */
    public function agentAction()
    {

      // $json_url = 'http://devweb-frh.grenet.fr:8080/wshispa-test/agent?nom=&prenom=&insee=';
      //
      // $username = 'rakotomg';  // authentication
      // TODO: password
      // $password = '';  // authentication
      //
      // // jSON String for request
      // //$json_string = '[your json string here]';
      //
      // // Initializing curl
      // $ch = curl_init( $json_url );
      //
      // // Configuring curl options
      // $options = array(
      // CURLOPT_RETURNTRANSFER => true,
      // CURLOPT_USERPWD	=> $username . ":" . $password,  // authentication
      // CURLOPT_HTTPHEADER => array('Content-type: application/json') ,
      // //CURLOPT_POSTFIELDS => $json_string
      // );
      //
      // // Setting curl options
      // curl_setopt_array( $ch, $options );
      //
      // // Getting results
      // $result = curl_exec($ch); // Getting jSON result string
      // $rest = json_decode($result, true);

      $file = file_get_contents('json/test.json');
      $json = json_decode($file, true);

      $testP3558 = json_decode(file_get_contents('json/paye_3558.json'), true);

      //loads a random background
      $images = scandir('assets/bgs');
      $images = array_diff($images, array('.','..'));
      $imageIndex = array_rand($images);

      /*prevents the user from reaching /agent/ if they aren't coming from /search/
      so that someone will not be able to reach it if they type in the link
      and the previous user didn't log out*/

      if (!isset($_SERVER['HTTP_REFERER'])) {
        return $this->redirectToRoute('authentication');
      } else {
        return $this->render('agent/agent.html.twig', array(
          'json' => $json,
          'image' => $images[$imageIndex],
          //'rest' => $rest,
          'testP3558' => $testP3558,
        ));
      }
    }
}
