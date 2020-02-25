package com.shipsummarry.data.repository;

import com.shipsummarry.data.entity.WebUser;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<WebUser, Integer>, JpaSpecificationExecutor<WebUser> {

    static Specification<WebUser> equalPredicate(String fieldName, String value) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get(fieldName), value);
    }

    static Specification<WebUser> hasUsername(String username) {
        return equalPredicate("username", username);
    }

}
