<?php

namespace App\Entity;

use App\Repository\PostRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PostRepository::class)]
class Post
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'posts')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $autor = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $datecreate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $dateupdate = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?EstadoPublicacion $estado = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $titulo = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $subtitulo = null;

    #[ORM\Column(nullable: true)]
    private ?int $views = 0;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $path = null;

    #[ORM\Column(nullable: true)]
    private ?int $portada = null;

    #[ORM\ManyToMany(targetEntity: Multimedia::class, inversedBy: 'posts')]
    private Collection $files;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $extractoRedes = null;

    #[ORM\Column]
    private array $blocks = [];

    #[ORM\ManyToMany(targetEntity: Categoria::class, inversedBy: 'posts')]
    private Collection $categorias;

    #[ORM\ManyToMany(targetEntity: Medio::class, inversedBy: 'posts')]
    private Collection $medios;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $oldDateView = null;

    #[ORM\ManyToMany(targetEntity: Subcategoria::class, inversedBy: 'posts')]
    private Collection $subcategoria;

    public function __construct()
    {
        $this->files = new ArrayCollection();
        $this->categorias = new ArrayCollection();
        $this->medios = new ArrayCollection();
        $this->subcategoria = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAutor(): ?User
    {
        return $this->autor;
    }

    public function setAutor(?User $autor): self
    {
        $this->autor = $autor;

        return $this;
    }

    public function getDatecreate(): ?\DateTimeInterface
    {
        return $this->datecreate;
    }

    public function setDatecreate(\DateTimeInterface $datecreate): self
    {
        $this->datecreate = $datecreate;

        return $this;
    }

    public function getDateupdate(): ?\DateTimeInterface
    {
        return $this->dateupdate;
    }

    public function setDateupdate(\DateTimeInterface $dateupdate): self
    {
        $this->dateupdate = $dateupdate;

        return $this;
    }

    public function getEstado(): ?EstadoPublicacion
    {
        return $this->estado;
    }

    public function setEstado(?EstadoPublicacion $estado): self
    {
        $this->estado = $estado;

        return $this;
    }

    public function getTitulo(): ?string
    {
        return $this->titulo;
    }

    public function setTitulo(string $titulo): self
    {
        $this->titulo = $titulo;

        return $this;
    }

    public function getSubtitulo(): ?string
    {
        return $this->subtitulo;
    }

    public function setSubtitulo(?string $subtitulo): self
    {
        $this->subtitulo = $subtitulo;

        return $this;
    }

    public function getViews(): ?int
    {
        return $this->views;
    }

    public function setViews(?int $views): self
    {
        $this->views = $views;

        return $this;
    }

    public function getPath(): ?string
    {
        return $this->path;
    }

    public function setPath(string $path): self
    {
        $this->path = $path;

        return $this;
    }

    public function getPortada(): ?int
    {
        return $this->portada;
    }

    public function setPortada(?int $portada): self
    {
        $this->portada = $portada;

        return $this;
    }

    /**
     * @return Collection<int, Multimedia>
     */
    public function getFiles(): Collection
    {
        return $this->files;
    }

    public function addFile(Multimedia $file): self
    {
        if (!$this->files->contains($file)) {
            $this->files->add($file);
        }

        return $this;
    }

    public function removeFile(Multimedia $file): self
    {
        $this->files->removeElement($file);

        return $this;
    }

    public function getExtractoRedes(): ?string
    {
        return $this->extractoRedes;
    }

    public function setExtractoRedes(?string $extractoRedes): self
    {
        $this->extractoRedes = $extractoRedes;

        return $this;
    }

    public function getBlocks(): array
    {
        return $this->blocks;
    }

    public function setBlocks(array $blocks): self
    {
        $this->blocks = $blocks;

        return $this;
    }

    /**
     * @return Collection<int, Categoria>
     */
    public function getCategorias(): Collection
    {
        return $this->categorias;
    }

    public function addCategoria(Categoria $categoria): self
    {
        if (!$this->categorias->contains($categoria)) {
            $this->categorias->add($categoria);
        }

        return $this;
    }

    public function removeCategoria(Categoria $categoria): self
    {
        $this->categorias->removeElement($categoria);

        return $this;
    }

    /**
     * @return Collection<int, Medio>
     */
    public function getMedios(): Collection
    {
        return $this->medios;
    }

    public function addMedio(Medio $medio): self
    {
        if (!$this->medios->contains($medio)) {
            $this->medios->add($medio);
        }

        return $this;
    }

    public function removeMedio(Medio $medio): self
    {
        $this->medios->removeElement($medio);

        return $this;
    }

    public function getOldDateView(): ?\DateTimeInterface
    {
        return $this->oldDateView;
    }

    public function setOldDateView(?\DateTimeInterface $oldDateView): self
    {
        $this->oldDateView = $oldDateView;

        return $this;
    }

    /**
     * @return Collection<int, Subcategoria>
     */
    public function getSubcategoria(): Collection
    {
        return $this->subcategoria;
    }

    public function addSubcategorium(Subcategoria $subcategorium): self
    {
        if (!$this->subcategoria->contains($subcategorium)) {
            $this->subcategoria->add($subcategorium);
        }

        return $this;
    }

    public function removeSubcategorium(Subcategoria $subcategorium): self
    {
        $this->subcategoria->removeElement($subcategorium);

        return $this;
    }

}
