<?php
// src/AppBundle/Controller/HomeController.php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class HomeController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function homeAction()
    {
        // "logs out" automatically when landing on the page
        if(!isset($_SESSION))
        {
            session_start();
        }

        $_SESSION = array();

        if (ini_get("session.use_cookies")) {
          $params = session_get_cookie_params();
          setcookie(session_name(), '', time() - 42000,
              $params["path"], $params["domain"],
              $params["secure"], $params["httponly"]
          );
        }

        session_destroy();

        ///////

        $images = scandir('assets');
        $images = array_diff($images, array('.','..'));
        $imageIndex = array_rand($images);

        return $this->render('home/home.html.twig', ['image' => $images[$imageIndex]]);
    }
}
?>
