export class AnimeSeriesSE {

    private id: number;
    private animeSeriesId: number;
    public season: number;
    public episodes: number;

    constructor(animeSeriesId: number, episodes: number, id: number, season: number) {
        this.id = id;
        this.season = season;
        this.episodes = episodes;
        this.animeSeriesId = animeSeriesId;
    }

}