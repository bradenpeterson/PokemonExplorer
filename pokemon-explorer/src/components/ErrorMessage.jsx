export function ErrorMessage({message, onRetry}) {
    return (
        <div className="error-container">
            <p className="error-text">{message}</p>
            {onRetry && <button onClick={onRetry}>Try Again</button>}
        </div>
    );
}