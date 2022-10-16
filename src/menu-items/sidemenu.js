// assets
import {
  IconBrandFramer,
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconLayoutGridAdd,
  IconSettings,
  IconHome, IconId, IconChartBar, IconTrophy, IconNotebook, IconUser } from '@tabler/icons';

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
      type: 'item',
      url: '/statistics',
      icon: icons['IconChartBar'],
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
