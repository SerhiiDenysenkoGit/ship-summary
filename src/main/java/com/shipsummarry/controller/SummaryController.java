package com.shipsummarry.controller;

import com.shipsummarry.controller.dto.RecordTypeDto;
import com.shipsummarry.controller.dto.SummaryDto;
import com.shipsummarry.controller.dto.SummaryPageDto;
import com.shipsummarry.controller.dto.SummarySearchRequest;
import com.shipsummarry.data.entity.Summary;
import com.shipsummarry.service.SummaryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/summaries")
public class SummaryController {

    private final SummaryService summaryService;

    public SummaryController(SummaryService summaryService) {
        this.summaryService = summaryService;
    }

    @PostMapping("/search")
    public SummaryPageDto getSummaries(@RequestBody SummarySearchRequest request) {
        return summaryService.getSummaries(request);
    }

    @GetMapping("/{summaryId}")
    public Summary getSummaries(@PathVariable("summaryId") int summaryId) {
        return summaryService.getSummaryById(summaryId);
    }

    @GetMapping("/records/types")
    public List<RecordTypeDto> getRecordTypes() {
        return summaryService.getRecordTypes();
    }

    @PostMapping("")
    public int createSummary(@RequestBody SummaryDto summary) {
        return summaryService.createSummary(summary);
    }

}
