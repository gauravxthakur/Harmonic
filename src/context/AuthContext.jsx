import { createContext, useState, useContext, useEffect } from "react";
import supabase from "../supabase-client";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { SupabaseClient } from "@supabase/supabase-js";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //Session state (user info, sign-in status)
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    //1) Check on 1st render for a session (getSession())

    async function getInitialSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        // success
        console.log(data.session);
        setSession(data.session);
      } catch (error) {
        console.error("Error getting session:", error.message);
      }
    }

    getInitialSession();

    //2) Listen for changes in auth state
    supabase.auth.onAuthStateChange = (_event, session) => {
      setSession(session);
      console.log("Session changed:", session);
    };
  }, []);

  //Auth functions (signin, signup, logout)

  //Sign in (success, data, error)
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });
      if (error) {
        console.error("Supabase sign-in error:", error.message);
        return { success: false, error: error.message };
      }

      return { success: true, data };
      console.log("Supabase sign in success:", data);
    } catch (error) {
      console.error("Unexpected error during sign-in", error.message);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  // Sign out
  const signOut = async (email, password) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Supabase sign-out error:", error.message);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error("Unexpected error during sign-out", error.message);
      return {
        success: false,
        error: "An unexpected error occurred during sign-out.",
      };
    }
  };

  //Sign up
  const signUpNewUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password: password,
      });
      if (error) {
        console.error("Supabase sign-up error:", error.message);
        return { success: false, error: error.message };
      }

      return { success: true, data };
      console.log("Supabase sign-up success:", data);
    } catch (error) {
      console.error("Unexpected error during sign-up", error.message);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  return (
    <AuthContext.Provider value={{ session, signInUser, signOut, signUpNewUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
