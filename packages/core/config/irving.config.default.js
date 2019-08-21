import Body from 'components/body';
import Head from 'components/head';
import Image from 'components/image/image';
import RawHTML from 'components/rawHTML';
import Placeholder from 'components/placeholder';
import withLoader from 'components/hoc/withLoader';
import defaultState from 'reducers/defaultState';

const irvingDefaultConfig = {
  packages: {},
  reducers: () => ({}),
  defaultState: () => defaultState,
  sagas: () => ([]),
  componentMap: {
    body: withLoader(Body),
    embed: RawHTML,
    head: Head,
    header: Placeholder,
    html: RawHTML,
    image: Image,
  },
};

export default irvingDefaultConfig;
