import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { BoardPartial, updateBoard, UpdateBoardData } from "@entities/board";
import { selectAllUsers, User } from "@entities/user";
import { Store } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonComponent } from "@shared/ui/button";
import { DropdownComponent } from "@shared/ui/dropdown";
import { ModalComponent } from "@shared/ui/modal";
import { MultiselectComponent } from "@shared/ui/multiselect";
import { TextFieldComponent } from "@shared/ui/text-field";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-update-board-modal",
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
    DropdownComponent,
  ],
  templateUrl: "./update-board-modal.component.html",
  styleUrl: "./update-board-modal.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateBoardModalComponent implements OnInit, OnDestroy {
  @Input()
  isModalVisible = false;

  @Input({ required: true })
  board!: BoardPartial;

  @Output()
  onModalClose = new EventEmitter();

  public updateBoardForm: FormGroup;

  public userSelection$: Observable<User[]>;

  private subscription = new Subscription();

  public constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.userSelection$ = this.store.select(selectAllUsers);

    this.updateBoardForm = this.fb.group({
      name: new FormControl(null, Validators.required),
      ownerId: new FormControl(null),
      editorsIds: new FormControl<string[]>([]),
    });
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.userSelection$.subscribe(users => {
        this.updateBoardForm.setValue({
          name: this.board.name,
          ownerId: users.find(user => user.id === this.board.ownerId),
          editorsIds: users.filter(user =>
            this.board.editorsIds.includes(user.id),
          ),
        });
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public update() {
    this.updateBoardForm.markAllAsTouched();
    if (this.updateBoardForm.valid) {
      let editorIds: string[] = [];
      if (this.updateBoardForm.controls.editorsIds) {
        editorIds = (
          this.updateBoardForm.controls.editorsIds.value as User[]
        ).map(editor => editor.id);
      }
      const ownerId = (this.updateBoardForm.controls.ownerId.value as User).id;
      const newBoardData: UpdateBoardData = {
        name: this.updateBoardForm.controls.name.value,
        ownerId,
        editorsIds: editorIds,
      };
      this.store.dispatch(
        updateBoard({ id: this.board.id, data: newBoardData }),
      );
      this.onModalClose.emit();
    }
  }
}
