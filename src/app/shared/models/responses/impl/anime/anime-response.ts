import { BasicResponse } from '../../basic-response';
import { AnimeService } from '@app/core/services/online/admin/impl/anime.service';
import { AnimeSeries } from '@app/shared/models/AnimeSeries';

export interface AnimeResponse extends BasicResponse {
    animeSeries: AnimeSeries;
}