import { useContext, useState } from "react";
import { CONFIG } from "../../config";
import LoadingWheel from "../LoadingWheel";
import { DatabasesContext } from "../../context/DatabasesProvider";

const CreateDatabase = () => {

    const { databases, setDatabases } = useContext(DatabasesContext);
    const [createDatabaseClass, setCreateDatabaseClass] = useState('hidden');
    const [databaseName, setDatabaseName] = useState('');
    const [databaseNameError, setDatabaseNameError] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleCreateProjectForm = () => {
        setCreateDatabaseClass('fade-in');
    }

    const clearInputs = () => {
        setDatabaseName('');
    }

    const clearErrors = () => {
        setDatabaseNameError('');
    }

    const validDatabase = () => {
        const alreadyExists = databases.some(database => database.name === databaseName);
        if (databaseName.trim() === "") {
            setDatabaseNameError("* Database name cannot be empty");
            setLoading(false);
            return false;
        } else if (alreadyExists) {
            setDatabaseNameError("* Database already exists");
            setLoading(false);
            return false;
        }
        return true;
    }

    const hideCreateDatabaseForm = (event) => {
        if (event) {
            event.preventDefault();
        }
        setCreateDatabaseClass('fade-out');
        setTimeout(() => {
            setCreateDatabaseClass('hidden');
            clearErrors();
            clearInputs();
        }, 400);
    }

    const collectInput = (event) => {
        setDatabaseName(event.currentTarget.value);
    }

    const createDatabase = async (event) => {
        event.preventDefault();
        clearErrors();
        setLoading(true);
        if (!validDatabase()) return;
        try {
            const createDatabaseRequest = await fetch(`${CONFIG.apiHost}/ember/database/create-database`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    databaseName: databaseName,
                })
            });
            const createDatabaseResponse = await createDatabaseRequest.json();
            const newDatabaseList = createDatabaseResponse.databases;
            setDatabases(newDatabaseList);
            setLoading(false);
            clearErrors();
            clearInputs();
            hideCreateDatabaseForm();
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    return (
        <>
            <button
                className="
                    flex-align-center-justify-center 
                    gap-1r
                    padding-tb-1-2r
                    padding-lr-1r
                    font-size-1-15r
                    pointer
                    create-database-button
                "
                onClick={toggleCreateProjectForm}
            >
                Create Database
                <i
                    className="add-icon"
                ></i>
            </button>
            <div
                className={`
                    create-project-form-container
                    ${createDatabaseClass}
                `}
            >
                <form
                    className="create-project-form"
                    onSubmit={createDatabase}
                >
                    <p
                        className="create-form-title"
                    >
                        Enter New Database Name:
                    </p>
                    <label
                        htmlFor="databaseName"
                        className="create-form-label"
                    >
                        <input
                            type="text"
                            className="create-form-input"
                            value={databaseName}
                            onChange={collectInput}
                            placeholder="New Database Name Here..."
                        />
                    </label>
                    <p className={`${databaseNameError ? '' : 'hidden'} error-text`}>
                        {databaseNameError}
                    </p>
                    <div className="create-form-control-buttons">
                        <button
                            className="cancel-button control-buttons"
                            onClick={hideCreateDatabaseForm}
                            disabled={loading}
                        >
                            Cancel
                            <i
                                className="cancel-icon"
                            >
                            </i>
                        </button>
                        <button
                            className="create-button control-buttons"
                            disabled={loading}
                        >
                            {loading ?
                                <LoadingWheel
                                    text={"Loading"}
                                    color={"orange"}
                                />
                                :
                                <>
                                    Add Database
                                    <i
                                        className="add-icon"
                                    >
                                    </i>
                                </>
                            }
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default CreateDatabase;