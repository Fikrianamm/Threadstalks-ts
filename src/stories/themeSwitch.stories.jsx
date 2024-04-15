/* eslint-disable react/jsx-props-no-spreading */
import ThemeSwitch from '../components/ThemeSwitch';

const stories = {
  title: 'Components/ThemeSwitch',
  component: ThemeSwitch,
};

export default stories;

function TemplateStory(args) {
  return <ThemeSwitch {...args} />;
}

const SwitchToLight = TemplateStory.bind({});
SwitchToLight.args = {
  theme: 'dark',
};

const SwitchToDark = TemplateStory.bind({});
SwitchToDark.args = {
  theme: 'light',
};

export { SwitchToLight, SwitchToDark };
