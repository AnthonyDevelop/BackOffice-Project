<?php

namespace App\Controller;

use App\Repository\MultimediaRepository;
use App\Repository\PublicidadRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class PublicidadController extends AbstractController
{

    /**
     * @Route("/api/pu/updatePu", name="updatePu", methods={"POST"})
     */
    public function updatePu(Request $request, PublicidadRepository $repoPublic, EntityManagerInterface $entityManager): JsonResponse
    {
        $params = json_decode($request->getContent());
        $index = 1;
        foreach ($params as $p) {
            $searchPublicidad = $repoPublic->find($index);
            if (isset($p->id) && $p->id != 'youtube') {
                $searchPublicidad->setMultimedia($p->id);
                if (isset($p->url)) {
                    $searchPublicidad->setUrl($p->url);
                }
            } else {
                if (isset($p->id) && $p->id == 'youtube' && isset($p->url)) {
                    $searchPublicidad->setUrl($p->url);
                }
                $searchPublicidad->setMultimedia('Sin Publicidad');
            }
            $entityManager->persist($searchPublicidad);
            $entityManager->flush();
            $index = $index + 1;
        }

        return new JsonResponse([
            'message' => 'Actualizacion realizada correctamente'
        ], JsonResponse::HTTP_ACCEPTED);
    }

    /**
     * @Route("/pu/listPu", name="listPu", methods={"GET"})
     */
    public function listPu(PublicidadRepository $repoPublicidad, MultimediaRepository $repoMulti)
    {

        $searchAllPublicidad =  $repoPublicidad->findAll();
        $array = array();
        foreach ($searchAllPublicidad as $publicidad) {
            if ($publicidad->getMultimedia() != 'youtube' || !empty($repoMulti->find($publicidad->getMultimedia()))) {
                $tupla = array(
                    "id" => $publicidad->getMultimedia(),
                    "path" =>  $_SERVER['DOMINIO_PAGE'] . '/post/photo/' . $repoMulti->find($publicidad->getMultimedia())->getNombre(),
                    'type' => $repoMulti->find($publicidad->getMultimedia())->getType() ,
                    'url' => !empty($publicidad->getUrl()) ? $publicidad->getUrl() : 'Sin Path'
                );
                array_push($array, $tupla);
            } else {
                if($publicidad->getMultimedia() == 'youtube'){
                    $tupla = array(
                        "id" => $publicidad->getMultimedia(),
                        'url' => $publicidad->getUrl()
                    );
                    array_push($array, $tupla);
                }else{
                    array_push($array, array('path' => 'Sin Publicidad'));
                }
            }
        }
        return new JsonResponse(
            [
                'data' => $array
            ],
            JsonResponse::HTTP_ACCEPTED
        );
    }
}
