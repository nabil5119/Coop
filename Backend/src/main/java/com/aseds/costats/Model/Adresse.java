package com.aseds.costats.Model;

import javax.persistence.*;

@Entity
public class Adresse {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="idVille")
    private Long idVille;

    @Column(name="codePostal")
    private String codePostal;

    @Column(name="ligneAdresse")
    private String ligneAdresse;

    public Adresse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdVille() {
        return idVille;
    }

    public void setIdVille(Long idVille) {
        this.idVille = idVille;
    }

    public String getCodePostal() {
        return codePostal;
    }

    public void setCodePostal(String codePostal) {
        this.codePostal = codePostal;
    }

    public String getLigneAdresse() {
        return ligneAdresse;
    }

    public void setLigneAdresse(String ligneAdresse) {
        this.ligneAdresse = ligneAdresse;
    }
}
