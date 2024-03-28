package com.javatpoint.model;

import jakarta.validation.constraints.NotNull;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Corona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany(mappedBy = "corona", cascade = CascadeType.ALL)
    private List<Vaccine> vaccineList;
    @NotNull
    private LocalDate positive;
    @NotNull
    private LocalDate recovery;
    @OneToOne(mappedBy = "corona", cascade = CascadeType.ALL)
    private Member member;

    public Corona() {
    }

    public Corona(Long id, List<Vaccine> vaccineList, LocalDate positive, LocalDate recovery) {
        this.id = id;
        this.vaccineList = vaccineList;
        this.positive = positive;
        this.recovery = recovery;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Vaccine> getVaccineList() {
        return vaccineList;
    }

    public void setVaccineList(List<Vaccine> vaccineList) {
        this.vaccineList = vaccineList;
    }

    public LocalDate getPositive() {
        return positive;
    }

    public void setPositive(LocalDate positive) {
        this.positive = positive;
    }

    public LocalDate getRecovery() {
        return recovery;
    }

    public void setRecovery(LocalDate recovery) {
        this.recovery = recovery;
    }
}
