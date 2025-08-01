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
        /**
      Challenge:
      * 1) Inside the useEffect, write an asynchronous 'getInitialSession' function 
           which executes the 'auth.getSession()' method from the Supabase client 
           library
      * 2) Destructure the response into 'data' and 'error' variables
      * 3) Using the try/catch syntax, handle both Supabase-specific errors and 
           unexpected errors
      * 4) If successful, log the value of the 'session' property of the 'data' 
           object to the console and then use it to update the 'session' state 
      * 5) Call the new function below the function definition
      * 6) Check your browser's dev tools for 'null' being logged
           Hint: follow the same error handling pattern as the 'fetchMetrics' function
      **/
      
        //2) Listen for changes in auth state
      
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

