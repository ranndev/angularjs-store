import Hook, { HookCallback, HookMatcher } from './hook';

let hook: Hook<typeof state>;
let matcher: HookMatcher;
let callback: HookCallback<typeof state>;
const state = { foo: '', bar: 1, baz: false };

beforeEach(() => {
  matcher = jest.fn((action: string) => action === 'TEST_ACTION');
  callback = jest.fn();
  hook = new Hook(matcher, callback);
});

describe('Hook', () => {
  describe('run', () => {
    it('should call the callback when action passed to matcher', () => {
      hook.run('TEST_ACTION', state);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not call the callback when action doesn\'t passed in matcher', () => {
      hook.run('FOO_ACTION', state);
      hook.run('BAR_ACTION', state);
      hook.run('BAZ_ACTION', state);
      expect(callback).not.toHaveBeenCalled();
    });

    it('should call the callback when force option enabled even when action doesn\'t passed to matcher', () => {
      hook.run('', state, true);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not call the matcher when force option enabled', () => {
      hook.run('', state, true);
      expect(matcher).not.toHaveBeenCalled();
    });

    it('should call the callback with state and true on the first run', () => {
      hook.run('TEST_ACTION', state);
      expect(callback).toHaveBeenCalledWith(state, true);
    });

    it('should call the callback with state and false on the second run and so forth', () => {
      hook.run('TEST_ACTION', state);
      for (let i = 0; i < 9; i++) {
        hook.run('TEST_ACTION', state);
        expect(callback).toHaveBeenCalledWith(state, false);
      }
    });
  });
});
