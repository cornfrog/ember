const LoadingWheel = ({
    text,
    color
}) => {
    return (
        <>
            {text}
            <div className="loading-container">
                <img src={`/${color}-loader.gif`} alt="Loading..." className="loading-spinner" />
            </div>
        </>
    )
}

export default LoadingWheel;