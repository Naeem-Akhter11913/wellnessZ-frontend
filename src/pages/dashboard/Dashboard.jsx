import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import EditRecordPage from './components/EditRecordPage';
import { useDispatch, useSelector } from 'react-redux';
import HomeDashboard from './components/HomeDashboard';
import Swal from 'sweetalert2'
import { useEffect } from 'react';
import { logoutUser } from '../../store/action/authRegister';
import { RESET_AUTH_STATE } from '../../store/type/type';
import { showAllertMessage } from '../../utilities/toastifyAlert';
import { useNavigate } from 'react-router';
// import HomeDashboard from './HomeDashboard';


// Route Mapping
const ROUTES = {
  '/dashboard': HomeDashboard,
};

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
    visible: true, // Always visible
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    visible: true, // Always visible
  },
  
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);
  const { users, successMessage, errorMessage, userDetails, isAuthenticated, currentUser } = useSelector(state => state.auth);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

export default function Dashboard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { window } = props;
  const { users, successMessage, errorMessage, userDetails, isAuthenticated, currentUser , loginSuccessMessage,
    loginErrorMessage  } = useSelector((state) => state.auth);

  const router = useDemoRouter('/dashboard'); // Default path

  // Update navigation with onClick handlers
  const filteredNavigation = NAVIGATION.filter((item) => item.visible !== false).map(
    (item) =>
      item.segment
        ? {
          ...item,
          onClick: () => router.navigate(`/${item.segment}`),
        }
        : item
  );

  // Determine the active component based on the current route
  const ActiveComponent = ROUTES[router.pathname] || "NotFoundPage"; // add a component page not found

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  useEffect(() => {
    // if (successMessage) {
    //   showAllertMessage('success', successMessage);
    //   dispatch({ type: RESET_AUTH_STATE });
    // }
    // if (errorMessage) {
    //   showAllertMessage('error', errorMessage);
    //   dispatch({ type: RESET_AUTH_STATE });
    // }
    if (loginSuccessMessage) {
      showAllertMessage('success', successMessage);
      dispatch({ type: RESET_AUTH_STATE });
    }
    if (loginErrorMessage) {
      showAllertMessage('error', errorMessage);
      dispatch({ type: RESET_AUTH_STATE });
    }
  }, [successMessage, errorMessage , loginSuccessMessage,
    loginErrorMessage ])

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log me out!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutUser())
      }
    });
  }
  useEffect(() => {
    const element = document.querySelector('.css-jjhd74-MuiStack-root');
    if (element && !document.getElementById('dynamic-button')) {
      const button = document.createElement('button');
      button.id = 'dynamic-button';
      button.textContent = 'Log out';
      button.style.padding = '8px 16px';
      button.style.backgroundColor = '#007BFF';
      button.style.color = 'white';
      button.style.border = 'none';
      button.style.borderRadius = '4px';
      button.style.cursor = 'pointer';

      button.onclick = handleLogOut

      element.appendChild(button);
    }
  }, [])

  return (
    <AppProvider
      navigation={filteredNavigation}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
          <ActiveComponent />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}

