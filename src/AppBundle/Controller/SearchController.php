<?php
// access this if and only if user successfully logged in
// src/AppBundle/Controller/SearchController.php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class SearchController extends Controller
{
    /**
     * @Route("/search/", name="search")
     */
    public function searchAction()
    {

        //loads a randow background
        $images = scandir('assets');
        $images = array_diff($images, array('.','..'));
        $imageIndex = array_rand($images);

        /*prevents the user from reaching /search/ if they aren't coming from /auth/
        so that someone will not be able to reach it if they type in the link
        and the previous user didn't log out*/

        if (!isset($_SERVER['HTTP_REFERER'])) {
          return $this->redirectToRoute('authentication');
        } else {
          return $this->render('search/search.html.twig', array(
            'image' => $images[$imageIndex],
          ));
        }
    }
}
