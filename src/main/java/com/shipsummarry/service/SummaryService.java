package com.shipsummarry.service;

import com.shipsummarry.controller.dto.RecordTypeDto;
import com.shipsummarry.controller.dto.SummarySearchRequest;
import com.shipsummarry.controller.dto.SummaryGenericDetails;
import com.shipsummarry.data.entity.RecordType;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SummaryService {

    public List<SummaryGenericDetails> getSummaries(SummarySearchRequest request) {
        return Collections.emptyList();
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
}
