import React from 'react';
import Button from '../components/Button';

const stories = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
};

export default stories;

function ButtonStory(args) {
  return <Button {...args} onClick={() => {}} />;
}

const WithTypePrimary = ButtonStory.bind({});

WithTypePrimary.args = {
  type: 'primary',
  text: 'Test',
};

const WithTypeSecondary = ButtonStory.bind({});

WithTypeSecondary.args = {
  type: 'secondary',
  text: 'Test',
};

const WithTypeDanger = ButtonStory.bind({});

WithTypeDanger.args = {
  type: 'danger',
  text: 'Test',
};

const WithTypeDicoding = ButtonStory.bind({});

WithTypeDicoding.args = {
  type: 'dicoding',
  text: 'Test',
};

export {
  WithTypePrimary, WithTypeSecondary, WithTypeDanger, WithTypeDicoding,
};
