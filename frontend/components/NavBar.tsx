// components/Navbar.tsx
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white border-b border-gray-200">
      <div className="text-2xl font-bold">Travelie</div>
      <ul className="flex space-x-10 text-lg">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/discover">Discover</Link>
        </li>
        <li>
          <Link href="/activities">Activities</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
      <div className="flex space-x-4">
        <Link href="/register">
          <span className="px-4 py-2 border border-blue-500 text-blue-500 rounded">Register</span>
        </Link>
        <Link href="/signin">
          <span className="px-4 py-2 bg-blue-500 text-white rounded">Sign In</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
