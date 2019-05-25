import {fetchApi} from '../fetchData';
import {setStorageUser} from '../localStorage';
import {OptionSchema, QuestionSchema, QuestionType} from '../ws';

export interface PreparedOptionSchema {
    value: string;
}

export interface PreparedQuestionSchema {
    title: string;
    type: QuestionType;
    options: PreparedOptionSchema[];
}

interface PreparedSurvey {
    title: string;
    questions: PreparedQuestionSchema[];
    thumbnail: string | null;
}

interface IPrepareOptions {
    options: PreparedOptionSchema[];
    type: QuestionType;
}

function prepareOptions(options: OptionSchema[]): IPrepareOptions {
    let rightOptions = 0;

    return {
        options: options.map(((originalOption) => {
            let {id, ...option} = originalOption;
            rightOptions += +option.right;
            return option;
        })),
        type: rightOptions < 2 ? QuestionType.SINGLE : QuestionType.MULTIPLE,
    };
}

function prepareQuestion(title: string, questions: QuestionSchema[], thumbnail?: string): PreparedSurvey {
    return {
        title,
        thumbnail: thumbnail || null,
        questions: questions.map((originalQuestion) => {
            let {id, ...question} = originalQuestion;

            let {options, type} = prepareOptions(question.options);

            return {
                ...question,
                options,
                type,
            };
        }),
    };
}

export async function postSurvey(title: string, questions: QuestionSchema[], thumbnail?: string) {
    try {
        let preparedQuestion = prepareQuestion(title, questions, thumbnail);

        console.log(preparedQuestion);

        let user = await fetchApi(`/surveys`, {
            method: 'POST',
            body: {
                "title": "Dick Pick",
                "thumbnail": "https://pics.me.me/cuc-check-out-my-dick-pick-2788226.png",
                "questions": [
                    {
                        "title": "pussy 1",
                        "type": "SINGLE",
                        "options": [
                            {
                                "value": "long",
                                "right": false
                            },
                            {
                                "value": "short",
                                "right": true
                            }
                        ]
                    },
                    {
                        "title": "dick",
                        "type": "MULTIPLE",
                        "options": [
                            {
                                "value": "wide",
                                "right": false
                            },
                            {
                                "value": "tall",
                                "right": false
                            },
                            {
                                "value": "dark",
                                "right": true
                            },
                            {
                                "value": "huge",
                                "right": true
                            }
                        ]
                    },
                    {
                        "title": "misha",
                        "type": "SINGLE",
                        "options": [
                            {
                                "value": "novik",
                                "right": true
                            },
                            {
                                "value": "galustyan",
                                "right": false
                            },
                            {
                                "value": "shufutinski",
                                "right": false
                            },
                            {
                                "value": "",
                                "right": false
                            }
                        ]
                    },
                    {
                        "title": "vlad",
                        "type": "MULTIPLE",
                        "options": [
                            {
                                "value": "imirsky central",
                                "right": true
                            },
                            {
                                "value": "korbut",
                                "right": true
                            },
                            {
                                "value": "len",
                                "right": true
                            }
                        ]
                    }
                ]
            },
        });

        setStorageUser(user);

        return user;
    } catch (error) {
        throw error;
    }
}
