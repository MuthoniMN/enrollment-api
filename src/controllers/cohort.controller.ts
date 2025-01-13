import { SelectCohort, InsertCohort } from "../config/db/schema";
import { createCohort } from "../config/db/queries/insert";
import { getAllCohort, getCohort } from "../config/db/queries/select";
import { updateCohort } from "../config/db/queries/update";
import { deleteCohort } from "../config/db/queries/delete";

class CohortController {

  async create(data: InsertCohort){
    if(!data){
      throw new Error("Invalid data")
    }

    const cohort = await createCohort(data);

    return cohort;
  }

  async getAll(): Promise<Partial<SelectCohort>[]>{
    const cohorts = await getAllCohort();
    console.log(cohorts);

    return cohorts;
  }

  async get(id: SelectCohort['id']): Promise<Partial<SelectCohort>[]>{
    const cohort = await getCohort(id);

    return cohort;
  }

  async update(id: SelectCohort['id'], data: Partial<Omit<SelectCohort, 'id'>>){
    const cohort = await updateCohort(id, data);

    return cohort;
  }

  async delete(id: SelectCohort['id']){
    const cohort = await deleteCohort(id);

    return cohort;
  }

};

export default CohortController;
