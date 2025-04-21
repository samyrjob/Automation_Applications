interface props {
    children: string;
}

const Alert = ({children}: props) => {
  return (
    <div className="alert alert-danger" role="alert">
        {children}
    </div>
  )
}

export default Alert