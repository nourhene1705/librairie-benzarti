import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoMdNotifications, IoMdCart } from 'react-icons/io';
import { FaRegUserCircle, FaHome, FaBars } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const notificationsCount = 3;
  const cartItemsCount = 2;

  const logOut = async () => {
    try {
      const fetchData = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
        method: 'GET',
        credentials: 'include',
      });
      const response = await fetchData.json();
      if (response.success) {
        toast.success(response.message);
        setTimeout(() => navigate('/'), 700);
      }
    } catch (error) {
      console.error('Erreur dans logOut :', error);
      toast.error('Erreur lors de la déconnexion');
    }
  };

  const handleNavClick = () => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="h-16 bg-gradient-to-r from-pink-300 to-blue-900 text-white shadow-lg fixed w-full z-40 top-0 transition-all duration-300">
      <ToastContainer position="top-center" />
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight hover:text-gray-500 transition-colors duration-200"
          onClick={handleNavClick}
        >
          AdminDashboard
        </Link>

        {/* Navigation principale (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLinkItem to="/admin/dashboard" icon={<FaHome />} label="Dashboard" onClick={handleNavClick} />
          <NavLinkItem to="/admin/catégorie" label="Catégorie" onClick={handleNavClick} />
          <NavLinkItem to="/admin/produit" label="Produit" onClick={handleNavClick} />
          <NavLinkItem to="/admin/pannier" label="Pannier" onClick={handleNavClick} />
        </nav>

        {/* Actions à droite */}
        <div className="flex items-center gap-6">
          
          {/* Icône Notifications */}
          <IconWithBadge icon={<IoMdNotifications />} count={notificationsCount} color="red" />

          {/* Icône Panier */}
          <IconWithBadge icon={<IoMdCart />} count={cartItemsCount} color="green" />

          {/* Menu utilisateur */}
          <div className="relative">
            <div
              className="text-3xl text-gray-200 cursor-pointer hover:text-white transform hover:scale-110 transition-all duration-200"
              onClick={() => {
                setUserMenuOpen(prev => !prev);
                setMobileMenuOpen(false);
              }}
            >
              <FaRegUserCircle />
            </div>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50">
                <NavLinkDrop to="/admin/profile" label="Profil" onClick={handleNavClick} />
                <NavLinkDrop to="/admin/settings" label="Paramètres" onClick={handleNavClick} />
                <p
                  onClick={() => {
                    logOut();
                    setUserMenuOpen(false);
                  }}
                  className="cursor-pointer px-4 py-2 text-red-500 hover:bg-red-600 hover:text-white transition-colors duration-200"
                >
                  Déconnexion
                </p>
              </div>
            )}
          </div>

          {/* Burger Menu (Mobile) */}
          <div className="md:hidden">
            <FaBars
              className="text-2xl text-gray-200 cursor-pointer hover:text-white transform hover:scale-110 transition-all duration-200"
              onClick={() => {
                setMobileMenuOpen(prev => !prev);
                setUserMenuOpen(false);
              }}
            />
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 animate-slide-down">
          <MobileLink to="/admin/dashboard" label="Dashboard" onClick={handleNavClick} />
          <MobileLink to="/admin/produit" label="Produit" onClick={handleNavClick} />
          <MobileLink to="/admin/catégorie" label="Catégorie" onClick={handleNavClick} />
          <MobileLink to="/admin/pannier" label="Pannier" onClick={handleNavClick} />
        </div>
      )}
    </header>
  );
}

export default Header;

// Components auxiliaires

function NavLinkItem({ to, icon, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-1 rounded-md ${
          isActive ? 'bg-blue-700 text-white' : 'text-gray-200'
        } hover:bg-blue-700 hover:text-white transition-all duration-200`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}

function NavLinkDrop({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
      onClick={onClick}
    >
      {label}
    </NavLink>
  );
}

function MobileLink({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      className="block px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
      onClick={onClick}
    >
      {label}
    </NavLink>
  );
}

function IconWithBadge({ icon, count, color }) {
  // حل مشكلة Tailwind مع dynamic class
  let badgeColor = "bg-red-500";
  if (color === "green") badgeColor = "bg-green-500";
  if (color === "blue") badgeColor = "bg-blue-500";
  // زيد ألوان أخرى إذا تحب

  return (
    <div className="relative group cursor-pointer">
      <div className="text-2xl text-gray-200 group-hover:text-white transform group-hover:scale-110 transition-all duration-200">
        {icon}
      </div>
      {count > 0 && (
        <span
          className={`absolute -top-2 -right-2 ${badgeColor} text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse`}
        >
          {count}
        </span>
      )}
    </div>
  );
}