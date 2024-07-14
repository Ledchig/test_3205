const User = ({ email, number }: { email: string; number: string }) => {
  return (
    <div className="flex flex-col gap-1 border-l border-green-600 ps-5">
      <p>Email: {email}</p>
      <p>Number: {number}</p>
    </div>
  )
}

export default User
