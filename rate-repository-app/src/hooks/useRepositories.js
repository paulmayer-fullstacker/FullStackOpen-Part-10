// /src/hooks/useRepositories.js:
//

import { useState, useEffect } from "react";

const useRepositories = () => {
  // State to store the repository data object fetched from the server API.
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);

    // const response = await fetch("http://<Expo IP address>:5000/api/repositories");
    // Replace <Expo IP address> with IP address from Metro: exp://192.168.1.149:8081 (below QR code), i.e.: 192.168.1.149.
    const response = await fetch("http://192.168.1.149:5000/api/repositories");
    const json = await response.json();
    console.log(json); // Useful for debugging the incoming payload structure.
    setLoading(false);
    // Store the server payload into our state hook.
    setRepositories(json);
  };
  // useEffect triggers the network request immediately after the component mounts to the screen.
  useEffect(() => {
    fetchRepositories();
  }, []); // Empty dependency array ensures this runs only once, on mount.

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
