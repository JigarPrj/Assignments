import { useState, useEffect} from 'react'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useDispatch } from "react-redux";
import {GET_NASADATA} from '../actions/actions'
import { useSelector } from 'react-redux'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
export default function Home() {
    const [disableBtn,setdisableBtn]=useState<boolean>(true)
    const [astroidId,setastroidId]=useState<string>('')
    const [informationData,setinformationData]=useState<any>([])
    //dispatching method
    const dispatch = useDispatch();
    //getting redux data
    const nasaDatas = useSelector((store:any) => store?.takeAction)
    
    
    useEffect( () => {
        getNasaData()
      }, []);
    
    const getNasaData=async()=>{
        await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=xpUJ3uh11BBtQaneN1QUJOxJmKFTdNCoAyYj3noT`, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          }})
            .then((response:any)=> {
                dispatch(GET_NASADATA(response.data?.near_earth_objects));
                let item = response.data?.near_earth_objects[Math.floor(Math.random()*response.data?.near_earth_objects.length)];
            }).catch((err) => {
             console.log(err);
           });
      }
      
      const getRandomIdInfo=async()=>{
        if(astroidId){
        await axios.get(` https://api.nasa.gov/neo/rest/v1/neo/${astroidId}?api_key=xpUJ3uh11BBtQaneN1QUJOxJmKFTdNCoAyYj3noT`, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          }})
            .then((response:any)=> {
                
                setinformationData(response?.data)
                console.log("jigar",informationData,response?.data);
            }).catch((err:any) => {
                console.log("errorv",err);
                toast.error("Information not available")
           });}
      }
  return (
    <div style={{padding:'40px',border:'2px solid red',textAlign:'center',width:'50%',margin:'auto',marginTop:'20px',paddingTop:'20px'}} data-testid="html-element">
        <div>
         <TextField  
          placeholder='Enter Asteroid ID'
          variant="outlined"
          id="InputAstroidid"
          onChange={(event:any)=>{   
            if(event?.target?.value){
           setastroidId(event?.target?.value)
            setdisableBtn(false)
            }else{
                setdisableBtn(true)
            }
          }}
        />
        </div>
        <div style={{backgroundColor:'lightgray',width:'fit-content',margin:'auto',marginTop:'10px'}}>
        <Button
         onClick={(event:any) => {
            getRandomIdInfo()
        }}
        id="submitBTN"
        disabled={disableBtn}
        >
        submit                
        </Button>
        </div>
        <div style={{backgroundColor:'lavender',width:'fit-content',margin:'auto',marginTop:'10px'}}>
        <Button
         onClick={(event:any) => {
            const random = nasaDatas?.nasaData[0][Math.floor(Math.random()*nasaDatas?.nasaData[0].length)]
            //@ts-ignore
            document.getElementById('InputAstroidid').value=random?.id
            setdisableBtn(false)
            setastroidId(random?.id)
        }}
        id="Random Asteroid"
        >
        Random Asteroid               
        </Button>
        </div>
        {informationData?.length !==0&&
        <>
        <hr />
        <h5>Name:{informationData?.name}</h5>
        <h5>nasa_jpl_url:{informationData?.nasa_jpl_url}</h5>
        <h5>is_potentially_hazardous_asteroid:{informationData?.is_potentially_hazardous_asteroid}</h5>
        </>
        }
    </div>
  )
}
