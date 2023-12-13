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
    bgColor: '#2563eb',
    color: '#ffffff',
  },
  {
    bgColor: '#14b8a6',
    color: '#ffffff',
  },
  {
    bgColor: '#fbbf24',
    color: '#ffffff',
  },
  {
    bgColor: '#EC4899',
    color: '#ffffff',
  },
  {
    bgColor: '#8b5cf6',
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
        color: 0,
      },
    ],
  },
];
