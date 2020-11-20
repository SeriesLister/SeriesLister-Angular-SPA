import { BasicResponse } from '../../basic-response';
import { AnimeSeries } from '@app/shared/models/AnimeSeries';

export interface AnimeListedResponse extends BasicResponse {

    animeSeries: [AnimeSeries];
    totalPages: number;

}