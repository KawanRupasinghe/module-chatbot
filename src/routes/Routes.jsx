import { Route, Routes } from 'react-router-dom';
import ChatWindow from '../components/chat/ChatWindow';
import Dashboard from '../components/Dashboard';
import LoginForm from '../components/LoginForm';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/chat/:moduleId" element={<ChatWindow />} />
    </Routes>
  );
};

export default AppRoutes;
