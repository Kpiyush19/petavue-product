import { useState } from 'react';
import { WorkbookHome } from '../pages/workbook_home';
import { WorkbookList } from '../pages/workbook_list';
import { WorkbookChat } from '../pages/workbook_chat';
import { DashboardList } from '../pages/dashboard_list';
import { DashboardView } from '../pages/dashboard_view';
import { ProfilePage } from '../pages/profile';

const USER = { name: 'Ammie Diego', initials: 'AD', email: 'ammie.diego@work.com' };

export function App() {
  const [page, setPage] = useState('home');
  const [chatQuery, setChatQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNavigate(id) {
    if (id === 'chats') {
      setPage('workbooks');
    } else if (id === 'dashboard') {
      setPage('dashboards');
    } else if (id === 'new-chat') {
      setPage('home');
    } else if (id === 'profile') {
      setPage('profile');
    }
  }

  function handleSearch(query) {
    setChatQuery(query);
    setPage('chat');
  }

  const menuProps = {
    user: USER,
    onNavigate: handleNavigate,
    menuOpen,
    onMenuToggle: setMenuOpen,
  };

  if (page === 'profile') {
    return (
      <ProfilePage
        {...menuProps}
      />
    );
  }

  if (page === 'workbooks') {
    return (
      <WorkbookList
        {...menuProps}
        page={page}
        onNewWorkbook={() => setPage('home')}
      />
    );
  }

  if (page === 'chat') {
    return (
      <WorkbookChat
        {...menuProps}
        query={chatQuery}
        onStop={() => setPage('home')}
      />
    );
  }

  if (page === 'dashboards') {
    return (
      <DashboardList
        {...menuProps}
        onNewDashboard={() => setPage('dashboards')}
        onOpenDashboard={() => setPage('dashboard-view')}
      />
    );
  }

  if (page === 'dashboard-view') {
    return (
      <DashboardView
        {...menuProps}
        onBack={() => setPage('dashboards')}
      />
    );
  }

  return (
    <WorkbookHome
      {...menuProps}
      page={page}
      onSubmit={handleSearch}
    />
  );
}
