package com.shipsummarry.controller;

import com.shipsummarry.data.dto.*;
import com.shipsummarry.data.entity.Summary;
import com.shipsummarry.service.SummaryService;
import com.shipsummarry.service.SummaryStatsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/summaries")
public class SummaryController {

    private final SummaryService summaryService;
    private final SummaryStatsService summaryStatsService;

    public SummaryController(SummaryService summaryService, SummaryStatsService summaryStatsService) {
        this.summaryService = summaryService;
        this.summaryStatsService = summaryStatsService;
    }

    @PostMapping
    public int createSummary(@RequestBody SummaryDto summary) {
        return summaryService.createSummary(summary);
    }

    @PatchMapping
    public void updateSummary(@RequestBody SummaryDto summary) {
        summaryService.updateSummary(summary);
    }

    @PostMapping("/search")
    public SummaryPageDto getSummaries(@RequestBody SummarySearchRequest request) {
        return summaryService.getSummaries(request);
    }

    @DeleteMapping("/{summaryId}")
    public void deleteSummary(@PathVariable("summaryId") int summaryId) {
        summaryService.deleteSummary(summaryId);
    }

    @GetMapping("/{summaryId}")
    public Summary getSummaries(@PathVariable("summaryId") int summaryId) {
        return summaryService.getSummaryById(summaryId);
    }

    @GetMapping("/date/{date}")
    public Summary getSummaryByDate(@PathVariable("date") String date) {
        return summaryService.findByDate(date);
    }

    @GetMapping("/exists/{date}")
    public boolean checkIfSummaryExistsForDate(@PathVariable("date") String date) {
        return summaryService.checkIfSummaryExistsForDate(date);
    }

    @GetMapping("/records/types")
    public List<RecordTypeDto> getRecordTypes() {
        return summaryService.getRecordTypes();
    }

    @GetMapping("/stats")
    public PeriodSummaryInfo getSummaryStats(@RequestParam("from") String from, @RequestParam("to") String to) {
        return summaryStatsService.getInfoForPeriod(from, to);
    }

}
