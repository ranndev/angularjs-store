import createStateHolder, { StateHolder } from './state-holder';

describe('StateHolder', () => {
  const state = { foo: '', bar: 1, baz: [''] };
  let stateHolder: StateHolder<typeof state>;

  beforeEach(() => {
    stateHolder = createStateHolder(state);
  });

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
  });
});

describe('StateHolder', () => {
  interface State {
    levelTwoData: {
      levelThreeData: {
        levelFourData: {},
      },
    };
  }

  let stateHolder: StateHolder<State>;

  beforeEach(() => {
    const levelFourData = {};
    const levelThreeData = { levelFourData };
    const levelTwoData = { levelThreeData };

    stateHolder = createStateHolder<State>({ levelTwoData });
  });

  describe('get (default state copier)', () => {
    it('should get a new copy of level two propery', () => {
      const copyOne = stateHolder.get();
      const copyTwo = stateHolder.get();
      expect(copyOne.levelTwoData).not.toBe(copyTwo.levelTwoData);
    });

    it('should get a new copy of level three propery', () => {
      const copyOne = stateHolder.get();
      const copyTwo = stateHolder.get();
      expect(copyOne.levelTwoData.levelThreeData)
        .not.toBe(copyTwo.levelTwoData.levelThreeData);
    });

    it('should get a new copy of level three propery', () => {
      const copyOne = stateHolder.get();
      const copyTwo = stateHolder.get();
      expect(copyOne.levelTwoData.levelThreeData.levelFourData)
        .not.toBe(copyTwo.levelTwoData.levelThreeData.levelFourData);
    });
  });
});
