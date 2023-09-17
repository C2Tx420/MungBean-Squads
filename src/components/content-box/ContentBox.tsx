import './style.scss'
export default function ContentBox({ children }: any) {
    return (
        <div className="content-box">
            {children}
        </div>
    )
}
