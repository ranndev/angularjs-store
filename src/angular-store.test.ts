import NgStore, { HookActionQuery } from './angularjs-store';
import { HookCallback } from './models/hook';
import HookLink from './models/hook-link';

let store: NgStore<typeof state>;
const state = { foo: '', bar: 1, baz: false };
const validQueries: HookActionQuery[] = [
  'TEST_ACTION',
  ['TEST_ACTION', 'SOME_ACTION'],
  /^TEST_ACTION$/,
];

beforeEach(() => {
  store = new NgStore(state);
});

describe('NgStore', () => {
  it('should match the initial state to snapshot', () => {
    expect(store).toMatchSnapshot();
  });

  describe('copy', () => {
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

  describe('hook', () => {
    it('should accept string query', () => {
      expect(() => {
        store.hook('FOO_BAR', jest.fn());
      }).not.toThrow();
    });

    it('should accept array query', () => {
      expect(() => {
        store.hook(['FOO_BAR', 'FOO_BAZ'], jest.fn());
      }).not.toThrow();
    });

    it('should accept regular expression query', () => {
      expect(() => {
        store.hook(/^FOO_BAR$/, jest.fn());
      }).not.toThrow();
    });

    it('should throw on invalid type of query', () => {
      const invalidQueries = [0, false, null, undefined, {}, (arg: any) => arg];
      invalidQueries.forEach((query: HookActionQuery) => {
        expect(() => {
          store.hook(query, jest.fn());
        }).toThrow();
      });
    });

    it('should run the callback once after register the hook', () => {
      validQueries.forEach((query) => {
        const callback = jest.fn();
        store.hook(query, callback);
        expect(callback).toHaveBeenCalledTimes(1);
      });
    });

    it('should return a HookLink instance', () => {
      validQueries.forEach((query) => {
        const callback = jest.fn();
        expect(store.hook(query, callback)).toBeInstanceOf(HookLink);
      });
    });

    it('shoud destroy by using the returned hook link', () => {
      const callbacks: Array<HookCallback<typeof state>> = [];
      const hookLinks: HookLink[] = [];

      validQueries.forEach((query) => {
        const callback = jest.fn();
        const hookLink = store.hook(query, callback);

        callbacks.push(callback);
        hookLinks.push(hookLink);
      });

      store.dispatch('TEST_ACTION', state);

      callbacks.forEach((callback) => {
        expect(callback).toHaveBeenCalledTimes(2);
      });

      hookLinks.forEach((hookLink) => {
        hookLink.destroy();
      });

      store.dispatch('TEST_ACTION', state);

      callbacks.forEach((callback) => {
        expect(callback).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('dispatch', () => {
    it('should update the state', () => {
      store.dispatch('', { foo: 'bar' });
      store.dispatch('', () => ({ bar: 2 }));
      store.dispatch('', { baz: true });
      expect(store.copy()).toEqual({ foo: 'bar', bar: 2, baz: true });
    });

    it('should notify the hook when action match the query', () => {
      const hookCallback = jest.fn();
      store.hook('TEST_ACTION', hookCallback);
      store.dispatch('TEST_ACTION', state);
      expect(hookCallback).toHaveBeenCalledTimes(2);
    });

    it('should notify the hook with updated state', () => {
      const hookCallback = jest.fn();
      store.hook('TEST_ACTION', hookCallback);
      store.dispatch('TEST_ACTION', { foo: 'bar' });
      expect(hookCallback).toHaveBeenLastCalledWith({ ...state, foo: 'bar' }, false);
    });
  });
});
