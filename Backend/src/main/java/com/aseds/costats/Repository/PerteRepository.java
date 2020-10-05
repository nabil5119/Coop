package com.aseds.costats.Repository;

import com.aseds.costats.Model.Perte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PerteRepository extends JpaRepository<Perte, Long>{

}