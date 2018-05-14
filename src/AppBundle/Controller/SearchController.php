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
        return $this->render('search/search.html.twig');
    }
}
