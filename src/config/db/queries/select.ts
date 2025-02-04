import { db } from "../";
import { asc, eq } from 'drizzle-orm';
import {
  SelectAdmin,
  SelectTrack,
  SelectUser,
  SelectCohort,
  SelectEnrollment,
  adminTable,
  usersTable,
  trackTable,
  cohortTable,
  enrollmentTable
} from "../schema";

export async function getAllAdmin(): Promise<Partial<SelectAdmin>[]>{
  const admins = await db.select({
    id: adminTable.id,
    username: adminTable.username,
    password: adminTable.password
  }).from(adminTable).orderBy(asc(adminTable.createdAt));

  return admins;
}

export async function getAdmin(id: SelectAdmin['id']): Promise<Partial<SelectAdmin>[]>{
  const admin = await db.select({
    id: adminTable.id,
    username: adminTable.username,
    password: adminTable.password
  }).from(adminTable).where(eq(adminTable.id, id));

  return admin;
}

export async function getAdminByUsername(username: SelectAdmin['username']): Promise<Partial<SelectAdmin>[]>{
  const admin = await db.select({
    id: adminTable.id,
    username: adminTable.username,
    password: adminTable.password
  }).from(adminTable).where(eq(adminTable.username, username));

  return admin;
}

export async function getAllTrack(): Promise<Partial<SelectTrack>[]>{
  const tracks = await db.select({
    id: trackTable.id,
    title: trackTable.title,
    description: trackTable.description
  }).from(trackTable).orderBy(asc(trackTable.createdAt));

  return tracks;
}

export async function getTrack(id: SelectTrack['id']): Promise<Partial<SelectTrack>[]>{
  const track = await db.select({
    id: trackTable.id,
    title: trackTable.title,
    description: trackTable.description
  }).from(trackTable).where(eq(trackTable.id, id));

  return track;
}

export async function getAllUser(): Promise<Partial<SelectUser>[]>{
  const users = await db.select({
    id: usersTable.id,
    name: usersTable.name,
    email: usersTable.email,
    phoneNumber: usersTable.phoneNumber,
    location: usersTable.location,
    track: trackTable.title
  }).from(usersTable).leftJoin(trackTable, eq(usersTable.trackId, trackTable.id)).orderBy(asc(usersTable.createdAt));

  return users;
}

export async function getUser(id: SelectUser['id']): Promise<Partial<SelectUser>[]>{
  const user = await db.select({
    id: usersTable.id,
    name: usersTable.name,
    email: usersTable.email,
    phoneNumber: usersTable.phoneNumber,
    location: usersTable.location,
    track: trackTable.title
  }).from(usersTable).where(eq(usersTable.id, id)).leftJoin(trackTable, eq(usersTable.trackId, trackTable.id));

  return user;
}

export async function getAllCohort(): Promise<Partial<SelectCohort>[]>{
  const cohorts = await db.select({
    id: cohortTable.id,
    title: cohortTable.title,
    startDate: cohortTable.startDate
  }).from(cohortTable).orderBy(asc(cohortTable.createdAt));

  return cohorts;
}

export async function getCohort(id: SelectCohort['id']): Promise<Partial<SelectCohort>[]>{
  const cohort = await db.select({
    id: cohortTable.id,
    title: cohortTable.title,
    startDate: cohortTable.startDate
  }).from(cohortTable).where(eq(cohortTable.id, id));

  return cohort;
}

export async function getAllEnrollment(){
  const enrollment = await db.select({
    id: enrollmentTable.id,
    user: usersTable.name,
    userEmail: usersTable.email,
    userTrack: trackTable.title,
    cohortTitle: cohortTable.title,
    cohortStartDate: cohortTable.startDate,
    orientationDate: cohortTable.orientationDate,
    duration: cohortTable.duration,
    deadline: enrollmentTable.deadline  }).from(enrollmentTable).leftJoin(usersTable, eq(enrollmentTable.user, usersTable.id)).leftJoin(trackTable, eq(usersTable.trackId, trackTable.id)).leftJoin(cohortTable, eq(enrollmentTable.cohort, cohortTable.id)).orderBy(asc(cohortTable.createdAt));

  return enrollment;
}

export async function getEnrollment(id: SelectEnrollment['id']){
  const enrollment = await db.select({
    id: enrollmentTable.id,
    user: usersTable.name,
    userEmail: usersTable.email,
    userTrack: trackTable.title,
    cohortTitle: cohortTable.title,
    cohortStartDate: cohortTable.startDate,
    orientationDate: cohortTable.orientationDate,
    duration: cohortTable.duration,
    deadline: enrollmentTable.deadline
  }).from(enrollmentTable).where(eq(enrollmentTable.id, id)).leftJoin(usersTable, eq(enrollmentTable.user, usersTable.id)).leftJoin(trackTable, eq(usersTable.trackId, trackTable.id)).leftJoin(cohortTable, eq(enrollmentTable.cohort, cohortTable.id));

  return enrollment[0];
}

