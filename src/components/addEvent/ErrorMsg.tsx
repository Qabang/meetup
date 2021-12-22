function ErrorMsg(props: { errors: Array<string> }) {
  return (
    <ul data-test="error-container" className="error-container">
      {props.errors.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

export default ErrorMsg
