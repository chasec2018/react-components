import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

interface CopyrightProps {
  companyLink: string;
  companyTag: string;
}

const CopyrightFooter = (props: CopyrightProps) => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href={props.companyLink}>
          {props.companyTag}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

export default CopyrightFooter;