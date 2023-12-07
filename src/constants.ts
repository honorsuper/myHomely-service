import { v4 } from 'uuid';

export const COLOR_LIST = [
  {
    bgColor: '#cccccc',
    color: '#000000',
  },
  {
    bgColor: '#444444',
    color: '#ffffff',
  },
  {
    bgColor: '#337ab7',
    color: '#ffffff',
  },
  {
    bgColor: '#5bc0de',
    color: '#ffffff',
  },
  {
    bgColor: '#449d44',
    color: '#ffffff',
  },
  {
    bgColor: '#f0ad4e',
    color: '#ffffff',
  },
  {
    bgColor: '#d9534f',
    color: '#ffffff',
  },
];

export const MENU_CONFIG = [
  {
    id: v4(),
    mainTitle: '资讯',
    list: [
      {
        title: '百度',
        url: 'https://www.baidu.com/',
        id: 0,
        isGroup: 0,
        bgColor: '#cccccc',
        color: '#000000',
      },
    ],
  },
];
