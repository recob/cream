/* tslint:disable */
let socket: WebSocket = new WebSocket('ws://localhost:8080/stream');

export enum QuestionType {
    MULTIPLE = 'MULTIPLE',
    SINGLE = 'SINGLE',
}

export interface OptionSchema {
    value: string;
    id: string;
}

export interface QuestionSchema {
    questionId: number;
    title: string;
    type: QuestionType;
    options: OptionSchema[];
}

export const onMessage = (cb: (question: QuestionSchema) => void) => {
    socket.addEventListener('message', (event) => {
        cb(JSON.parse(event.data));
    });
};

export const onClose = (cb: (error?: boolean) => void) => {
    socket.addEventListener('close', (event) => {
        if (event.wasClean) {
            cb()
        } else {
            cb(true);
        }
    })
};

export const sendAnswer = (questionId: number, answer: string | number) => {
    console.log(({questionId, answer}));
    socket.send(JSON.stringify({questionId, answer}));
};
