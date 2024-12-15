import React, { useEffect, useState } from 'react'
import { auth,googleProvider,db } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import { getDocs,collection,addDoc,deleteDoc,doc,updateDoc } from 'firebase/firestore';

function Demo() {
    const [email,setEmail] = useState();
    const [password, setPassword] = useState();
    const [movieList, setMovieList] = useState([]);

    const [movieTitle,setMovieTitle] = useState("");
    const [movieDate,setMovieDate] = useState(0);
    const [isoscur,setIsOscur] = useState(false);

    const [updateTitleName, setUpdateTitleName] = useState("");

    const movieCollecctionRef = collection(db, "movies");

    const getMovieList = async () =>{
        try{
            const data = await getDocs(movieCollecctionRef);
            const filteredata = data.docs.map((doc) => ({
                ...doc.data(),
                id:doc.id
                }))
            console.log(filteredata);
            setMovieList(filteredata);
        }
        catch(err){
            console.log(err);
        }
    }
    
    useEffect(()=>{
        getMovieList();
    },[])

    const movieSubmit = async () =>{
        try{
            await addDoc(movieCollecctionRef, {
                title:movieTitle, 
                dateofrelease:movieDate,
                oscur:isoscur,
                userId: auth?.currentUser?.uid,
        });
        getMovieList();
        }
        catch(err){
            console.log(err);
        }
    }
    const signIn = async () => {
        try{
        await createUserWithEmailAndPassword(auth, email, password);
        }
        catch(err){
            console.log(err);
        }
    };
    const signinwithgoogle = async () =>{
        try{
            await signInWithPopup(auth, googleProvider);
            }
            catch(err){
                console.log(err);
            }
    }
    const deleteMovie = async (id)=>{
        try{
            const movieDoc = doc(db,"movies",id);
            await deleteDoc(movieDoc);
            getMovieList();
        }
        catch(err){
            console.log(err);
        }
    }
    const updateTitle = async (id)=>{
        const movieDoc = doc(db,"movies",id);
        await updateDoc(movieDoc,{title:updateTitleName});
        getMovieList();
    }
  return (
    <div>
        <h1>Enter the Email</h1>
        <input type="text" placeholder='Enter Email....' onChange={(e)=>setEmail(e.target.value)}/>
        <h1>Enter the password</h1>
        <input type="password" placeholder='Enter password...'onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={signIn}>sign In</button>
        <button onClick={signinwithgoogle}>Sign IN with google</button>
        <input type="text" placeholder='Enter the movie name..' onChange={(e)=>setMovieTitle(e.target.value)}/>
        <input type="number" placeholder='Enter the date year' onChange={(e)=>setMovieDate(e.target.value)}/>
        <input type="checkbox" checked={isoscur} onChange={(e)=>setIsOscur(e.target.checked)}/>
        <label>oscur</label>
        <button onClick={movieSubmit}>Submit movie</button>
        <div>
            {movieList.map((movie)=>(
                <div>
                    <h1 style={{color:movie.oscur ? "green":"red"}}>{movie.title}</h1>
                    <h1>{movie.dateofrelease}</h1>
                    <button onClick={()=>deleteMovie(movie.id)}>delete</button>
                    <input type="text" placeholder='Change Name....' onChange={(e)=> setUpdateTitleName(e.target.value)}/>
                    <button onClick={()=>updateTitle(movie.id)}>Update Title</button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Demo