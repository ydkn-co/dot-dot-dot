import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import App from './App';

export default {
  component: App,
  title: 'Example/App',
} as ComponentMeta<typeof App>;

export const Default: React.VFC<{}> = () => <App />;
