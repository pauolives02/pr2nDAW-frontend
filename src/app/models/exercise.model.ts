export interface Exercise {
  id?: string,
  name: string,
  description: string,
  image: string,
  finished_xp: number,
  public: boolean,
  isSubscribed?: boolean
}