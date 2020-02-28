package com.shipsummarry.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "summary_record")
public class SummaryRecord {

    @Id
    @Column(name = "summary_record_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int summaryRecordId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="summary_id")
    private Summary summary;

    @Column(name = "name")
    private RecordType name;

    @Column(name = "units")
    private String units;

    @Column(name = "day")
    private Double day;

    @Column(name = "board")
    private Double board;

    @Transient
    private String typeName;

}
