<?php

namespace App\Controller;

use App\Entity\Multimedia;
use App\Entity\User;
use App\Repository\RolesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class UserController extends AbstractController
{
    private function cargarFotoPerfil($localFS, $contenido, $entityManager, $user)
    {
        date_default_timezone_set('America/Argentina/Buenos_Aires');

        $firstDirectory = '/' . date("Y");
        if (!$localFS->directoryExists($firstDirectory)) {
            $localFS->createDirectory($firstDirectory);
        }
        $secondDirectory = $firstDirectory . '/' . date("m");
        if (!$localFS->directoryExists($secondDirectory)) {
            $localFS->createDirectory($secondDirectory);
        }

        $file = new Multimedia();
        $type = explode('/', $contenido->getMimeType());
        if (!str_contains($contenido->getClientOriginalName(), $type[1]) && $type[1] <> 'jpg' && $type[1] <> 'jpeg') {
            $path = $secondDirectory . '/' . str_replace(" ", "-", $contenido->getClientOriginalName()) . '.' . $type[1];
            $file->setNombre(str_replace(" ", "-", $contenido->getClientOriginalName()) . '.' . $type[1]);
        } else {
            $path = $secondDirectory . '/' . str_replace(" ", "-", $contenido->getClientOriginalName());
            $file->setNombre(str_replace(" ", "-", $contenido->getClientOriginalName()));
        }

        $localFS->write($path, file_get_contents($contenido->getPathname()));
        $file->setType($contenido->getMimeType());
        $file->setPath($path);
        $file->setPortada('perfil');
        $file->setUploadBy($user);
        $file->setDateCreate(new \DateTime(date("Y-m-d H:i:s"), new \DateTimeZone('America/Argentina/Buenos_Aires')));
        $file->setSize($contenido->getSize());
        $fileOld = $user->getFotoPerfil();
        $user->setFotoPerfil($file);
        $entityManager->persist($user);
        $entityManager->flush();

        if (!empty($fileOld)) {
            $localFS->delete($fileOld->getPath());
            $entityManager->remove($fileOld);
            $entityManager->flush();
        }

        return $file;
    }

    public function estructuraPerfilUser($user): array
    {
        $rol = explode('_', $user->getRoles()[0]);
        $array = array(
            'id' => $user->getId(),
            'rol' => ucfirst(strtolower($rol[1])),
            'email' => $user->getUsername(),
            'nombre' => $user->getNombre(),
            'apellido' => $user->getApellido(),
            'cantidadEntradas' => count($user->getPosts()) > 0 ? count($user->getPosts()) : 'Sin Entradas',
            'descripcion' => $user->getDescripcion() !== null ? $user->getDescripcion() : 'Sin Descripcion',
            'fechaRegistroCuenta' => $user->getDatecreate(),
            'pathFotoPerfil' => $user->getFotoPerfil() !== null ? $_SERVER['DOMINIO_PAGE'] . '/post/photo/' . $user->getFotoPerfil()->getNombre() : 'Sin Foto'
        );

        return $array;
    }

    /**
     * @Route("/api/user/updateUser", name="updateUser", methods={"POST"})
     */
    public function updateUser($localFS, Request $request, RolesRepository $repoRoles, UserRepository $repoUser, EntityManagerInterface $entityManager): JsonResponse
    {
        $params = json_decode($request->request->get('data'));
        $user = $this->getUser();
        $fotoPerfil = $request->files->get('fotoPerfil');

        if (!empty($fotoPerfil)) {
            $this->cargarFotoPerfil($localFS, $fotoPerfil, $entityManager, $this->getUser());
        }
        if (!empty($params->descripcion)) {
            $user->setDescripcion($params->descripcion);
        }
        if (!empty($params->nombre)) {
            $user->setNombre($params->nombre);
        }
        if (!empty($params->apellido)) {
            $user->setApellido($params->apellido);
        }
        if (!empty($params->idRol)) {
            $user->setRoles(['ROLE_' . $repoRoles->find($params->idRol)->getNombre()]);
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse([
            'response' => 'Update Succesfull'
        ]);
    }

    /**
     * @Route("/api/user/perfilUser", name="perfilUser",  methods={"GET"})
     */
    public function perfilUser(): JsonResponse
    {
        return new JsonResponse([
            'data' => $this->estructuraPerfilUser($this->getUser())
        ]);
    }

    /**
     * @Route("/api/user/listUsers", name="listUsers",  methods={"POST"})
     */
    public function listsUsers(Request $request, UserRepository $repoUsers, ManagerRegistry $doctrine): JsonResponse
    {
        $params = json_decode($request->getContent());
        $page = $params->page;
        $busqueda = $params->busqueda;
        $limit = 15;
        $result = $doctrine->getManager()->getRepository(User::class)->getlistUsers($page, $limit, $busqueda);

        $users = $result['query']->getResult();
        $totalRegisters = count($result['paginator']);
        $maxPages = ceil($result['paginator']->count() / $limit);

        $array = array();
        foreach ($users as $u) {
            array_push($array, $this->estructuraPerfilUser($u));
        }
        return new JsonResponse([
            'data' => $array,
            'maxPages' => $maxPages,
            'totalRegisters' => $totalRegisters
        ]);
    }

    /**
     * @Route("/api/user/crearUsuario", name="crearUsuario",  methods={"POST"})
     */
    public function crearUsuario(Request $request, UserPasswordHasherInterface $passwordHasher, RolesRepository $repoRoles, EntityManagerInterface $entityManager): JsonResponse
    {
        $params = json_decode($request->getContent());
        date_default_timezone_set('America/Argentina/Buenos_Aires');

        $newUser =  new User();
        $newUser->setNombre($params->nombre);
        $newUser->setApellido($params->apellido);
        $newUser->setUsername($params->email);
        $newUser->setPassword($passwordHasher->hashPassword($newUser, $params->contraseña));
        $newUser->setDatecreate(new \DateTime(date("Y-m-d H:i:s"), new \DateTimeZone('America/Argentina/Buenos_Aires')));

        $searchRole = $repoRoles->find($params->id_rol);
        $newUser->setRoles(['ROLE_' . $searchRole->getNombre()]);

        $entityManager->persist($newUser);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Registered Succesfull',
        ]);
    }

    /**
     * @Route("/api/user/resetContrasena", name="resetContrasena", methods={"POST"})
     */
    public function resetContrasena(UserRepository $repoUser, Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager): JsonResponse
    {
        $params = json_decode($request->getContent());
        $searchUser = $repoUser->find($params->id);
        $searchUser->setPassword($passwordHasher->hashPassword($searchUser, $params->contrasena));
        $entityManager->persist($this->getUser());
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Contrasena cambiada correctamente'
        ], JsonResponse::HTTP_ACCEPTED);
    }
}
