// tslint:disable:max-classes-per-file
export enum QuestionType {
    MULTIPLE = 'MULTIPLE',
    SINGLE = 'SINGLE',
}

export interface OptionSchema {
    value: string;
    id: string;
    right: boolean;
    userAnswer?: boolean;
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
    connect(host: string, name: string, pass: string): WebSocket {
        if (!this.socket) {
            this.socket = new WebSocket(`wss://${name}:${pass}@${host}/${this.url}`);
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
    connect(host: string, port: number | string): WebSocket {

        if (!this.socket) {
            this.socket = new WebSocket(`wss://${host}:${port}/${this.url}`);
        }

        return this.socket;
    }
}

export enum RemoteDirection {
    UP = 'up',
    DOWN = 'down',
    RIGHT = 'right',
    LEFT = 'left',
}

class RemoteSocketConnect extends SocketConnect {
    constructor(protected url: string) {
        super(url);
    }

    connect(name: string): WebSocket {

        if (!this.socket) {
            this.socket = new WebSocket(`${this.url}/${name}`);
        }

        return this.socket;
    }

    sendAnswer(direction: RemoteDirection) {
        if (this.socket) {
            this.socket.send(JSON.stringify({action: direction}));
        }
    }
}

export const testSocketConnect = new TestSocketConnect('stream');
export const dashboardSocketConnect = new DashboardSocketConnect('dashboard');
export const remoteSocketConnect = new RemoteSocketConnect('wss://presentation.recob.me/control');
