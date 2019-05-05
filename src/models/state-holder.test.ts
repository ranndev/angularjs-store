import StateHolder, { create } from './state-holder';

const state = { foo: '', bar: 1, baz: false };
let stateHolder: StateHolder<typeof state>;

beforeEach(() => {
  stateHolder = create(state);
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
    it.each<[Partial<typeof state>]>([
      [{ foo: 'bar' }],
      [{ foo: 'baz', bar: 100 }],
      [{ foo: 'fuz', bar: 200, baz: true }],
    ])('should support updating state partially', (partialState) => {
      stateHolder.set(partialState);
      expect(stateHolder.get()).toEqual({ ...state, ...partialState });
    });
  });
});
