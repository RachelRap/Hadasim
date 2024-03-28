package com.javatpoint.controller;

import com.javatpoint.dto.MemberDTO;
import com.javatpoint.model.Corona;
import com.javatpoint.model.Member;
import com.javatpoint.service.CoronaRepository;
import com.javatpoint.service.MapStructMapper;
import com.javatpoint.service.MemberRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/member")
public class MemberController {

    private MemberRepository memberRepository;
    private MapStructMapper mapper;
    private static String UPLOAD_DIRECTORY=System.getProperty("user.dir")+"\\images\\";

    @Autowired
    public MemberController(MemberRepository memberRepository,MapStructMapper mapper)
    {
        this.memberRepository=memberRepository;
        this.mapper=mapper;
    }

    @GetMapping("/getMembers")
    public ResponseEntity<List<MemberDTO>> getMembers(){
        try{
            List<Member> members=new ArrayList<>();
            memberRepository.findAll().forEach(m->members.add(m));
            System.out.println("--------------------------"+members.size());
            return new ResponseEntity<>(mapper.membersToDto(members), HttpStatus.OK);
        }
        catch (Exception e){
            System.out.println(e);
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getMemberById/{id}")
    public ResponseEntity<MemberDTO> getMemberById(@PathVariable long id) throws IOException {
        Member m=memberRepository.findById(id).orElse(null);
        if(m!=null)
            return new ResponseEntity<>(mapper.memberToDto(m),HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @PostMapping("/uploadMember")
    public ResponseEntity<Member> uploadMember(@Valid @RequestPart("image") MultipartFile file,
                                               @Valid @RequestPart("member") Member m){
        try {
            String filePath = UPLOAD_DIRECTORY + file.getOriginalFilename();
            Path filename= Paths.get(filePath);
            Files.write(filename,file.getBytes());
            m.setImage(filePath);
            LocalDate today = LocalDate.now();
            if(m.getDateBirth().isAfter(today)) {
                return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
            }
            Member newMember = memberRepository.save(m);
            return new ResponseEntity(newMember, HttpStatus.CREATED);

        }
        catch (Exception e){
            System.out.println(e);
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/updateMember/{id}")
    public ResponseEntity<Member> updateMember(@PathVariable long id,
                                               @Valid @RequestPart("image") MultipartFile file,
                                               @Valid @RequestPart("member") Member member) throws IOException {
        Member m=memberRepository.findById(id).orElse(null);
        if(m!=null){
            LocalDate today = LocalDate.now();
            if(member.getDateBirth().isAfter(today)){
                return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
            }
            m.setDateBirth(member.getDateBirth());
            m.setAddress(member.getAddress());
            m.setCellPhone(member.getCellPhone());
            m.setCorona(member.getCorona());
            m.setFirstName(member.getFirstName());
            m.setLastName(member.getLastName());
            m.setPhone(member.getPhone());
            m.setTz(member.getTz());
            String filePath = UPLOAD_DIRECTORY + file.getOriginalFilename();
            Path filename= Paths.get(filePath);
            Files.write(filename,file.getBytes());
            m.setImage(filePath);

            memberRepository.save(m);
            return new ResponseEntity<>(m,HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/updateMember2/{id}")
    public ResponseEntity<Member> updateMember2(@PathVariable long id,
                                                @Valid @RequestBody Member member) {
        Member m=memberRepository.findById(id).orElse(null);
        if(m!=null){
            LocalDate today = LocalDate.now();
            if(member.getDateBirth().isAfter(today)){
                return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
            }
            m.setDateBirth(member.getDateBirth());
            m.setAddress(member.getAddress());
            m.setCellPhone(member.getCellPhone());
            m.setCorona(member.getCorona());
            m.setFirstName(member.getFirstName());
            m.setLastName(member.getLastName());
            m.setPhone(member.getPhone());
            m.setTz(member.getTz());



            memberRepository.save(m);
            return new ResponseEntity<>(m,HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/deleteMember/{id}")
    public ResponseEntity deleteMember(@PathVariable long id){
        try{

            memberRepository.deleteById(id);
            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
