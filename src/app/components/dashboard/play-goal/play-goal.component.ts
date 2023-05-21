import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DailyGoalService } from 'src/app/services/dailyGoal.service';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageModalService } from 'src/app/services/messageModal.service';

@Component({
  selector: 'app-play-goal',
  templateUrl: './play-goal.component.html',
  styleUrls: ['./play-goal.component.scss']
})
export class PlayGoalComponent implements OnInit {

  type: string
  goalId: string
  goal: any
  exerciseImgUrl: string = environment.apiUrl + '/api/exercise/get-image/'
  steps: any[] = []
  step: number = 0
  currentExercise: any
  form: FormGroup

  constructor(
    private route: ActivatedRoute,
    private dailyGoalService: DailyGoalService,
    private messageModalService: MessageModalService,
    private router: Router,
  ) {
    this.route.params.subscribe(params => {
      this.goalId = params['id']
      this.type = params['type']
    })
  }

  ngOnInit() {
    this.form = new FormGroup({
      ammount: new FormControl(1, [Validators.required, Validators.min(1)]),
    })
    
    this.getGoal()
  } 

  getGoal() {
    this.dailyGoalService.getDailyGoalById(this.goalId).subscribe({
      next: (result: any) => {
        this.goal = result

        this.setSteps()

        this.currentExercise = this.steps[0]
        this.updateForm()
      },
      error: () => this.router.navigate(['/dashboard'])
    })
  }

  setSteps() {
    this.steps = []
    if (this.goal.subscriptionType === 'Exercise') {
      this.steps.push({
        exercise: this.goal.subscription,
        repetitions: this.goal.repetitions
      })
    } else {
      this.goal.subscription.exercises.forEach(e => {
        this.steps.push({
          exercise: e.exercise,
          repetitions: e.repetitions
        })
      })
    }
  }

  changeStep(next) {
    if (next) {
      this.step += 1
    } else {
      this.step -= 1
    }

    this.currentExercise = this.steps[this.step]
    this.updateForm()
  }

  updateForm() {
    const min = this.goal.finished_exercises[this.step] != 0 ? this.goal.finished_exercises[this.step] : 1
    this.form.get('ammount').setValidators([Validators.min(min), Validators.max(this.currentExercise.repetitions)])
    this.form.get('ammount').setValue(this.goal.finished_exercises[this.step])
  }

  saveProgress() {
    if (this.form.valid) {
      this.dailyGoalService.updateGoal(this.goal.id, this.form.value.ammount, this.step).subscribe({
        next: (result: any) => {
          this.messageModalService.openModal(result.msg, 1)
          if (result.completed) {
            this.router.navigate(['/dashboard'])
          } else {
            this.goal = result.dailyGoal
            this.setSteps()
            this.currentExercise = this.steps[this.step]
            this.updateForm()
          }
        }
      })
    }
  }
}
