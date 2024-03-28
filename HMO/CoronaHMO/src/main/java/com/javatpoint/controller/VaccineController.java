package com.javatpoint.controller;

import com.javatpoint.model.Corona;
import com.javatpoint.model.Vaccine;
import com.javatpoint.service.CoronaRepository;
import com.javatpoint.service.MemberRepository;
import com.javatpoint.service.VaccineRepository;
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
@RequestMapping("/api/vaccines")
public class VaccineController {

    private VaccineRepository vaccineRepository;
    private CoronaRepository coronaRepository;

    @Autowired
    public VaccineController(VaccineRepository vaccineRepository,CoronaRepository coronaRepository)
    {
        this.vaccineRepository=vaccineRepository;
        this.coronaRepository=coronaRepository;
    }

    @GetMapping("/getVaccine")
    public ResponseEntity<List<Vaccine>> getVaccines(){
        try {
            List<Vaccine> vaccines=new ArrayList<>();
            vaccineRepository.findAll().forEach(v->vaccines.add(v));
            return new ResponseEntity<>(vaccines, HttpStatus.OK);
        }
        catch (Exception e)

        {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getVaccineById/{id}")
    public ResponseEntity<Vaccine> getVaccineById (@PathVariable long id)
    {
        Vaccine v=vaccineRepository.findById(id).orElse(null);
        if(v!=null)
            return new ResponseEntity<>(v,HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/uploadVaccine")
    public ResponseEntity<Vaccine> uploadVaccine (@RequestBody Vaccine v)
    {
        try {
            Vaccine vaccine=vaccineRepository.save(v);
            return new ResponseEntity<>(vaccine,HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/uploadVaccineByCoronaId/{id}")
    public ResponseEntity<Vaccine> uploadVaccineByCoronaId (@PathVariable long id,
                                                            @Valid @RequestBody Vaccine v)
    {
        try {
            List<Vaccine> vaccines=new ArrayList<>();
            vaccineRepository.findByCoronaId(id).forEach(vaccine->vaccines.add(vaccine));
            Corona corona=coronaRepository.findById(id).orElse(null);
            v.setCorona(corona);
            LocalDate today = LocalDate.now();
            if(vaccines.size()>=4||v.getDate().isAfter(today)){
                return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
            }
            Vaccine vaccine=vaccineRepository.save(v);
            return new ResponseEntity<>(vaccine,HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
