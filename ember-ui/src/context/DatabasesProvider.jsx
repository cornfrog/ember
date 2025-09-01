import { createContext, useEffect, useState } from "react";
import { CONFIG } from "../config";

export const DatabasesContext = createContext();

const DatabasesProvider = ({ children }) => {

    const databasesRoute = `${CONFIG.apiHost}/ember/database/get-databases`;
    const [databases, setDatabases] = useState([]);
    const [loading, isLoading] = useState(false);

    const fetchDatabases = async () => {
        isLoading(true);
        try {
            const databasesRequest = await fetch(databasesRoute);
            const databasesResponse = await databasesRequest.json();
            const databases = databasesResponse.databases;
            setDatabases(databases);
            isLoading(false);
        } catch (error) {
            console.log(error);
            isLoading(false);
        }
    }

    useEffect(() => {
        fetchDatabases();
    }, []);

    return (
        loading ?
            <p>Loading</p> :
            
            <DatabasesContext.Provider
                value={{
                    databases,
                    setDatabases
                }}
            >
                {children}
            </DatabasesContext.Provider>
    )

}

export default DatabasesProvider;