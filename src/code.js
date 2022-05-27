import { CLOSE, GET_ALL_REQUEST, GET_ALL_RESPONSE, READ_ALL_REQUEST, READ_ALL_RESPONSE } from "./consts";
figma.showUI(__html__);
figma.ui.onmessage = msg => {
    figma.skipInvisibleInstanceChildren = true;
    const frames = figma.currentPage
        .findAllWithCriteria({ types: ['FRAME'] })
        .filter(frame => frame.parent.type === 'PAGE')
        .filter(frame => frame.visible);
    const textToSpeech = [];
    frames.forEach(frame => {
        textToSpeech.push(frame.name);
        const textNodes = frame
            .findAllWithCriteria({ types: ['TEXT'] })
            .filter(node => node.visible)
            .sort((a, b) => Math.round(a.y) - Math.round(b.y))
            .sort((a, b) => Math.round(a.x) - Math.round(b.x));
        textNodes.forEach(n => console.log(n.characters, n.x, n.y));
        const texts = textNodes.map(node => {
            if (node.reactions.length !== 0 && node.reactions) {
                return `Button ${node.characters}`;
            }
            return node.characters;
        });
        textToSpeech.push(texts);
    });
    if (msg === READ_ALL_REQUEST) {
        figma.ui.postMessage({ text: textToSpeech, type: READ_ALL_RESPONSE });
    }
    else if (msg === GET_ALL_REQUEST) {
        figma.ui.postMessage({ text: textToSpeech, type: GET_ALL_RESPONSE });
    }
    else if (msg === CLOSE) {
        figma.closePlugin();
    }
};
