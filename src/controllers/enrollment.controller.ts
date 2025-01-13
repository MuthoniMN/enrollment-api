import { SelectEnrollment, InsertEnrollment } from "../config/db/schema";
import { createEnrollment } from "../config/db/queries/insert";
import { getAllEnrollment, getEnrollment } from "../config/db/queries/select";
import { updateEnrollment } from "../config/db/queries/update";
import { deleteEnrollment } from "../config/db/queries/delete";

class EnrollmentController {

  async create(data: InsertEnrollment){
    if(!data){
      throw new Error("Invalid data")
    }

    const enrollment = await createEnrollment(data);

    return enrollment;
  }

  async getAll(){
    const enrollments = await getAllEnrollment();

    return enrollments;
  }

  async get(id: SelectEnrollment['id']){
    const enrollment = await getEnrollment(id);

    return enrollment;
  }

  async update(id: SelectEnrollment['id'], data: Partial<Omit<SelectEnrollment, 'id'>>){
    const enrollment = await updateEnrollment(id, data);

    return enrollment;
  }

  async delete(id: SelectEnrollment['id']){
    const enrollment = await deleteEnrollment(id);

    return enrollment;
  }

};

export default EnrollmentController;
