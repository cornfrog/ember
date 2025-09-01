import { useContext, useState } from "react";
import { DatabasesContext } from "../../context/DatabasesProvider";
import CreateDatabase from "./CreateDatabase";
import Popup from "../Popup";
import { CONFIG } from "../../config";

const DatabaseList = () => {

    const { databases, setDatabases } = useContext(DatabasesContext);
    const [searchText, setSearchText] = useState("");
    const [displayPopup, setDisplayPopup] = useState('hidden');
    const [selectedDatabase, setSelectedDatabase] = useState('');

    const filteredDatabases = databases
        .filter((database) =>
            searchText
                ? database.name.toLowerCase().includes(searchText.toLowerCase())
                : true
        );

    const collectSearchText = (event) => {
        const enteredText = event.currentTarget.value;
        setSearchText(enteredText);
    }

    const displayDeletePopup = (event) => {
        const databaseId = event.currentTarget.id;
        const database = databases.find(database => database.id === databaseId);
        setSelectedDatabase(database);
        setDisplayPopup("fade-in");
    }

    const deleteDatabase = async (event) => {
        try {
            const deleteDatabaseRequest = await fetch(`${CONFIG.apiHost}/ember/database/delete-database`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: selectedDatabase.id
                })
            });
            const deleteDatabaseResponse = await deleteDatabaseRequest.json();
            const updatedDatabases = deleteDatabaseResponse.databases;
            setDatabases(updatedDatabases);
            setDisplayPopup('fade-out');
            setTimeout(() => {
                setDisplayPopup('hidden');
            }, 400);

        } catch (error) {
            console.log(error);
        }
    }

    const databaseList = filteredDatabases.map((database) => {
        return (
            <div
                key={database.id}
                className="
                    database-row
                    flex-align-center-justify-between
                    padding-1r
                    margin-tb-1r
                    pointer
                "
            >
                <div
                    className="
                        flex-align-center-justify-center    
                        gap-1r
                    "
                >
                    <i
                        className="databases-icon"
                    ></i>
                    {database.name}
                </div>
                <div className="
                    database-buttons
                    flex-align-center-justify-center    
                    gap-2r
                "
                >
                    <i
                        className="
                            delete-icon
                            pointer
                        "
                        id={database.id}
                        onClick={displayDeletePopup}
                    ></i>
                </div>
                <Popup
                    currentClass={displayPopup}
                    setCurrentClass={setDisplayPopup}
                    title={"Delete Database?"}
                    confirmText={"Delete"}
                    confirmAction={deleteDatabase}
                    text={`Are you sure delete ${selectedDatabase.name}?`}
                />
            </div>
        )
    });

    return (
        databases === null ?
            <p>Loading...</p> :

            <>
                <div className="database-controls">
                    <input
                        type="text"
                        name=""
                        id=""
                        className="
                            database-search
                            font-size-1-15r
                        "
                        value={searchText}
                        onChange={collectSearchText}
                        placeholder="Search Database Here"
                    />
                    <CreateDatabase />
                </div>
                <div className="
                        database-list
                        padding-1r
                    "
                >
                    {databaseList}
                </div>
            </>
    )

}

export default DatabaseList;