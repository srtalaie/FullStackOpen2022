import { v1 as uuid } from 'uuid';
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const uniqueId: string = uuid();

import patients from "../data/patients";

import { Patient, NonSensitivePatientData, NewPatient, Entry } from "../types/types";

const patientsData: Array<Patient> = patients;

const getPatientsData = (): Array<Patient> => {
  return patientsData;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const getNonSensitivePatientsData = (): NonSensitivePatientData[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }): NonSensitivePatientData => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (data: NewPatient): Patient => {
  const newPatient = {
    id: uniqueId,
    ...data
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (data: Entry, patientID: string): Patient | unknown => {
  const newEntry: Entry = {
    ...data,
    id: uniqueId
  };

  const patient = patients.find((patient) => patient.id === patientID);
  patient?.entries.push(newEntry);
  return patient;
};

export default {
  getPatientsData,
  getNonSensitivePatientsData,
  addPatient,
  getPatient,
  addEntry
};