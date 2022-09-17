/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from "axios";
import Entries from "../components/Entries";
import { Entry, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useParams, useNavigate } from "react-router-dom";
import { addPatient, addPatientToCache, useStateValue } from "../state";
import { useEffect,useState } from "react";
import AddEntryModal from "../AddEntryModal";
import { Button } from "@material-ui/core";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientPage = () => {
  const navigate = useNavigate();

  const [patient, setPatient] = useState<Patient | any>();
  const [{ cache }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewEntry = async (values: EntryFormValues) => {
    const { data: fetchedPatient }: Patient | any = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    try {
      const { data: entry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${fetchedPatient.id}/entries`,
        values,
        fetchedPatient.id
      );
      console.log(entry);
      fetchedPatient.entries.push(entry);
      dispatch(addPatient(fetchedPatient));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };
  
  useEffect(() => {
    void getPatient();
  }, [patient]);

  if (patient === undefined) {
    return <div>...loading</div>;
  } else {
    return (
      <div>
        <h1>{patient.name}</h1>
        <p>Gender: {patient.gender}</p>
        <p>Occupation: {patient.occupation}</p>
        <p>SSN: {patient.ssn}</p>
        <h3>Entries</h3>
        {patient.entries ? (
          <Entries entries={patient.entries} />
        ) : (<p>Patient does not have any entries</p>)}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      </div>
    );
  }
};

export default PatientPage;