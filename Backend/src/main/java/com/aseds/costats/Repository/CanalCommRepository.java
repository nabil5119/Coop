package com.aseds.costats.Repository;

import com.aseds.costats.Model.CanalComm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CanalCommRepository extends JpaRepository<CanalComm, Long>{

}