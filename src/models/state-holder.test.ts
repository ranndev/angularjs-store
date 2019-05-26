import createStateHolder, { StateHolder } from './state-holder';

const state = { foo: '', bar: 1, baz: [''] };
let stateHolder: StateHolder<typeof state>;

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
        const copy = stateHolder.get();
        expect(copies).not.toContain(copy);
        copies.push(copy);
      }
    });
  });

  describe('set', () => {
    it('should support updating state partially', () => {
      const partialStates: Array<Partial<typeof state>> = [
        { foo: 'bar' },
        { foo: 'baz', bar: 100 },
        { foo: 'fuz', bar: 200, baz: [] },
      ];

      partialStates.forEach((partialState) => {
        stateHolder.set(partialState);
        expect(stateHolder.get()).toEqual({ ...state, ...partialState });
      });
    });

    it('should not add excess property', () => {
      stateHolder.set({ excessProperty: true } as Partial<typeof state>);
      expect(stateHolder.get()).not.toHaveProperty('excessProperty');
    });

    it('should not merge an array property', () => {
      stateHolder.set({ baz: ['a', 'b', 'c'] });
      expect(stateHolder.get()).toEqual(
        expect.objectContaining({ baz: ['a', 'b', 'c'] }),
      );

      stateHolder.set({ baz: ['a', 'b'] });
      expect(stateHolder.get()).toEqual(
        expect.objectContaining({ baz: ['a', 'b'] }),
      );
    });

    it('should user the copier when provided', () => {
      const customState = { foo: 'bar', bar: 'foo' };
      const customCopier = jest.fn(() => ({ foo: 'foo', bar: 'bar' }));
      const customStateHolder = createStateHolder(customState, customCopier);

      customStateHolder.set({ foo: 'aaa', bar: 'aaa' });
      expect(customCopier).toHaveBeenCalledTimes(1);
      expect(customStateHolder.get()).toEqual({ foo: 'foo', bar: 'bar' });
    });
  });
});
