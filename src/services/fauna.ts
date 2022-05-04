import { Client } from "faunaDB"

export const fauna = new Client({
  secret: process.env.FAUNADB_KEY,
})

//não fazer nenhuma operação que envolve dados secretos no frontend, apenas
//em api routes e metodos como getServerSideProps e getStaticProps.