export default interface IAnime {
  title_en: string;
  title_jp: string;
  done_airing: boolean;
  start_date: Date;
  end_date: Date;
  rank: number;
  synopsis: string;
  total_episodes: number;
}
