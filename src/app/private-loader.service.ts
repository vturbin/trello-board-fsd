import { Injectable } from "@angular/core";
import { loadBoards } from "@entities/board";
import { loadTasks } from "@entities/task";
import { loadUsers } from "@entities/user";
import { Store } from "@ngrx/store";

@Injectable({ providedIn: "root" })
export class PrivateLoaderService {
  public constructor(private store: Store) {}

  public loadAll(): void {
    this.store.dispatch(loadUsers());
    this.store.dispatch(loadBoards());
    this.store.dispatch(loadTasks());
  }
}
