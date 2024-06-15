import {Dimensions, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export const ScreenHeight = SCREEN_HEIGHT;
export const ScreenWeight = SCREEN_WIDTH;

const baseWidthScale = SCREEN_WIDTH / 414;
const baseHeightScale = SCREEN_HEIGHT / 890;

const normalize = (size: number, scaleType: 'height' | 'width') => {
  const scale = scaleType === 'height' ? baseHeightScale : baseWidthScale;
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

const widthPixel = (size: number) => normalize(size, 'width');
const heightPixel = (size: number) => normalize(size, 'height');
const fontPixel = heightPixel;

const pixelSizeVertical = heightPixel;
const pixelSizeHorizontal = widthPixel;

export {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
};
