import React, { useEffect , useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import CoronaAdd from "./CoronaAdd";
import VaccineAdd from "./VaccineAdd";

export default function CoronaCard({ id }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch({ type: "GET_MEMBER", payload: id });
    }
  }, [id, dispatch]);

  const member = useSelector((state) => state.member.currentMember);

  const corona = member.corona;

  if (!corona) {
    return <div>Loading...</div>;

  }

  const [coronaFrom,setCoronaFrom]=useState({
    id:"",
    positive:"",
    recovery:"",
    vaccineList:[],
})

useEffect(()=>{
    if(corona!==null){
        setCoronaFrom({
            id:corona.id,
            positive:corona.positive,
            recovery:corona.recovery,
            vaccineList:corona.vaccineList,
        })
    }
},[corona])

if (corona === null) {
    return <div>Loading...</div>;
}

const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    
    setCoronaFrom((prevState) => ({
        ...prevState,
        [name]: value,
    }));
};

const handleOnSubmit = () => {

    
    console.log(corona.positive);
    if (!coronaFrom.recovery) {
        alert('Recovery date is required');
        return;
    }
    const positiveDate=new Date(corona.positive)
    const currentDate = new Date();
    const selectedDate = new Date(coronaFrom.recovery);
    if (selectedDate <= positiveDate) {
        alert('Recovery date must be later than the positive date');
        return;
    }
    if(selectedDate > currentDate){
        alert("Date must be before today's date");
        return;
    }
    
       

    const coronaUpdate={
        id:corona.id,
            positive:coronaFrom.positive,
            recovery:coronaFrom.recovery,
            vaccineList:coronaFrom.vaccineList,
    }

    dispatch({type:"UPDATE_CORONA",payload:{coronaId:corona.id,corona:coronaUpdate}})
}

const [showCoronaAdd, setShowCoronaAdd] = useState(false);
const [showVaccineAdd, setShowVaccineAdd] = useState(false);

const handleOnCoronaAdd=()=>{
    setShowCoronaAdd(true);
}

const handleOnVaccineAdd=()=>{
    setShowVaccineAdd(true);
}

  return (
    <>
      <div>
      <div>
      <h1>corona:</h1>
      {corona.positive !== null && (
        <>
          <h2>{"Corona positive: " + corona.positive}</h2>
          {corona.recovery !== null && (
            <h2>{"date of recovery: " + corona.recovery}</h2>
          )} 
           {corona.recovery == null && (
  <>
    <h2>{"date of recovery: "}</h2>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <input
        type="date"
        name="recovery"
        value={coronaFrom.recovery}
        onChange={handleInputChange}
        placeholder={coronaFrom.recovery}
      />
      <button onClick={handleOnSubmit}>submit</button>
    </div>
  </>
)}
      </>)}
      
        {(corona.positive==null)&&(
             <button onClick={handleOnCoronaAdd}>You got sick with Corona?</button>
        
        )} 
           {showCoronaAdd && <CoronaAdd id={corona.id} />}  
    </div>     
        <h1>vaccinations:</h1>
        {corona.vaccineList.map((vaccine, index) => (
          <div key={index}>
            <Accordion>
              <AccordionSummary style={{ margin: '20px' }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
              >
                <Typography>vaccine {index+1}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                {vaccine.manufacturer}
                </Typography>
                <Typography>
                {vaccine.date}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
        {(corona.vaccineList.length < 4)&&<button onClick={handleOnVaccineAdd} style={{marginTop:"25px"}}>add Vaccine</button>}
        {showVaccineAdd && <VaccineAdd id={corona.id} />}  
      </div>
    </>
  );
}
