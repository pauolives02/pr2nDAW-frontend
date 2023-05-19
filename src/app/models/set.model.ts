import { Exercise } from "./exercise.model";

export interface Set {
  id?: string,
  name: string,
  description: string,
  exercises: [{exercise: Exercise, repetitions: number}],
  image: string,
  public: boolean,
  finished_xp?: number
  isSubscribed?: boolean
}