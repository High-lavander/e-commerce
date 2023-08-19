import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import ActionsCreators from '../store/actionCreators';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionsCreators, dispatch);
};
