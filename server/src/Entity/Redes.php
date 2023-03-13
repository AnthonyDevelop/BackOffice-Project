<?php

namespace App\Entity;

use App\Repository\RedesRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RedesRepository::class)]
class Redes
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?bool $compartirTwitter = null;

    #[ORM\Column]
    private ?bool $compartirFacebook = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function isCompartirTwitter(): ?bool
    {
        return $this->compartirTwitter;
    }

    public function setCompartirTwitter(bool $compartirTwitter): self
    {
        $this->compartirTwitter = $compartirTwitter;

        return $this;
    }

    public function isCompartirFacebook(): ?bool
    {
        return $this->compartirFacebook;
    }

    public function setCompartirFacebook(bool $compartirFacebook): self
    {
        $this->compartirFacebook = $compartirFacebook;

        return $this;
    }
}
