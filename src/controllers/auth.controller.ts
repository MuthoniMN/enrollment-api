import { InsertAdmin, SelectAdmin } from "../config/db/schema";
import { createAdmin } from "../config/db/queries/insert";
import { getAdminByUsername } from "../config/db/queries/select";
import bcrypt from "bcrypt";

class AuthController{

  async create(data: InsertAdmin){
    try {
      data['password'] = await bcrypt.hash(data['password'], 10)
      const admin = await createAdmin(data)
      return admin;
    } catch (e) {
      console.error(e);
    }
  }

  async login(data: InsertAdmin): Promise<Partial<SelectAdmin>|undefined>{
    try {
      const savedUser = await getAdminByUsername(data['username']);

      if(!savedUser) throw new Error("Invalid Credentials");

      const comparePassword = bcrypt.compareSync(data['password'], savedUser[0]['password'] as string);
      if(!comparePassword) throw new Error("Invalid Credentials");

      return savedUser[0];
    } catch (e) {
      console.error(e);
      return;
    }
  }
}

export default AuthController;
