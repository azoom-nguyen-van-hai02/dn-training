/** @format */

const TODO_TYPE = {
  personal: {
    value: 1,
    text: 'Personal',
  },
  professional: {
    value: 2,
    text: 'Professional',
  },
};

const TODO_STATUS = {
  complete: {
    value: 1,
  },
  incomplete: {
    value: 0,
  },
};

const {
  personal: { value: personal },
  professional: { value: professional },
} = TODO_TYPE;
const {
  complete: { value: complete },
} = TODO_STATUS;

const DEFAULT_TODO_LIST = [
  {
    id: randomId(),
    type: personal,
    status: complete,
    content: 'Personal Work No. 1',
  },
  {
    id: randomId(),
    type: personal,
    content: 'Personal Work No. 2',
  },
  {
    id: randomId(),
    type: personal,
    content: 'Personal Work No. 3',
  },
  {
    id: randomId(),
    type: personal,
    status: complete,
    content: 'Personal Work No. 4',
  },
  {
    id: randomId(),
    type: personal,
    content: 'Personal Work No. 5',
  },
  {
    id: randomId(),
    type: professional,
    status: complete,
    content: 'Professional Work No. 1',
  },
  {
    id: randomId(),
    type: professional,
    content: 'Professional Work No. 2',
  },
  {
    id: randomId(),
    type: professional,
    content: 'Professional Work No. 3',
  },
  {
    id: randomId(),
    type: professional,
    status: complete,
    content: 'Professional Work No. 4',
  },
  {
    id: randomId(),
    type: professional,
    content: 'Professional Work No. 5',
  },
];

const CHECK_ICON_RELATIVE_PATH = './images/check.svg';
const CIRCLE_ICON_RELATIVE_PATH = './images/circle.svg';
const DELETE_ICON_RELATIVE_PATH = './images/delete.svg';
