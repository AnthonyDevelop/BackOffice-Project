<?php

namespace App\Controller;

use App\Entity\Post;
use App\Repository\CategoriaRepository;
use App\Repository\EstadoPublicacionRepository;
use App\Repository\MedioRepository;
use App\Repository\MultimediaRepository;
use App\Repository\PostRepository;
use App\Repository\RedesRepository;
use App\Repository\SubcategoriaRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Noweh\TwitterApi\Client;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class PostController extends AbstractController
{
    private function settingConfigTwitter()
    {
        $settings = [
            'account_id' => $_SERVER['ACCOUNT_ID_TW'],
            'consumer_key' => $_SERVER['CONSUMER_KEY_TW'],
            'consumer_secret' => $_SERVER['CONSUMER_SECRET_TW'],
            'bearer_token' => $_SERVER['BEARER_TOKEN_TW'],
            'access_token' => $_SERVER['ACCESS_TOKEN_TW'],
            'access_token_secret' => $_SERVER['ACCESS_TOKEN_SECRET_TW']
        ];
        return $settings;
    }

    private function compartirEnTwitter($post, $extractoRedes)
    {
        $client = new Client($this->settingConfigTwitter());
        $client->tweet()->performRequest('POST', ['text' => $extractoRedes . '. ' . 'https://editor.fourcapital.com.ar/' . $post->getPath()]);
    }

    private function compartirEnFacebook($client, $post, $extractoRedes)
    {
        $client->request('POST', 'https://graph.facebook.com/1892048420833933/feed?message='
            . $extractoRedes . '&link=' . 'https://editor.fourcapital.com.ar/' . $post->getPath() . '&access_token=' . $_SERVER['ACCESS_TOKEN_FB']);
    }

    private function checkDestacados($categorias, $medios, $repoMedios, $repoCateg, $entityManager)
    {
        if (in_array('DESTACADO_VIEW', $categorias)) {
            $categDestacadoView = $repoCateg->find(3);
            $posteos = $categDestacadoView->getPosts();
            foreach ($posteos as $posteo) {
                foreach ($medios as $medio) {
                    if ($posteo->getMedios()->contains($repoMedios->find($medio))) {
                        $posteo->removeCategoria($categDestacadoView);
                        $entityManager->persist($posteo);
                        $entityManager->flush();
                    }
                }
            }
        }
    }

    private function verificationPost($params)
    {
        if (empty($params->titulo) || !isset($params->titulo)) {
            return 'Defina un titulo para el posteo';
        }
        if (!isset($params->subtitulo)) {
            return 'Defina un subtitulo para el posteo';
        }
        if (!isset($params->extractoRedes)) {
            return 'Defina un extracto para las redes sociales';
        }
        if (!isset($params->idPortada)) {
            return 'Defina una portada para el posteo';
        }
        if (!isset($params->categorias)) {
            return 'Defina las categorias para el posteo';
        }
        if (!isset($params->blocks)) {
            return 'No se puede publicar un posteo vacio';
        }
        if (!isset($params->medios)) {
            return 'Defina en que medio desea publicar el post';
        }
        if (!isset($params->categorias) > 0) {

            return 'Defina una categoria para poder publicar el post';
        }
        return 'ok';
    }

    private function clearTitulo($params, $post)
    {
        $originales = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿ';
        $modificadas = 'aaaaaaaceeeeiiiidnoooooouuuuybsaaaaaaaceeeeiiiidnoooooouuuyyby';
        $cadena = utf8_decode($params->titulo);
        $cadena = strtr($cadena, utf8_decode($originales), $modificadas);
        $post->setPath(str_replace(" ", "-", preg_replace('/[0-9\@\.\;\!\"\#\$\%\&\(\)\=\,\?\¡\*\:\{\}\¿\°\¨]+/', '', $cadena)));
    }

    private function processBlocks($blocks, $repoMulti, $post)
    {
        foreach ($blocks as $elemento) {
            if (is_array($elemento->data) && !empty($elemento->data[0])) {
                if ($elemento->type == "image") {
                    $searchFile = $repoMulti->find($elemento->data[0]);
                    $post->addFile($searchFile);
                } elseif ($elemento->type == "carrouselTool") {
                    foreach ($elemento->data[0] as $id) {
                        $searchFile = $repoMulti->find($id);
                        $post->addFile($searchFile);
                    }
                }
            }
        }
        $post->setBlocks($blocks);
    }

    private function uploadInRedes($searchRedes, $post, $params, $client)
    {
        if ($searchRedes->isCompartirTwitter() && $params->twitter) {
            $this->compartirEnTwitter($post, $params->extractoRedes);
        }
        if ($searchRedes->isCompartirFacebook() && $params->facebook) {
            $this->compartirEnFacebook($client, $post, $params->extractoRedes);
        }
    }

    /**
     * @Route("/api/post/createPost", name="create", methods={"POST"})
     */
    public function createPost(Request $request, EntityManagerInterface $entityManager, EstadoPublicacionRepository $repoEstados, MedioRepository $repoMedios, MultimediaRepository $repoMulti, CategoriaRepository $repoCate, SubcategoriaRepository $repoSubCate): JsonResponse
    {
        date_default_timezone_set('America/Argentina/Buenos_Aires');
        $params = json_decode($request->getContent());

        $post = new Post();
        $fecha = new \DateTime(date("Y-m-d H:i:s"), new \DateTimeZone('America/Argentina/Buenos_Aires'));
        $post->setAutor($this->getUser());
        $post->setDatecreate($fecha);
        $post->setDateupdate($fecha);
        $post->setOldDateView($fecha);
        $post->setEstado($repoEstados->find($params->idEstado));

        $this->clearTitulo($params, $post);

        if (isset($params->subtitulo) && !empty($params->subtitulo)) {
            $post->setSubtitulo($params->subtitulo);
        }

        if (isset($params->idPortada) && !empty($params->idPortada)) {
            $post->setPortada($params->idPortada);
            $searchFile = $repoMulti->find($params->idPortada);
            $post->addFile($searchFile);
        }

        if (isset($params->extractoRedes) && !empty($params->extractoRedes)) {
            $post->setExtractoRedes($params->extractoRedes);
        }

        foreach ($params->medios as $idmedio) {
            $post->addMedio($repoMedios->find($idmedio));
        }

        if (isset($params->categorias) && !empty($params->categorias)) {
            foreach ($params->categorias as $categoria) {
                $searchCateg = $repoCate->findOneBy(array('nombre' => $categoria));
                $this->checkDestacados($params->categorias, $params->medios, $repoMedios, $repoCate, $entityManager);
                if (!empty($searchCateg)) {
                    $post->addCategoria($searchCateg);
                } else {
                    $searchSubCateg = $repoSubCate->findOneBy(array('nombre' => $categoria));
                    if (in_array(1, $params->medios)) {
                        $post->addSubcategorium($searchSubCateg);
                    }
                    if (!in_array($searchSubCateg->getCategoriaDad()->getNombre(), $params->categorias)) {
                        $post->addCategoria($searchSubCateg->getCategoriaDad());
                    }
                }
            }
        }

        if (isset($params->blocks)) {
            $this->processBlocks($params->blocks, $repoMulti, $post);
            $entityManager->persist($post);
        }

        $entityManager->persist($post);
        $entityManager->flush();

        if (!empty($params->titulo)) {
            $post->setTitulo($params->titulo);
        } else {
            $post->setTitulo('Posteo #' . $post->getId());
        }

        $entityManager->persist($post);
        $entityManager->flush();

        return new JsonResponse([
            'posId' => $post->getId(),
            'response' => 'Publicacion guardada como borrador'
        ], JsonResponse::HTTP_OK);
    }

    /**
     * @Route("/api/post/deletePosts", name="deletePosts", methods={"POST"})
     */
    public function deletePosts(Request $request, EntityManagerInterface $entityManager, PostRepository $repoPosts): JsonResponse
    {
        if ($this->getUser()->getRoles()[0] == 'ROLE_ADMIN' || $this->getUser()->getRoles()[0] == 'ROLE_REDACTOR') {
            $params = json_decode($request->getContent());

            foreach ($params->idPosts as $id) {
                $searchPost = $repoPosts->find($id);
                $entityManager->remove($searchPost);
                $entityManager->flush();
            }
            return new JsonResponse([
                'response' => 'Posteos eliminados correctamente',
            ], JsonResponse::HTTP_OK);
        }
        return new JsonResponse([
            'message' => 'Usted no tiene permisos para realizar esta accion'
        ], JsonResponse::HTTP_CONFLICT);
    }

    /**
     * @Route("/api/post/updatePost", name="updatePost", methods={"POST"})
     */
    public function updatePost(HttpClientInterface $client, Request $request, PostRepository $repoPosts, RedesRepository $repoRedes, MedioRepository $repoMedio, MultimediaRepository $repoMulti, CategoriaRepository $repoCateg, SubcategoriaRepository $repoSubCateg, EstadoPublicacionRepository $repoEstados, EntityManagerInterface $entityManager): JsonResponse
    {
        date_default_timezone_set('America/Argentina/Buenos_Aires');
        $params = json_decode($request->getContent());
        $post = $repoPosts->find($params->idPost);
        $subtitulo = $params->subtitulo;
        $idEstado = $params->idEstado;
        $nombreCategorias = $params->categorias;
        $blocks = $params->blocks;
        $searchRedes = $repoRedes->find(1);

        $post->setEstado($repoEstados->find($idEstado));
        $this->clearTitulo($params, $post);
        $post->setSubtitulo($subtitulo);

        if (isset($params->extractoRedes) ) {
            $post->setExtractoRedes($params->extractoRedes);
        }

        if (isset($params->idPortada)) {
            $post->setPortada($params->idPortada);
        }

        foreach ($post->getMedios() as $medio) {
            $post->removeMedio($medio);
        }
        if (!empty($params->medios)) {
            foreach ($params->medios as $medio) {
                $post->addMedio($repoMedio->find($medio));
            }
        }

        if (!empty($nombreCategorias)) {
            foreach ($post->getCategorias() as $categoria) {
                $post->removeCategoria($categoria);
            }
            foreach ($post->getSubcategoria() as $subcateg) {
                $post->removeSubcategorium($subcateg);
            }
            foreach ($nombreCategorias as $categoria) {
                $searchCateg = $repoCateg->findOneBy(array('nombre' => $categoria));
                if (!empty($searchCateg)) {
                    $post->addCategoria($searchCateg);
                }
                $searchSubCateg = $repoSubCateg->findOneBy(array('nombre' => $categoria));
                if (!empty($searchSubCateg)) {
                    if (in_array(1, $params->medios)) {
                        $post->addSubcategorium($searchSubCateg);
                    }
                    $nombreCategoriaDad = $searchSubCateg->getCategoriaDad()->getNombre();
                    if (!in_array($nombreCategoriaDad, $params->categorias)) {
                        $post->addCategoria($searchSubCateg->getCategoriaDad());
                    }
                }
            }
        }

        foreach ($post->getFiles() as $file) {
            $post->removeFile($file);
        }
        if (!empty($blocks)) {
            $this->processBlocks($params->blocks, $repoMulti, $post);
        } else {
            $post->setBlocks([]);
        }

        if ($params->idEstado == 2) {
            $message = $this->verificationPost($params);
            if ($message != 'ok') {
                return new JsonResponse([
                    'message' => $message
                ], JsonResponse::HTTP_CONFLICT);
            }
            $this->uploadInRedes($searchRedes, $post, $params, $entityManager, $client);
        }

        $post->setDateupdate(new \DateTime(date("Y-m-d H:i:s"), new \DateTimeZone('America/Argentina/Buenos_Aires')));

        $entityManager->persist($post);
        $entityManager->flush();

        if (!empty($params->titulo)) {
            $post->setTitulo($params->titulo);
        } else {
            $post->setTitulo('Posteo #' . $post->getId());
        }

        $entityManager->persist($post);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Publicacion actualizada correctamente'
        ], JsonResponse::HTTP_OK);
    }


    /**
     * @Route("/post/view/{id}", name="viewadd", methods={"GET"})
     */
    public function view($id, PostRepository $repoPost, EntityManagerInterface $entityManager): JsonResponse
    {
        date_default_timezone_set('America/Argentina/Buenos_Aires');

        $search = $repoPost->find($id);
        $search->setOldDateView(new \DateTime(date("Y-m-d H:i:s"), new \DateTimeZone('America/Argentina/Buenos_Aires')));
        $entityManager->persist($search->setViews($search->getViews() + 1));
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'add view'
        ], JsonResponse::HTTP_ACCEPTED);
    }
}
