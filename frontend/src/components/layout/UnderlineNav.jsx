import { UnderlineNav } from '@primer/react'
import { Link } from 'react-router-dom';

function UnderlineNavBar({ reponame, username }) {
    return (
        <UnderlineNav aria-label="Repository">
            <UnderlineNav.Item as={Link} to={`/${username}/${reponame}/code`}>
                Code
            </UnderlineNav.Item>
            <UnderlineNav.Item>
                Pull requests
            </UnderlineNav.Item>
            <UnderlineNav.Item as={Link} to={`/${username}/${reponame}/issue`}>
                Issue
            </UnderlineNav.Item>
            <UnderlineNav.Item>
                Projects
            </UnderlineNav.Item>
            <UnderlineNav.Item>
                Wiki
            </UnderlineNav.Item>
        </UnderlineNav>
    );
}

export default UnderlineNavBar;