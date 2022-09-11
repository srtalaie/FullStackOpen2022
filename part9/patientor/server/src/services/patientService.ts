import patients from "../data/patients";

import { Patient, NonSensitivePatientData } from "../types/types";

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

export default {
  getPatientsData,
  getNonSensitivePatientsData
};