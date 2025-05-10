import { useRoutes } from 'react-router-dom';
import Code from '../components/repo/Code';
import ShowCode from '../components/repo/ShowCode';
import Issue from '../components/repo/Issue';
import RepoGuide from '../components/repo/RepoGuide';

function RepoRoutes() {
    let element = useRoutes([
        {
            path:"/code",
            element:<Code />
        },
        {
            path:"/issue",
            element:<Issue/>
        },
        {
            path:"/guide",
            element:<RepoGuide/>
        },
        {
            path:"/show",
            element:<ShowCode />
        },
    ])
    return element;
}

export default RepoRoutes;
