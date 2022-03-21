import { createBox, createText, createTheme } from '@shopify/restyle'
import colors from '../tokens/colors'
import fontFamilies from '../tokens/fontFamilies'
import fontSizes from '../tokens/fontSizes'
import fontWeights from '../tokens/fontWeights'
import letterSpacings from '../tokens/letterSpacings'
import lineHeights from '../tokens/lineHeights'
import mediaQueries from '../tokens/mediaQueries'
import radii from '../tokens/radii'
import spacing from '../tokens/spacing'

type Breakpoints =
  | 'zero'
  | 'mobileMax'
  | 'tabletMin'
  | 'tabletMax'
  | 'desktopMin'

type Radii = 'hard' | 'rounded' | 'soft' | 'circle'

type Spacing =
  | 'tiny'
  | 'small'
  | 'medium'
  | 'big'
  | 'large'
  | 'huge'
  | 'cardContent'
  | 'shadow'
  | 'desktopSortControl'

type FontSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph' | 'sub'

type LetterSpacing = 'regular' | 'wide' | 'tight'

function stripPx<K extends string>(dict: { [key in K]: string }) {
  return Object.entries(dict).reduce(
    (acc, [key, value]) => ({
      ...acc,
      // @ts-ignore
      [key]: Number(value.slice(0, -2)),
    }),
    {}
  ) as { [key in K]: number }
}

const theme = createTheme({
  colors,
  spacing: stripPx<Spacing>(spacing),
  breakpoints: stripPx<Breakpoints>(mediaQueries),
  fontFamilies,
  fontSizes: stripPx<FontSize>(fontSizes),
  fontWeights,
  letterSpacings: stripPx<LetterSpacing>(letterSpacings),
  lineHeights,
  radii: stripPx<Radii>(radii),
  textVariants: {
    header: {
      fontFamily: 'Barlow',
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: 42.5,
      color: 'black',
    },
    subheader: {
      fontFamily: 'Barlow',
      fontWeight: '600',
      fontSize: 28,
      lineHeight: 36,
      color: 'black',
    },
    cardHeader: {
      fontFamily: 'Barlow Semi Condensed',
      fontWeight: '600',
      fontSize: 18,
      lineHeight: 28,
      color: 'black',
    },
    body: {
      fontFamily: 'Barlow Semi Condensed',
      fontSize: 16,
      lineHeight: 24,
      color: 'black',
    },
  },
})

export type Theme = typeof theme

export const Box = createBox<Theme>()

export const Text = createText<Theme>()

export default theme
