import { useSession, getSession } from 'next-auth/client'
const DashBoardPage = ({ user }) => {
  console.log(user, '<== user')
  const [session] = useSession()

  console.log(session, '<=== session')

  if (session) {
    return <div>DashBoardPage</div>
  }

  return <p>Access Denied</p>
}

export default DashBoardPage

export async function getServerSideProps({ req, res }) {
  const session = getSession({ req })
  if (!session) {
    res.writeHead(302, {
      Location: '/',
    })
    res.end()
    return { props: {} }
  }
  console.log(session, '<--- session')
  return {
    props: { user: '1234' },
  }
}
