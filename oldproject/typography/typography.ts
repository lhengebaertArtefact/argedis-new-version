import { KeyValuePair, ResolvableTo } from "tailwindcss/types/config"

export const fontSize: ResolvableTo<
KeyValuePair<
  string,
  | string| [fontSize: string, lineHeight: string]
  | [
    fontSize: string,
    configuration: Partial<{
      lineHeight: string
      letterSpacing: string
      fontWeight: string | number
      fontFeatureSettings: string;
    }>,
  ]
>
> = {
  buttonProducerText: ['28px', { lineHeight: '40px', fontWeight: '700', fontFeatureSettings: "'case' on",  }],
  buttonToggleLangage: [ '24.479px', { lineHeight: 'normal',  fontWeight: '700', }],
  buttonReturnToMap: [ '36px', { lineHeight: '46.64px', letterSpacing: '-0.865px', fontWeight: '700', fontFeatureSettings: "'case' on" }],
  descriptionProducer: ['28px', {lineHeight: '42px', fontWeight: '400',}],
  titleProducer: ['40px', { lineHeight: '48px', fontWeight: '700', }],
  welcomeText: ['60px', { lineHeight: '67px', fontWeight: '700' }],
  welcomeText2: ['36px', { lineHeight: 'normal', fontWeight: '400' }],

}

export const fontFamily = {
  nexaRegular: ['Nexa-Regular'],
  nexaBold: ['Nexa-Bold']
}
