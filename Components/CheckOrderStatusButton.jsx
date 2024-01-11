import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../redux/authSlice"; // Adjust the import path based on your actual file structure
import axios from "axios"; // Import Axios
import styles from "../styles/CheckOrder.module.css";

const CheckOrderButton = ({ setclose }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const username = authState.user ? authState.user.username : null;

  useEffect(() => {

    const fetchData = async () => {
      const tokenCookie = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("token="));
    
      if (tokenCookie) {
        try {
          const response = await axios.get("/api/get-username", {
            headers: {
              Authorization: `Bearer ${tokenCookie.replace("token=", "")}`,
            },
          });
    
          if (response.status === 200) {
            const { username } = response.data;
            dispatch(loginUser({ username }));
          } else {
            // Handle unauthorized or other errors
            console.error("Failed to fetch username");
          }
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      } else {
        // If there is no token, dispatch logout action or update Redux state accordingly
        dispatch(logoutUser());
      }
    };
    

    fetchData();
  }, [authState.user, dispatch]);

  return (
    <>
      <button onClick={() => setclose(false)} className={styles.checkOrderButton}>
        {username ? `${username}'s Orders` : "Check Orders"}
      </button>
    </>
  );
};

export default CheckOrderButton;
