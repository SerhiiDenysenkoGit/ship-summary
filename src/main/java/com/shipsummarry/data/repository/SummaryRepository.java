package com.shipsummarry.data.repository;

import com.shipsummarry.data.dto.SummarySearchRequest;
import com.shipsummarry.data.entity.Summary;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

@Repository
public interface SummaryRepository extends PagingAndSortingRepository<Summary, Integer>, JpaSpecificationExecutor<Summary> {

    static Specification<Summary> createSummaryFilter(SummarySearchRequest request) {
        return (root, query, cb) -> {
            query.distinct(true);

            List<Predicate> predicates = new ArrayList<>();

            if (!StringUtils.isEmpty(request.getDate())) {
                predicates.add(cb.equal(
                        root.get("date"),
                        request.getDate()));
            }

            return cb.and(
                    predicates.toArray(new Predicate[]{})
            );
        };
    }

    static Specification<Summary> byDateRange(String from, String to) {
        return (root, query, cb) -> {
            query.distinct(true);

            List<Predicate> predicates = new ArrayList<>();

                predicates.add(cb.greaterThanOrEqualTo(root.get("date"), from));
                predicates.add(cb.lessThanOrEqualTo(root.get("date"), to));

            return cb.and(
                    predicates.toArray(new Predicate[]{})
            );
        };
    }

    static Specification<Summary> equalPredicate(String fieldName, String value) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get(fieldName), value);
    }

    static Specification<Summary> byDate(String date) {
        return equalPredicate("date", date);
    }

}
