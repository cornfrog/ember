import { createPortal } from "react-dom";
import "../assets/components/Popup.scss";

const Popup = ({
    title,
    text,
    currentClass,
    setCurrentClass,
    isAlert,
    confirmText,
    confirmAction
}) => {

    const hidePopup = (event) => {
        if (event) {
            event.stopPropagation();
        }
        setCurrentClass('fade-out');
        setTimeout(() => {
            setCurrentClass('hidden');
        }, 400);
    }

    return createPortal(
        <div
            className={`pop-up-container ${currentClass}`}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <div className="popup-box">
                <h2>{title}</h2>
                <p>{text}</p>
                <div className="flex-align-center-justify-center padding-tb-1r gap-1r">
                    <button
                        onClick={hidePopup}
                    >
                        {isAlert ? 'Close' : 'Cancel'}
                    </button>
                    <button
                        onClick={confirmAction ? confirmAction : hidePopup}
                    >
                        {confirmText ? confirmText : 'Confirm'}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Popup;
