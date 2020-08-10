import { State } from './state';
import Collection from './collection';
import Computed from './computed';

export type StateObj = { [key: string]: State | Computed };
export type FuncObj = { [key: string]: () => any };

export interface ControllerConfig<S, C, A, H, R> {
  name?: string;
  state: S;
  collection: C;
  actions: A;
  helpers: H;
  routes: R;
}

export class Controller<S = StateObj, C = Collection, A = FuncObj, H = FuncObj, R = FuncObj> {
  public name?: string;

  public state: this['config']['state'] & StateObj;
  public collection: this['config']['collection'];
  public actions: this['config']['actions'] & FuncObj;
  public helpers: this['config']['helpers'] & FuncObj;
  public routes: this['config']['routes'] & FuncObj;

  public config: ControllerConfig<S, C, A, H, R>;

  constructor(config: Partial<ControllerConfig<S, C, A, H, R>>, spreadToRoot?: any) {
    this.config = config as Required<ControllerConfig<S, C, A, H, R>>;

    for (const propertyName in spreadToRoot) this[propertyName] = spreadToRoot[propertyName];

    for (const sectionName in this.config) {
      this[sectionName] = this.config[sectionName];
    }

    this.applyKeys();
  }
  private applyKeys() {
    for (const name in this.state as StateObj) if (name && this.state[name] instanceof State) this.state[name].key(name);
  }
}
