import Head from 'next/head'

type Props = {
  title?: string
}

const Layout: React.FC<Props> = ({ children, title = 'Default title' }) => {
  return (
    <div className="flex justify-center item-center flex-col min-h-screen font-montserrat bg-background">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="container mx-auto flex flex-1 flex-col items-center mt-32 mb-10">
        <div className="">{children}</div>
      </main>
      <footer className="w-full h-6 flex justify-center item-center text-white mb-10">
        <div className="border-t text-center pt-5">
          created by masa @ DevChallenges.io
        </div>
      </footer>
    </div>
  )
}

export default Layout
