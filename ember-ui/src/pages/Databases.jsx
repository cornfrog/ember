import "../assets/pages/Databases.scss";
import DatabaseList from "../components/DatabaseComponents/DatabaseList";
import DatabasesProvider from "../context/DatabasesProvider";

const Databases = () => {

    return (
        <div className="databases page">
            <h1 className="page-title">Databases</h1>
            <DatabasesProvider>
                <DatabaseList />
            </DatabasesProvider>
        </div>
    )
}

export default Databases;