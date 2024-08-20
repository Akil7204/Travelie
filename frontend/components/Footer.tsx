// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Travelio Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Travelie</h3>
            <p className="mt-4 text-sm text-gray-600">
              Your next go-to companion for travel
            </p>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">About</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Jobs</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Newsroom</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Advertising</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Contact us</a></li>
            </ul>
          </div>

          {/* Cities Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Cities</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Australia</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">New Zealand</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">United States America (USA)</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Greece</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Maldives</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Singapore</a></li>
              <li><a href="#" className="text-sm text-blue-600 hover:underline">See more</a></li>
            </ul>
          </div>

          {/* Terms and Policies Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Terms and Policies</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms of Use</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Accessibility</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Reward System Policy</a></li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Help</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Support</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Cancel your bookings</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Use Coupon</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Refund Policies</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Informational Travel Documents</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">&copy; Travelie 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
