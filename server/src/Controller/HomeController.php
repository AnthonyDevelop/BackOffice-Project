<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\PostRepository;
use App\Entity\Post;
use App\Entity\Categoria;
use App\Repository\CategoriaRepository;
use App\Repository\MultimediaRepository;
use App\Repository\PublicidadRepository;
use App\Repository\SubcategoriaRepository;
use Doctrine\Persistence\ManagerRegistry;

class HomeController extends AbstractController
{
    private function estructuraPost($t, $repoMulti, $repoPublicidad): array
    {
        $categorias = array();
        foreach ($t->getCategorias() as $c) {
            $tupla = array(
                "id" => $c->getId(),
                "nombre" => $c->getNombre()
            );
            array_push($categorias, $tupla);
        }
        foreach ($t->getSubcategoria() as $sub) {
            $tupla = array(
                "id" => $sub->getId(),
                "nombre" => $sub->getNombre()
            );
            array_push($categorias, $tupla);
        }

        $publicidad = array();
        $publicidades = $repoPublicidad->findAll();
        for ($i = 0; $i < count($publicidades); $i++) {
            if (!empty($repoMulti->find($publicidades[$i]->getMultimedia()))) {
                $tupla = array(
                    "id" => $publicidades[$i]->getMultimedia(),
                    "url" => $publicidades[$i]->getUrl(),
                    "path" => $_SERVER['DOMINIO_PAGE'] . '/post/photo/' . $repoMulti->find($publicidades[$i]->getMultimedia())->getNombre(),
                    'type' => $repoMulti->find($publicidades[$i]->getMultimedia())->getType(),
                );
                array_push($publicidad, $tupla);
            } else {
                array_push($publicidad, array('path' => 'Sin Publicidad'));
            }
        }

        $blocks = $t->getBlocks();
        for ($x = 0; $x < count($blocks); $x++) {
            if ($blocks[$x]['type'] == "image" && is_array($blocks[$x]['data']) && !empty($blocks[$x]['data'][0])) {
                array_push($blocks[$x]['data'], $_SERVER['DOMINIO_PAGE'] . '/post/photo/' . $repoMulti->find($blocks[$x]['data'][0])->getNombre());
            }
        }
        if (count($blocks) >= 1) {
            array_splice($blocks, 1, 0, array('data' => array('data' => $publicidad[8], 'type' => 'publicidad', 'dataMobile' => $publicidad[9])));
        }
        $medios = array();
        foreach ($t->getMedios() as $medio) {
            $tupla = array(
                "id" => $medio->getId(),
                "nombre" => $medio->getNombre()
            );
            array_push($medios, $tupla);
        }
        $encontreCategoria = false;
        $actual = 0;
        if (count($categorias) > 0) {
            while (!$encontreCategoria && $actual < count($categorias)) {
                if ($categorias[$actual]['nombre'] <> 'DESTACADO_VIEW' && $categorias[$actual]['nombre'] <> 'DESTACADO_PPAL') {
                    $categoriaEncontrada = $categorias[$actual]['nombre'];
                    $encontreCategoria = true;
                }
                $actual++;
            };
        }

        $tupla = array(
            "id" => $t->getId(),
            "titulo" => $t->getTitulo(),
            "views" => $t->getViews(),
            "subtitulo" => $t->getSubtitulo(),
            "estado" => $t->getEstado()->getNombre(),
            "categorias" => $categorias,
            "path" => $encontreCategoria ? strtolower($categoriaEncontrada) . '/' . $t->getAutor()->getId() . '/' . date_format($t->getDateCreate(), 'Y') . '/' . date_format($t->getDateCreate(), 'm') . '/' . date_format($t->getDateCreate(), 'd') . '/' . $t->getPath():[],
            "ultimaVezVisto" => $t->getOldDateView(),
            "redactor" => array(
                'nombre' =>  $t->getAutor()->getNombre() . ' ' . $t->getAutor()->getApellido(),
                'descripcion' => $t->getAutor()->getDescripcion(),
                'id' => $t->getAutor()->getId(),
                'path' => $t->getAutor()->getFotoPerfil() !== null ? $_SERVER['DOMINIO_PAGE'] . '/post/photo/' . $t->getAutor()->getFotoPerfil()->getNombre() : 'Sin Foto',
            ),
            "dateCreate" => $t->getDateCreate(),
            "dateUpdate" => $t->getDateUpdate(),
            "extractoRedes" => $t->getExtractoRedes(),
            "medios" => $medios,
            'idPortada' => $t->getPortada() != null ? $repoMulti->find($t->getPortada())->getId() : false,
            "pathPortada" => $t->getPortada() != null ? $_SERVER['DOMINIO_PAGE'] . '/post/photo/' . $repoMulti->find($t->getPortada())->getNombre() : false,
            "blocks" => $blocks,
            "publicidad" => $publicidad
        );

        return $tupla;
    }

    private function reOrdenarCategorias($t, $filterCategoria)
    {

        $categorias = $t['categorias'];
        if (in_array(array('id' => 2, 'nombre' => 'DESTACADO_PPAL'), $categorias) && in_array(array('id' => 3, 'nombre' => 'DESTACADO_VIEW'), $categorias)) {
            $result = array_merge(array_slice($categorias, 0, 2), array($filterCategoria), array_slice($categorias, 3));
        } elseif (in_array(array('id' => 2, 'nombre' => 'DESTACADO_PPAL'), $categorias) || in_array(array('id' => 3, 'nombre' => 'DESTACADO_VIEW'), $categorias)) {
            $result = array_merge(array_slice($categorias, 0, 1), array($filterCategoria), array_slice($categorias, 2));
        } else {
            $result = array_merge(array_slice($categorias, 0, 0), array($filterCategoria), array_slice($categorias, 1));
        }

        $filterDuplicados = [];

        foreach ($result as $r) {
            if (!in_array($r, $filterDuplicados)) {
                array_push($filterDuplicados, $r);
            }
        };

        $t['categorias'] = $filterDuplicados;
        return $t;
    }
    /**
     * @Route("/post/listPostGeneral", name="listPostGeneral", methods={"POST"})
     */
    public function listPostGeneral(
        Request $request,
        PostRepository $repoPosts,
        PublicidadRepository $repoPublicidad,
        CategoriaRepository $repoCateg,
        MultimediaRepository $repoMulti,
        ManagerRegistry $doctrine,
        SubcategoriaRepository $repoSubCateg
    ): JsonResponse {
        $params = json_decode($request->getContent());

        $page = $params->page;
        $categoria = '';
        $subcategoria = '';
        $searchCateg = $repoCateg->findOneBy(array('nombre' => $params->categoria));
        if (!empty($searchCateg)) {
            $categoria = $searchCateg;
        } else {
            $searchSubCateg = $repoSubCateg->findOneBy(array('nombre' => $params->categoria));
            if (!empty($searchSubCateg)) {
                $subcategoria = $searchSubCateg;
            }
        }
        $categoria = $repoCateg->findOneBy(array('nombre' => $params->categoria));
        $nombreAutor = explode('-', $params->autor);
        $fechaI = $params->fechaInicio;
        $fechaF = $params->fechaFin;
        $titulo = $params->busqueda;
        $estado = $params->estado;
        $limit = $params->limit;
        $medio = $params->medio;

        $result = $doctrine->getManager()->getRepository(Post::class)->getlistPosts($page, $limit, $categoria, $subcategoria, $nombreAutor, $fechaI, $fechaF, $titulo, $estado, $medio);

        $cantPostPublicados = count($repoPosts->findBy(array('estado' => 2)));
        $cantTotalPost = count($repoPosts->findAll());
        $cantPostBorradores = count($repoPosts->findBy(array('estado' => 4)));

        $totalRegisters = count($result['paginator']);
        $maxPages = ceil($result['paginator']->count() / $limit);

        $tabla = $result['query']->getResult();
        $array = array();
        foreach ($tabla as $t) {
            array_push($array, $this->estructuraPost($t, $repoMulti, $repoPublicidad));
        }

        return new JsonResponse([
            'data' => $array,
            'maxPages' => $maxPages,
            'totalRegisters' => $totalRegisters,
            'cantPostPublicados' => $cantPostPublicados,
            'cantPostBorradores' => $cantPostBorradores,
            'cantTotalPostApp' => $cantTotalPost,
            'listaCargada' => "lista cargada",
        ], JsonResponse::HTTP_OK);
    }

    /**
     * @Route("/post/listPostHome", name="listPostHome", methods={"POST"})
     */
    public function listPostHome(
        MultimediaRepository $repoMulti,
        PublicidadRepository $repoPublicidad,
        CategoriaRepository $repoCateg,
        SubcategoriaRepository $repoSubCateg,
        ManagerRegistry $doctrine,
        Request $request
    ): JsonResponse {
        $params = json_decode($request->getContent());

        $array = array();
        //Post destacado posicion 0
        $resultPostDestacada = $doctrine->getManager()->getRepository(Post::class)->getPostDestacadaGral($repoCateg->find(2), 3, $params->medio);
        $tablaDestacada = $resultPostDestacada['query']->getResult();
        $arrayAux0 = array();
        $arrayIDDestacados = array();
        foreach ($tablaDestacada as $t) {
            array_push($arrayAux0, $this->estructuraPost($t, $repoMulti, $repoPublicidad));
            array_push($arrayIDDestacados, $t->getId());
        }
        array_push($array, $arrayAux0);

        //Posts order fecha posicion 1
        $resultPostsDateCreate = $doctrine->getManager()->getRepository(Post::class)->getListPostDateCreate($params->medio, "");
        $tabla = $resultPostsDateCreate['query']->getResult();
        $arrayAux1 = array();
        foreach ($tabla as $t) {
            if (!in_array($t->getId(), $arrayIDDestacados)) {
                array_push($arrayAux1, $this->estructuraPost($t, $repoMulti, $repoPublicidad));
            }
        }
        array_push($array, $arrayAux1);

        //Posts order views posicion 2
        $arrayAux2 = array();
        $resultPostDestacadaView = $doctrine->getManager()->getRepository(Post::class)->getPostDestacadaGral($repoCateg->find(3), 1, $params->medio);
        $tablaDestacadoView = $resultPostDestacadaView['query']->getResult();
        $arraySubAux2 = array();
        if (count($tablaDestacadoView) > 0) {
            array_push($arraySubAux2, $this->estructuraPost($tablaDestacadoView[0], $repoMulti, $repoPublicidad));
        } else {
            $resultPostsViews = $doctrine->getManager()->getRepository(Post::class)->getListPostViews($params->medio, 1, '');
            $tablaViews = $resultPostsViews['query']->getResult();
            array_push($arraySubAux2, $this->estructuraPost($tablaViews[0], $repoMulti, $repoPublicidad));
        }
        if ($params->medio == 1) {
            $resultPostDeportFilter1 = $doctrine->getManager()->getRepository(Post::class)->getPostDeportFilter($repoSubCateg->findOneBy(array('nombre' => 'Gimnasia')), 1, 'ExcepNot');
            $tabla =  $resultPostDeportFilter1['query']->getResult();
            if (count($tabla) > 0) {
                array_push($arraySubAux2, $this->estructuraPost($tabla[0], $repoMulti, $repoPublicidad));
            } else {
                $resultPostDeportFilter1 = $doctrine->getManager()->getRepository(Post::class)->getPostDeportFilter($repoSubCateg->findOneBy(array('nombre' => 'Gimnasia')), 1, 'Excep');
                $tabla =  $resultPostDeportFilter1['query']->getResult();
                array_push($arraySubAux2, $this->estructuraPost($tabla[0], $repoMulti, $repoPublicidad));
            }
            $resultPostDeportFilter2 = $doctrine->getManager()->getRepository(Post::class)->getPostDeportFilter($repoSubCateg->findOneBy(array('nombre' => 'Estudiantes')), 1, 'ExcepNot');
            $tabla =  $resultPostDeportFilter2['query']->getResult();
            if (count($tabla) > 0) {
                array_push($arraySubAux2, $this->estructuraPost($tabla[0], $repoMulti, $repoPublicidad));
            } else {
                $resultPostDeportFilter1 = $doctrine->getManager()->getRepository(Post::class)->getPostDeportFilter($repoSubCateg->findOneBy(array('nombre' => 'Gimnasia')), 1, 'Excep');
                $tabla =  $resultPostDeportFilter1['query']->getResult();
                array_push($arraySubAux2, $this->estructuraPost($tabla[0], $repoMulti, $repoPublicidad));
            }
            array_push($arraySubAux2, $this->estructuraPost($tabla[0], $repoMulti, $repoPublicidad));
        }
        array_push($arrayAux2, $arraySubAux2);

        if (count($tablaDestacadoView) > 0) {
            $resultPostsViews = $doctrine->getManager()->getRepository(Post::class)->getListPostViews($params->medio, 10, $tablaDestacadoView[0]->getId());
        } else {
            $resultPostsViews = $doctrine->getManager()->getRepository(Post::class)->getListPostViews($params->medio, 10, $tablaViews[0]->getId());
        }

        $tablaViews = $resultPostsViews['query']->getResult();

        foreach ($tablaViews as $t) {
            array_push($arrayAux2, $this->estructuraPost($t, $repoMulti, $repoPublicidad));
        }
        array_push($array, $arrayAux2);

        //Posts order view por categoria posicion 3

        $arrayAux3 = array();
        $result = $doctrine->getManager()->getRepository(Categoria::class)->getListCategorias('', 1, '');
        foreach ($result['query']->getResult() as $categoria) {
            if($categoria->getId() == 7 || $categoria->getId() == 4 || $categoria->getId() == 11 || $categoria->getId() == 6 || $categoria->getId() == 16|| $categoria->getId() == 9){
            $resultPostViewCategoria = $doctrine->getManager()->getRepository(Post::class)->getListPostViewCategoria($categoria, $params->medio);
            $tabla = $resultPostViewCategoria['query']->getResult();
            if (!empty($tabla)) {
                array_push($arrayAux3, array('categoria' => $categoria->getNombre(), 'data' => $this->reOrdenarCategorias($this->estructuraPost($tabla[0], $repoMulti, $repoPublicidad), array('id' => $categoria->getId(), 'nombre' => $categoria->getNombre()))));
            }
            }
        }
        array_push($array, $arrayAux3);

        return new JsonResponse([
            'data' => $array,
        ], JsonResponse::HTTP_OK);
    }

    /**
     * @Route("/post/listPostUser/{id}", name="listPostUser", methods={"GET"})
     */
    public function listPostUser(MultimediaRepository $repoMulti, PublicidadRepository $repoPublicidad, ManagerRegistry $doctrine, $id): JsonResponse
    {
        $result1 = $doctrine->getManager()->getRepository(Post::class)->getListPostUserRecientes($id);
        $tabla1 = $result1['query']->getResult();

        $result2 = $doctrine->getManager()->getRepository(Post::class)->getListPostUserMasViews($id);
        $tabla2 = $result2['query']->getResult();

        $array = array();
        $subarray1 = array();
        $subarray2 = array();
        foreach ($tabla1 as $t) {
            array_push($subarray1, $this->estructuraPost($t, $repoMulti, $repoPublicidad));
        }
        array_push($array, array('ultimosSubidos' => $subarray1));

        foreach ($tabla2 as $t) {
            array_push($subarray2, $this->estructuraPost($t, $repoMulti, $repoPublicidad));
        }
        array_push($array, array('masLeidos' => $subarray2));
        return new JsonResponse([
            'data' => $array
        ], JsonResponse::HTTP_OK);
    }

    /**
     * @Route("{path}", name="getPostData", methods={"GET"})
     */
    public function getPostData($path, PostRepository $repoPosts, MultimediaRepository $repoMulti, PublicidadRepository $repoPublicidad): JsonResponse
    {
        $originales = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿ';
        $modificadas = 'aaaaaaaceeeeiiiidnoooooouuuuybsaaaaaaaceeeeiiiidnoooooouuuyyby';
        $cadena = utf8_decode($path);
        $cadena = strtr($cadena, utf8_decode($originales), $modificadas);
        $path = preg_replace('/[0-9\@\.\;\!\"\#\$\%\&\(\)\=\?\¡\*\:\{\}\¿\°\¨]+/', '', $cadena);
        $searchPost = $repoPosts->findOneBy(array('path' => $path));
        if (!empty($searchPost)) {
            return $this->json([
                'message' => $this->estructuraPost($searchPost, $repoMulti, $repoPublicidad)
            ]);
        }
        return new JsonResponse([
            'message' => 'Ruta NOT FOUND'
        ], JsonResponse::HTTP_CONFLICT);
    }
}
