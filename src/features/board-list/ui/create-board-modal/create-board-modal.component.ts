import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { createBoard, CreateBoardData } from "@entities/board";
import { selectCurrentSession } from "@entities/session";
import { selectAllUsers, User } from "@entities/user";
import { Store } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonComponent } from "@shared/ui/button";
import { ModalComponent } from "@shared/ui/modal";
import { MultiselectComponent } from "@shared/ui/multiselect";
import { TextFieldComponent } from "@shared/ui/text-field";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-create-board-modal",
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    TranslateModule,
    ButtonComponent,
    TextFieldComponent,
    MultiselectComponent,
    ReactiveFormsModule,
    MultiselectComponent,
  ],
  templateUrl: "./create-board-modal.component.html",
  styleUrl: "./create-board-modal.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBoardModalComponent implements OnDestroy {
  @Input()
  isModalVisible = false;

  @Output()
  onModalClose = new EventEmitter();

  public newBoardForm: FormGroup;

  private subscription = new Subscription();
  public userSelection$: Observable<User[]>;
  public constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.userSelection$ = this.store.select(selectAllUsers);

    this.newBoardForm = this.fb.group({
      name: new FormControl(null, Validators.required),
      ownerId: new FormControl(null),
      editorsIds: new FormControl<string[]>([]),
    });

    this.subscription.add(
      this.store.select(selectCurrentSession).subscribe(session => {
        if (!session) {
          return;
        }
        this.newBoardForm.controls.ownerId.setValue(session.userId);
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public create() {
    this.newBoardForm.markAllAsTouched();
    if (this.newBoardForm.valid) {
      let editorIds: string[] = [];
      if (this.newBoardForm.controls.editorsIds) {
        editorIds = (this.newBoardForm.controls.editorsIds.value as User[]).map(
          editor => editor.id,
        );
      }
      const newBoardData: CreateBoardData = {
        ...this.newBoardForm.value,
        editorsIds: editorIds,
      };
      this.store.dispatch(createBoard({ data: newBoardData }));
      this.onModalClose.emit();
    }
  }
}
