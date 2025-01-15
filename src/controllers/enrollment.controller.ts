import { SelectEnrollment, InsertEnrollment } from "../config/db/schema";
import { createEnrollment } from "../config/db/queries/insert";
import { getAllEnrollment, getEnrollment } from "../config/db/queries/select";
import { updateEnrollment } from "../config/db/queries/update";
import { deleteEnrollment } from "../config/db/queries/delete";
import sendMail from "../utils/mailer";

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

  async admit(id: SelectEnrollment['id']){
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 3);
    const updated = await updateEnrollment(id, { admitted: true });

    const mailOptions = {
        from: process.env.MAIL_USER as string,
        to: updated['userEmail'] as string,
        subject: "Rhedge Studios Intern Bootcamp Registration Confirmation",
        template: "../templates/success.ejs"
      }

      const emailData = {
        applicantName: updated['user'] as string,
        track: updated['userTrack'] as string,
        enrollmentDeadline: (updated['deadline'] as Date).toDateString(),
        startDate: (updated['cohortStartDate'] as Date).toDateString(),
        orientationDate: (updated['orientationDate'] as Date).toDateString(),
        duration: updated['duration'] as string,
        confirmationLink: `${process.env.FRONTEND_URL}/enrollment/confirmation/${updated['id']}`
      }

      sendMail(mailOptions, emailData);
  }

  async reject(id: SelectEnrollment['id']){
    const updated = await updateEnrollment(id, { admitted: true });

    const mailOptions = {
        from: process.env.MAIL_USER as string,
        to: updated['userEmail'] as string,
        subject: "Rhedge Studios Intern Bootcamp Registration Confirmation",
        template: "../templates/confirmation.ejs"
      }

      const emailData = {
        applicantName: updated['user'] as string,
        track: updated['userTrack'] as string,
        nextCohortDate: "To Be Updated"
      }

      sendMail(mailOptions, emailData);
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
