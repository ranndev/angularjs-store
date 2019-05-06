import createStateHolder, { IStateHolder } from './state-holder';

const state = { foo: '', bar: 1, baz: false };
let stateHolder: IStateHolder<typeof state>;

beforeEach(() => {
  stateHolder = createStateHolder(state);
});

describe('StateHolder', () => {
  it('should match the initial state to snapshot', () => {
    expect(stateHolder).toMatchSnapshot();
  });

  describe('get', () => {
    it('should always return a new copy of state', () => {
      const copies: Array<typeof state> = [];
      for (let i = 0; i < 9; i++) {
        const copy = stateHolder.get() as typeof state;
        expect(copies).not.toContain(copy);
        copies.push(copy);
      }
    });

    it('should return a specific property state', () => {
      Object.entries(state).forEach(([key, value]) => {
        expect(value).toBe(stateHolder.get(key as keyof typeof state));
      });
    });
  });

  describe('set', () => {
    it('should support updating state partially', () => {
      const partialStates: Array<Partial<typeof state>> = [
        { foo: 'bar' },
        { foo: 'baz', bar: 100 },
        { foo: 'fuz', bar: 200, baz: true },
      ];

      partialStates.forEach((partialState) => {
        stateHolder.set(partialState);
        expect(stateHolder.get()).toEqual({ ...state, ...partialState });
      });
    });
  });
});
