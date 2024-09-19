import React from 'react';
import '../../index.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import WalletPage from '../Pages/WalletPage';
import SettingsPage from '../Pages/SettingsPage';

const App: React.FC = () => {

  return (
    <div className="h-[450px] w-[300px] bg-slate-900 mx-auto">
      <Router>
        <nav className="bg-slate-800 p-4 text-white rounded-b-xl">
          <ul className="flex justify-around">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/wallet">Wallet</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/wallet" Component={WalletPage} />
            <Route path="/settings" Component={SettingsPage} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
