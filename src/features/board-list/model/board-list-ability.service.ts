import { Injectable, OnDestroy } from "@angular/core";
import { Ability, AbilityBuilder } from "@casl/ability";
import { AbilityService } from "@casl/angular";
import { selectCurrentSession } from "@entities/session";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";

@Injectable()
export class BoardListAbilityService implements OnDestroy {
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

        can("delete", "Board", {
          ownerId: session.userId,
        });

        can("update", "Board", {
          ownerId: session.userId,
        });
        this.ability.update(rules);
      }),
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
