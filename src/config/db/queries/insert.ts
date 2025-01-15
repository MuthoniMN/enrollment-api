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
  SelectCohort,
  SelectUser
} from "../schema";
import { eq } from 'drizzle-orm';

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

  if(user){
    const userData = await db.select({
      name: usersTable.name,
      email: usersTable.email,
      track: trackTable.title
    }).from(usersTable).where(eq(usersTable.id, (user[0] as SelectUser)['id'])).leftJoin(trackTable, eq(usersTable.trackId, trackTable.id));

    const enrollment = await db.insert(enrollmentTable).values({
      cohort,
      user: user[0].id
    }).returning();

    return { user: userData[0], enrollment };
  }
}

export async function createCohort(data: InsertCohort){
  const cohort = await db.insert(cohortTable).values(data).returning();

  return cohort;
}

export async function createEnrollment(data: InsertEnrollment){
  const enrollment = await db.insert(enrollmentTable).values(data).returning();

  return enrollment;
}
