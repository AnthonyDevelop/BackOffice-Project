<?php

namespace App\Controller;

use App\Repository\CategoriaRepository;
use App\Repository\RedesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Post;
use App\Repository\PostRepository;

class AdminController extends AbstractController
{
    /**
     * @Route("/api/admin/switchRedesStatus", name="switchRedesStatus", methods={"POST"})
     */
    public function switchRedesStatus(Request $request, RedesRepository $repoRedes, EntityManagerInterface $entityManager): JsonResponse
    {
        if ($this->getUser()->getRoles()[0] == 'ROLE_ADMIN') {
            $params = json_decode($request->getContent());
            $searchRedesState = $repoRedes->find(1);
            $searchRedesState->setCompartirTwitter($params->switchTwitter);
            $searchRedesState->setCompartirFacebook($params->switchFacebook);
            
            $entityManager->persist($searchRedesState);
            $entityManager->flush();

            return new JsonResponse([
                'message' => 'Estados de redes sociales actualizadas correctamente'
            ]);
        }
        return new JsonResponse([
            'message' => 'Usted no tiene permisos para realizar esta accion'
        ]);
    }

}
