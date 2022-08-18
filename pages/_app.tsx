import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { AppProps } from 'next/app'

export const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql",
  cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps }: AppProps) {
  return <ApolloProvider client={client}>
    <div>
    <Component {...pageProps} />
    </div>
    </ApolloProvider>
}

export default MyApp
