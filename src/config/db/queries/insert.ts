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
  enrollmentTable,
  SelectCohort
} from "../schema";

export async function createAdmin(data: InsertAdmin){
  const admin = await db.insert(adminTable).values(data).returning();

  return admin;
}

export async function createTrack(data: InsertTrack){
  const track = await db.insert(trackTable).values(data).returning();

  return track;
}

export async function createUser(data: InsertUser){
  const user = await db.insert(usersTable).values(data).returning();

  return user;
}

export async function createUserAndEnrollment(data: InsertUser, cohort: SelectCohort['id']){
  const user = await db.insert(usersTable).values(data).returning();

  const enrollment = await db.insert(enrollmentTable).values({
    cohort,
    user: user[0].id
  }).returning();

  return { user, enrollment };
}

export async function createCohort(data: InsertCohort){
  const cohort = await db.insert(cohortTable).values(data).returning();

  return cohort;
}

export async function createEnrollment(data: InsertEnrollment){
  const enrollment = await db.insert(enrollmentTable).values(data).returning();

  return enrollment;
}
