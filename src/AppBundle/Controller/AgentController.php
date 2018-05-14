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
        return $this->render('agent/agent.html.twig');
    }
}
