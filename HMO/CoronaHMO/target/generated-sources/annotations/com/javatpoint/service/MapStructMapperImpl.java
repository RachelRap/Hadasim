package com.javatpoint.service;

import com.javatpoint.dto.MemberDTO;
import com.javatpoint.model.Member;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-03-28T17:57:59+0200",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 1.8.0_111 (Oracle Corporation)"
)
@Component
public class MapStructMapperImpl implements MapStructMapper {

    @Override
    public List<MemberDTO> membersToDto(List<Member> members) {
        if ( members == null ) {
            return null;
        }

        List<MemberDTO> list = new ArrayList<MemberDTO>( members.size() );
        for ( Member member : members ) {
            try {
                list.add( memberToDto( member ) );
            }
            catch ( IOException e ) {
                throw new RuntimeException( e );
            }
        }

        return list;
    }
}
