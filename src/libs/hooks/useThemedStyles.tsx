import {useMemo} from 'react';
import {Theme, theme} from '../config/theme';

type Styles<T extends Record<string, unknown>> = (theme: Theme) => T;

export const useThemedStyles = <T extends Record<string, unknown>>(
  styles: Styles<T>,
) => {
  return useMemo(() => styles(theme), [styles]);
};
