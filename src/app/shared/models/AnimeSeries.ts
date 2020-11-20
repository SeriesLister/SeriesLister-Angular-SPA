import { SeasonsEpisodes } from './seasons-episodes';
import { Picture } from './picture';

export class AnimeSeries {
    id: number;
    englishTitle: string;
    japaneseName: string;
    type: string;
    releaseDate: string;
    finishDate: string;
    synopsis: string;
    seasonsEpisodes: SeasonsEpisodes[];
    picture: Picture;

    public constructor(id: number, englishTitle: string, japaneseName: string, type: string, releaseDate: string, finishDate: string, synopsis : string, picture: Picture, seasonsEpisodes: SeasonsEpisodes[]) {
        this.id = id;
        this.englishTitle = englishTitle;
        this.type = type;
        this.japaneseName = japaneseName;
        this.releaseDate = releaseDate;
        this.finishDate = finishDate;
        this.synopsis = synopsis;
        this.picture = picture;
        this.seasonsEpisodes = seasonsEpisodes;
    }
}