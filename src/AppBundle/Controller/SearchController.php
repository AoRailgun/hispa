<?php
// access this if and only if user successfully logged in
// src/AppBundle/Controller/SearchController.php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class SearchController extends Controller
{
    /**
     * @Route("/search/", name="search")
     */
    public function searchAction(Request $request)
    {
        // $data = 'a';
        //
        // if ($request->getMethod() == 'POST') {
        //     $form->bindRequest($request);
        //     $data = $form->getValues();
        //
        //
        // }
        //
        // $nom = '';
        // $prenom = '';
        // $insee = '';
        //
        // $json_url = 'http://devweb-frh.grenet.fr:8080/wshispa-test/agent?nom=' + $nom + '&prenom=' + $prenom + '&insee=' + $insee;
        //
        // $username = 'rakotomg';  // authentication
        // // TODO: password
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

        //loads a random background
        $images = scandir('assets/bgs');
        $images = array_diff($images, array('.','..'));
        $imageIndex = array_rand($images);

        /*prevents the user from reaching /search/ if they aren't coming from /auth/
        so that someone will not be able to reach it if they type in the link
        and the previous user didn't log out*/

        if (!isset($_SERVER['HTTP_REFERER'])) {
          return $this->redirectToRoute('authentication');
        } else {
          if (empty($data)) {
            return $this->render('search/search.html.twig', array(
              'image' => $images[$imageIndex],
              //'rest' => $rest,
            ));
          } else {
            return $this->render('search/search.html.twig', array(
              'image' => $images[$imageIndex],
              'rest' => $rest,
              'data' => $data,
            ));
          }
        }
    }
}
