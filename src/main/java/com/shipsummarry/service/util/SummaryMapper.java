package com.shipsummarry.service.util;

import com.shipsummarry.data.dto.SummaryDto;
import com.shipsummarry.data.dto.SummaryRecordDto;
import com.shipsummarry.data.entity.Summary;
import com.shipsummarry.data.entity.SummaryRecord;
import lombok.experimental.UtilityClass;

import java.util.Optional;
import java.util.stream.Collectors;

@UtilityClass
public class SummaryMapper {

    public static Summary mapSummaryDtoToEntity(SummaryDto summaryDto) {
        return Summary.builder()
                .summaryId(summaryDto.getSummaryId())
                .date(summaryDto.getDate())
                .longitude(summaryDto.getLongitude())
                .latitude(summaryDto.getLatitude())
                .speed(summaryDto.getSpeed())
                .trawlingCount(Optional.ofNullable(summaryDto.getTrawlingCount()).map(Double::intValue).orElse(0))
                .heading(summaryDto.getHeading())
                .mode(summaryDto.getMode())
                .comments(summaryDto.getComments())
                .summaryRecords(
                        summaryDto.getSummaryRecords().stream()
                                .map(SummaryMapper::mapRecordDtoToEntity)
                                .collect(Collectors.toList())
                )
                .build();
    }

    private SummaryRecord mapRecordDtoToEntity(SummaryRecordDto recordDto) {
        return SummaryRecord.builder()
                .summaryRecordId(recordDto.getSummaryRecordId())
                .name(recordDto.getName())
                .units(recordDto.getUnits())
                .day(recordDto.getDay())
                .board(recordDto.getBoard())
                .build();
    }

    public SummaryDto mapSummaryToDtoWithoutDetails(Summary summary) {
        return SummaryDto.builder()
                .summaryId(summary.getSummaryId())
                .date(summary.getDate())
                .trawlingCount((double) summary.getTrawlingCount())
                .longitude(summary.getLongitude())
                .latitude(summary.getLatitude())
                .mode(summary.getMode())
                .heading(summary.getHeading())
                .comments(summary.getComments())
                .speed(summary.getSpeed())
                .build();
    }

}
