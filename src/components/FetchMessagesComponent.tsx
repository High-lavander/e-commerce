import { useState, useEffect } from 'react';

interface IFetchMessages {
  successMessage?: string | undefined;
  errorMessage: string | undefined;
}

export const FetchMessagesComponent = (props: IFetchMessages) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const stylesSuccess = {
    padding: '1rem',
    fontSize: '1.3rem',
    color: 'green',
    border: '1px solid green',
    borderRadius: '16px',
  };

  const stylesError = {
    padding: '1rem',
    fontSize: '1.3rem',
    color: 'red',
    border: '1px solid red',
    borderRadius: '16px',
  };

  useEffect(() => {
    if (props.successMessage) {
      setSuccessMessage(props.successMessage);
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    }
    if (props.errorMessage) {
      setErrorMessage(props.errorMessage);
    }
  }, [props.successMessage, props.errorMessage]);
  return (
    <div
      style={{
        position: 'fixed',
        right: '1rem',
        top: '20%',
        zIndex: '5',
        boxShadow: '0px 0px 7px 2px #b3b3b3',
        borderRadius: '16px',
      }}
    >
      {successMessage && (
        <div style={stylesSuccess}>
          {successMessage}
          {/* <div
            style={{
              width: '10px',
              height: '10px',
              fontSize: '1 rem',
              fontWeight: '400',
              position: 'absolute',
              right: '10px',
              top: '0',
            }}
          >
            x
          </div> */}
        </div>
      )}
      {errorMessage && <div style={stylesError}>{errorMessage}</div>}
    </div>
  );
};
