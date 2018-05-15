<?php
// src/AppBundle/Controller/AgentController.php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class AgentController extends Controller
{
    /**
     * @Route("agent/", name="agent")
     */
    public function agentAction()
    {
      /*prevents the user from reaching /agent/ if they aren't coming from /search/
      so that someone will not be able to reach it if they type in the link
      and the previous user didn't log out*/

      if (!isset($_SERVER['HTTP_REFERER'])) {
        return $this->redirectToRoute('authentication');
      } else {
        return $this->render('agent/agent.html.twig');
      }
    }
}
