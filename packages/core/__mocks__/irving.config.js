import React from 'react';
import { takeLatest, takeEvery } from 'redux-saga/effects';

export default {
  packages: [
    {
      reducers: () => ({
        packageSlice: () => {},
        testSlice: () => {},
      }),
      sagas: () => ([
        takeLatest('TEST_ACTION', () => {}),
        takeLatest('TEST_ACTION_TWO', () => {}),
      ]),
      getAppTemplateVars: (templateVars) => {
        const { Wrapper } = templateVars;

        return {
          Wrapper: () => (
            <div data-testid="wrapper-two">
              <Wrapper />
            </div>
          ),
          head: {
            start: '<script>const anotherTest = 200;</script>',
            link: ['<link rel="stylesheet" href="css/test.css" />'],
            meta: [() => '<meta name="keywords" content="this, is, a, test" />'],
            script: [],
          },
        };
      },
    },
    {
      getAppTemplateVars: {
        head: () => ({
          end: 'Nascetur sodales nostra',
        }),
      },
    },
  ],
  defaultState: {
    testState: true,
  },
  getAppTemplateVars: (templateVars) => {
    const { Wrapper } = templateVars;

    return {
      testVal: 'this is a fun field for the app',
      Wrapper: () => (
        <div data-testid="wrapper-one">
          <Wrapper />
        </div>
      ),
      head: {
        start: ['<script>const test = 100;</script>'],
        link: ['<link rel="stylesheet" href="css/lorem.css" />'],
        meta: [() => '<meta name="description" content="lorem ipsum dolor sit amet" />'],
      },
    };
  },
  getErrorTemplateVars: {
    testVal: 'this is a fun field for the error',
    head: () => ({
      script: '<script>this is another script</script>',
    }),
  },
  trailingSlashDenylist: [
    '/do/not/trailing/slash/me',
  ],
  reducers: {
    userSlice: () => {},
    testSlice: () => {},
  },
  sagas: () => ([
    takeEvery('TEST_ACTION_THREE', () => {}),
  ]),
  testFun: jest.fn((initial, additionalArg1) => ({})),
  preloadedStateDenylist: [
    {
      key: 'test.nested.state',
      rehydrationFunction: () => 'rehydrated',
    },
  ],
};
