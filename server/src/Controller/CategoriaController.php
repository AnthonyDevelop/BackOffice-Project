<?php

namespace App\Controller;

use App\Entity\Categoria;
use App\Repository\CategoriaRepository;
use App\Repository\EstadoPublicacionRepository;
use App\Repository\SubcategoriaRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CategoriaController extends AbstractController
{
    /**
     * @Route("/categoria/listCategorias", name="listCategorias", methods={"POST"})
     */
    public function listCategoriasAll(Request $request, ManagerRegistry $doctrine): JsonResponse
    {
        $params = json_decode($request->getContent());
        $result = $doctrine->getManager()->getRepository(Categoria::class)->getListCategorias('', 1, $params->nombre);
        $categorias = $result['query']->getResult();

        $array = array();
        foreach ($categorias as $c) {
            foreach ($c->getSubcategorias() as $sub) {
                $tupla = array(
                    "id" => $sub->getId(),
                    "nombre" => $sub->getNombre(),
                    "cantPosteos" => count($sub->getPosts())
                );
                array_push($array, $tupla);
            }
            $tupla = array(
                "id" => $c->getId(),
                "nombre" => $c->getNombre(),
                "cantPosteos" => count($c->getPosts())
            );
            array_push($array, $tupla);
        }

        return new JsonResponse([
            "data" => $array
        ], JsonResponse::HTTP_ACCEPTED);
    }
    
    /**
     * @Route("/categoria/listCategoriasSinSub", name="listCategoriasSinSub", methods={"POST"})
     */
    public function listCategoriasSinSub(Request $request, ManagerRegistry $doctrine, CategoriaRepository $repoCateg, SubcategoriaRepository $repoSubCateg): JsonResponse
    {
        $params = json_decode($request->getContent());
        $limit = 11;
        $result = $doctrine->getManager()->getRepository(Categoria::class)->getListCategorias($limit, $params->page, $params->nombre);
        $categorias = $result['query']->getResult();
        $totalRegisters = count($result['paginator']);
        $maxPages = ceil(($result['paginator']->count()) / $limit);
        $array = array();
        foreach ($categorias as $c) {
            $tupla = array(
                "id" => $c->getId(),
                "nombre" => $c->getNombre(),
                "cantPosteos" => count($c->getPosts())
            );
            array_push($array, $tupla);
        }

        return new JsonResponse([
            "data" => $array,
            "maxPages" => $maxPages,
            "totalRegisters" => $totalRegisters
        ], JsonResponse::HTTP_ACCEPTED);
    }

    /**
     * @Route("/api/categoria/agregarCategoria", name="switchCategorias", methods={"POST"})
     */

    public function agregarCategoria(Request $request, CategoriaRepository $repoCateg, SubcategoriaRepository $repoSubCateg,  EntityManagerInterface $entityManager): JsonResponse
    {

        $params = json_decode($request->getContent());
        $searchCategoria =  $repoCateg->findOneBy(array('nombre' => $params->nombreCategoria));
        $searchNoRepeatSubcategoria = $repoSubCateg->findOneBy(array('nombre' => $params->nombreCategoria));
        if (!empty($searchCategoria || !empty($searchNoRepeatSubcategoria))) {
            return new JsonResponse([
                "message" => "Error - La categoria ya existe"
            ], JsonResponse::HTTP_ACCEPTED);
        }

        $newCategoria = new Categoria();
        $newCategoria->setNombre($params->nombreCategoria);

        $entityManager->persist($newCategoria);
        $entityManager->flush();

        return new JsonResponse([
            "message" => "Categoria creada"
        ], JsonResponse::HTTP_ACCEPTED);
    }

    /**
     * @Route("/api/categoria/deleteCategorias", name="deleteCategorias", methods={"POST"})
     */

    public function eliminarCategorias(Request $request, CategoriaRepository $repoCateg, SubcategoriaRepository $repoSubCateg, EstadoPublicacionRepository $repoEstados, EntityManagerInterface $entityManager): JsonResponse
    {
        $params = json_decode($request->getContent());

        foreach ($params->idCategorias as $categoria) {
            $searchCateg = $repoCateg->findOneBy(array('nombre' => $categoria));
            if (!empty($searchCateg)) {
                foreach ($searchCateg->getSubcategorias() as $subcategoria) {
                    if (count($subcategoria->getPosts())>0) {
                        return new JsonResponse([
                            'message' => 'Las subcategorias de esta categoria estan asignadas a posteos publicados'
                        ], JsonResponse::HTTP_CONFLICT);
                    }
                }
                if(count($searchCateg->getPosts())>0){
                    return new JsonResponse([
                        'message' => 'La categoria aun esta asignada a posteos publicados'
                    ], JsonResponse::HTTP_CONFLICT);
                }
                foreach ($searchCateg->getSubcategorias() as $subcategoria) {
                    $entityManager->remove($subcategoria);
                    $entityManager->flush();
                }
                $entityManager->remove($searchCateg);
                $entityManager->flush();
            }
        }
        return new JsonResponse([
            'message' => 'Categorias eliminadas correctamente'
        ], JsonResponse::HTTP_ACCEPTED);
    }
}
