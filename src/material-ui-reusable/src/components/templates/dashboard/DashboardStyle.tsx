import { makeStyles } from '@material-ui/core/styles';
import { IDashboardTheme } from './types';


const useDefault = {
  containerSize:  'xl',
  appBarBackground:  "#F2F2F2",
  sidebarBackground:  "#08488B",
  sidebarWidth:  300,
  backgroundDark: "#08488B",
  backgroundLight: "#E8E9EE",
  textLight:  "#E8E9EE",
  textDark: "#08488B"
}

export const useDashboardStyle = makeStyles<any, IDashboardTheme | any>((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: props => ({
    paddingRight: 24, // keep right padding when drawer closed
  }),
  toolbarIcon: props => ({
    color: props.textLight,
    backgroundColor: props.sidebarBackground,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  }),
  appBar: props =>({
    color: props?.textDark ?? useDefault.textDark,
    backgroundColor: props?.appBarBackground ?? useDefault.appBarBackground,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),

  appBarShift: props => ({
    marginLeft: props?.sidebarWidth ?? useDefault.sidebarWidth,
    width: `calc(100% - ${props?.sidebarWidth ?? useDefault.sidebarWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  }),
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  chevronLeftIcon: props => ({
    color: props?.backgroundLight ?? useDefault.backgroundLight
  }),
  divider: props=>({
    height: '0.4px',
    backgroundColor: props?.backgroundLight ?? useDefault.backgroundLight
  }),
  drawerPaper: props =>({
    backgroundColor: props?.sidebarBackground ?? useDefault.sidebarBackground,
    color: props?.textLight ?? useDefault.textLight,
    position: 'relative',
    whiteSpace: 'nowrap',
    width: props?.sidebarWidth ?? useDefault.sidebarWidth,
    transition:  theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  drawerPaperClose: props => ({
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  }),
  list: props => ({
    color: props?.textLight ?? useDefault.textLight
  }),
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: props =>( {
    maxWidth: props?.containerSize ?? useDefault.containerSize,
    backgroundColor: 'none',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }),
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));