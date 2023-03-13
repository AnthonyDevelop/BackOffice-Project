<?php

namespace App\Controller;

use App\Repository\RolesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class RolController extends AbstractController
{
    /**
    * @Route("/api/roles/listRoles", name="listRoles", methods={"GET"})
    */
    public function listRoles(RolesRepository $repoRoles): JsonResponse
    {
        $array = array();
        $roles = $repoRoles->findAll();

        foreach( $roles as $rol){
            $tupla = array(
                'id' => $rol->getId(),
                'nombre' => ucfirst(strtolower($rol->getNombre()))
            );
            array_push($array,$tupla);
        }
        return new JsonResponse([
            'data' => $array
        ]);
    }

}
