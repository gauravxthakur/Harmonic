import { createContext, useState, useContext, useEffect } from "react";
import supabase from "./src/supabase-client";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    //Session state (user info, sign-in status)
    const [session, setSession] = useState(undefined);

    useEffect(() => {
        //1) Check on 1st render for a session (getSession())

        async function getInitialSession(){
            try{
                const {data, error} = await supabase.auth.getSession();
                if (error){
                    throw error;
                }
                // success
                console.log(data.session);
                setSession(data.session);
            }catch(error){
                console.error("Error getting session:", error.message);

            }
        }

        getInitialSession();
      
        //2) Listen for changes in auth state
        supabase.auth.onAuthStateChange = (_event, session) =>{
            setSession(session);
            console.log("Session changed:", session);
        }
      
    }, []);

//Auth functions (signin, signup, logout)



    return (
        <AuthContext.Provider value={{session}}>
            {children}
        </AuthContext.Provider>

    );

}

export const useAuth = () =>{
    return useContext(AuthContext);
} 

