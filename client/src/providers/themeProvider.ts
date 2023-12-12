import {
  createTheme,
  PaletteColorOptions,
} from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomPalette {
    anger: PaletteColorOptions;
    apple: PaletteColorOptions;
    steelBlue: PaletteColorOptions;
    violet: PaletteColorOptions;
    button: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    anger: true;
    apple: true;
    steelBlue: true;
    violet: true;
    button: true;
  }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor : any) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    anger: createColor('#F40B27'),
    apple: createColor('#5DBA40'),
    steelBlue: createColor('#5C76B7'),
    violet: createColor('#BC00A3'),
    button: createColor('#002D72')
  },
});

export default theme;