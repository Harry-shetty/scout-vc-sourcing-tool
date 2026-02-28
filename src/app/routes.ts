import { createBrowserRouter } from 'react-router';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Companies } from './pages/Companies';
import { CompanyProfile } from './pages/CompanyProfile';
import { Lists } from './pages/Lists';
import { ListDetail } from './pages/ListDetail';
import { Saved } from './pages/Saved';

import { UIComponentsPage } from './pages/UIComponents';
import { Settings } from './pages/Settings';
import { CursorSystemPage } from './pages/CursorSystem';
import { DataModelsPage } from './pages/DataModels';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

export const router = createBrowserRouter([
  // Auth routes (public)
  { path: '/login', Component: Login },
  { path: '/signup', Component: Signup },

  // Protected app routes
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'companies', Component: Companies },
      { path: 'companies/:id', Component: CompanyProfile },
      { path: 'lists', Component: Lists },
      { path: 'lists/:id', Component: ListDetail },
      { path: 'saved', Component: Saved },

      { path: 'components', Component: UIComponentsPage },
      { path: 'settings', Component: Settings },
      { path: 'cursors', Component: CursorSystemPage },
      { path: 'data-models', Component: DataModelsPage },
    ],
  },
]);
