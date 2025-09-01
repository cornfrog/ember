import "../assets/pages/Setup.scss";
import SetupForm from "../components/forms/SetupForm";

const Setup = () => {
    return (
        <div className="setup page">
            <h1 className="page-title">Setup Ember</h1>
            <SetupForm />
        </div>
    )
}

export default Setup;