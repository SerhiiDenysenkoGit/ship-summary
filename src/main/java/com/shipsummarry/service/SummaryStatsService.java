package com.shipsummarry.service;

import com.shipsummarry.data.dto.PeriodSummaryInfo;
import com.shipsummarry.data.dto.RecordAverageData;
import com.shipsummarry.data.dto.RecordPeriodData;
import com.shipsummarry.data.entity.RecordType;
import com.shipsummarry.data.entity.Summary;
import com.shipsummarry.data.repository.SummaryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class SummaryStatsService {

    private final SummaryRepository summaryRepository;

    public SummaryStatsService(SummaryRepository summaryRepository) {
        this.summaryRepository = summaryRepository;
    }

    public PeriodSummaryInfo getInfoForPeriod(String from, String to) {
        List<Summary> summaries = summaryRepository.findAll(SummaryRepository.byDateRange(from, to));

        Map<Integer, String> dateMap =
                summaries.stream().collect(Collectors.toMap(Summary::getSummaryId, Summary::getDate));

        Map<RecordType, List<RecordPeriodData>> stats =
                summaries.stream()
                        .map(Summary::getSummaryRecords)
                        .flatMap(List::stream)
                        .map(record ->
                                RecordPeriodData.builder()
                                        .date(dateMap.get(record.getSummary().getSummaryId()))
                                        .day(record.getDay())
                                        .board(record.getBoard())
                                        .name(record.getName())
                                        .typeName(record.getName().getName())
                                        .build())
                        .collect(Collectors.groupingBy(RecordPeriodData::getName));

        List<RecordAverageData> avg =
                stats.entrySet()
                        .stream()
                        .map(entry -> mapFromStats(entry.getKey(), entry.getValue()))
                        .collect(Collectors.toList());

        return PeriodSummaryInfo.builder()
                .recordsQuantity(summaries.size())
                .fromDate(from)
                .toDate(to)
                .stats(stats)
                .avg(avg)
                .build();
    }

    private RecordAverageData mapFromStats(RecordType type, List<RecordPeriodData> periodData) {
        Double avg = periodData.stream().map(RecordPeriodData::getDay).filter(Objects::nonNull).mapToDouble(rec -> rec).sum() / periodData.size();
        return RecordAverageData.builder()
                .name(type)
                .typeName(type.getName())
                .dayAvg(avg)
                .build();
    }

}
