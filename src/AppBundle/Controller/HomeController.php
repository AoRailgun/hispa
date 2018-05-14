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
        /*scans assets directory to load backgrounds
        scandir doesn't work:
        interprets scandir('images') as scandir(/images,/images)

        $array_files = scandir(images);
        return $this->render('home/home.html.twig', ['files' => $array_files]);*/
        return $this->render('home/home.html.twig');
    }

}
?>
