import * as React from 'react';
import {Link} from '@reach/router';
import {postStart} from '../../../../utils/api/postStart';
import {QuestionSchema} from '../../../../utils/ws';

import './survey.scss';

export interface SurveyProps {
    id: string;
    title: string;
    questions: QuestionSchema[];
    thumbnail?: string;
}

export const Survey: React.FC<SurveyProps> =
    function Survey({id, title, questions, thumbnail}: SurveyProps) {
        return (
            <div className="survey-teaser-wrap">
                <div className="survey-teaser">
                    <Link
                        className="survey-teaser_link"
                        to={`/surveys/${id}`}
                        onClick={(event) => {
                            postStart();
                        }}
                    >
                    </Link>
                    {thumbnail && (
                        <div className="survey-teaser_thumb">
                            <img className="survey-teaser_image" src={thumbnail} alt={title} />
                        </div>
                    )}
                    <h3>{title}</h3>
                    <p>{questions.length} questions</p>
                </div>
            </div>
        );
    };
