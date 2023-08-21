import { Navigate } from 'react-router-dom';
import { FC, PropsWithChildren } from 'react';
import { useAppSelector } from '../../store/hooks';

const RedirectToMainLoggged: FC<PropsWithChildren> = ({ children }) => {
  const logged = useAppSelector((state) => Boolean(state.customer.customer));
  if (logged) {
    return <Navigate to={'/'} />;
  }
  return children;
};

export default RedirectToMainLoggged;
