<?php

namespace App\Controller;

use App\Entity\Multimedia;
use App\Repository\MultimediaRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\UserRepository;
use App\Repository\PublicidadRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MultimediaController extends AbstractController
{
    private function checkingDirectorys($localFS){

        $firstDirectory = '/' . date("Y");
        if (!$localFS->directoryExists($firstDirectory)) {
            $localFS->createDirectory($firstDirectory);
        }
        $secondDirectory = $firstDirectory . '/' . date("m");
        if (!$localFS->directoryExists($secondDirectory)) {
            $localFS->createDirectory($secondDirectory);
        }
        return $secondDirectory;
    }

    private function cargarMultimedia($localFS, $contenido, $entityManager, $idUser, $repoMulti, $extension)
    {
        date_default_timezone_set('America/Argentina/Buenos_Aires');

        $file = new Multimedia();
        $type = explode('/', $contenido->getMimeType());
        if (!str_contains($contenido->getClientOriginalName(), $type[1]) && $type[1] <> 'jpg' && $type[1] <> 'jpeg') {
            $path = $this->checkingDirectorys($localFS) . '/' . str_replace(" ", "", $contenido->getClientOriginalName()) . $extension . '.' . $type[1];
            $file->setNombre(str_replace(" ", "", $contenido->getClientOriginalName()) . $extension . '.' . $type[1]);
        } else {
            $path = $this->checkingDirectorys($localFS) . '/' . $extension . str_replace(" ", "", $contenido->getClientOriginalName());
            $file->setNombre( $extension . str_replace(" ", "", $contenido->getClientOriginalName()));
        }

        $localFS->write($path, file_get_contents($contenido->getPathname()));

        $file->setType($contenido->getMimeType());
        $file->setPath($path);
        $file->setUploadBy($idUser);
        $file->setDateCreate(new \DateTime(date("Y-m-d H:i:s"), new \DateTimeZone('America/Argentina/Buenos_Aires')));
        $file->setSize($contenido->getSize());

        $entityManager->persist($file);
        $entityManager->flush();

        if ($extension == 'preview') {
            $searchFileDad = $repoMulti->findOneBy(array('nombre' => str_replace(" ", "", $contenido->getClientOriginalName())));
            $searchFileDad->setPortada($file->getId());
            $entityManager->persist($file);
            $entityManager->flush();
        }

        return $file;
    }

    /**
     * @Route("/api/files/listFiles", name="listFiles", methods={"POST"})
     */
    public function listFiles(Request $request, ManagerRegistry $doctrine, MultimediaRepository $repoMulti): JsonResponse
    {
        $params = json_decode($request->getContent());
        $nombre = $params->nombre;
        $page = $params->page;
        $type = $params->type;

        $limit = 30;
        $result = $doctrine->getManager()->getRepository(Multimedia::class)->getListFiles($page, $limit, $nombre, $type);
        $tabla = $result['query']->getResult();

        $totalRegisters = count($result['paginator']);
        $maxPages = ceil($result['paginator']->count() / $limit);

        $array = array();
        foreach ($tabla as $f) {
            $arraySize  = array_map('intval', str_split($f->getSize()));

            if (strlen($f->getSize()) > 6) {
                $size = (implode(array_splice($arraySize, 0, strlen($f->getSize()) - 6)) . 'MB');
            } else {
                $size = (implode(array_splice($arraySize, 0, strlen($f->getSize()) - 3)) . 'KB');
            }

            $tupla = array(
                'nombre' => $f->getNombre(),
                'id' => $f->getId(),
                'subidoPor' => $f->getUploadBy()->getNombre() . ' ' . $f->getUploadBy()->getApellido(),
                'fechaSubida' => $f->getDateCreate(),
                'type' => $f->getType(),
                'path' => $_SERVER['DOMINIO_PAGE'] . '/post/photo/' . $f->getNombre(),
                'pathPortada' => !empty($f->getPortada()) && !str_contains($f->getType(), 'video') ? $_SERVER['DOMINIO_PAGE'] . '/post/photo/' . $repoMulti->find($f->getPortada())->getNombre() : $_SERVER['DOMINIO_PAGE'] . '/post/photo/' . $f->getNombre(),
                'usado' => count($f->getPosts()) > 0 ? 'Si' : 'No',
                'size' => $size
            );
            array_push($array, $tupla);
        };
        return new JsonResponse([
            'data' => $array,
            'maxPages' => $maxPages,
            'totalRegisters' => $totalRegisters
        ]);
    }

    /**
     * @Route("/api/post/deleteFile", name="deleteFile", methods={"POST"})
     */
    public function deleteFile($localFS, Request $request, MultimediaRepository $repoMulti, UserRepository $repoUser, PublicidadRepository $repoPublicidad, EntityManagerInterface $entityManager): JsonResponse
    {
        if ($this->getUser()->getRoles()[0] == 'ROLE_ADMIN' || $this->getUser()->getRoles()[0] == 'ROLE_REDACTOR') {
            $params = json_decode($request->getContent());
            foreach ($params as $id) {
                $searchFile = $repoMulti->find($id);
                if (count($searchFile->getPosts()) > 0) {
                    return new JsonResponse([
                        'message' => 'El archivo esta siendo usado'
                    ], JsonResponse::HTTP_OK);
                }

                foreach ($repoUser->findAll() as $user) {
                    if ($user->getFotoPerfil() == $searchFile) {
                        return new JsonResponse([
                            'message' => 'El archivo esta siendo usado como foto de perfil'
                        ], JsonResponse::HTTP_OK);
                    }
                };

                foreach ($repoPublicidad->findAll() as $publicidad) {
                    if ($publicidad->getMultimedia() == $searchFile) {
                        return new JsonResponse([
                            'message' => 'El archivo esta siendo usado como publicidad'
                        ], JsonResponse::HTTP_OK);
                    }
                }

                $localFS->delete($searchFile->getPath());

                if (str_contains($searchFile->getType(), 'image')) {
                    $localFS->delete($repoMulti->find($searchFile->getPortada())->getPath());
                    $entityManager->remove($repoMulti->find($searchFile->getPortada()));
                }

                $entityManager->remove($searchFile);
                $entityManager->flush();
            }
            return new JsonResponse([
                'message' => 'File borrado correctamente'
            ], JsonResponse::HTTP_OK);
        }
        return new JsonResponse([
            'message' => 'Usted no tiene permisos para realizar esta accion'
        ], JsonResponse::HTTP_CONFLICT);
    }

    /**
     * @Route("/post/photo/{name}", name="getFile", methods={"GET"})
     */
    public function returnFile($localFS, $name, MultimediaRepository $repoMulti): Response
    {
        $searchFile = $repoMulti->findOneBy(array('nombre' => $name));
        if (empty($searchFile)) {
            return new Response('404 - Path Not Found');
        }

        $file = $localFS->read($searchFile->getPath());

        $response = new Response;
        $response->setContent($file);
        $response->headers->set('Content-Type', $searchFile->getType());
        $response->headers->set('Content-Length', $searchFile->getSize());
        $response->headers->set('Content-Disposition', "inline;filename=" . $searchFile->getNombre());
        $response->headers->set('Accept-Ranges', 'bytes 0-' . ($searchFile->getSize() - 1) . '/' . $searchFile->getSize());

        return $response;
    }

    /**
     * @Route("/api/post/uploadFile", name="uploadFile", methods={"POST"})
     */
    public function uploadFile($localFS, Request $request, EntityManagerInterface $entityManager, MultimediaRepository $repoMulti): JsonResponse
    {
        if (!empty($request->files->get('file'))) {
            $newFile = $this->cargarMultimedia($localFS, $request->files->get('file'), $entityManager, $this->getUser(), $repoMulti, '');
            if (str_contains($newFile->getType(), 'video')) {
                $newFile->setPortada('video');
            }
            $entityManager->persist($newFile);
        } else {
            $entityManager->persist($this->cargarMultimedia($localFS, $request->files->get('portada'), $entityManager, $this->getUser(), $repoMulti, 'preview'));
        }

        $entityManager->flush();
        return new JsonResponse([
            'message' => "Archivo subido a multimedia correctamente"
        ]);
    }
}
