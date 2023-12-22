import { v4 } from 'uuid';

export const COLOR_LIST = [
  {
    bgColor: '#cccccc',
    color: '#000000',
  },
  {
    bgColor: '#14b8a6',
    color: '#ffffff',
  },
  {
    bgColor: '#2563eb',
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
  {
    bgColor: '#444444',
    color: '#ffffff',
  },
];

export const MENU_CONFIG = [
  {
    id: v4(),
    mainTitle: '文档/论坛',
    list: [
      {
        title: 'Vue',
        url: 'https://vuejs.org/',
        id: v4(),
        isGroup: 0,
        color: 0,
      },
      {
        title: 'React',
        url: 'https://react.dev/',
        id: v4(),
        isGroup: 0,
        color: 0,
      },
      {
        title: 'TypeScript',
        url: 'https://www.typescriptlang.org/',
        id: v4(),
        isGroup: 0,
        color: 0,
      },
      {
        title: 'Nest',
        url: 'https://nestjs.com/',
        id: v4(),
        isGroup: 0,
        color: 0,
      },
      {
        title: 'Github',
        url: 'https://github.com/',
        id: v4(),
        isGroup: 0,
        color: 0,
      },
      {
        title: 'MDN',
        url: 'https://developer.mozilla.org/zh-CN/',
        id: v4(),
        isGroup: 0,
        color: 0,
      },
      {
        title: '掘金',
        url: 'https://juejin.cn/',
        id: v4(),
        isGroup: 0,
        color: 0,
      },
    ],
  },
  {
    id: v4(),
    mainTitle: '工具',
    list: [
      {
        title: 'carbon',
        url: 'https://carbon.now.sh/',
        id: v4(),
        isGroup: 0,
        color: 1,
      },
      {
        title: '图片压缩',
        url: 'https://tinify.cn/',
        id: v4(),
        isGroup: 0,
        color: 1,
      },
      {
        title: 'iconfont',
        url: 'https://www.iconfont.cn/',
        id: v4(),
        isGroup: 0,
        color: 1,
      },
      {
        groupTitle: '画图',
        id: v4(),
        isGroup: 1,
        color: 1,
        groupList: [
          {
            subTitle: 'excalidraw',
            subUrl: 'https://excalidraw.com/',
            id: v4(),
          },
          {
            subTitle: 'Process On',
            subUrl: 'https://www.processon.com/',
            id: v4(),
          },
        ],
      },
    ],
  },
];
