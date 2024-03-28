package com.javatpoint.controller;

import com.javatpoint.model.Address;
import com.javatpoint.model.Corona;
import com.javatpoint.service.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/address")
public class AddressController {

    private AddressRepository addressRepository;

    @Autowired
    public AddressController(AddressRepository addressRepository)
    {
        this.addressRepository=addressRepository;
    }

    @GetMapping("/getAddress")
    public ResponseEntity<List<Address>> getAddress(){
        try {
            List<Address> addresses=new ArrayList<>();
            addressRepository.findAll().forEach(a->addresses.add(a));
            return new ResponseEntity<>(addresses, HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAddressById/{id}")
    public ResponseEntity<Address> getAddressById (@PathVariable long id)
    {
        Address a=addressRepository.findById(id).orElse(null);
        if(a!=null)
            return new ResponseEntity<>(a,HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
