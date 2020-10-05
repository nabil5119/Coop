package com.aseds.costats.Repository;

import com.aseds.costats.Model.Revenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RevenuRepository extends JpaRepository<Revenu, Long>{

}