import { DatePipe } from '@angular/common';

export class AnimeSeries {
    id: number;
    englishTitle: string;
    type: string;
    episodes: number;
    releaseDate: Date;
    finishDate: Date;

    public constructor(id: number, title: string, type: string, episodes: number, releaseDate: Date, finishDate: Date) {
        this.id = id;
        this.englishTitle = title;
        this.type = type;
        this.episodes = episodes;
        this.releaseDate = releaseDate;
        this.finishDate = finishDate;
    }
    
}