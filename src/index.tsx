import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./bootstrap"
import { ScrollTop } from "./components/scroll-top"
import { ErrorBoundary } from "react-error-boundary"
import { FullPageError } from "./components/error"

const client = new ApolloClient({
  uri: "https://graphqlzero.almansi.me/api",
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={FullPageError}>
          <App />
          <ScrollTop />
        </ErrorBoundary>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
