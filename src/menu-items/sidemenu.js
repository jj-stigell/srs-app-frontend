// assets
import {
  IconBrandFramer,
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconLayoutGridAdd,
  IconSettings,
  IconHome, IconId, IconChartBar, IconTrophy, IconNotebook, IconUser, IconLanguageHiragana, IconAbacus,
  IconNews } from '@tabler/icons';

// constant
const icons = {
  IconTypography: IconTypography,
  IconPalette: IconPalette,
  IconShadow: IconShadow,
  IconWindmill: IconWindmill,
  IconBrandFramer: IconBrandFramer,
  IconLayoutGridAdd: IconLayoutGridAdd,
  IconSettings: IconSettings,
  IconHome: IconHome,
  IconId: IconId,
  IconChartBar: IconChartBar,
  IconTrophy: IconTrophy,
  IconNotebook: IconNotebook,
  IconUser: IconUser,
  IconNews: IconNews,
  IconLanguageHiragana: IconLanguageHiragana,
  IconAbacus: IconAbacus
};

//-----------------------|| SIDE MENU ITEMS ||-----------------------//

export const sidemenu = {
  id: 'menu-items',
  //title: 'Menu',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons['IconHome'],
      breadcrumbs: false
    },
    {
      id: 'study',
      title: 'Study',
      type: 'item',
      url: '/study',
      icon: icons['IconNotebook'],
      breadcrumbs: false
    },
    {
      id: 'achievements',
      title: 'Achievements',
      type: 'item',
      url: '/achievements',
      icon: icons['IconTrophy'],
      breadcrumbs: false
    },
    {
      id: 'statistics',
      title: 'Statistics',
      type: 'collapse',
      icon: icons['IconChartBar'],
      children: [
        {
          id: 'review-stats',
          title: 'Reviews',
          type: 'item',
          url: '/statistics/reviews',
          icon: icons['IconAbacus'],
          breadcrumbs: false
        },
        {
          id: 'kanji-stats',
          title: 'Kanji',
          type: 'item',
          url: '/statistics/kanji',
          icon: icons['IconLanguageHiragana'],
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'news',
      title: 'News',
      type: 'item',
      url: '/news',
      icon: icons['IconNews'],
      breadcrumbs: false
    },
    {
      id: 'icons',
      title: 'Settings',
      type: 'collapse',
      icon: icons['IconSettings'],
      children: [
        {
          id: 'Decks',
          title: 'Decks',
          type: 'item',
          url: '/settings/decks',
          icon: icons['IconId'],
          breadcrumbs: false
        },
        {
          id: 'account-settings',
          title: 'Account',
          type: 'item',
          url: '/settings/account',
          icon: icons['IconUser'],
          breadcrumbs: false
        }
      ]
    }
  ]
};
