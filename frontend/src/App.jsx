import './App.css';
import { sketch } from "../asserts/assert"; 
import { useEffect} from "react";
function App() {
    async function PageTracking() {
      try{
      const response= await fetch('/api/pageview',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        }, //window.location.href
        body:JSON.stringify({pageUrl:"http://localhost:5173"}),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data=await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error recording page view:', error); // Log any errors
    }
  }

    async function TrackingLike({itemId}) {
       const response= await fetch('/api/likepage',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({itemId})
       });
       const data=await response.json();
       console.log(data.message);
    }
   useEffect(()=>{
    console.log("PageTracking function called");
    PageTracking();
    const likeButton=document.getElementById('likeButton');
    likeButton.addEventListener('click',()=>{
      TrackingLike('itemId')
    });
    return ()=>{
      likeButton.removeEventListener('click',TrackingLike);
    };
   },[]);
  return (
    <>
       <div className="product">
      <img src={sketch.picture} alt="" className="picture"/>
      <img src={sketch.like} alt="" className="like" id="likeButton"/>
      
    </div>
    </>
  )
}

export default App;
