import { Injectable, OnDestroy } from "@angular/core";
import { Ability, AbilityBuilder } from "@casl/ability";
import { AbilityService } from "@casl/angular";
import { selectCurrentSession } from "@entities/session";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";

@Injectable()
export class UsersListAbilityService implements OnDestroy {
  public subscription = new Subscription();
  public ability$: Observable<Ability>;

  public constructor(
    private ability: Ability,
    private store: Store,
    private abilityService: AbilityService<Ability>,
  ) {
    const currentSession$ = this.store.select(selectCurrentSession);
    this.ability$ = this.abilityService.ability$;
    this.subscription.add(
      currentSession$.subscribe(session => {
        const { can, rules } = new AbilityBuilder(Ability);
        if (!session) {
          return;
        }

        can("read", "User");

        if (session.role === "admin") {
          can("create", "User");
          can("delete", "User", {
            id: { $ne: session.userId },
          });
        }
        this.ability.update(rules);
        console.log(this.ability);
      }),
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
