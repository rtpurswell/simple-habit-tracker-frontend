function BoxContainer(props) {
  return (
    <div
      className={`flex my-5 w-full  border-2 border-zinc-300 rounded flex-col px-10 sm:w-1/2 md:w-1/2 lg:w-1/3 ${props.className}`}
    >
      {props.children}
    </div>
  )
}

export default BoxContainer
