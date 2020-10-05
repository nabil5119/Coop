package com.aseds.costats.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Assemblee {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="idCooperative")
    private Long idCooperative;

    @Column(name="motifAssemblee")
    private String motifAssemblee;

    @Column(name="dateDebut")
    private Date dateDebut;

    @Column(name="dateFin")
    private Date dateFin;

    @Column(name="annee")
    private String annee;

    public Assemblee() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdCooperative() {
        return idCooperative;
    }

    public void setIdCooperative(Long idCooperative) {
        this.idCooperative = idCooperative;
    }

    public String getMotifAssemblee() {
        return motifAssemblee;
    }

    public void setMotifAssemblee(String motifAssemblee) {
        this.motifAssemblee = motifAssemblee;
    }

    public Date getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(Date dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Date getDateFin() {
        return dateFin;
    }

    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
    }

    public String getAnnee() {
        return annee;
    }

    public void setAnnee(String annee) {
        this.annee = annee;
    }
}
