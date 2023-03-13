<?php

namespace App\Repository;

use App\Entity\Categoria;
use App\Entity\Subcategoria;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\Pagination\Paginator;

/**
 * @extends ServiceEntityRepository<Categoria>
 *
 * @method Categoria|null find($id, $lockMode = null, $lockVersion = null)
 * @method Categoria|null findOneBy(array $criteria, array $orderBy = null)
 * @method Categoria[]    findAll()
 * @method Categoria[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CategoriaRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Categoria::class);
    }

    public function add(Categoria $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Categoria $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return Categoria[] 
     */
    public function getListCategorias($limit, $currentPage, $nombre): array
    {
        $query = $this->createQueryBuilder('c')
            ->andWhere('c.nombre <> :excepction0')
            ->setParameter('excepction0', 'UNCAGORIZED');
        if (!empty($nombre)) {
            $query->andWhere('c.nombre LIKE :nombre')->setParameter('nombre','%'.$nombre.'%');
        };
        $query = $query->getQuery();
        if ($limit != '') {
            $paginator = $this->paginate($query, $currentPage, $limit);
            return array('paginator' => $paginator, 'query' => $query);
        } else {
            return array('query' => $query);
        }
    }

    /**
     * @return Categoria[] Returns an array of Garantia objects
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
