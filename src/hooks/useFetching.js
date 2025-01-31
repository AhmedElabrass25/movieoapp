import axios from "axios";
import { useEffect, useState } from "react";

const useFetching = (parameter) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    async function fetchingData() {
        try {
            setLoading(true);
            let { data } = await axios(parameter);
            // console.log(data.results);
            setData(data.results);
        } catch (error) {
            console.log("Error", error.message);
            setError((error && error.message) || "Error in fetching data........!");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchingData();
    }, []);
    return { data, loading, error };
};

export default useFetching;