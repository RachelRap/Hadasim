package com.javatpoint.service;

import com.javatpoint.dto.MemberDTO;
import com.javatpoint.model.Member;
import org.mapstruct.Mapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;

@Mapper(componentModel = "spring")
public interface MapStructMapper {

    List<MemberDTO> membersToDto(List<Member> members);

    default MemberDTO memberToDto(Member m) throws IOException {
        MemberDTO memberDTO=new MemberDTO();

        memberDTO.setAddress(m.getAddress());
        memberDTO.setCellPhone(m.getCellPhone());
        memberDTO.setCorona(m.getCorona());
        memberDTO.setDateBirth(m.getDateBirth());
        memberDTO.setFirstName(m.getFirstName());
        memberDTO.setId(m.getId());
        memberDTO.setLastName(m.getLastName());
        memberDTO.setPhone(m.getPhone());
        memberDTO.setTz(m.getTz());


        Path fileName= Paths.get(m.getImage());
        byte[] byteImage= Files.readAllBytes(fileName);
        memberDTO.setImage(Base64.getEncoder().encodeToString(byteImage));
        return memberDTO;
    }

    default Member dtoToMember(MemberDTO m){
        Member member=new Member();

        member.setAddress(m.getAddress());
        member.setCellPhone(m.getCellPhone());
        member.setCorona(m.getCorona());
        member.setDateBirth(m.getDateBirth());
        member.setFirstName(m.getFirstName());
        member.setId(m.getId());
        member.setLastName(m.getLastName());
        member.setPhone(m.getPhone());
        member.setTz(m.getTz());
        return member;
    }

}
