package com.shipsummarry.data.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Table(name = "summary")
public class Summary {

    @Id
    @Column(name = "summary_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SUMMARY_SEQ")
    @SequenceGenerator(sequenceName = "summary_seq", name = "SUMMARY_SEQ", allocationSize = 1)
    private int summaryId;

    @Column(name = "summary_date")
    private String date;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "speed")
    private Double speed;

    @Column(name = "heading")
    private String heading;

    @Column(name = "ship_mode")
    private String mode;

    @Column(name = "trawling_count")
    private int trawlingCount;

    @Column(name = "comments")
    private String comments;

    @OneToMany(mappedBy = "summary", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<SummaryRecord> summaryRecords;

}
