import axios from "axios";
import { useEffect, useState } from "react";

const useFetchDetails = (parameter) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    async function fetchingData() {
        try {
            setLoading(true);
            let { data } = await axios(parameter);
            // console.log(data);
            setData(data);
        } catch (error) {
            console.log("Error", error.message);
            setError(error && error.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchingData();
    }, [parameter]);

    return { data, loading, error };
};

export default useFetchDetails;