import Navbar from "../../components/Navbar"

export default function layout({children}:Readonly<{children:React.ReactNode}>){
    return(
        <main className="font-work-sans font-medium">
            <Navbar/>
            {children}
        </main>
    )
}