


export default function Layout({modal,children}) {
    
    
    return (
        <div>
            {children}
            <div>
                {modal}
            </div>
        </div>
    )
}

