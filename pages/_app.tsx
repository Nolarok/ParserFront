import React from 'react'
import { Provider } from 'react-redux'
import App, { AppContext } from 'next/app'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import makeStore from '@/store'
import '@/styles/main.scss'
import { Layout } from '../layout'
import { StylesProvider } from '@material-ui/core/styles'
import {axiosInstance} from '@/api/axios'
import {logout} from "@/store/user/actions";

type Props = {
  store: any
}

export const store = makeStore()

class NewApp extends App<Props> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  componentDidMount() {
    axiosInstance.interceptors.response.use(
      response => {
        return response
      },
      (error) => {
        if(error.response.status === 401) {
          this.props.store.dispatch(logout())
        }
        return Promise.reject(error)
      }
    )
  }

  render(): React.ReactElement {
    const { Component, pageProps, store } = this.props



    return (
      <Provider store={store}>
        <StylesProvider >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StylesProvider>
      </Provider>
    )
  }
}

export default withRedux(makeStore)(withReduxSaga(NewApp))
