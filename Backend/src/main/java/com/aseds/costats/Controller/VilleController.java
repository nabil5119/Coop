package com.aseds.costats.Controller;

import com.aseds.costats.Model.Ville;
import com.aseds.costats.Repository.VilleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(value= "/ville",produces = { MediaType.APPLICATION_JSON_VALUE })
public class VilleController {

    @Autowired
    VilleRepository repository;

    @GetMapping(value="/all")
    public List<Ville> getAll()
    {
        return repository.findAll();
    }

    @GetMapping(value="/{id}")
    public Ville getById(@PathVariable("id") long id)
    {
        return repository.findById(id).get();
    }

    @PostMapping(value = "/create")
    public void create(@RequestBody Ville obj)
    {
        repository.save(obj);
    }

    @PutMapping(value="/{id}/update")
    public void update(@PathVariable("id") long id,@RequestBody Ville newObj)
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