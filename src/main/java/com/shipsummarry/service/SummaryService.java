package com.shipsummarry.service;

import com.shipsummarry.controller.dto.RecordTypeDto;
import com.shipsummarry.controller.dto.SummaryDto;
import com.shipsummarry.controller.dto.SummaryPageDto;
import com.shipsummarry.controller.dto.SummarySearchRequest;
import com.shipsummarry.data.entity.RecordType;
import com.shipsummarry.data.entity.Summary;
import com.shipsummarry.data.entity.SummaryRecord;
import com.shipsummarry.data.repository.SummaryRecordRepository;
import com.shipsummarry.data.repository.SummaryRepository;
import com.shipsummarry.service.util.SummaryMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SummaryService {

    private final SummaryRepository summaryRepository;
    private final SummaryRecordRepository summaryRecordRepository;

    public SummaryService(SummaryRepository summaryRepository, SummaryRecordRepository summaryRecordRepository) {
        this.summaryRepository = summaryRepository;
        this.summaryRecordRepository = summaryRecordRepository;
    }

    @Transactional(readOnly = true)
    public SummaryPageDto getSummaries(SummarySearchRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getPageSize(), Sort.by(Sort.Direction.DESC, "date"));

        Page<Summary> summariesPage = summaryRepository.findAll(SummaryRepository.createSummaryFilter(request), pageable);

        return SummaryPageDto.builder()
                .totalPages(summariesPage.getTotalPages())
                .summaries(summariesPage.getContent().stream().map(SummaryMapper::mapSummaryToDtoWithoutDetails).collect(Collectors.toList()))
                .build();
    }

    @Transactional(readOnly = true)
    public Summary getSummaryById(int summaryId) {
        Summary summary = summaryRepository.findById(summaryId).orElse(null);
        List<SummaryRecord> records = summary.getSummaryRecords();
        records.forEach(record -> record.setTypeName(record.getName().getName()));
        return summary;
    }

    public List<RecordTypeDto> getRecordTypes() {
        return Arrays
                .stream(RecordType.values())
                .map(type ->
                        RecordTypeDto.builder()
                                .typeEnum(type.name())
                                .typeName(type.getName())
                                .typeGroup(type.getGroupName())
                                .priority(type.getPriority())
                                .build()
                ).collect(Collectors.toList());
    }

    @Transactional
    public int createSummary(SummaryDto summaryDto) {
        if (checkIfSummaryExistsForDate(summaryDto.getDate())) {
            throw new HttpClientErrorException(HttpStatus.BAD_REQUEST, "Summary with defined date exists");
        }
        Summary summary = SummaryMapper.mapSummaryDtoToEntity(summaryDto);

        summaryRepository.save(summary);
        summary.getSummaryRecords().forEach(record -> record.setSummary(summary));
        summaryRecordRepository.saveAll(summary.getSummaryRecords());
        return summary.getSummaryId();
    }

    @Transactional
    public void updateSummary(SummaryDto summaryDto) {
        Summary summary = SummaryMapper.mapSummaryDtoToEntity(summaryDto);
        summaryRepository.save(summary);
        summary.getSummaryRecords().forEach(record -> record.setSummary(summary));
        summaryRecordRepository.saveAll(summary.getSummaryRecords());
    }

    public Summary findByDate(String date) {
        Summary summary =
                summaryRepository.findAll(SummaryRepository.byDate(date))
                        .stream()
                        .findFirst()
                        .orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Summary not found"));
        List<SummaryRecord> records = summary.getSummaryRecords();
        records.forEach(record -> record.setTypeName(record.getName().getName()));
        return summary;
    }

    @Transactional(readOnly = true)
    public boolean checkIfSummaryExistsForDate(String date) {
        return summaryRepository.findOne(SummaryRepository.byDate(date)).isPresent();
    }
}
