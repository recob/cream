import * as React from 'react';
import {ControlPanelType} from "../../mobile/ControlPanel/ControlPanel";
import {Question} from "../../mobile/Question/Question";

export interface AppProps {

}

export interface Control {
    title: string;
    id: string;
}

let controls: Control[] = Array.from({length: 5}).map((item, index) => ({
    title: `control: ${index}`,
    id: `id${index}`,
}));

let question = {
    title: 'Is it the real question?',
    type: ControlPanelType.MULTIPLE,
    controls,
};

export class App extends React.Component<AppProps> {

    render() {
        return (
            <Question {...question} />
        );
    }

}