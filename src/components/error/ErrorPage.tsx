

type Props = {
    message: string | null
}

const ErrorPage = ({ message }: Props) => {
    return (
        <div className="grid place-self-center">
            <div className="text-white">
                {message}
            </div>
            <div className="mx-auto mt-4">
                <button onClick={() => { window.location.reload() }} className='bg-red-700 text-white text-xl font-medium px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200 ease-in-out hover:translate-y-[-2px] hover:shadow-xd '>Try Again</button>
            </div>
        </div>
    )
}

export default ErrorPage