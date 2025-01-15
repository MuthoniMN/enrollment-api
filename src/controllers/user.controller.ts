import { SelectUser, InsertUser, SelectCohort } from "../config/db/schema";
import { createUser, createUserAndEnrollment } from "../config/db/queries/insert";
import { getAllUser, getUser } from "../config/db/queries/select";
import { updateUser } from "../config/db/queries/update";
import { deleteUser } from "../config/db/queries/delete";
import sendMail from "../utils/mailer";

export interface RegisterUser extends InsertUser {
  cohort: SelectCohort['id']
}

class UserController {

  async create(data: InsertUser){
    if(!data){
      throw new Error("Invalid data")
    }

    const user = await createUser(data);

    return user;
  }

  async register(data: RegisterUser){
    if(!data){
      throw new Error("Invalid data")
    }
    const { cohort, ...userData  } = data;
    
    const details = await createUserAndEnrollment(userData, cohort);
    if(details){
      const mailOptions = {
        from: process.env.MAIL_USER as string,
        to: userData['email'],
        subject: "Rhedge Studios Intern Bootcamp Registration Confirmation",
        template: "../templates/confirmation.ejs"
      }

      const emailData = {
        applicantName: details.user['name'] as string,
        track: details.user['track'] as string,
        reviewPeriod: "3 days"
      }

      sendMail(mailOptions, emailData);

      return details;
    }
  }

  async getAll(): Promise<Partial<SelectUser>[]>{
    const users = await getAllUser();

    return users;
  }

  async get(id: SelectUser['id']): Promise<Partial<SelectUser>[]>{
    const user = await getUser(id);

    return user;
  }

  async update(id: SelectUser['id'], data: Partial<Omit<SelectUser, 'id'>>){
    const user = await updateUser(id, data);

    return user;
  }

  async delete(id: SelectUser['id']){
    const user = await deleteUser(id);

    return user;
  }

};

export default UserController;
