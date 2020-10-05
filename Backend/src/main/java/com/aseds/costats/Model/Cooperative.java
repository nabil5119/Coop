package com.aseds.costats.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Cooperative {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="idSecteur")
    private Long idSecteur;

    @Column(name="idAdresse")
    private Long  idAdresse;

    @Column(name="idRegion")
    private Long  idRegion;

    @Column(name="nomCooperative")
    private String nomCooperative;

    public Cooperative() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdSecteur() {
        return idSecteur;
    }

    public void setIdSecteur(Long idSecteur) {
        this.idSecteur = idSecteur;
    }

    public Long getIdAdresse() {
        return idAdresse;
    }

    public void setIdAdresse(Long idAdresse) {
        this.idAdresse = idAdresse;
    }

    public String getNomCooperative() {
        return nomCooperative;
    }

    public void setNomCooperative(String nomCooperative) {
        this.nomCooperative = nomCooperative;
    }

    public Long getIdRegion() {
        return idRegion;
    }

    public void setIdRegion(Long idRegion) {
        this.idRegion = idRegion;
    }
}
