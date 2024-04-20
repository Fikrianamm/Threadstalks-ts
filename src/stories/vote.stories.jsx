/* eslint-disable react/jsx-props-no-spreading */
import Vote from '../components/Vote';

const stories = {
  title: 'Components/Vote',
  component: Vote,
};
export default stories;

function TemplateStory(args) {
  return <Vote {...args} />;
}
const WithTypeVoteUp = TemplateStory.bind({});
WithTypeVoteUp.args = {
  type: 'voteUp',
};

const WithTypeVoteDown = TemplateStory.bind({});
WithTypeVoteDown.args = {
  type: 'voteDown',
};
export { WithTypeVoteUp, WithTypeVoteDown };
