import 'babel-polyfill';

// style-sheets
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/style.scss';

// scan assets in all packages
require('./packages/' + /^.*$/);