
export default function Layout(props){
    return (
        <section>
            <nav>
                Navbar
            </nav>
            {props.children}
            {props.profile}
            <footer>
                Footer
            </footer>
        </section>
    )
}