const MainWrapper = ({children}) => {
    return (
        <main className={"min-h-screen flex flex-col items-center min-w-screen pt-[116px] lg:pt-[136px] px-5 lg:px-10"}>
            {children}
        </main>
    )
}

export default MainWrapper