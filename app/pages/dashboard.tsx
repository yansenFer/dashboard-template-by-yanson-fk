import Layout from '~/components/Layout'
import type { Route } from '../+types/root'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Dashboard' },
    { name: 'Dashboard', content: 'Welcome to my dashboard!' },
  ]
}

export default function Home() {
  return <Layout>konten layout</Layout>
}
