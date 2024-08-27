import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { Ability, AbilityTuple, MongoQuery, subject } from "@casl/ability";
import {
  BoardPartial,
  selectAllBoards,
  selectBoardLoading,
} from "@entities/board";
import { selectAllUsers, User, UserPreviewComponent } from "@entities/user";
import { AvatarListComponent } from "@entities/user/ui/avatar-list/avatar-list.component";
import { BoardListAbilityService } from "@features/board-list/model/board-list-ability.service";
import { Store } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { ROUTER_PATHS } from "@shared/constants";
import { Observable, Subscription } from "rxjs";
import { UpdateBoardButtonComponent } from "../update-board-button/update-board-button.component";
import { SpinnerComponent } from "@shared/ui/spinner";
import { RemoveBoardButtonComponent } from "../remove-board-button/remove-board-button.component";

@Component({
  selector: "app-board-list",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    UserPreviewComponent,
    AvatarListComponent,
    UpdateBoardButtonComponent,
    RemoveBoardButtonComponent,
    SpinnerComponent,
  ],
  providers: [BoardListAbilityService],
  templateUrl: "./board-list.component.html",
  styleUrl: "./board-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListComponent implements OnDestroy {
  public boards$: Observable<BoardPartial[]>;
  public boardsLoading$: Observable<boolean>;
  public users$: Observable<User[]>;
  public userMap: Map<string, User> = new Map();

  private subscription = new Subscription();
  private abilities?: Ability<AbilityTuple, MongoQuery>;

  public constructor(
    private store: Store,
    public boardListAbility: BoardListAbilityService,
    public cdr: ChangeDetectorRef,
  ) {
    this.boards$ = this.store.select(selectAllBoards);
    this.boardsLoading$ = this.store.select(selectBoardLoading);
    this.users$ = this.store.select(selectAllUsers);
    this.subscription.add(
      this.users$.subscribe(users => {
        users.map(user => this.userMap.set(user.id, user));
        this.cdr.markForCheck();
      }),
    );
    this.subscription.add(this.listenBoardAbilities());
  }

  public getBoardUrl(boardId: string): string {
    return ["/", ROUTER_PATHS.BOARD.replace(":id", boardId)].join("");
  }

  public getAvatarIds(board: BoardPartial): string[] {
    return board.editorsIds.map(id => this.userMap.get(id)!.avatarId);
  }

  public listenBoardAbilities(): Subscription {
    return this.boardListAbility.ability$.subscribe(abilities => {
      this.abilities = abilities;
      this.cdr.markForCheck();
    });
  }

  public canUpdateBoard(board: BoardPartial): boolean {
    return (
      this.abilities?.can(
        "update",
        subject("Board", { ownerId: board.ownerId }),
      ) ?? false
    );
  }

  public canDeleteBoard(board: BoardPartial): boolean {
    return (
      this.abilities?.can(
        "delete",
        subject("Board", { ownerId: board.ownerId }),
      ) ?? false
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
