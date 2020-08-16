import { AnimeSeriesSE } from './anime-series-se';
import { Picture } from './picture';

export class AnimeSeries {
    id: number;
    englishTitle: string;
    japaneseName: string;
    type: string;
    releaseDate: string;
    finishDate: string;
    synopsis: string;
    imageData: string;
    seasonEpisodes: [AnimeSeriesSE];
    picture: Picture;

    public constructor(id: number, englishTitle: string, japaneseName: string, type: string, releaseDate: string, finishDate: string, synopsis : string, picture: Picture, animeSeriesSEs: [AnimeSeriesSE]) {
        this.id = id;
        this.englishTitle = englishTitle;
        this.type = type;
        this.japaneseName = japaneseName;
        this.releaseDate = releaseDate;
        this.finishDate = finishDate;
        this.synopsis = synopsis;
        this.seasonEpisodes = animeSeriesSEs;
        this.picture = picture;
    }
}