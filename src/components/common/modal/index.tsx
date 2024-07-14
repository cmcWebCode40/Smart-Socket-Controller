import React from 'react';
import {
  Modal as RNModal,
  StyleSheet,
  View,
  ModalProps as RNModalProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Button} from '../button';
import {CloseIcon} from '../icons';
import {useThemedStyles} from '@/libs/hooks';
import {pixelSizeHorizontal, pixelSizeVertical} from '@/libs/utils';
import {Theme} from '@/libs/config/theme';
import {Typography} from '../typography';

export interface ModalProps extends RNModalProps {
  children: React.ReactNode;
  visible: boolean;
  onClose?: () => void;
  title?: string;
  contentStyle?: StyleProp<ViewStyle>;
  hideCloseIcon?: boolean;
  showHeaderLine?: boolean;
}

export const Modal: React.FunctionComponent<ModalProps> = ({
  title,
  children,
  visible,
  onClose,
  contentStyle,
  hideCloseIcon,
  showHeaderLine,
  ...otherModalProps
}) => {
  const styles = useThemedStyles(baseStyles);
  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      {...otherModalProps}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, contentStyle]}>
          <View style={[styles.header, showHeaderLine && styles.headerShadow]}>
            <View>{title && <Typography>{title}</Typography>}</View>
            {!hideCloseIcon && (
              <Button noStyles onPress={onClose}>
                <CloseIcon />
              </Button>
            )}
          </View>
          {children}
        </View>
      </View>
    </RNModal>
  );
};

const baseStyles = (theme: Theme) => {
  return StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)',
    },
    modalView: {
      marginHorizontal: pixelSizeHorizontal(32),
      borderRadius: theme.radius.xxl,
      paddingVertical: pixelSizeVertical(24),
      paddingHorizontal: pixelSizeHorizontal(16),
      backgroundColor: theme.colors.white[100],
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 4,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: pixelSizeHorizontal(16),
    },
    headerShadow: {
      paddingHorizontal: pixelSizeHorizontal(24),
      paddingTop: pixelSizeVertical(16),
      paddingBottom: pixelSizeVertical(12),
      borderBottomColor: theme.colors.gray[400],
      borderBottomWidth: 2,
    },
    headerLine: {},
  });
};
