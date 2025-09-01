import { useState } from "react";
import { CONFIG } from "../../config";
import LoadingWheel from "../LoadingWheel";

const InstallPackage = ({ project }) => {

    const [installPackageClass, setInstallPackageClass] = useState("hidden");
    const [packageToInstall, setPackageToInstall] = useState('');
    const [packageToInstallError, setPackageToInstallError] = useState('');
    const [loading, setLoading] = useState(false);

    const displayPopUp = async () => {
        setInstallPackageClass("fade-in");
    };

    const installPackage = async (event) => {
        event.preventDefault();
        const connectToDatabaseRoute = `${CONFIG.apiHost}/ember/project/install-package`;
        if (packageToInstall.trim() === "") {
            setPackageToInstallError("* No Package Entered");
            return
        }
        try {
            setLoading(true);
            const installPackageRequest = await fetch(connectToDatabaseRoute, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    projectId: project.id,
                    packageName: packageToInstall
                })
            });
            const installPackageResponse = await installPackageRequest.json();
            if (installPackageResponse.error) {
                if (installPackageResponse.error === "PACKAGE NOT FOUND") {
                    setPackageToInstallError("* Package Not Found");
                    setLoading(false);
                    return
                }
            }
            setLoading(false);
            hidePopUp();
        } catch (error) {
            console.log(error);
        }
    }

    const hidePopUp = (event) => {
        if (event) {
            event.preventDefault();
        }
        setPackageToInstall('');
        setPackageToInstallError('');
        setInstallPackageClass('fade-out');
        setTimeout(() => {
            setInstallPackageClass('hidden');
        }, 400);
    }

    return (
        <>
            <button onClick={displayPopUp}>
                <i className="install-icon"></i>
                Install Package
            </button>

            <div
                className={`
                    install-package-form-container
                    ${installPackageClass}
                `}
            >
                <form
                    className="install-package-form"
                    onSubmit={installPackage}
                >
                    <p className="install-package-form-title">
                        Enter Package To Install:
                    </p>
                    <input
                        type="text"
                        name="packageName"
                        value={packageToInstall}
                        onChange={(event) => setPackageToInstall(event.currentTarget.value)}
                        className="install-package-input"
                        placeholder="Enter package name here"
                    />
                    <p className={`${packageToInstallError ? '' : 'hidden'} error-text`}>
                        {packageToInstallError}
                    </p>
                    <div
                        className="install-package-controls"
                    >
                        <button
                            className="cancel-button control-buttons"
                            onClick={hidePopUp}
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
                            {
                                loading ?
                                    <LoadingWheel
                                        text={"Loading"}
                                        color={"transparent"}
                                    />
                                    :
                                    <>
                                        Install Package
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
    );
};

export default InstallPackage;
