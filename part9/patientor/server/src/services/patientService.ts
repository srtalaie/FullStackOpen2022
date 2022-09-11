import { v1 as uuid } from 'uuid';
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const uniqueId: string = uuid();

import patients from "../data/patients";

import { Patient, NonSensitivePatientData, NewPatient } from "../types/types";

const patientsData: Array<Patient> = patients;

const getPatientsData = (): Array<Patient> => {
  return patientsData;
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

export default {
  getPatientsData,
  getNonSensitivePatientsData,
  addPatient
};