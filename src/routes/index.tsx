import { Navigate, Routes as ReactRouter, Route } from 'react-router'
import { FormPage } from '../pages/FormPage/FormPage'
import { Page404 } from '../pages/Page404'
import { UsersPage } from '../pages/UsersPage'
import { Layout } from '@/components/Layout'

export const Routes = () => {
  return (
    <ReactRouter>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/cadastro" />} />
        <Route path="/usuarios" element={<UsersPage />} />
        <Route path="/cadastro" element={<FormPage />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>
    </ReactRouter>
  )
}
