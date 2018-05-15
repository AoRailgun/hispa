<?php
// src/AppBundle/Controller/AuthenticationController.php
namespace AppBundle\Controller;

use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class AuthenticationController extends Controller
{
    /**
     * @Route("/auth/", name="authentication")
     */
    public function authenticationAction(Request $request, AuthenticationUtils $authenticationUtils)
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

      //--------------//

      // get the login error if there is one
      $error = $authenticationUtils->getLastAuthenticationError();

      // last username entered by the user
      $lastUsername = $authenticationUtils->getLastUsername();

      return $this->render('authentication/authentication.html.twig', array(
          'last_username' => $lastUsername,
          'error'         => $error,
      ));
    }


    /**
     * @Route("/logout/", name="security_logout")
     */
    /*public function logoutAction()
    {

    }
    */
}
