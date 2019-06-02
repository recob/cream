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

        let user = await fetchApi(`/surveys`, {
            method: 'POST',
            body: {
                title,
                thumbnail,
                questions: preparedQuestion,
            },
        });

        setStorageUser(user);

        return user;
    } catch (error) {
        throw error;
    }
}
