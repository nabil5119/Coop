package com.aseds.costats.Model;

import javax.persistence.*;

@Entity
public class Communication {
    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;

    @Column(name="idCooperative")
    private Long idCooperative;

    @Column(name="idCanalComm")
    private Long idCanalComm;

    @Column(name="nombreUtilisationAnnuel")
    private Long nombreUtilisationAnnuel;

    @Column(name="annee")
    private String annee;

    public Communication() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdCanalComm() {
        return idCanalComm;
    }

    public void setIdCanalComm(Long idCanalComm) {
        this.idCanalComm = idCanalComm;
    }

    public Long getNombreUtilisationAnnuel() {
        return nombreUtilisationAnnuel;
    }

    public void setNombreUtilisationAnnuel(Long nombreUtilisationAnnuel) {
        this.nombreUtilisationAnnuel = nombreUtilisationAnnuel;
    }

    public String getAnnee() {
        return annee;
    }

    public void setAnnee(String annee) {
        this.annee = annee;
    }

    public Long getIdCooperative() {
        return idCooperative;
    }

    public void setIdCooperative(Long idCooperative) {
        this.idCooperative = idCooperative;
    }
}
