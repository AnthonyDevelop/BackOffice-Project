<?php

namespace App\Repository;

use App\Entity\Categoria;
use App\Entity\Post;
use App\Entity\Subcategoria;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\ORM\Query\Expr\Join;


/**
 * @extends ServiceEntityRepository<Post>
 *
 * @method Post|null find($id, $lockMode = null, $lockVersion = null)
 * @method Post|null findOneBy(array $criteria, array $orderBy = null)
 * @method Post[]    findAll()
 * @method Post[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PostRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Post::class);
    }

    public function add(Post $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Post $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return Post[] 
     */

     public function getlistPosts($currentPage, $limit, $categoria, $subcategoria, $nombreAutor, $fechaI, $fechaF, $titulo, $estado, $medio): array
    {
        $query = $this->createQueryBuilder('p')->orderBy('p.id ', 'DESC');
        $aux = false;
        if (count($nombreAutor)>1) {
            $query
                ->innerJoin(User::class, 'u', Join::WITH, 'u.id = p.autor')
                ->andWhere('u.nombre LIKE :nombre')
                ->andWhere('u.apellido LIKE :apellido')
                ->setParameter('nombre', '%' . $nombreAutor[0] . '%')
                ->setParameter('apellido', '%' . $nombreAutor[count($nombreAutor)-1] . '%');
                $aux = true;
            $medio = "";
        }
        if (!empty($medio)) {
            $query->andWhere($query->expr()->isMemberOf(':medio', 'p.medios'))->setParameter('medio', $medio);
            $aux = true;
        }
        if (!empty($categoria)) {
            $query->andWhere($query->expr()->isMemberOf(':categ', 'p.categorias'))->setParameter('categ', $categoria);
            $aux = true;
        } else {
            if (!empty($subcategoria)) {
                $query->andWhere($query->expr()->isMemberOf(':categ', 'p.subcategoria'))->setParameter('categ', $subcategoria);
                $aux = true;
            }
        }
        if (!empty($fechaI) && !empty($fechaF)) {
            $date = new \DateTime("{$fechaI} 00:00:00");
            $dateEnd = new \DateTime("{$fechaF} 23:59:59");
            $query
                ->andWhere('p.datecreate BETWEEN :fecha AND :fecha2 ')
                ->setParameter('fecha', $date->format('Y-m-d H:i:s'))
                ->setParameter('fecha2', $dateEnd->format('Y-m-d H:i:s'));
                $aux = true;
        }
        if (!empty($titulo)) {
            $query
                ->andWhere('p.titulo LIKE :titulo')
                ->setParameter('titulo', '%' . $titulo . '%');
            if($limit == 6){
                $aux = true;
            }  
        }
        
        if(!empty($estado)){
            $query->andWhere('p.estado = :estado')->setParameter('estado', $estado);
        }else{
            if($aux && empty($estado)) {
                $query->andWhere('p.estado = :estado')->setParameter('estado', 2);
            }    
        }
        
        $query = $query->getQuery();

        $paginator = $this->paginate($query, $currentPage, $limit);

        return array('paginator' => $paginator, 'query' => $query);
    }

    /**
     * @return Post[] 
     */

    public function getListPostViewCategoria($categFilter, $medio): array
    {
        $query = $this->createQueryBuilder('p');
        $fecha_actual = date("Y-m-d 00:00:00");
        $date = new \DateTime(date("Y-m-d 00:00:00", strtotime($fecha_actual . "- 1 week")), new \DateTimeZone('America/Argentina/Buenos_Aires'));
        $dateEnd = new \DateTime(date("Y-m-d 23:59:59"), new \DateTimeZone('America/Argentina/Buenos_Aires'));
        $query->andWhere('p.oldDateView BETWEEN :fecha AND :fecha2 ')
            ->andWhere($query->expr()->isMemberOf(':medio', 'p.medios'))
            ->andWhere($query->expr()->isMemberOf(':categ', 'p.categorias'))
            ->setParameter('categ', $categFilter)
            ->setParameter('medio', $medio)
            ->setParameter('fecha', $date->format('Y-m-d H:i:s'))
            ->setParameter('fecha2', $dateEnd->format('Y-m-d H:i:s'))
            ->orderBy('p.views', 'DESC')
            ->setMaxResults(1);

        $query = $query->getQuery();

        return array('query' => $query);
    }

    public function getListPostViews($medio, $cantidad, $filterID): array
    {
        $query = $this->createQueryBuilder('p');
        $fecha_actual = date("Y-m-d 00:00:00");
        $date = new \DateTime(date("Y-m-d 00:00:00", strtotime($fecha_actual . "- 1 week")), new \DateTimeZone('America/Argentina/Buenos_Aires'));
        $dateEnd = new \DateTime(date("Y-m-d 23:59:59"), new \DateTimeZone('America/Argentina/Buenos_Aires'));
        $query
            ->andWhere('p.oldDateView BETWEEN :fecha AND :fecha2 ')
            ->andWhere('p.estado = :estado')
            ->setParameter('estado', 2)
            ->setParameter('fecha', $date->format('Y-m-d H:i:s'))
            ->setParameter('fecha2', $dateEnd->format('Y-m-d H:i:s'))
            ->orderBy('p.views', 'DESC')
            ->andWhere($query->expr()->isMemberOf(':medio', 'p.medios'))
            ->setParameter('medio', $medio)
            ->setMaxResults($cantidad);

        if (!empty($filterID)) {
            $query->andWhere('p.id <> :idNotPost')
                ->setParameter('idNotPost', $filterID);
        }
        $query = $query->getQuery();


        return array('query' => $query);
    }

    public function getListPostDateCreate($medio, $filterID): array
    {
        $query = $this->createQueryBuilder('p');
        $query->orderBy('p.datecreate', 'DESC')
            ->andWhere($query->expr()->isMemberOf(':medio', 'p.medios'))
            ->andWhere('p.estado = :estado')
            ->setParameter('estado', 2)
            ->setParameter('medio', $medio)
            ->setMaxResults(12);
        if (!empty($filterID)) {
            $query->andWhere('p.id <> :filter')
                ->setParameter('filter', $filterID);
        }

        $query = $query->getQuery();

        return array('query' => $query);
    }

    public function getPostDestacadaGral($categFilter, $cantidad, $medio): array
    {
        $query = $this->createQueryBuilder('p');
        $query->andWhere($query->expr()->isMemberOf(':categ', 'p.categorias'))
            ->andWhere('p.estado = :estado')
            ->setParameter('estado', 2)
            ->setParameter('categ', $categFilter)
            ->andWhere($query->expr()->isMemberOf(':medio', 'p.medios'))
            ->setParameter('medio', $medio)
            ->orderBy('p.datecreate', 'DESC')
            ->setMaxResults($cantidad);


        $query = $query->getQuery();

        return array('query' => $query);
    }

    public function getListPostUserRecientes($id_user): array
    {
        $query = $this->createQueryBuilder('p')->andWhere('p.autor = :idUser')->setParameter('idUser', $id_user)->orderBy('p.datecreate', 'DESC')->setMaxResults(10);

        $query = $query->getQuery();

        return array('query' => $query);
    }

    public function getListPostUserMasViews($id_user): array
    {
        $query = $this->createQueryBuilder('p')->andWhere('p.autor = :idUser')->setParameter('idUser', $id_user)->orderBy('p.views', 'DESC')->setMaxResults(10);

        $query = $query->getQuery();

        return array('query' => $query);
    }

    public function getPostDeportFilter($subcategoria, $medio, $excep): array
    {
        $fecha_actual = date("Y-m-d 00:00:00");
        $dateEnd = new \DateTime(date("Y-m-d 23:59:59"), new \DateTimeZone('America/Argentina/Buenos_Aires'));
        $query = $this->createQueryBuilder('p');
        $query->andWhere($query->expr()->isMemberOf(':subcategoria', 'p.subcategoria'))
            ->andWhere($query->expr()->isMemberOf(':medio', 'p.medios'))
            ->andWhere('p.estado = :estado')
            ->setParameter('estado', 2)
            ->setParameter('subcategoria', $subcategoria)
            ->setParameter('medio', $medio)
            ->orderBy('p.datecreate', 'DESC')
            ->setMaxResults(1);

        if($excep == 'ExcepNot'){
            $date = new \DateTime(date("Y-m-d 00:00:00", strtotime($fecha_actual . "- 1 week")), new \DateTimeZone('America/Argentina/Buenos_Aires'));
            $query->andWhere('p.oldDateView BETWEEN :fecha AND :fecha2 ')
            ->setParameter('fecha', $date->format('Y-m-d H:i:s'))
            ->setParameter('fecha2', $dateEnd->format('Y-m-d H:i:s'));
        }

        $query = $query->getQuery();

        return array('query' => $query);
    }

    /**
     * @return Post[] Returns an array of Garantia objects
     */

    public function paginate($dql, $page = 1, $limit = 3): paginator
    {
        $paginator = new Paginator($dql);

        $paginator->getQuery()
            ->setFirstResult($limit * ($page - 1)) // Offset
            ->setMaxResults($limit); // Limit

        return $paginator;
    }
}
