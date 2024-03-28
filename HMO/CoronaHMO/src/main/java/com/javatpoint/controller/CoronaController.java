package com.javatpoint.controller;

import com.javatpoint.model.Corona;
import com.javatpoint.model.Vaccine;
import com.javatpoint.service.AddressRepository;
import com.javatpoint.service.CoronaRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/corona")
public class CoronaController {

    private CoronaRepository coronaRepository;

    @Autowired
    public CoronaController(CoronaRepository coronaRepository)
    {
        this.coronaRepository=coronaRepository;
    }

    @GetMapping("/getCorona")
    public ResponseEntity<List<Corona>> getCoronaes(){
        try {
            List<Corona> coronas=new ArrayList<>();
            coronaRepository.findAll().forEach(c->coronas.add(c));
            return new ResponseEntity<>(coronas, HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getCoronaById/{id}")
    public ResponseEntity<Corona> getCoronaById (@PathVariable long id)
    {
        Corona c=coronaRepository.findById(id).orElse(null);
        if(c!=null)
            return new ResponseEntity<>(c,HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @PutMapping("/updateCorona/{id}")
    public ResponseEntity updateCorona(@PathVariable long id,
                                       @Valid @RequestBody Corona corona){
        Corona c=coronaRepository.findById(id).orElse(null);
        if(c!=null)
        {
            LocalDate today = LocalDate.now();
            if(corona.getPositive().isAfter(today)&&corona.getRecovery().isAfter(today)&&corona.getRecovery().isBefore(corona.getPositive())){
                return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
            }
            c.setPositive(corona.getPositive());
            c.setRecovery(corona.getRecovery());
            coronaRepository.save(c);
            return new ResponseEntity<>(c,HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteCorona/{id}")
    public ResponseEntity deleteCorona(@PathVariable long id){
        try{
            coronaRepository.deleteById(id);
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
