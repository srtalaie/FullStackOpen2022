/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useParams, useNavigate } from "react-router-dom";
import { addPatientToCache, useStateValue } from "../state";
import { useEffect,useState } from "react";

const PatientPage = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | any>();
  const [{ cache }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const getPatient = async () => {
    try {
      if (id && id in cache) {
        setPatient(cache[id]);
      } else {
        const {data: fetchedPatient}: Patient | any = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(fetchedPatient);
        dispatch(addPatientToCache(fetchedPatient));
      }
    } catch (error) {
      navigate('/');
    }
  };
  
  useEffect(() => {
    void getPatient();
  }, []);

  if (patient === undefined) {
    return <div>...loading</div>;
  } else {
    return (
      <div>
        <h1>{patient.name}</h1>
        <p>Gender: {patient.gender}</p>
        <p>Occupation: {patient.occupation}</p>
        <p>SSN: {patient.ssn}</p>
      </div>
    );
  }
};

export default PatientPage;