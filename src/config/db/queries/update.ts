import { db } from "../";
import { eq } from "drizzle-orm";
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

export async function updateAdmin(id: SelectAdmin['id'], data: Partial<Omit<SelectAdmin, 'id'>>){
  await db.update(adminTable).set(data).where(eq(adminTable.id, id));
}

export async function updateTrack(id: SelectTrack['id'], data: Partial<Omit<SelectTrack, 'id'>>){
  await db.update(trackTable).set(data).where(eq(trackTable.id, id));
}

export async function updateUser(id: SelectUser['id'], data: Partial<Omit<SelectUser, 'id'>>){
  await db.update(usersTable).set(data).where(eq(usersTable.id, id));
}

export async function updateCohort(id: SelectCohort['id'], data: Partial<Omit<SelectCohort, 'id'>>){
  await db.update(cohortTable).set(data).where(eq(cohortTable.id, id));
}

export async function updateEnrollment(id: SelectEnrollment['id'], data: Partial<Omit<SelectEnrollment, 'id'>>){
  await db.update(enrollmentTable).set(data).where(eq(enrollmentTable.id, id));
}
