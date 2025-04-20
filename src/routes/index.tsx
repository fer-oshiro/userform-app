import { Navigate, Routes as ReactRouter, Route } from 'react-router'
import { FormPage } from '../pages/FormPage/FormPage'
import { Page404 } from '../pages/Page404'
import { UsersPage } from '../pages/UsersPage'

export const Routes = () => {
  return (
    <ReactRouter>
      <Route path="/" element={<Navigate to="/cadastro" />} />
      <Route path="/usuarios" element={<UsersPage />} />
      <Route path="/cadastro" element={<FormPage />} />
      <Route path="/404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </ReactRouter>
  )
}
