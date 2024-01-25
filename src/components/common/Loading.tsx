import { RiLoaderFill } from 'react-icons/ri'

const Loading = () => {
    return (
        <div className="loading">
            <RiLoaderFill className="loadingIcon" />
            <p>Loading</p>
        </div>
    )
}

export default Loading