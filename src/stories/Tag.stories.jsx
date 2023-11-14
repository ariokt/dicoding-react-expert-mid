import React from 'react';
import Tag from '../components/Tag';

const stories = {
  title: 'Tag',
  component: Tag,
  tags: ['autodocs'],
};

export default stories;

function TagStory(args) {
  return <Tag {...args} />;
}

const WithTypePrimary = TagStory.bind({});

WithTypePrimary.args = {
  type: 'primary',
  text: 'Test',
};

const WithTypeSecondary = TagStory.bind({});

WithTypeSecondary.args = {
  type: 'secondary',
  text: 'Test',
};

const WithTypeDanger = TagStory.bind({});

WithTypeDanger.args = {
  type: 'danger',
  text: 'Test',
};

const WithTypeDicoding = TagStory.bind({});

WithTypeDicoding.args = {
  type: 'dicoding',
  text: 'Test',
};

export {
  WithTypePrimary, WithTypeSecondary, WithTypeDanger, WithTypeDicoding,
};
