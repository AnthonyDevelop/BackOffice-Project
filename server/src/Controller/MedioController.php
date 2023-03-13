<?php

namespace App\Controller;

use App\Repository\MedioRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class MedioController extends AbstractController
{
    /**
    * @Route("/api/medios/listMedios", name="listMedios", methods={"GET"})
    */
    public function listRoles(MedioRepository $repoMedios): JsonResponse
    {
        $array = array();
        $medios = $repoMedios->findAll();

        foreach( $medios as $medio){
            $tupla = array(
                'id' => $medio->getId(),
                'nombre' => ucfirst(strtolower($medio->getNombre()))
            );
            array_push($array,$tupla);
        }
        return new JsonResponse([
            'data' => $array
        ]);
    }
}
