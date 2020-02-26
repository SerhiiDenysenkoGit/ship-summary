package com.shipsummarry.data.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Table(name = "summary")
public class Summary {

    @Id
    @Column(name = "summary_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int summaryId;

    @Column(name = "date")
    private String date;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "speed")
    private Double speed;

    @Column(name = "heading")
    private String heading;

    @Column(name = "mode")
    private String mode;

    @Column(name = "trawling_count")
    private int trawlingCount;

    @Column(name = "comments")
    private String comments;

    @OneToMany(mappedBy = "summary", fetch = FetchType.LAZY)
    private List<SummaryRecord> summaryRecords;

}
