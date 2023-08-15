import { Link } from "react-router-dom";

function FeedNav(props) {
    return <nav className="flex p-2 px-10 py-3">
        <li
            onClick={props.removeTab}
            className="ml-3 hover:border-b-2 text-lg font-semibold hover:border-green-700 hover:text-green-500 list-none"> 
            <Link to="/">Global Feed</Link>
        </li>
        {
            props.activeTab &&
            <nav className="ml-3 hover:border-b-2 text-lg font-semibold hover:border-green-700 hover:text-green-500 list-none">
                <Link to="/">
                #{props.activeTab}
                </Link>
            </nav>
        }
    </nav>
}

export default FeedNav;