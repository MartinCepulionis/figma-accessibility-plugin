const getAllVoices = (speechSynthesis) => {
    return new Promise((resolve) => {
        setInterval(() => {
            if (speechSynthesis.getVoices().length !== 0) {
                resolve(speechSynthesis.getVoices());
            }
        }, 10);
    })
}

const getVoiceByLanguage = (voices) => {
    const language = navigator.language
    const voiceByLang = voices.filter(voice => voice.lang === language)
    const defaultVoice = voices.filter(voice => voice.name === 'Alex')[0]
    return voiceByLang.length === 0 ? defaultVoice : voiceByLang[0]
}

const textToSpeech = ({speechSynthesis, text, voice}) => {
    const textToSpeak = new SpeechSynthesisUtterance(text);
    textToSpeak.rate = 0.9
    textToSpeak.voice = voice
    speechSynthesis.speak(textToSpeak);
    return textToSpeak
}

export const initTextToSpeech = async () => {
    const speechSynthesis = window.speechSynthesis
    const voices = await getAllVoices(speechSynthesis)
    const voice = getVoiceByLanguage(voices)
    return (text) => textToSpeech({speechSynthesis, text, voice})
}