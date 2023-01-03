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
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: IconHome,
      breadcrumbs: false
    },
    {
      id: 'study',
      title: 'Study',
      type: 'item',
      url: '/study',
      icon: IconNotebook,
      breadcrumbs: false
    },
    {
      id: 'achievements',
      title: 'Achievements',
      type: 'item',
      url: '/achievements',
      icon: IconTrophy,
      breadcrumbs: false
    },
    {
      id: 'statistics',
      title: 'Statistics',
      type: 'collapse',
      icon: IconChartBar,
      children: [
        {
          id: 'review-stats',
          title: 'Reviews',
          type: 'item',
          url: '/statistics/reviews',
          icon: IconAbacus,
          breadcrumbs: false
        },
        {
          id: 'kanji-stats',
          title: 'Kanji',
          type: 'item',
          url: '/statistics/kanji',
          icon: IconLanguageHiragana,
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'news',
      title: 'News',
      type: 'item',
      url: '/news',
      icon: IconNews,
      breadcrumbs: false
    },
    {
      id: 'icons',
      title: 'Settings',
      type: 'collapse',
      icon: IconSettings,
      children: [
        {
          id: 'account-settings',
          title: 'Account',
          type: 'item',
          url: '/settings/account',
          icon: IconUser,
          breadcrumbs: false
        },
        {
          id: 'Decks',
          title: 'Decks',
          type: 'item',
          url: '/settings/decks',
          icon: IconId,
          breadcrumbs: false
        }
      ]
    }
  ]
};
