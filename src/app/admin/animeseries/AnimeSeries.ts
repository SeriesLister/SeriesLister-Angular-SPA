export class AnimeSeries {
    id: number;
    englishTitle: string;
    type: string;
    episodes: number;
    seasons: number;
    releaseDate: string;
    finishDate: string;
    imageData: string;
    synopsis: string;

    public constructor(id: number, title: string, type: string, episodes: number, seasons: number = 0, releaseDate: string, finishDate: string, imageData: string, synopsis : string = "") {
        this.id = id;
        this.englishTitle = title;
        this.type = type;
        this.episodes = episodes;
        this.seasons = seasons;
        this.releaseDate = releaseDate;
        this.finishDate = finishDate;
        this.imageData = imageData;
        this.synopsis = synopsis;
    }
}