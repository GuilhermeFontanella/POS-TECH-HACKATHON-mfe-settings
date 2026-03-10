import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSettings } from '../hooks/useSettings';
import { setAllSettings } from '../store/settingsSlice';

export const SettingsInitializer = () => {
  const { data, isSuccess } = useSettings();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setAllSettings(data));
    }
  }, [isSuccess, data, dispatch]);

  return null;
};