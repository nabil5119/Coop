package com.aseds.costats.Controller;

import com.aseds.costats.Model.Region;
import com.aseds.costats.Model.Ville;
import com.aseds.costats.Repository.RegionRepository;
import com.aseds.costats.Repository.VilleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value= "/region",produces = { MediaType.APPLICATION_JSON_VALUE })
public class RegionController {

    @Autowired
    RegionRepository repository;
    @Autowired
    VilleRepository villeRepository;

    @GetMapping(value="/all")
    public List<Region> getAll()
    {
        return repository.findAll();
    }

    @GetMapping(value="/{id}")
    public Region getById(@PathVariable("id") long id)
    {
        return repository.findById(id).get();
    }

    @GetMapping(value="/{id}/villes")
    public List<Ville> getByVilles(@PathVariable("id") long id)
    {
        List<Ville> ret=new ArrayList<>();
        List<Ville> villes=villeRepository.findAll();
        for(Ville ville:villes)
        {
            if(ville.getIdRegion()==id){
                ret.add(ville);
            }
        }
        return ret;

    }

    @PostMapping(value = "/create")
    public long create(@RequestBody Region obj)
    {
        return repository.save(obj).getId();
    }

    @PutMapping(value="/{id}/update")
    public void update(@PathVariable("id") long id,@RequestBody Region newObj)
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