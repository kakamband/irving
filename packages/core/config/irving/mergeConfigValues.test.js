import { mergeConfigValues } from './mergeConfigValues';

describe('mergeConfigValues', () => {
  it(
    'should merge config arrays together',
    () => {
      const configs = [
        ['test'],
        ['test-two'],
      ];

      expect(mergeConfigValues(configs, [])).toEqual([
        'test',
        'test-two',
      ])
    }
  );

  it(
    'should deeply merge config objects together',
    () => {
      const configs = [
        {
          configField: ['test', 'test-two'],
          secondField: 'this is a value',
        },
        { configField: ['test-three', 'test-four'] },
      ];

      expect(mergeConfigValues(configs, {})).toEqual({
        configField: [
          'test',
          'test-two',
          'test-three',
          'test-four',
        ],
        secondField: 'this is a value',
      })
    }
  );

  it(
    'should call functions provided as the config and assume user returns a new config.',
    () => {
      const configs = [
        (config) => { return {...config, foo: 'bar' }},
        (config) => { return {...config, bing: 'bong' }},
      ];

      expect(mergeConfigValues(configs, { foo: 'foo' })).toEqual({
        foo: 'bar',
        bing: 'bong',
      })
    }
  );

  it(
    'should concat together an array of function if initial value is an array with a function as its first element',
    () => {
      const configs = [
        (config) => { return {...config, foo: 'bar' }},
        (config) => { return {...config, bing: 'bong' }},
      ];
      const merged = mergeConfigValues(configs, [() => ({ test: 'test' })]);
      const result = merged.reduce(
        (acc, func) => ({ ...acc, ...func(acc) }),
        {}
      );

      expect(result).toEqual({
        test: 'test',
        foo: 'bar',
        bing: 'bong',
      })
    }
  );
});