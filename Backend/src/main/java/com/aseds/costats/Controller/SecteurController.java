package com.aseds.costats.Controller;

import com.aseds.costats.Model.Secteur;
import com.aseds.costats.Repository.SecteurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(value= "/secteur",produces = { MediaType.APPLICATION_JSON_VALUE })
public class SecteurController {

    @Autowired
    SecteurRepository repository;

    @GetMapping(value="/all")
    public List<Secteur> getAll()
    {
        return repository.findAll();
    }

    @GetMapping(value="/{id}")
    public Secteur getById(@PathVariable("id") long id)
    {
        return repository.findById(id).get();
    }

    @PostMapping(value = "/create")
    public void create(@RequestBody Secteur obj)
    {
        repository.save(obj);
    }

    @PutMapping(value="/{id}/update")
    public void update(@PathVariable("id") long id,@RequestBody Secteur newObj)
    {
        repository.findById(id).map(oldObj -> {
            long idOld=oldObj.getId();
            oldObj=newObj;
            oldObj.setId(idOld);
            return repository.save(oldObj);
        }).orElseGet(() -> {
            newObj.setId(id);
            return repository.save(newObj);
        });
    }

    @DeleteMapping(value="/{id}/delete")
    public void delete(@PathVariable("id") long id)
    {
        repository.deleteById(id);
    }
}