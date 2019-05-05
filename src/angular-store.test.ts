import NgStore from './angularjs-store';

let store: NgStore<typeof state>;
const state = { foo: '', bar: 1, baz: false };

beforeEach(() => {
  store = new NgStore(state);
});

describe('NgStore', () => {
  it('should match the initial state to snapshot', () => {
    expect(store).toMatchSnapshot();
  });

  describe('copy', () => {
    describe('get', () => {
      it('should always return a new copy of state', () => {
        const copies: Array<typeof state> = [];
        for (let i = 0; i < 9; i++) {
          const copy = store.copy();
          expect(copies).not.toContain(copy);
          copies.push(copy);
        }
      });

      it('should return a specific property of state', () => {
        Object.entries(state).forEach(([key, value]) => {
          expect(value).toBe(store.copy(key as keyof typeof state));
        });
      });
    });
  });
});
