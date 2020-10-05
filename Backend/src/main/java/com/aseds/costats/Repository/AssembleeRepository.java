package com.aseds.costats.Repository;

import com.aseds.costats.Model.Assemblee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssembleeRepository extends JpaRepository<Assemblee, Long>{

}