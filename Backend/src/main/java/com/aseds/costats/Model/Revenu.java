package com.aseds.costats.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Revenu {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="idCooperative")
    private Long idCooperative;

    @Column(name="sourceRevenue")
    private String sourceRevenue;

    @Column(name="sommeGagnee")
    private double sommeGagnee;

    @Column(name="annee")
    private String annee;

    public String getAnnee() {
        return annee;
    }

    public void setAnnee(String annee) {
        this.annee = annee;
    }

    public Revenu() {
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

    public String getSourceRevenue() {
        return sourceRevenue;
    }

    public void setSourceRevenue(String sourceRevenue) {
        this.sourceRevenue = sourceRevenue;
    }

    public double getSommeGagnee() {
        return sommeGagnee;
    }

    public void setSommeGagnee(double sommeGagnee) {
        this.sommeGagnee = sommeGagnee;
    }
}
