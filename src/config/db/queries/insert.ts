import { db } from "../";
import { 
  InsertUser,
  InsertAdmin,
  InsertTrack,
  InsertCohort,
  InsertEnrollment,
  adminTable,
  usersTable,
  trackTable,
  cohortTable,
  enrollmentTable
} from "../schema";

export async function createAdmin(data: InsertAdmin){
  await db.insert(adminTable).values(data);
}

export async function createTrack(data: InsertTrack){
  await db.insert(trackTable).values(data);
}

export async function createUser(data: InsertUser){
  await db.insert(usersTable).values(data);
}

export async function createCohort(data: InsertCohort){
  await db.insert(cohortTable).values(data);
}

export async function createEnrollment(data: InsertEnrollment){
  await db.insert(enrollmentTable).values(data);
}
