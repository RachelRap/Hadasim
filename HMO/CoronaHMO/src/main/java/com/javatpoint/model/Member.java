package com.javatpoint.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;
    @NotNull
    @Size(min=9,max = 9)
    private String tz;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;
    @NotNull
    private LocalDate dateBirth;
    @NotNull
    @Size(min = 9,max = 9)
    private String phone;
    @NotNull
    @Size(min = 10,max = 10)
    private String cellPhone;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "corona_id")
    private Corona corona;
    @NotNull
    private String image;

    public Member() {
    }

    public Member(Long id, String firstName, String lastName,String tz, Address address, LocalDate dateBirth, String phone, String cellPhone, Corona corona, String image) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.dateBirth = dateBirth;
        this.phone = phone;
        this.cellPhone = cellPhone;
        this.corona = corona;
        this.image = image;
        this.tz=tz;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public LocalDate getDateBirth() {
        return dateBirth;
    }

    public void setDateBirth(LocalDate dateBirth) {
        this.dateBirth = dateBirth;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCellPhone() {
        return cellPhone;
    }

    public void setCellPhone(String cellPhone) {
        this.cellPhone = cellPhone;
    }

    public Corona getCorona() {
        return corona;
    }

    public void setCorona(Corona corona) {
        this.corona = corona;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getTz() {
        return tz;
    }

    public void setTz(String tz) {
        this.tz = tz;
    }
}

