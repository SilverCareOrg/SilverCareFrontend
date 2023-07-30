import { useEffect, useState } from 'react';
import axios_api from './axios_api';

const useAuthentication = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Fetch the user's role from the backend (e.g., using an API endpoint)
    const fetchUserRole = async () => {
        try {
        axios_api.get("/get_user_role", {withCredentials: true}).then((response) => {
            if (response.status === 200) {
                const json = response.data;
                setUserRole(json["role"]);
              }
            }).catch((error) => {
              console.log("Error:", error);
            });
          } catch (err) {
            console.log("Error:", err);
        }  
    };

    fetchUserRole();
  }, []);

  return userRole;
};

export default useAuthentication;