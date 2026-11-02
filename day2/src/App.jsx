import { useState } from 'react'
import './App.css'

function App() {
  
  const [val,setVal] = useState(0);

  const [time,setTime] = useState({
     sec:null,
     min:null,
     hour:null
  })
     
  const handleChange = (e) => {
    const {name, value} = e.target;

    let newTime = {...time,[name]:value}
    
    setTime(newTime);
    let ans = Number(newTime.hour*60*60) ;
    ans+= Number(newTime.min*60) ;
    ans+= Number(newTime.sec);
    
    setVal(ans);
  }

  const handleTimer = () => {
      let ans = val;
      let hr = Math.floor(ans/3600);
      ans%=3600;
      let min = Math.floor(ans /60);
      ans%=60;
      ans = Math.floor(ans);
      
      let newTime = {...time,hour:hr,min:min,sec:ans}
      setTime(newTime);

      const interval = setInterval(() => {

          setTime((prev) => {
            

            if(prev.hour <=0 && prev.min<=0 && prev.sec<=0){
              clearInterval(interval);
              setTime((prev) => ({...prev,hour:0,min:0,sec:0}))
              return prev;
            }
             if(prev.sec<=0){
               if(prev.min<=0){

                  return {
                    ...prev,
                    hour:prev.hour-1,
                    min:59,
                    sec:59
                  }
                }
               return {
                 ...prev,
                 min:prev.min-1,
                 sec:59
               }
             }
             return{
               ...prev,
               sec:prev.sec-1
             }
          })
      },1000)

  }

  const handleReset = () => {
     setTime((prev) => {
        return {
          ...prev,
          hour:'00',
          min:'00',
          sec:'00'
        }
     })
  }

  return (
    <div>
       
       <input
       name="hour"
       value={time.hour}
       onChange={(e) => handleChange(e)}
       maxlength="2"
       className="h-20 w-20 text-center text-5xl border-b-2 m-3" type="text" placeholder="00"/>
       <span className="text-5xl" >:</span>

       <input 
       name="min"
       value={time.min}
       onChange={(e) => handleChange(e)}
       maxlength="2"
       className="h-20 w-20 text-center text-5xl border-b-2 m-3" type="text" placeholder="00"/>
       <span className="text-5xl" >:</span>

       <input 
       name="sec"
       value={time.sec}
       onChange={(e) => handleChange(e)}
       maxlength="2"
       className="h-20 w-20 text-center text-5xl border-b-2 m-3" type="text" placeholder="00"/>
       <br></br>
       <div className="mt-4 ml-6">
         <button 
         onClick={handleTimer}
         className="bg-green-600 text-white m-4 px-8 py-2 rounded">Start</button>
         <button
         onClick={handleReset}
         className="bg-red-600 text-white m-4 px-8 py-2 rounded">Reset</button>
       </div>
       
    </div>
  )
}

export default App;
