package com.aseds.costats.Controller;

import com.aseds.costats.Model.Membre;
import com.aseds.costats.Model.User;
import com.aseds.costats.Repository.MembreRepository;
import com.aseds.costats.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value= "/user",produces = { MediaType.APPLICATION_JSON_VALUE })
public class UserController {

    @Autowired
    UserRepository repository;
    @Autowired
    MembreRepository membreRepository;

    @GetMapping(value="/all")
    public List<User> getAll()
    {
        return repository.findAll();
    }

    @GetMapping(value="/{id}")
    public User getById(@PathVariable("id") long id)
    {
        return repository.findById(id).get();
    }

    @GetMapping(value="/{id}/cooperative")
    public Long getByCoop(@PathVariable("id") long id)
    {
        List<Membre> membres=membreRepository.findAll();
        User user=repository.findById(id).get();
        for(Membre membre:membres)
        {
            if(user.getEmail().equals(membre.getEmail()))
            {
                return membre.getIdCooperative();
            }
        }
        return 0L;
    }

    @PostMapping(value="/login")
    public User Login(@RequestBody User obj)
    {
        List<User> users=getAll();
        for(User user:users)
        {
            if(user.getEmail().equals(obj.getEmail()))
            {
                if(user.getMotDePasse().equals(obj.getMotDePasse()))
                    return user;
            }
        }
        return null;
    }

    @PostMapping(value = "/create")
    public Long create(@RequestBody User obj)
    {
        return repository.save(obj).getId();
    }

    @PutMapping(value="/{id}/update")
    public void update(@PathVariable("id") long id,@RequestBody User newObj)
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
