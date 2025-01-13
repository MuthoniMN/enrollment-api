import { SelectUser, InsertUser } from "../config/db/schema";
import { createUser } from "../config/db/queries/insert";
import { getAllUser, getUser } from "../config/db/queries/select";
import { updateUser } from "../config/db/queries/update";
import { deleteUser } from "../config/db/queries/delete";

class UserController {

  async create(data: InsertUser){
    if(!data){
      throw new Error("Invalid data")
    }

    const user = await createUser(data);

    return user;
  }

  async getAll(): Promise<Partial<SelectUser>[]>{
    const users = await getAllUser();
    console.log(users);

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
