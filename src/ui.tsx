import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { flatten } from 'lodash'
import './ui.css'
import {
    CLOSE,
    CLOSE_PLUGIN_KEY,
    GET_ALL_REQUEST,
    GET_ALL_RESPONSE,
    INSTRUCTIONS,
    NEXT_ELEMENT_KEY,
    PREVIOUS_ELEMENT_KEY,
    READ_ALL_KEY,
    READ_ALL_REQUEST,
    READ_ALL_RESPONSE,
    READ_SEPARATE_KEY,
    WELCOME_MESSAGE
} from './consts'
import { initTextToSpeech } from './text-to-speech'

const App = () => {
    const [elements, setElements] = React.useState([])
    const [singleMode, setSingleMode] = React.useState(false)
    const [word, setWord] = React.useState('')
    const [textToSpeech, setTextToSpeech] = React.useState<any>()
    const speechSynthesis = window.speechSynthesis

    let currentIndex = 0
    const readElement = async (index) => {
        const readableText = elements[index]
        textToSpeech(readableText)
        setWord(readableText)
    }

    React.useEffect(() => {
        const onKeyDown = (e) => {
            switch (e.code) {
                case READ_ALL_KEY:
                    speechSynthesis.speaking && speechSynthesis.cancel()
                    parent.postMessage({ pluginMessage: READ_ALL_REQUEST }, '*')
                    break;
                case READ_SEPARATE_KEY:
                    speechSynthesis.speaking && speechSynthesis.cancel()
                    parent.postMessage({ pluginMessage: GET_ALL_REQUEST }, '*')
                    break;
                case NEXT_ELEMENT_KEY:
                    speechSynthesis.speaking && speechSynthesis.cancel()
                    singleMode && readElement(++currentIndex)
                    break;
                case PREVIOUS_ELEMENT_KEY:
                    speechSynthesis.speaking && speechSynthesis.cancel()
                    singleMode && readElement(--currentIndex)
                    break;
                case CLOSE_PLUGIN_KEY:
                    speechSynthesis.cancel()
                    parent.postMessage({ pluginMessage: CLOSE }, '*')
                    break;
                default:
                    console.log()
            }
        }

        document.addEventListener('keydown', onKeyDown);

        window.onmessage = (msg) => {
            const type = msg.data.pluginMessage.type
            if (type === READ_ALL_RESPONSE) {
                textToSpeech(msg.data.pluginMessage.text)
            } else if (type === GET_ALL_RESPONSE) {
                const response = flatten(msg.data.pluginMessage.text)
                textToSpeech(INSTRUCTIONS).addEventListener('end', () => {
                    speechSynthesis.cancel()
                    setElements(response)
                    setSingleMode(true)
                })
            }
        }
        elements.length !== 0 && readElement(0)
    }, [elements, singleMode, textToSpeech])

    React.useEffect(() => {
        const init = async () => {
            const TTS = await initTextToSpeech()
            setTextToSpeech(() => TTS)
            setTimeout(() => {
                TTS(WELCOME_MESSAGE)
            }, 3000)
        }
        init()
    }, [])

    return (<div>
        <h2>Accessiblity+</h2>
        <h3 hidden={word.length === 0}>Now reading: </h3>
        <h4>{word}</h4>
    </div>)
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.createRoot(document.getElementById('react-page')).render(<App />)
    document.getElementById('react-page').focus()
});

