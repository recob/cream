// tslint:disable:max-classes-per-file
export enum QuestionType {
    MULTIPLE = 'MULTIPLE',
    SINGLE = 'SINGLE',
}

export interface OptionSchema {
    value: string;
    id: string;
    right: boolean;
}

export interface QuestionSchema {
    id: string;
    title: string;
    type: QuestionType;
    options: OptionSchema[];
}

export interface DoneSchema {
    done: true;
}

export interface SurveySchema {
    id: string;
    title: string;
    questions: QuestionSchema[];
    thumbnail?: string;
}

class SocketConnect {
    protected socket?: WebSocket;

    constructor(protected url: string) {
    }

    onMessage(cb: (data: any) => void) {
        if (this.socket) {
            this.socket.addEventListener('message', (event) => {
                console.log(event.data);
                cb(JSON.parse(event.data));
            });
        }
    }

    onClose(cb: (error?: boolean) => void) {
        if (this.socket) {
            this.socket.addEventListener('close', (event) => {
                if (event.wasClean) {
                    cb();
                } else {
                    cb(true);
                }
            });
        }
    }
}

class TestSocketConnect extends SocketConnect {
    connect(name: string, pass: string): WebSocket {
        if (!this.socket) {
            this.socket = new WebSocket(`ws://${name}:${pass}@${process.env.REACT_APP_TEST}/${this.url}`);
        }

        return this.socket;
    }

    sendAnswer(id: string, answer: string[]) {
        if (this.socket) {
            this.socket.send(JSON.stringify({id, answer}));
        }
    }

    onMessage(cb: (question: QuestionSchema | DoneSchema) => void) {
        super.onMessage(cb);
    }
}

class DashboardSocketConnect extends SocketConnect {
    connect(): WebSocket {

        if (!this.socket) {
            this.socket = new WebSocket(`ws://${process.env.REACT_APP_TEST}/${this.url}`);
        }

        return this.socket;
    }
}

export const testSocketConnect = new TestSocketConnect('stream');
export const dashboardSocketConnect = new DashboardSocketConnect('dashboard');
