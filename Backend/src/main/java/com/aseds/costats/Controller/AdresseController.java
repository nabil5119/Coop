package com.aseds.costats.Controller;

import com.aseds.costats.Model.Adresse;
import com.aseds.costats.Repository.AdresseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(value= "/adresse",produces = { MediaType.APPLICATION_JSON_VALUE })
public class AdresseController {

    @Autowired
    AdresseRepository repository;

    @GetMapping(value="/all")
    public List<Adresse> getAll()
    {
        return repository.findAll();
    }

    @GetMapping(value="/{id}")
    public Adresse getById(@PathVariable("id") long id)
    {
        return repository.findById(id).get();
    }

    @PostMapping(value = "/create")
    public Long create(@RequestBody Adresse obj)
    {
        return repository.save(obj).getId();
    }

    @PutMapping(value="/{id}/update")
    public void update(@PathVariable("id") long id,@RequestBody Adresse newObj)
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