import { db } from "../";
import { eq } from 'drizzle-orm';
import { 
  SelectUser,
  SelectAdmin,
  SelectTrack,
  SelectCohort,
  SelectEnrollment,
  adminTable,
  usersTable,
  trackTable,
  cohortTable,
  enrollmentTable
} from "../schema";

export async function deleteAdmin(id: SelectAdmin['id']){
  await db.delete(adminTable).where(eq(adminTable.id, id));
}

export async function deleteTrack(id: SelectTrack['id']){
  await db.delete(trackTable).where(eq(trackTable.id, id));
}

export async function deleteUser(id: SelectUser['id']){
  await db.delete(usersTable).where(eq(usersTable.id, id));
}

export async function deleteCohort(id: SelectCohort['id']){
  await db.delete(cohortTable).where(eq(cohortTable.id, id));
}

export async function deleteEnrollment(id: SelectEnrollment['id']){
  await db.delete(enrollmentTable).where(eq(enrollmentTable.id, id));
}
