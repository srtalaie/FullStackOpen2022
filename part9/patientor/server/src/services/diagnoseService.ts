import diagnosesData from "../data/diagnoses.json";

import { Diagnose } from "../types/types";

const diagnoses: Array<Diagnose> = diagnosesData;

const getDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};

export default {
  getDiagnoses
};