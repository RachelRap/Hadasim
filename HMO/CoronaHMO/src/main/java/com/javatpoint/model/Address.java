package com.javatpoint.model;

import jakarta.validation.constraints.NotNull;

import javax.persistence.*;

@Entity
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String city;
    @NotNull
    private String street;
    @NotNull
    private int numHome;
    @OneToOne(mappedBy = "address", cascade = CascadeType.ALL)
    private Member member;

    public Address() {
    }

    public Address(Long id, String city, String street, int numHome) {
        this.id = id;
        this.city = city;
        this.street = street;
        this.numHome = numHome;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public int getNumHome() {
        return numHome;
    }

    public void setNumHome(int numHome) {
        this.numHome = numHome;
    }
}
