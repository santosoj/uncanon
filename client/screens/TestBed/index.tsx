import { View } from 'react-native'
import { RenderHTML } from 'react-native-render-html'

const source = {
  html: `
  <div style="display: flex; flex-direction: row;">
    <div>
      <h1>Sator</h1>
      <h2>Arepo</h2>
      <h3>Tenet</h3>
      <h4>Opera</h4>
      <h5>Rotas</h5>
      <h6>Forh zu sein bedarf es wenig</h6>
      <p>Lorem ipsum dolor sit amet</p>
    </div>
    <div>
      <h1 style="font-family: 'Barlow';">Sator</h1>
      <h2 style="font-family: 'Barlow';">Arepo</h2>
      <h3 style="font-family: 'Barlow';">Tenet</h3>
      <h4 style="font-family: 'Barlow';">Opera</h4>
      <h5 style="font-family: 'Barlow';">Rotas</h5>
      <h6 style="font-family: 'Barlow';">Forh zu sein bedarf es wenig</h6>
      <p style="font-family:Barlow Semi Condensed">Lorem ipsum dolor sit amet</p>
    </div>
  </div>
`,
}

const systemFonts = ['Barlow', 'Barlow Semi Condensed']

const tagsStyles = {
  body: { fontFamily: 'Barlow Semi Condensed' },
  h1: { fontFamily: 'Barlow' },
  h2: { fontFamily: 'Barlow' },
  h3: { fontFamily: 'Barlow' },
  h4: { fontFamily: 'Barlow' },
  h5: { fontFamily: 'Barlow' },
  h6: { fontFamily: 'Barlow' },
}

function TestBed() {
  return (
    <View>
      <RenderHTML
        contentWidth={500}
        source={source}
        systemFonts={['Barlow', 'Barlow Semi Condensed']}
        tagsStyles={tagsStyles}
      />
    </View>
  )
}

export default TestBed
