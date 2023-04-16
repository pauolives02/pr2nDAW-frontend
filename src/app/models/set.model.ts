import { Exercise } from "./exercise.model";

export interface Set {
  id?: string,
  name: string,
  description: string,
  exercises: Array<Exercise>,
  image: string,
  public: boolean,
  finished_xp?: number
  isSubscribed?: boolean
}