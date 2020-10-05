package com.aseds.costats.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Perte {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="idCooperative")
    private Long idCooperative;

    @Column(name="motifPerte")
    private String motifPerte;

    @Column(name="sommePerdue")
    private double sommePerdue;

    @Column(name="annee")
    private String annee;

    public Perte() {
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

    public String getMotifPerte() {
        return motifPerte;
    }

    public void setMotifPerte(String motifPerte) {
        this.motifPerte = motifPerte;
    }

    public double getSommePerdue() {
        return sommePerdue;
    }

    public void setSommePerdue(double sommePerdue) {
        this.sommePerdue = sommePerdue;
    }

    public String getAnnee() {
        return annee;
    }

    public void setAnnee(String annee) {
        this.annee = annee;
    }
}
