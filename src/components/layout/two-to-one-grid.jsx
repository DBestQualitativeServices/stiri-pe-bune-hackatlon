const TwoToOneGrid = ({children}) => {
    return (
        <div className={"flex justify-center w-full max-w-screen-xl px-5"}>
            <div
                className={"grid place-items-start grid-cols-2 lg:grid-cols-3 gap-5 w-full"}>
                {children}
            </div>
        </div>
    )
}

export default TwoToOneGrid