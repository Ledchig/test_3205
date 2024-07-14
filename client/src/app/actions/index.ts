'use server'

const findUsers = async (email: string, number?: string) => {
  try {
    const res = await fetch(`http://localhost:8000/api/find-users?email=${email}&number=${number}`)
    console.log(res)
    return res.json()
  } catch (err: any) {
    console.log('jib,jxrf')
    console.error(err)
  }
}

export { findUsers }
