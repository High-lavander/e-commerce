import { Navigate } from 'react-router-dom';
import { FC, PropsWithChildren } from 'react';

const RedirectToMainLoggged: FC<PropsWithChildren> = ({ children }) => {
  const logged = true;
  if (logged) {
    return <Navigate to={'/'} />;
  }
  return children;
};

export default RedirectToMainLoggged;
