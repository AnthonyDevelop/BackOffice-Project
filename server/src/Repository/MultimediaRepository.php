<?php

namespace App\Repository;

use App\Entity\Multimedia;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\ORM\Query\Expr\Join;

/**
 * @extends ServiceEntityRepository<Multimedia>
 *
 * @method Multimedia|null find($id, $lockMode = null, $lockVersion = null)
 * @method Multimedia|null findOneBy(array $criteria, array $orderBy = null)
 * @method Multimedia[]    findAll()
 * @method Multimedia[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MultimediaRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Multimedia::class);
    }

    public function add(Multimedia $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Multimedia $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function getlistFiles($page, $limit, $nombre, $type): array
    {
        $query = $this->createQueryBuilder('m')->orderBy('m.dateCreate', 'DESC');
        $subquery = $this->createQueryBuilder('g1')->innerJoin(User::class, 'u', Join::WITH, 'u.fotoPerfil = m.id');
        $query->andWhere($query->expr()->not($query->expr()->exists($subquery->getDQL())))
        ->andWhere('m.portada is not null');

        if (!empty($nombre)) {
            $query
                ->andWhere('m.nombre LIKE :nombre')
                ->setParameter('nombre', '%' . $nombre . '%');
        }
        if (!empty($type)) {
            if ($type == 'Imagen') {
                $type = 'image';
            }
            $query
                ->andWhere('m.type LIKE :type')
                ->setParameter('type', '%' . $type . '%');
        }

        $query = $query->getQuery();

        $paginator = $this->paginate($query, $page, $limit);

        return array('paginator' => $paginator, 'query' => $query);
    }

    /**
     * @return Multimedia[] Returns an array of Garantia objects
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
