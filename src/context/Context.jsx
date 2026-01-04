import React, { createContext, useState } from "react";
import { useContext } from "react";

export const OrgProfileUpdateContext = createContext();
export const userProfileUpdateContext = createContext();
export const searchkeycontext = createContext()
export const adminProfileUpdateContext = createContext()
export const numberOfOrganizer = createContext()

function Context({ children }) {
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [userprofileUpdated, setUserProfileUpdated] = useState(false);
   const [adminprofileUpdated, setAdminProfileUpdated] = useState(false);
   const [regOrg, setRegOrg] = useState(false);
  const[searchkey,SetSearchkey]=useState("")

  return (
    <numberOfOrganizer.Provider value={{regOrg,setRegOrg}}>
    <adminProfileUpdateContext.Provider value={{ adminprofileUpdated,setAdminProfileUpdated }}>
    <OrgProfileUpdateContext.Provider value={{ profileUpdated, setProfileUpdated }}>
      <userProfileUpdateContext.Provider value={{ userprofileUpdated,setUserProfileUpdated }}>
        <searchkeycontext.Provider value={{searchkey,SetSearchkey}}>
          {children}
        </searchkeycontext.Provider>
      </userProfileUpdateContext.Provider>
    </OrgProfileUpdateContext.Provider>
    </adminProfileUpdateContext.Provider>
    </numberOfOrganizer.Provider>
  );
}

export default Context;
