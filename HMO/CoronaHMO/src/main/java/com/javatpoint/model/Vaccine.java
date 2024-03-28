package com.javatpoint.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Vaccine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private LocalDate date;
    @NotNull
    private String manufacturer;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="corona_id")
    private Corona corona;

    public Vaccine() {
    }

    public Vaccine(Long id, LocalDate date, String manufacturer, Corona corona) {
        this.id = id;
        this.date = date;
        this.manufacturer = manufacturer;
        this.corona = corona;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public Corona getCorona() {
        return corona;
    }

    public void setCorona(Corona corona) {
        this.corona = corona;
    }
}
