// assets
import {
  IconSettings,
  IconHome,
  IconId,
  IconChartBar,
  IconTrophy,
  IconNotebook,
  IconUser,
  IconLanguageHiragana,
  IconAbacus,
  IconNews
} from '@tabler/icons';

//-----------------------|| SIDE MENU ITEMS ||-----------------------//

export const sidemenu = {
  id: 'menu-items',
  title: '',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'dashboard',
      type: 'item',
      url: '/dashboard',
      icon: IconHome,
      breadcrumbs: false
    },
    {
      id: 'study',
      title: 'study',
      type: 'item',
      url: '/study',
      icon: IconNotebook,
      breadcrumbs: false
    },
    {
      id: 'achievements',
      title: 'achievements',
      type: 'item',
      url: '/achievements',
      icon: IconTrophy,
      breadcrumbs: false
    },
    {
      id: 'statistics',
      title: 'statistics',
      type: 'collapse',
      icon: IconChartBar,
      children: [
        {
          id: 'review-stats',
          title: 'reviews',
          type: 'item',
          url: '/statistics/reviews',
          icon: IconAbacus,
          breadcrumbs: false
        },
        {
          id: 'kanji-stats',
          title: 'kanji',
          type: 'item',
          url: '/statistics/kanji',
          icon: IconLanguageHiragana,
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'news',
      title: 'news',
      type: 'item',
      url: '/news',
      icon: IconNews,
      breadcrumbs: false
    },
    {
      id: 'icons',
      title: 'settings',
      type: 'collapse',
      icon: IconSettings,
      children: [
        {
          id: 'account-settings',
          title: 'account',
          type: 'item',
          url: '/settings/account',
          icon: IconUser,
          breadcrumbs: false
        },
        {
          id: 'Decks',
          title: 'decks',
          type: 'item',
          url: '/settings/decks',
          icon: IconId,
          breadcrumbs: false
        }
      ]
    }
  ]
};
