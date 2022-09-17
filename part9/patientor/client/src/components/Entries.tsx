/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Diagnosis, Entry } from "../types";
import { FavoriteOutlined } from '@material-ui/icons';
import { useStateValue } from "../state";


const heartColor = ["green","yellow","orange","red"];

const dignoseDescription = (code : string , diagnoses : { [code : string] : Diagnosis}) : string => {

      return code in diagnoses ? diagnoses[code].name : "";

};

const RenderEntryBase = ( { entry, diagnoses } : { entry : Entry, diagnoses : { [code : string] : Diagnosis}}) : JSX.Element => {

    return(
        <>
            <p>{entry.date}</p>
            <p><i>{entry.description}</i></p>
            { entry.diagnosisCodes &&
                <ul>
                    { entry.diagnosisCodes?.map( code => <li key={code}>{code} {dignoseDescription(code,diagnoses)}</li>)}
                </ul>
            }
        </>
    );

};

const EntryByType = ( { entry } : { entry : Entry }) : JSX.Element => {

    switch(entry.type){
        case "HealthCheck":
            return <FavoriteOutlined style={ { color : heartColor[entry.healthCheckRating]}}/>;
        case "OccupationalHealthcare":
            return <p>Employer: {entry.employerName} { entry.sickLeave && `, sick leave from ${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}`} </p>;
        case "Hospital":
            return <p>Discharge ({entry.discharge.date}): {entry.discharge.criteria}</p>;
    }
};

const RenderEntry = ( { entry, diagnoses } : { entry : Entry, diagnoses : { [code : string] : Diagnosis} }) : JSX.Element => {

    return(
        <div>
            <RenderEntryBase entry={entry} diagnoses={diagnoses} />
            <EntryByType entry={entry} />
            <p>Diagnoses by {entry.specialist}</p>
        </div>
    );

};

const Entries = ({ entries }: { entries: Entry[] }) => {
  const [{ diagnoses }] = useStateValue();

  const style = { border: '2px solid #7d7d8d', borderRadius: '25px' ,padding : '1px 20px', margin : '10px'};

  return(
      <div>
          <h3>Entries</h3>
          { entries.length && diagnoses ?
              entries.map( entry => <div key={entry.id} style={style}><RenderEntry entry={entry} diagnoses={diagnoses} /></div>)
              : <p>No Entries Available</p>   
          }
      </div>
  );
};

export default Entries;