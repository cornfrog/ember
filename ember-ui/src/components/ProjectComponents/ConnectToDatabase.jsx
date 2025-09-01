import { useState } from "react";
import { CONFIG } from "../../config";

const ConnectToDatabase = ({ project, setProject, databases }) => {

    const [databaseSelectClass, setDatabaseSelectClass] = useState("hidden");
    const [selectedDatabase, setSelectedDatabase] = useState('');

    const displayDatabases = async () => {
        setDatabaseSelectClass("fade-in");
    };

    const databaseList = databases.map((database) => {
        return (
            <p
                className={`
                    database-option 
                    pointer 
                    ${selectedDatabase === database.name ? 'selected' : ''}
                `}
                key={database.id}
                onClick={() => setSelectedDatabase(database.name)}
            >
                {database.name}
            </p>
        )
    });

    const connectDatabaseToProject = async (event) => {
        event.preventDefault();
        const connectToDatabaseRoute = `${CONFIG.apiHost}/ember/project/connect-to-database`;
        try {
            const connectToDatabaseRequest = await fetch(connectToDatabaseRoute, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    projectId: project.id,
                    databaseName: selectedDatabase
                })
            });
            const connectToDatabaseResponse = await connectToDatabaseRequest.json();
            const updatedProject = connectToDatabaseResponse.updatedProject;
            setProject(updatedProject);
            hideDatabaseList();
        } catch (error) {
            console.log(error);
        }
    }

    const hideDatabaseList = (event) => {
        if(event) {
            event.preventDefault();
        }
        setDatabaseSelectClass('fade-out');
        setTimeout(() => {
            setDatabaseSelectClass('hidden');
        }, 400);
    }

    return (
        <>
            <div className="
                flex-align-center-justify-center
                gap-1r
            ">
            <button onClick={displayDatabases}>
                <i className="psql-icon"></i>
                Connect to a Database
            </button>
            {
                project.database ?
                <p>Connected to: {project.database}</p>
                :''
            }
            </div>

            <div
                className={`
                    connect-database-form-container
                    ${databaseSelectClass}
                `}
            >
                <form
                    className="connect-database-form"
                    onSubmit={connectDatabaseToProject}
                >
                    <p className="connect-database-form-title">
                        Available Databases:
                    </p>
                    {databaseList}
                    <div
                        className="connect-database-controls"
                    >
                        <button
                            className="cancel-button control-buttons"
                            onClick={hideDatabaseList}
                        >
                            Cancel
                            <i
                                className="cancel-icon"
                            >
                            </i>
                        </button>
                        <button
                            className="connect-button"
                        >
                            Connect Database
                            <i
                                className="add-icon"
                            >
                            </i>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ConnectToDatabase;
