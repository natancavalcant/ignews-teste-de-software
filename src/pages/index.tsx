import { GetStaticProps } from 'next'
import Head from 'next/head'
import { captureRejections } from 'stream'

import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string,
    amount: number
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>from {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/Images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}
// Tipos de chamada a api: 
// Client-side: Ralizado no cliente, (useEffect).
// Server-Side: Realizado no servidor next, (getServerSideProps).
// Static side generation: Realizado no servidor next, mas salva a página gerada a cada intervalo de tempo, (GetStaticProps).

//getServerSideProps, busca na api cada vez que a página é recarregada.
//getStaticProps, salva uma cópia do html utilizado para gerar uma página com uma informação externa.

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1K44pLCXtUKfn30En8WxK8Nn")

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-Us', {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //24 hours
  }
}